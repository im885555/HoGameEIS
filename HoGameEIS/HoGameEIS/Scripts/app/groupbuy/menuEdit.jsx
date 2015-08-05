App.StoreManagementMenuInit = function (mountNode) {
    var Table = ReactBootstrap.Table;
    var Button = ReactBootstrap.Button;


    var getRouterId = function () {
        var params = location.pathname.split("/");
        return params[params.length - 1];
    };
    var storeId = getRouterId();

    var StoreInfo = React.createClass({
        getInitialState: function () {
            return {
                storeInfo: {
                    StoreName: "",
                    Category:""
                }
            };
        },
        componentDidMount: function () {
            $.ajax({
                url: "/api/groupbuystoreapi/" + this.props.storeId,
                type: "GET",
                success: function (data) {
                    this.setState({ storeInfo: data });
                }.bind(this)
            });
        },
        render: function () {
            var storeInfo = this.state.storeInfo,
               category = {
                   "": "",
                   meal: "正餐",
                   drink: "飲料",
                   dessert: "點心",
                   groupbuy: "團購",
                   party: "活動"
               };

            return (
                <h3>{storeInfo.StoreName} - {category[storeInfo.Category]}</h3>
            );
        }
    });

    var TdEditable = React.createClass({
        changeTimeout:null,
        handleEdit: function () {
            setTimeout(function () {
                var str = $(this.refs.editDom.getDOMNode()).text();
                if (!!this.props.number) {
                    str = $.trim(str);
                    str = !str ? "0" : str;
                    str = str.replace(/[^0-9]/g, "");
                    str = parseInt(str);
                }
                !!this.changeTimeout && clearTimeout(this.changeTimeout);
                this.changeTimeout = setTimeout(function () {
                    !!this.props.handleChange &&
                    this.props.handleChange(this.props.uid, str);
                }.bind(this), 0);

                $(this.refs.editDom.getDOMNode()).text(str);
            }.bind(this), 0);
        },
        render: function () {
            var isIE = function () {
                return navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0
            };
            if (isIE()) {
                return this.ieTemplate();
            } else {
                return this.template();
            }
        },
        ieTemplate: function () {
            return(
                <td  {...this.props}>
                   <div ref="editDom"
                    onBlur={this.handleEdit}
                    onDrop={this.handleEdit}   
                    contentEditable
                    dangerouslySetInnerHTML={{__html: this.props.html}}>
                   </div>
                </td>
                )
        },
        template: function () {
            return(
               <td ref="editDom"
                {...this.props}
                onFocus={this.handleFocus}
                onBlur={this.handleEdit}
                onDrop={this.handleEdit}     
                contentEditable
                dangerouslySetInnerHTML={{__html: this.props.html}}>
                </td>
                )
        }
    });

    var MenuList = React.createClass({
        getInitialState: function () {
            return {
                menuList:[]
            };
        },
        componentDidMount: function () {
            this.getStoreMenuFromServer();
        },
        getStoreMenuFromServer: function () {
            $.ajax({
                url: "/api/GroupBuyStoreMenuApi/" + this.props.storeId,
                type: "GET",
                success: function (data) {
                    this.setState({ menuList: data });
                }.bind(this)
            });
        },
        handleNewItem: function () {
            $.ajax({
                url: "/api/GroupBuyStoreMenuApi",
                type: "POST",
                data: { StoreId: this.props.storeId },
                success: function (data) {
                    this.getStoreMenuFromServer();
                }.bind(this)
            });
        },
        handleNewSubItem: function (itemId) {
            $.ajax({
                url: "/api/GroupBuyStoreMenuSubApi",
                type: "POST",
                data: {ItemId: itemId},
                success: function (data) {
                    this.getStoreMenuFromServer();
                }.bind(this)
            });
        },
        handleDeleteItem: function (itemId) {
            $.ajax({
                url: "/api/GroupBuyStoreMenuApi/" + itemId,
                type: "DELETE",
                success: function (data) {
                    this.getStoreMenuFromServer();
                }.bind(this)
            });
        },
        handleDeleteSubItem:function(subItemId){
            $.ajax({
                url: "/api/GroupBuyStoreMenuSubApi/" + subItemId,
                type: "DELETE",
                success: function (data) {
                    this.getStoreMenuFromServer();
                }.bind(this)
            });
        },
        handleItemNameEdit: function (itemId, itemName) {
           $.ajax({
               url: "/api/GroupBuyStoreMenuApi/" + itemId,
               type: "PUT",
               data:{ ItemName: itemName},
               success: function (data) {
                   this.getStoreMenuFromServer();
               }.bind(this)
           });
        },
        handleSubItemPriceEdit: function (subItemId, price) {
            $.ajax({
                url: "/api/GroupBuyStoreMenuSubApi/" + subItemId,
                type: "PUT",
                data: { Action: "Price", Price: price },
                success: function (data) {
                    this.getStoreMenuFromServer();
                }.bind(this)
            });
        },
        handleSubItemNameEdit: function (subItemId, subItemName) {
            $.ajax({
                url: "/api/GroupBuyStoreMenuSubApi/" + subItemId,
                type: "PUT",
                data: { Action: "SubItemName", SubItemName: subItemName },
                success: function (data) {
                    this.getStoreMenuFromServer();
                }.bind(this)
            });
        },
        render: function () {
            var menuList = this.state.menuList;
            return (
                      <Table bordered condensed>
                        <thead>
                          <tr>
                            <th colSpan="5">
                                <div className="text-danger">
                                    點擊名稱、價錢、備註可直接修改內容
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
                          </tr>
                        </thead>
                        <tbody>
                            {
                                menuList.map(function(item,i){
                                    var _items =[];
                                    item.SubItems.map(function(sub,i){
                                        var subItemElement =[
                                            <TdEditable
                                              uid={sub.SubItemId}                                                           
                                              html={sub.SubItemName||""} 
                                              handleChange={this.handleSubItemNameEdit}>
                                            </TdEditable>,
                                            <TdEditable
                                              uid={sub.SubItemId}    
                                              number={true}
                                              html={sub.Price}
                                              handleChange={this.handleSubItemPriceEdit}>
                                            </TdEditable>,
                                            <td><Button onClick={()=>this.handleDeleteSubItem(sub.SubItemId)}>刪除</Button></td>
                                        ];
                                        if(i==0){
                                            _items.push(
                                                <tr key={sub.SubItemId}>
                                                  <td rowSpan={item.SubItems.length}>
                                                      <Button onClick={()=>this.handleDeleteItem(item.ItemId)}>刪除</Button>
                                                      <Button onClick={()=>this.handleNewSubItem(item.ItemId)}>新增子項</Button>
                                                  </td>
                                                  <TdEditable
                                                    rowSpan={item.SubItems.length}
                                                    html={item.ItemName||""}
                                                    handleChange={this.handleItemNameEdit}
                                                    uid={item.ItemId}>
                                                  </TdEditable>
                                                  {subItemElement}
                                                </tr>
                                            );
                                        }else{
                                            _items.push(
                                                <tr key={sub.SubItemId}>
                                                  {subItemElement}
                                                </tr>
                                            );
                                        }
                                    }.bind(this));
                                    return _items;
                                }.bind(this))
                            }
                        </tbody>
                      </Table>

           );
        }
    });

    var StoreManagementMenuEdit = React.createClass({

        render: function () {
            return (
            <div className="row">
                <div className="col-sm-4">
                    <div className="upload-image-zone">
                        Drop images here or click to upload.
                    </div>
                </div>
                <div className="col-sm-8">
                    <StoreInfo {...this.props}/>
                    <MenuList {...this.props}/>
                </div>
            </div>
            );
        }
    });


    React.render(<StoreManagementMenuEdit storeId={storeId} />, mountNode);

};


/*

            function placeCaretAtEnd(el) {
                el.focus();
                if (typeof window.getSelection != "undefined"
                        && typeof document.createRange != "undefined") {
                    var range = document.createRange();
                    range.selectNodeContents(el);
                    range.collapse(false);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (typeof document.body.createTextRange != "undefined") {
                    var textRange = document.body.createTextRange();
                    textRange.moveToElementText(el);
                    textRange.collapse(false);
                    textRange.select();
                }
            }
*/