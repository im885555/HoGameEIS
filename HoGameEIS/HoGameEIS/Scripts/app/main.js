$(function () {
    var UrlParams = App.Core.UrlParams,
        controller = UrlParams.controller,
        action = UrlParams.action;
   

    //載入頁面react 元件
    App[controller] && App[controller][action]
    && React.render(React.createElement(App[controller][action], null), document.getElementById('content'));

    //小尺寸裝置 左側menu縮和
    $("[data-toggle=offcanvas]").click(function () {
        $('.row-offcanvas').toggleClass('active');
    });

});