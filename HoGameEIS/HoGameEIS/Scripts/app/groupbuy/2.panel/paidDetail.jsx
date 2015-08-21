App.GroupBuy.Panel.PaidDetail = (function () {
    var Table = ReactBootstrap.Table;
    var Button = ReactBootstrap.Button;

    var LoadingIcon = App.Component.Loading;

    var PaidDetail = React.createClass({
        getInitialState: function () {
            return {
                paidList: [],
                isLoading:true
            };
        },
        componentDidMount: function () {
            this.getPaidDetailFromServer();
        },
        getPaidDetailFromServer: function () {
            $.ajax({
                url: "/api/GroupBuyPaidDetailApi/" + this.props.GroupBuyId,
                type: "GET",
                success: function (data) {
                    this.setState({ paidList: data, isLoading: false });
                }.bind(this)
            });
        },
        render: function () {
            var paidList = this.state.paidList;
            return(
                <div>
                    <Table bordered condensed hover>
                    <thead>
                        <tr>
                            <th>功能</th>
                            <th>名稱</th>
                            <th>應付</th>
                            <th>已付</th>
                            <th>狀態</th>
                            <th>明細</th>
                        </tr>
                    </thead>
                        <tbody>
                            {paidList.map(function(detail,i){
                                return(
                                    <tr key={i}>
                                        <td>
                                            <Button bsStyle="success">結清</Button>
                                            <Button bsStyle="info">收銀機</Button>
                                            <Button bsStyle="danger">取消繳費</Button>
                                        </td>
                                        <td>{detail.EmployeeName}</td>
                                        <td>{detail.Payable}</td>
                                        <td>{detail.Paid}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            }.bind(this))}

                            {!!this.state.isLoading &&
                            <tr>
                            <td colSpan="6" className="text-center">
                                <LoadingIcon />
                            </td>
                            </tr>
                            }
                           <tr><td colSpan="6"> 總共應收: 元, 目前收款金額: 元 </td></tr>
                        </tbody>
                    </Table>


                </div>
                );
        }
    });

    return PaidDetail;
})();
