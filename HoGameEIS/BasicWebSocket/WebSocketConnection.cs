#region Copyright
// <copyright file="WebSocketConnection.cs" company="">
// Copyright (c) company. All rights reserved.
// </copyright>
// <author>限量</author>
// <email></email>
// <date>2013-10-04</date>
// <summary>This project code is a websocket demo project</summary>
#endregion

using System;
using System.Net.Sockets;
using System.Collections.Generic;
using System.Text;

namespace BasicWebSocket
{
    // 處理接收資料的Event Handler
    public delegate void DataReceivedEventHandler(WebSocketConnection sender, DataReceivedEventArgs ev);
    // 處理Disconnected的Event Handler
    public delegate void ClientDisconnectedEventHandler(WebSocketConnection sender, EventArgs ev);

    public class WebSocketConnection : IDisposable
    {
        private Socket _connection = null;
        // 存放資料的buffter
        private Byte[] _dataBuffer = new Byte[256];
        public event DataReceivedEventHandler OnDataReceived;
        public event ClientDisconnectedEventHandler OnDisconnected;

        /// <summary>
        /// 建構子
        /// </summary>
        /// <param name="socket"></param>
        public WebSocketConnection(Socket socket)
        {
            _connection = socket;
            listen();
        }

        /// <summary>
        /// 對該Client Socket監聽是否有資料傳遞
        /// </summary>
        private void listen()
        {
            _connection.BeginReceive(_dataBuffer, 0, _dataBuffer.Length, SocketFlags.None, Read, null);
        }

        /// <summary>
        /// 讀取傳遞過來的資料封包進行解析
        /// </summary>
        /// <param name="result"></param>
        private void Read(IAsyncResult result)
        {
            var receivedSize = _connection.EndReceive(result);
            if (receivedSize > 2)
            {
                // 判斷是否為最後一個Frame(第一個bit為FIN若為1代表此Frame為最後一個Frame)，超過一個Frame暫不處理
                if (!((_dataBuffer[0] & 0x80) == 0x80))     
                {
                    Console.WriteLine("Exceed 1 Frame. Not Handle");     
                    return;
                }
                // 是否包含Mask(第一個bit為1代表有Mask)，沒有Mask則不處理
                if (!((_dataBuffer[1] & 0x80) == 0x80))     
                {
                    Console.WriteLine("Exception: No Mask");
                    OnDisconnected(this, EventArgs.Empty);
                    return;
                }
                // 資料長度 = dataBuffer[1] - 127
                var payloadLen = _dataBuffer[1] & 0x7F;    
                var masks = new Byte[4];
                var payloadData = filterPayloadData(ref payloadLen, ref masks);
                // 使用WebSocket Protocol中的公式解析資料
                for (var i = 0; i < payloadLen; i++)
                    payloadData[i] = (Byte)(payloadData[i] ^ masks[i % 4]);

                // 解析出的資料
                var content = Encoding.UTF8.GetString(payloadData);
                Console.WriteLine("Received Data: {0}", content);

                // 確認是否繼續接收資料，並持續監聽
                if (OnDataReceived != null)
                    OnDataReceived(this, new DataReceivedEventArgs(content));
                listen();
            }
            else
            {
                Console.WriteLine("Receive Error Data Frame");
                if (OnDisconnected != null)
                    OnDisconnected(this, EventArgs.Empty);
            }
        }

        /// <summary>
        /// 判斷資料長度格式
        /// </summary>
        /// <param name="length"></param>
        /// <param name="masks"></param>
        /// <returns></returns>
        private Byte[] filterPayloadData(ref int length, ref Byte[] masks)
        {
            Byte[] payloadData;
            switch (length)
            {
                // 包含16 bit Extend Payload Length
                case 126:               
                    Array.Copy(_dataBuffer, 4, masks, 0, 4);
                    length = (UInt16)(_dataBuffer[2] << 8 | _dataBuffer[3]);
                    payloadData = new Byte[length];
                    Array.Copy(_dataBuffer, 8, payloadData, 0, length);
                    break;
                // 包含 64 bit Extend Payload Length
                case 127:               
                    Array.Copy(_dataBuffer, 10, masks, 0, 4);
                    var uInt64Bytes = new Byte[8];
                    for (int i = 0; i < 8; i++)
                    {
                        uInt64Bytes[i] = _dataBuffer[9 - i];
                    }
                    UInt64 len = BitConverter.ToUInt64(uInt64Bytes, 0);

                    payloadData = new Byte[len];
                    for (UInt64 i = 0; i < len; i++)
                        payloadData[i] = _dataBuffer[i + 14];
                    break;
                // 沒有 Extend Payload Length
                default:                
                    Array.Copy(_dataBuffer, 2, masks, 0, 4);
                    payloadData = new Byte[length];
                    Array.Copy(_dataBuffer, 6, payloadData, 0, length);
                    break;
            }
            return payloadData;
        }

        public void Close()
        {
            _connection.Close();
        }

        /// <summary>
        /// 將要傳送的資料字串轉換成WebSocket Protocal中的傳送封包格式後送出
        /// </summary>
        /// <param name="data"></param>
        public void Send(Object data)
        {
            if (_connection.Connected)
            {
                try
                {
                    // 將資料字串轉成Byte
                    var contentByte = Encoding.UTF8.GetBytes(data.ToString());
                    var dataBytes = new List<Byte>();

                    if (contentByte.Length < 126)   // 資料長度小於126，Type1格式
                    {
                        // 未切割的Data Frame開頭
                        dataBytes.Add((Byte)0x81);              
                        dataBytes.Add((Byte)contentByte.Length);
                        dataBytes.AddRange(contentByte);
                    }
                    else if (contentByte.Length <= 65535)       // 長度介於126與65535(0xFFFF)之間，Type2格式
                    {
                        dataBytes.Add((Byte)0x81);
                        dataBytes.Add((Byte)0x7E);              // 126
                        // Extend Data 加長至2Byte
                        dataBytes.Add((Byte)((contentByte.Length >> 8) & 0xFF));
                        dataBytes.Add((Byte)((contentByte.Length) & 0xFF));
                        dataBytes.AddRange(contentByte);
                    }
                    else                 // 長度大於65535，Type3格式
                    {
                        dataBytes.Add((Byte)0x81);
                        dataBytes.Add((Byte)0x7F);              // 127
                        // Extned Data 加長至8Byte
                        dataBytes.Add((Byte)((contentByte.Length >> 56) & 0xFF));
                        dataBytes.Add((Byte)((contentByte.Length >> 48) & 0xFF));
                        dataBytes.Add((Byte)((contentByte.Length >> 40) & 0xFF));
                        dataBytes.Add((Byte)((contentByte.Length >> 32) & 0xFF));
                        dataBytes.Add((Byte)((contentByte.Length >> 24) & 0xFF));
                        dataBytes.Add((Byte)((contentByte.Length >> 16) & 0xFF));
                        dataBytes.Add((Byte)((contentByte.Length >> 8) & 0xFF));
                        dataBytes.Add((Byte)((contentByte.Length) & 0xFF));
                        dataBytes.AddRange(contentByte);
                    }
                    _connection.Send(dataBytes.ToArray());
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    if (OnDisconnected != null)
                        OnDisconnected(this, EventArgs.Empty);
                }
            }
        }

        public void Dispose()
        {
            Close();
        }
    }

    public class DataReceivedEventArgs : EventArgs
    {
        // OnReceive事件發生時傳入的資料字串
        public String Data { get; private set; }

        public DataReceivedEventArgs(String data)
        {
            Data = data;
        }
    }
}
