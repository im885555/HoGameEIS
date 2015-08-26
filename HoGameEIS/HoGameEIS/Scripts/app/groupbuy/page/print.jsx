App.GroupBuy.Print = (function () {   

    var Print = React.createClass({
        getDefaultProps: function () {
            return {
                GroupBuyId: App.Core.UrlParams.id
            };
        },
        render: function () {
            return(
               <App.GroupBuy.Panel.OrderDetail  {...this.props} print={true}/>
                );
            }
    });

    return Print;
})();