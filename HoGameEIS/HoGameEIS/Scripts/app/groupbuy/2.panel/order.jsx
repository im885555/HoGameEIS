App.GroupBuy.Panel.Order = (function () {
    var Table = ReactBootstrap.Table;
    var Button = ReactBootstrap.Button;

    var LoadingIcon = App.Component.Loading;
    var FileDragAndDrop = App.Component.FileDragAndDrop;

    var TdEditable = App.GroupBuy.Control.TdEditable;

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
        handleNewItem: function () {
            $.ajax({
                url: "/api/GroupBuyOrderApi",
                type: "POST",
                data: { GroupBuyId: this.props.GroupBuyId },
                success: function (data) {
                    this.getOrderFromServer();
                }.bind(this)
            });
        },
        handleNewSubItem: function (itemId) {
            $.ajax({
                url: "/api/GroupBuyOrderSubApi",
                type: "POST",
                data: {ItemId: itemId},
                success: function (data) {
                    this.getOrderFromServer();
                }.bind(this)
            });
        },
        handleItemNameEdit: function (itemId, itemName,callback) {
           $.ajax({
               url: "/api/GroupBuyOrderApi/" + itemId,
               type: "PUT",
               data:{ ItemName: itemName},
               success: function (data) {
                   this.getOrderFromServer();
               }.bind(this)
           });
        },
        handleSubItemPriceEdit: function (subItemId, price, callback) {
            $.ajax({
                url: "/api/GroupBuyOrderSubApi/" + subItemId,
                type: "PUT",
                data: { Action: "Price", Price: price },
                success: function (data) {
                    this.getOrderFromServer();
                }.bind(this)
            });
        },
        handleSubItemNameEdit: function (subItemId, subItemName, callback) {
            $.ajax({
                url: "/api/GroupBuyOrderSubApi/" + subItemId,
                type: "PUT",
                data: { Action: "SubItemName", SubItemName: subItemName },
                success: function (data) {
                    this.getOrderFromServer();
                }.bind(this)
            });
        },
        handleAddSubscriber: function (subItemId) {
            $.ajax({
                url: "/api/GroupBuySubscriberApi",
                type: "POST",
                data: { SubItemId: subItemId },
                success: function (data) {
                    this.getOrderFromServer();
                }.bind(this)
            });
        },
        handleCancelSubscriber: function (subItemId) {
            $.ajax({
                url: "/api/GroupBuySubscriberApi/" + subItemId,
                type: "DELETE",
                success: function (data) {
                    this.getOrderFromServer();
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
        render: function () {
            var orderList = this.state.orderList,
                countOrder = this.getCountOrder(orderList);
            return (
                      <Table bordered condensed>
                        <thead>
                          <tr>
                            <th colSpan="6">
                                <div className="text-danger">
                                    點擊名稱、價錢可直接修改內容
                                    <Button className="pull-right" onClick={()=>this.handleNewItem()}>新增項目</Button>
                                </div>
                            </th>
                          </tr>
                          <tr>
                            <th>功能</th>
                            <th>名稱</th>
                            <th>子項</th>
                            <th>價錢</th>
                            <th>功能</th>
                            <th>明細</th>
                          </tr>
                        </thead>
                        <tbody>
                            {
                                orderList.map(function(item,i){

                                   var _items =[];
                                    item.SubItems.map(function(sub,i){
                                     var SubItemNameDom = <TdEditable
                                           uid={sub.SubItemId}
                                           html={sub.SubItemName||""}
                                           handleChange={this.handleSubItemNameEdit}>
                                         </TdEditable>,
                                         ItemPriceDom=<TdEditable
                                           uid={sub.SubItemId}
                                           number={true}
                                           html={sub.Price}
                                           handleChange={this.handleSubItemPriceEdit}>
                                         </TdEditable>,
                                         DeleteSubItemDom =
                                         <td>
                                             <Button bsStyle="success" onClick={()=>this.handleAddSubscriber(sub.SubItemId)}>
                                             <span className="glyphicon glyphicon-plus"></span>
                                             </Button>
                                             <Button bsStyle="danger" onClick={()=>this.handleCancelSubscriber(sub.SubItemId)}>
                                             <span className="glyphicon glyphicon-minus"></span>
                                             </Button>   
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
                                                  <td rowSpan={item.SubItems.length}>
                                                      <Button onClick={()=>this.handleNewSubItem(item.ItemId)}>新增子項</Button>
                                                  </td>
                                                  <TdEditable
                                                    rowSpan={item.SubItems.length}
                                                    html={item.ItemName||""}
                                                    handleChange={this.handleItemNameEdit}
                                                    uid={item.ItemId}>
                                                  </TdEditable>
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
                                <span>總個數:{countOrder.sumTotal}  總金額:{countOrder.sumMoney}</span>
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
