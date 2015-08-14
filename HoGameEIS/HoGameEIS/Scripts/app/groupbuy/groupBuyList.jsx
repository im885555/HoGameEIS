App.GroupBuy.GroupBuyList = (function () {
    var GroupBuyList = React.createClass({
        getInitialState: function () {
            return {
                data:""
            };
        },
        componentDidMount: function () {
            $.get("/api/groupbuyapi", function (data) {
                this.setState({ data: JSON.stringify(data) });
            }.bind(this));
        },
        render: function () {
            return(
                    <div>{this.state.data}</div>
                );
            }
    });

    return GroupBuyList;
})();