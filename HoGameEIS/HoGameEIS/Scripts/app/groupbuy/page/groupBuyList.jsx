App.GroupBuy.GroupBuyList = (function () {
    var Table = ReactBootstrap.Table;

    var LoadingIcon = App.Component.Loading;

    var GroupBuyList = React.createClass({
        getInitialState: function () {
            return {
                data:null
            };
        },
        componentDidMount: function () {
            $.get("/api/groupbuyapi", function (data) {
                this.setState({ data: data });
            }.bind(this));
        },
        render: function () {
            var rows = this.state.data;
            return(
                    <div>
                         <Table bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>StartTime</th>
                                    <th>EndTime</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {
                                    !rows &&
                                    <tr><td colSpan="4" className="text-center"><LoadingIcon /></td></tr>
                                    }
                                    {
                                    !!rows && rows.map(function(item,i){
                                    return (
                                            <tr key={i}>
                                                <td>{item.Description}</td>
                                                <td>{item.StartTime}</td>
                                                <td>{item.EndTime}</td>
                                            </tr>
                                    );
                                    }.bind(this))
                                    }
                                </tbody>
                         </Table>
                    </div>
                );
            }
    });

    return GroupBuyList;
})();