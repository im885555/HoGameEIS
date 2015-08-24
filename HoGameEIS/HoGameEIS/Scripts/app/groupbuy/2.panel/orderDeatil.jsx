App.GroupBuy.Panel.OrderDetail = (function () {
    var Table = ReactBootstrap.Table;
    var Button = ReactBootstrap.Button;

    var LoadingIcon = App.Component.Loading;



    var OrderList = React.createClass({
        getInitialState: function () {
            return {
                orderList: [],
                isLoading:true
            };
        },
        componentDidMount: function () {
            this.getOrderFromServer();
        },
        getOrderFromServer: function (callback) {
            $.ajax({
                url: "/api/GroupBuyOrderApi/" + this.props.GroupBuyId,
                type: "GET",
                success: function (data) {
                    this.setState({ orderList: data ,isLoading: false});
                    !!callback && callback();
                }.bind(this)
            });
        },
        getCountOrder: function (orderList) {
            var sumTotal = 0,
                sumMoney = 0;

            orderList.forEach(function (item) {
                item.SubItems.forEach(function (sub) {
                    sub.GroupBuySubscribers.forEach(function (Subscriber) {
                        sumTotal += Subscriber.Amount;
                        sumMoney += Subscriber.Amount * sub.Price;
                    });
                });
            });
            return {
                sumTotal: sumTotal, sumMoney: sumMoney
            };
        },
        getCountSubItem: function (subscribers) {
            var n = 0;
            subscribers.forEach(function (s) {
                n += s.Amount;
            });
            return n;
        },
        render: function () {
            var orderList = this.state.orderList,
                countOrder = this.getCountOrder(orderList);
            return (
                      <Table bordered condensed>
                        <thead>
                          <tr>
                            <th>名稱</th>
                            <th>子項</th>
                            <th>價錢</th>
                            <th>數量</th>
                            <th>明細</th>
                          </tr>
                        </thead>
                        <tbody>
                            {
                                orderList.map(function(item,i){

                                   var _items =[];
                                    item.SubItems.map(function(sub,i){
                                     var SubItemNameDom =
                                         <td>
                                            {sub.SubItemName||""}
                                         </td>,
                                         ItemPriceDom=
                                         <td>
                                            {sub.Price}
                                         </td>,
                                         DeleteSubItemDom =
                                         <td>
                                             {this.getCountSubItem(sub.GroupBuySubscribers)}
                                         </td>,
                                         OrderDetail=
                                         <td>
                                             {
                                             sub.GroupBuySubscribers.map(function(subscriber,i){
                                                return (<span key={i}>{subscriber.SubscriberName}({subscriber.Amount}) </span>);
                                             })
                                             }
                                         </td>
                                        ; 
                                        if(i==0){
                                            _items.push(
                                                <tr key={i}>
                                                  <td
                                                    rowSpan={item.SubItems.length}
                                                    html={item.ItemName||""}
                                                    handleChange={this.handleItemNameEdit}
                                                    uid={item.ItemId}>{item.ItemName||""}
                                                  </td>
                                                  {SubItemNameDom}
                                                  {ItemPriceDom}
                                                  {DeleteSubItemDom}
                                                  {OrderDetail}    
                                                </tr>
                                            );
                                        }else{
                                            _items.push(
                                                <tr key={i}>
                                                {SubItemNameDom}
                                                {ItemPriceDom}
                                                {DeleteSubItemDom}
                                                {OrderDetail}    
                                                </tr>
                                            );
                                        }
                                    }.bind(this));
                                    return _items;
                                }.bind(this))
                            }
                          {
                           <tr>
                            <td colSpan="6" className="text-right">
                                <span>總個數:{countOrder.sumTotal}  總金額:{countOrder.sumMoney}元</span>
                            </td>
                           </tr>
                          }
                          {!!this.state.isLoading &&
                            <tr>
                            <td colSpan="6" className="text-center">
                                <LoadingIcon />
                            </td>
                            </tr>
                          }
                        </tbody>
                      </Table>

           );
        }
    });


    return OrderList;
})();
