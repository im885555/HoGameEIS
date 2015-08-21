App.GroupBuy.StoreManagementMenuEdit = (function () {
    var Table = ReactBootstrap.Table;
    var Button = ReactBootstrap.Button;

    var LoadingIcon = App.Component.Loading;
    var FileDragAndDrop = App.Component.FileDragAndDrop;

    var TdEditable = App.GroupBuy.Control.TdEditable;


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
        getStoreMenuFromServer: function (callback) {
            $.ajax({
                url: "/api/GroupBuyStoreMenuApi/" + this.props.storeId,
                type: "GET",
                success: function (data) {
                    this.setState({ menuList: data ,isLoading: false});
                    !!callback && callback();
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
        handleDeleteSubItem: function (subItemId) {
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
                   this.getStoreMenuFromServer();
               }.bind(this)
           });
        },
        handleSubItemPriceEdit: function (subItemId, price, callback) {
            $.ajax({
                url: "/api/GroupBuyStoreMenuSubApi/" + subItemId,
                type: "PUT",
                data: { Action: "Price", Price: price },
                success: function (data) {
                    this.getStoreMenuFromServer();
                }.bind(this)
            });
        },
        handleSubItemNameEdit: function (subItemId, subItemName, callback) {
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
                          </tr>
                        </thead>
                        <tbody>
                            {
                                menuList.map(function(item,i){

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
                                         <td><Button onClick={()=>this.handleDeleteSubItem(sub.SubItemId)}>刪除</Button></td>;
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
                                                  {SubItemNameDom}
                                                  {ItemPriceDom}
                                                  {DeleteSubItemDom}
                                                </tr>
                                            );
                                        }else{
                                            _items.push(
                                                <tr key={i}>
                                                {SubItemNameDom}
                                                {ItemPriceDom}
                                                {DeleteSubItemDom}
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





    var MenuImageUpload = React.createClass({
        isUploading: false,
        getInitialState: function () {
            return {
                dataUriList:[],
                imgList:[]
            };
        },
        componentDidMount: function () {
            this.getMenuImagesFromServer();
        },
        getMenuImagesFromServer: function () {
            $.ajax({
                url: "/api/GroupBuyImageApi/" + this.props.storeId,
                type: "GET",
                success: function (data) {
                    this.setState({
                        imgList: data,
                    });
                }.bind(this)
            });
        },
        handleClick: function () {
            this.refs.inputfiles.getDOMNode().click();
        },
        handleFileInput: function (dataTransfer) {
            var files = dataTransfer.files || dataTransfer.target.files;
            var self=this,_files = [];

            $.each(files, function () {
                if (self.validFileExtensions(this.name)) {
                    _files.push(this);
                }
            });

            this.transferDataUri(_files);
        },
        transferDataUri: function (files) {
            var self = this,
                dataUriList = self.state.dataUriList,
                i =0;
            $.each(files, function () {                
                var file = this;
                if (!self.validFileExtensions(file.name)) {
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (upload) {
                    i++;
                    dataUriList.push({ dataUri: upload.target.result, file: file });                    
                    self.setState({
                        dataUriList: dataUriList,
                    });
                    if (i == files.length && !this.isUploading) {
                        self.uploadFiles();
                    }               
                };
                reader.readAsDataURL(this);
            });
        },
        validFileExtensions: function (fileName) {
            var _fileName = fileName || "",
                _validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png"],
                extension = _fileName.split(".")[fileName.split(".").length - 1].toLowerCase();
            return _validFileExtensions.indexOf(extension) != -1;
        },
        uploadFiles: function () {
            var dataUriList = this.state.dataUriList;
            if (dataUriList == 0) {
                this.isUploading = false;
                return;
            }
            this.isUploading = true;
            var data = new FormData();
            data.append("file", dataUriList[0].file);
            $.ajax({
                url: "/api/GroupBuyImageApi/" + this.props.storeId,
                type: 'POST',
                data: data,
                success: function (data) {
                    dataUriList.splice(0, 1);
                    this.setState({
                        dataUriList:dataUriList,
                        imgList: data,
                    });
                    this.uploadFiles();
                }.bind(this),
                contentType: false,
                processData: false
            });
        },
        handleDeleteImage: function (ImageId) {
            $.ajax({
                url: "/api/GroupBuyImageApi/" + ImageId,
                type: "DELETE",
                success: function () {
                    this.getMenuImagesFromServer();
                }.bind(this)
            });
        },
        render: function() {
            return (
                  <div>
                     
                    <input ref="inputfiles" style={{display:'none'}} type="file" onChange={this.handleFileInput} multiple/>
                      <FileDragAndDrop      
                         {...this.props}
                        className="upload-image-zone"
                        onPaste={this.handleFileInput}
                        onDrop={this.handleFileInput}>
                          可拖曳圖片上傳。
                        <div className="row">
                            {
                                this.state.imgList.map(function(img,i){
                                    var imgUrl= img.ImageUrl;
                                    return(
                                        <div  key={i} className="col-xs-6">
                                          <div className="thumbnail">
                                            <a href={imgUrl} target="_blank"><img src={imgUrl} /></a>
                                            {!!img.ImageId&& <Button onClick={() =>this.handleDeleteImage(img.ImageId)}>刪除</Button>}
                                          </div>
                                        </div>
                                    )
                                }.bind(this))
                            }
                            {
                                this.state.dataUriList.map(function(img,i){
                                    var imgUrl= img.dataUri;
                                    return(
                                            <div key={i} className="col-xs-6">
                                              <div className="thumbnail">
                                                <a href="#"><img src={imgUrl} /></a>
                                                  {!img.ImageId&& <Button><LoadingIcon />上傳中</Button>}
                                              </div>
                                            </div>
                                        )
                                }.bind(this))
                            }
                        </div>                           
                      </FileDragAndDrop>
                      <Button onClick={this.handleClick}>上傳圖片</Button>
                    </div>

            );
        }
    });

    var StoreManagementMenuEdit = React.createClass({
        getDefaultProps: function () {
            return {
                storeId: App.Core.UrlParams.id
            };
        },
        render: function () {
            return (
            <div className="row">
                <div className="col-sm-4">
                    <MenuImageUpload {...this.props}/>
                </div>
                <div className="col-sm-8">
                    <StoreInfo {...this.props}/>
                    <MenuList {...this.props}/>
                </div>
            </div>
            );
        }
    });


    return StoreManagementMenuEdit;
})();
