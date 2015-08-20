var App = App || {};

App.Component = App.Component || {};

App.Core = App.Core || {};

App.Context = App.Context || {};

App.Mixins = App.Mixins || {};

App.GroupBuy = App.GroupBuy || {};

App.GroupBuy.Control = App.GroupBuy.Control || {};
App.GroupBuy.Panel = App.GroupBuy.Panel || {};



App.Core._UrlParams;
App.Core.UrlParams = (function (pathname) {
    function getParams(){
        var urlMap = "{controller}/{action}/{id}",
            param = {},
            _ps = urlMap.match(/\{(.*?)\}/g),
            _pathname = pathname.split("/");

        !_pathname[0] && _pathname.shift();

        for (var i in _ps) {
            param[_ps[i].match(/\{(.*?)\}/)[1]] = _pathname[i];
        }
        App.Core._UrlParams = param;
        return param;
    }

    return App.Core._UrlParams || getParams();
})(location.pathname);

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