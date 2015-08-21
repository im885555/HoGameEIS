var App = App || {};

App.Component = App.Component || {};

App.Core = App.Core || {};

App.Context = App.Context || {};

App.Mixins = App.Mixins || {};

App.GroupBuy = App.GroupBuy || {};

App.GroupBuy.Control = App.GroupBuy.Control || {};
App.GroupBuy.Panel = App.GroupBuy.Panel || {};


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