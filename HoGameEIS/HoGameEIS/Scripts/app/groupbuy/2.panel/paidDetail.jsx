﻿App.GroupBuy.Panel.PaidDetail = (function () {
    var Table = ReactBootstrap.Table;
    var Button = ReactBootstrap.Button;
    var Input = ReactBootstrap.Input;
    

    var LoadingIcon = App.Component.Loading;

    var REFRESH_ACTION = "GroupbuyOrderListRefresh";

    var CasherInput = React.createClass({
        getInitialState: function () {
            return {
                showInput: false
            };
        },
        handleChange: function (callback) {
            var str = this.refs.valInput.getDOMNode().value;
            this.refs.valInput.getDOMNode().value = App.Utility.ParseInt(str);
            //this.props.onChange(str);
        },
        handleBlur: function () {
            this.setState({ showInput: false });
            this.props.setPaidMoney(this.props.EmployeeId, this.refs.valInput.getDOMNode().value);
        },
        render: function () {
            var btn= <Button bsStyle="info"
                             onClick={()=>{
                                this.setState({showInput:!this.state.showInput},()=> this.refs.valInput.getDOMNode().value=this.props.value )
                             }}>
                      收銀機</Button>,
                valInput =<input ref="valInput"
                                 type="text" 
                             className="form-control" 
                             onBlur={this.handleBlur} 
                             onFocus={()=>setTimeout(()=>document.execCommand("selectAll"), 0)}   
                             onChange={this.handleChange}
                             autoFocus/>;
            
            if (this.state.showInput) {
                return(<div className="groupbuy-casher-input">{btn}{valInput}</div>)
            } else {
                return btn;
            }
        }
    });



    var PaidDetail = React.createClass({
        getInitialState: function () {
            return {
                paidList: [],
                isLoading:true
            };
        },
        _webSocket: null,
        componentDidMount: function () {
            this.getPaidDetailFromServer();

            this._webSocket
               = new App.WebSocket("PaidDetail_" + this.props.GroupBuyId,
               function (msg) {
                   msg.id == this.props.GroupBuyId
                   && msg.action == REFRESH_ACTION
                   && this.getPaidDetailFromServer();;
               }.bind(this));

        },
        componentWillUnmount: function () {
            this._webSocket.close();
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
        setPaidMoney: function (employeeId,paid) {
            var data = {
                EmployeeId: employeeId,
                GroupBuyId: this.props.GroupBuyId,
                Paid: paid
            };
            $.ajax({
                url: "/api/GroupBuyPaidDetailApi/",
                type: "POST",
                data:data,
                success: function () {
                    this.getPaidDetailFromServer();
                }.bind(this)
            });
        },
        getStatus: function (detail) {
            var Payable = detail.Payable,
                Paid = detail.Paid;

            if (Paid == 0) {
                return "尚未繳費";
            }
            else if (Paid == Payable) {
                return "已繳費";
            } else if (Paid > Payable) {
                return "已繳費, 未找零" + (Paid - Payable) + "元"
            } else if (Paid < Payable) {
                return "繳費未繳清, 賒" + (Payable - Paid) + "元"
            }
            return "";
        },
        countTotal: function (paidList) {
            var totalPayable = 0,
                totalPaid = 0;

            paidList.forEach(function (emp) {
                totalPayable += emp.Payable;
                totalPaid += emp.Paid
            })

            return {
                payable: totalPayable,
                paid: totalPaid
            }
        },
        render: function () {
            var paidList = this.state.paidList,
                total = this.countTotal(paidList),
                isCreator = this.props.groupBuyInfo.isCreator;
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
                                            {!!isCreator && 
                                                <div>
                                                {
                                                detail.Paid < detail.Payable &&
                                                <Button bsStyle="success"
                                                        onClick={()=>this.setPaidMoney(detail.EmployeeId,detail.Payable)}
                                                        >結清
                                                </Button>
                                                }                                            
                                                {
                                                detail.Paid > detail.Payable &&
                                                <Button bsStyle="warning"
                                                        onClick={()=>this.setPaidMoney(detail.EmployeeId,detail.Payable)}
                                                        >找零
                                                </Button>
                                                }
                                                {
                                                detail.Paid >= detail.Payable &&
                                                <Button bsStyle="danger"
                                                         onClick={()=>this.setPaidMoney(detail.EmployeeId,0)}
                                                        >取消繳費
                                                </Button> 
                                                }
                                                <CasherInput setPaidMoney={this.setPaidMoney}                                                      
                                                             EmployeeId={detail.EmployeeId}
                                                             value={detail.Paid}/>
                                                </div>
                                            }
                                        </td>
                                        <td>{detail.EmployeeName}</td>
                                        <td>{detail.Payable}</td>
                                        <td>{detail.Paid}</td>
                                        <td>{this.getStatus(detail)}</td>
                                        <td>
                                        {detail.SubscriberItems.map(function(item,i){
                                            return(
                                            <span key={i}>{item.ItemName} - {item.SubItemName}({item.Amount}), </span>
                                            );                                            
                                        }.bind(this))}
                                        </td>
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
                           <tr><td colSpan="6" className="text-right"> 總共應收:{total.payable}元, 目前收款金額: {total.paid}元 </td></tr>
                        </tbody>
                    </Table>


                </div>
                );
        }
    });

    return PaidDetail;
})();
