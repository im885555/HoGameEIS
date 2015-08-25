App.GroupBuy.StoreManagement = (function () {
    var Button = ReactBootstrap.Button;
    var Table = ReactBootstrap.Table;
    var Modal = ReactBootstrap.Modal;
    var LoadingIcon = App.Component.Loading;

    var GridMixin = App.Mixins.GridMixin;

    var CategoryOptions = {
        "": "全部",
        meal: "正餐",
        drink: "飲料",
        dessert: "點心",
        groupbuy: "團購",
        party: "活動"
    };

    var StoreGrid = React.createClass({
        getInitialState: function () {
            return {
                confrimDeleteData:null
            };
        },
        confirmDelete: function (item) {
            this.setState({ confrimDeleteData: item });
        },
        handleDelete: function (result) {
            
            if (result) {
                $.ajax({
                    url: "/api/groupbuystoreapi/" + this.state.confrimDeleteData.StoreId,
                    type: "DELETE",
                    success: function (result) {
                        this.props.refresh();
                    }.bind(this)
                });
            }

            this.setState({ confrimDeleteData: null });
        },
        renderConfrimDelete: function () {
            if (!!this.state.confrimDeleteData) {
                var data = this.state.confrimDeleteData;
                return <Modal
                    onHide={()=>this.handleDelete(false)}
                    bsSize='small'
                    bsStyle='primary'
                    aria-labelledby='contained-modal-title-sm'
                    animation={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>請確認</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      刪除店家 "{data.StoreName}"
                    </Modal.Body>

                    <Modal.Footer>
                      <Button onClick={()=>this.handleDelete(true)} bsStyle='primary'>確定</Button>
                      <Button onClick={()=>this.handleDelete(false)} >取消</Button>
                    </Modal.Footer>
                  </Modal>
            }
        },
        render: function () {
            var rows = this.props.data.rows;
            return (
                <div>
                    {this.renderConfrimDelete()}                
                    <Table  bordered condensed hover>
                        <thead>
                            <tr>
                              <th>店家名稱</th>
                              <th>分類</th>
                              <th>備註</th>
                              <th>修改</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                !rows && <tr><td colSpan="5"  className="text-center"><LoadingIcon/></td></tr>
                            }
                            {                                                            
                                !!rows && rows.map(function(item,i){
                                    return (
                                        <tr key={item.StoreId}>
                                            <td>{item.StoreName}</td>
                                            <td>{CategoryOptions[item.Category]}</td>
                                            <td>{item.Memo}</td>                                            
                                            <td>
                                                <Button onClick={()=>location.href = "StoreManagementMenuEdit/"+ item.StoreId}>菜單資料管理</Button>
                                                <Button onClick={()=>location.href = "StoreManagementEdit/"+ item.StoreId}>
                                                    修改店家資料
                                                </Button>
                                                <Button onClick={()=>this.confirmDelete(item)}>
                                                    刪除
                                                </Button>
                                            </td>
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


    var StoreManagement = React.createClass({
        mixins: [GridMixin],
        getDefaultProps: function () {
            return {
                restUri: "/api/groupbuystoreapi/",
                categoryOptions: CategoryOptions
            }
        },
        getInitialState: function () {
            return {
                pageSize: 10,
                pageNumber: 1,
                searchText: "",
                category: "",
                total: 0,
                data: {
                    total: 0,
                    rows: null
                }
            };
        },
        componentDidMount: function () {
            this.getListFromServer();
        },
        render: function () {
            return (
                <div className="store-management-content">
                    <div>
                        <Button onClick={()=>location.href = "StoreManagementEdit"}> + 新增 </Button>
                    </div>
                    <div>
                        <div className="form-inline">
                            {this.renderCategoryGroup()}
                            {this.renderSearch()}
                        </div>
                    </div>
                    <div>
                        <div>
                            <StoreGrid
                             data= {this.state.data}
                             refresh ={this.getListFromServer}
                             />
                            <div>
                                {this.renderPageSizeDDL()}
                                {this.renderPaging()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
    return StoreManagement;
})();
