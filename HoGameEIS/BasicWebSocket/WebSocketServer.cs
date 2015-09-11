#region Copyright
// <copyright file="WebSocketServer.cs" company="">
// Copyright (c) company. All rights reserved.
// </copyright>
// <author>限量</author>
// <email></email>
// <date>2013-10-04</date>
// <summary>This project code is a websocket demo project</summary>
#endregion

using System;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Linq;
using System.Collections.Generic;

namespace BasicWebSocket
{
    public delegate void ClientConnectedHandler(WebSocketConnection sender, EventArgs ev);

    public class WebSocketServer
    {
        // Server端的Socket
        private Socket _serverSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.IP);
        // SHA1加密
        private SHA1 _sha1 = SHA1CryptoServiceProvider.Create();
        // WebSocket專用GUID                          
        private static readonly String GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
        // 儲存所有Client連線的佇列             
        private List<WebSocketConnection> _connections = new List<WebSocketConnection>();
        // 建立連線後觸發的事件                       
        public event ClientConnectedHandler OnConnected;                                                                
        // 通訊埠
        public Int32 Port { get; private set; }

        /// <summary>
        /// 建構子
        /// </summary>
        /// <param name="port"></param>
        public WebSocketServer(Int32 port)
        {
            Port = port;
        }

        /// <summary>
        /// 啟動WebSocket Server
        /// </summary>
        public void Start()
        {
            // 啟動Server Socket並監聽
            _serverSocket.Bind(new IPEndPoint(IPAddress.Any, Port));
            _serverSocket.Listen(128);
            // Server Socket準備接收Client端連線
            _serverSocket.BeginAccept(new AsyncCallback(onConnect), null);
        }

        /// <summary>
        /// 當Client連線上進行的動作
        /// </summary>
        /// <param name="result"></param>
        private void onConnect(IAsyncResult result)
        {
            var clientSocket = _serverSocket.EndAccept(result);
            // 進行ShakeHand動作
            ShakeHands(clientSocket);
        }

        /// <summary>
        /// 進行HandShake
        /// </summary>
        /// <param name="socket"></param>
        private void ShakeHands(Socket socket)
        {
            // 存放Request資料的Buffer
            byte[] buffer = new byte[2048];
            // 接收的Request長度
            var length = socket.Receive(buffer);
            // 將buffer中的資料解碼成字串
            var data = Encoding.UTF8.GetString(buffer, 0, length);
            Console.WriteLine(data);


            // 將資料字串中的空白位元移除
            var dataArray = data.Split(Environment.NewLine.ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

            if (dataArray.Count() == 0) {
                return;
            }

            // 從Client傳來的Request Header訊息中取
            var key = dataArray.Where(s => s.Contains("Sec-WebSocket-Key: ")).Single().Replace("Sec-WebSocket-Key: ", String.Empty).Trim();
            var acceptKey = CreateAcceptKey(key);
            // WebSocket Protocol定義的ShakeHand訊息
			var handShakeMsg =
				"HTTP/1.1 101 Switching Protocols\r\n" +
				"Upgrade: websocket\r\n" +
				"Connection: Upgrade\r\n" +
				"Sec-WebSocket-Accept: " + acceptKey + "\r\n\r\n";

            socket.Send(Encoding.UTF8.GetBytes(handShakeMsg));

            Console.WriteLine(handShakeMsg);
            // 產生WebSocketConnection實體並加入佇列中管理
            var clientConn = new WebSocketConnection(socket);
            _connections.Add(clientConn);
            // 註冊Disconnected事件
            clientConn.OnDisconnected += new ClientDisconnectedEventHandler(DisconnectedWork);

            // 確認Connection是否繼續存在，並持續監聽
            if (OnConnected != null)
                OnConnected(clientConn, EventArgs.Empty);
            _serverSocket.BeginAccept(new AsyncCallback(onConnect), null);
        }

        /// <summary>
        /// DisConnected事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="ev"></param>
        private void DisconnectedWork(WebSocketConnection sender, EventArgs ev)
        {
            _connections.Remove(sender);
            sender.Close();
        }

        /// <summary>
        /// 產生HandShake的Socket Accept Key
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        private String CreateAcceptKey(String key)
        {
            String keyStr = key + GUID;
            byte[] hashBytes = ComputeHash(keyStr);
            return Convert.ToBase64String(hashBytes);
        }

        /// <summary>
        /// 以SHA1進行加密
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        private byte[] ComputeHash(String str)
        {
            return _sha1.ComputeHash(System.Text.Encoding.ASCII.GetBytes(str));
        }

        public void SendToAllClient(String data)
        {
            _connections.ForEach(c => c.Send(data));
        }

        public void SendToAllExceptSelf(String data, WebSocketConnection self)
        {
            _connections.Where(c => c != self).ToList().ForEach(c => c.Send(data));
        }
    }
}
