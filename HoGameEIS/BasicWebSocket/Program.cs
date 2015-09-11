using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BasicWebSocket
{
    class Program
    {
        private static WebSocketServer _server = null;

        static void Main(string[] args)
        {
            try {
                _server = new WebSocketServer(5585);
                _server.OnConnected += new ClientConnectedHandler(DoConnectedWork);
                Console.WriteLine("WebSocket Server Start");
                _server.Start();
                while (Console.ReadLine().Equals("EXIT", StringComparison.OrdinalIgnoreCase)) { }
            }
            catch (Exception ex)
            {
                using (System.IO.StreamWriter file = new System.IO.StreamWriter(@"error_log.txt"))
                {
                    file.WriteLine(string.Format("{0}{1}",DateTime.Now,ex.Message));
                }
            }



        }

        static void DoConnectedWork(WebSocketConnection sender, EventArgs ev)
        {
            sender.OnDataReceived += new DataReceivedEventHandler(DoDataReceivedWork);
            sender.OnDisconnected += new ClientDisconnectedEventHandler(DoClientDisconnectedWork);
        }

        static void DoDataReceivedWork(WebSocketConnection sender, DataReceivedEventArgs ev)
        {
            _server.SendToAllClient(ev.Data);
        }

        static void DoClientDisconnectedWork(WebSocketConnection sender, EventArgs ev)
        {
            _server.SendToAllClient("Someone leave the room");
        }
    }
}
