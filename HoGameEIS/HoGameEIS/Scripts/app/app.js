var App = App || {};

App.Component = App.Component || {};

App.Core = App.Core || {};

App.Mixins = App.Mixins || {};

App.GroupBuy = App.GroupBuy || {};


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

