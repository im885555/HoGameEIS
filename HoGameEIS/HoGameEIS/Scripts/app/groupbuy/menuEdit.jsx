var getRouterId = function () {
    var params = location.pathname.split("/");
    return params[params.length - 1];
};

App.StoreManagementMenuInit = function (mountNode) {
    var storeId = location.pathname.split("/")[location.pathname.split("/").length - 1];
};