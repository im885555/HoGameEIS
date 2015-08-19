$(function () {
    var UrlParams = App.Core.UrlParams,
        controller = UrlParams.controller,
        action = UrlParams.action;
   

    //載入頁面react 元件
    var loadReactPage = function () {
        App[controller] && App[controller][action]
        && React.render(React.createElement(App[controller][action], null), document.getElementById('content'));
    };

    !!App.Context._CurrentUser.done && App.Context._CurrentUser.done(function () { loadReactPage() });
    !App.Context._CurrentUser.done && loadReactPage();


   

    //小尺寸裝置 左側menu縮和
    $("[data-toggle=offcanvas]").click(function () {
        $('.row-offcanvas').toggleClass('active');
    });

});