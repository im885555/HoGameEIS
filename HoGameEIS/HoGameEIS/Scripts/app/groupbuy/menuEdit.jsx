App.StoreManagementMenuInit = function (mountNode) {
    var Table = ReactBootstrap.Table;
    var Button = ReactBootstrap.Button;
    var LoadingIcon = App.Component.Loading;

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
        changeTimeout: null,
        oldValue: null,
        getInitialState: function () {
            return {
                isLoading: false
            };
        },
        strParser: function (_str) {
            var str = $("<p>" + _str + "</p>").text();
            if (!!this.props.number) {
                str = $.trim(str);
                str = !str ? "0" : str;
                str = str.replace(/[^0-9]/g, "");
                str = parseInt(str);
            }
            str = $.trim(str);
            return str;
        },
        handleEdit: function () {
            setTimeout(function () {
                str = this.strParser(this.refs.editDom.getDOMNode().innerHTML);
                this.refs.editDom.getDOMNode().innerHTML = str;
                !!this.changeTimeout && clearTimeout(this.changeTimeout);
                this.changeTimeout = setTimeout(function () {
                    if (str == this.oldValue) return;
                    this.oldValue = str;
                    this.setState({ isLoading:true});
                    !!this.props.handleChange &&
                    this.props.handleChange(this.props.uid, str, function () {
                        this.setState({ isLoading: false });
                    }.bind(this));
                }.bind(this), 0);
            }.bind(this), 0);
        },
        handleKeyPress: function (e) {
            if (e.which == 13) {
                event.preventDefault();
                this.handleEdit();
            }
        },
        handleFocus: function () {
            var str = this.oldValue = this.strParser(this.props.html);
            !!this.props.number && parseInt(str, 10) == 0 &&
             setTimeout(()=>document.execCommand("selectAll"), 0);
        },
        render: function () {
            var isIE = function () {
                return navigator.userAgent.indexOf('MSIE') !== -1
                    || navigator.appVersion.indexOf('Trident/') > 0
            },
            attribute = {
                onBlur: this.handleEdit,
                onDrop: this.handleEdit,
                onKeyPress: this.handleKeyPress,
                onFocus: this.handleFocus,
                contentEditable: true,
                dangerouslySetInnerHTML: { __html: this.props.html }
            };
            if(this.state.isLoading){
                return(
                    <td  {...this.props}><LoadingIcon /></td>
                )
            }
            if (isIE()) {
                return(
                    <td  {...this.props}>
                       <div ref="editDom" {...attribute}>
                       </div>
                    </td>
                )
            } else {
                return (
                    <td ref="editDom"
                    {...this.props} {...attribute}>
                    </td>
                )
            }
        }
    });

    var MenuItem = React.createClass({
        render: function () {
            var item
            return (<div></div>);
        }
    });

    var MenuList = React.createClass({
        getInitialState: function () {
            return {
                menuList: [],
                isLoading:true
            };
        },
        componentDidMount: function () {
            this.getStoreMenuFromServer();
        },
        showLoading: function () {
            this.setState({ isLoading: true });
        },
        hideLoading: function () {
            this.setState({ isLoading: false });
        },
        getStoreMenuFromServer: function (callback) {
            $.ajax({
                url: "/api/GroupBuyStoreMenuApi/" + this.props.storeId,
                type: "GET",
                success: function (data) {
                    this.setState({ menuList: data });
                    this.hideLoading();
                    !!callback && callback();
                }.bind(this)
            });
        },
        handleNewItem: function () {
            this.showLoading();
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
            this.showLoading();
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
            this.showLoading();
            $.ajax({
                url: "/api/GroupBuyStoreMenuApi/" + itemId,
                type: "DELETE",
                success: function (data) {
                    this.getStoreMenuFromServer();
                }.bind(this)
            });
        },
        handleDeleteSubItem: function (subItemId) {
            this.showLoading();
            $.ajax({
                url: "/api/GroupBuyStoreMenuSubApi/" + subItemId,
                type: "DELETE",
                success: function (data) {
                    this.getStoreMenuFromServer();
                }.bind(this)
            });
        },
        handleItemNameEdit: function (itemId, itemName,callback) {
           $.ajax({
               url: "/api/GroupBuyStoreMenuApi/" + itemId,
               type: "PUT",
               data:{ ItemName: itemName},
               success: function (data) {
                   this.getStoreMenuFromServer(callback);
               }.bind(this)
           });
        },
        handleSubItemPriceEdit: function (subItemId, price, callback) {
            $.ajax({
                url: "/api/GroupBuyStoreMenuSubApi/" + subItemId,
                type: "PUT",
                data: { Action: "Price", Price: price },
                success: function (data) {
                    this.getStoreMenuFromServer(callback);
                }.bind(this)
            });
        },
        handleSubItemNameEdit: function (subItemId, subItemName, callback) {
            $.ajax({
                url: "/api/GroupBuyStoreMenuSubApi/" + subItemId,
                type: "PUT",
                data: { Action: "SubItemName", SubItemName: subItemName },
                success: function (data) {
                    this.getStoreMenuFromServer(callback);
                }.bind(this)
            });
        },
        render: function () {
            var menuList = this.state.menuList;
            /*var list = [];
            menuList.map(function (item, i) {
                item.SubItems.map(function (sub, i) {
                    var _sub = $.extend({}, sub, item);
                    _sub.subLength=_sub.SubItems.length;
                    delete _sub.SubItems;
                    list.push(_sub);
                });
            });*/
            console.log(menuList);
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
                                                <tr key={i}>
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
                                                <tr key={i}>
                                                  {subItemElement}
                                                </tr>
                                            );
                                        }
                                    }.bind(this));
                                    return _items;
                                }.bind(this))
                            }
                          {!!this.state.isLoading &&
                            <tr>
                            <td colSpan="5" className="text-center">
                                <LoadingIcon />
                            </td>
                            </tr>
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
