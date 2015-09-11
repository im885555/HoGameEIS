var App = App || {};

App.Component = App.Component || {};

App.Core = App.Core || {};

App.Utility = App.Utility || {};

App.Context = App.Context || {};

App.Mixins = App.Mixins || {};

App.GroupBuy = App.GroupBuy || {};

App.GroupBuy.Control = App.GroupBuy.Control || {};
App.GroupBuy.Panel = App.GroupBuy.Panel || {};


//App._WebSocket = new WebSocket("ws://" + location.hostname + ":8888");
App.WebSocket = (function () {
    var wsUrl = "ws://" + location.hostname + ":8888";
    var _WebSocket = null;
    var _callbacks = {};
    var IsJsonString =function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };
    var wsFunc = function (opts) {
        if (!_WebSocket) {
            _WebSocket = new WebSocket(wsUrl);
            _WebSocket.onmessage = function (evt) {
                if (!IsJsonString(evt.data)) return;
                var msg = JSON.parse(evt.data);
                for (var key in _callbacks) {
                    _callbacks[key](msg);
                }
            }.bind(this);
        };
        !!opts.onmessage && !!opts.key && (_callbacks[opts.key] = opts.onmessage);
        this.send = function (msg) { _WebSocket.send(JSON.stringify(msg)); }.bind(this);
        this.close = function () { delete _callbacks[opts.key]; }.bind(this);
    };
    return wsFunc;
})();

(window.onpopstate = function () {
    function getParams() {
        var urlMap = "{controller}/{action}/{id}",
            param = {},
            _ps = urlMap.match(/\{(.*?)\}/g),
            _pathname = location.pathname.split("/");

        !_pathname[0] && _pathname.shift();

        for (var i in _ps) {
            param[_ps[i].match(/\{(.*?)\}/)[1]] = _pathname[i];
        }
        return param;
    }
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1),
        urlParams = getParams();


    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);

    App.Core.UrlParams = urlParams;
})();

App.Utility.ParseInt = function (_str) {
    var str = _str;
    str = $.trim(str);
    str = !str ? "0" : str;
    str = str.replace(/[^0-9]/g, "");
    str = parseInt(str, 10);
    isNaN(str) && (str = 0);
    return str;
}


App.Context._CurrentUser = App.Context._CurrentUser || (function () {
    return $.ajax({
        url: "/api/CurrentUserApi",
        type: "GET",
        success: function (info) {
            App.Context._CurrentUser = info;
        }.bind(this)
    });
})();

App.Context.GetCurrentUser = function () {
    return App.Context._CurrentUser;
};