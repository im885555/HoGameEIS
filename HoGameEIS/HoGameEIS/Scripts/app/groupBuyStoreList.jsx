var StoreManagementInit = function(mountNode){
    var Button = ReactBootstrap.Button;
    var ButtonGroup =  ReactBootstrap.ButtonGroup;
    var Table = ReactBootstrap.Table;
    var Pagination =  ReactBootstrap.Pagination;
    var ButtonToolbar = ReactBootstrap.ButtonToolbar;
    var SplitButton = ReactBootstrap.SplitButton;
    var MenuItem = ReactBootstrap.MenuItem;
    var Modal = ReactBootstrap.Modal;
    var OverlayTrigger = ReactBootstrap.OverlayTrigger;
    var Popover = ReactBootstrap.Popover;
    var Tooltip  = ReactBootstrap.Tooltip;



    var CategoryGroup = React.createClass({
        getInitialState: function() {
            return {current:""};
        },
        handleSelect: function(value){
            this.props.onCategoryChange(value);
            this.setState({current:value});
        },
        render: function() {
            var btnData = [
                {name:"全部",value:""},
                {name:"正餐",value:"meal"},
                {name:"飲料",value:"drink"},
                {name:"點心",value:"dessert"},
                {name:"團購",value:"groupbuy"},
                {name:"活動",value:"party"}
            ];
            return (

                    <ButtonGroup>
                        {
                            btnData.map(function (data, i) {
                                var handleSelect = this.handleSelect.bind(this, data.value);
                                return (
                                    <Button key={i}
                                    className = {data.value == this.state.current ? "active" :""}
                                    onClick = {handleSelect}>{data.name}
                                    </Button>
                                );
                            }.bind(this))
                        }
                    </ButtonGroup>

            );
        }
    });

    var ConfirmDelete = React.createClass({
        render:function(){
            return(
                <Modal
                {...this.props}
                 bsSize='small'
                 bsStyle='primary'
                 aria-labelledby='contained-modal-title-sm'
                 animation={false}>
                     <Modal.Header closeButton>
                       <Modal.Title>請確認</Modal.Title>
                     </Modal.Header>

                     <Modal.Body>
                       刪除店家 "{this.props.selectedData.StoreName}"
                     </Modal.Body>

                     <Modal.Footer>
                       <Button onClick={()=>this.props.onHide(true)} bsStyle='primary'>確定</Button>
                       <Button onClick={()=>this.props.onHide(false)} >取消</Button>
                     </Modal.Footer>
                   </Modal>
            );
        }
    });


    var StoreGrid =  React.createClass({
        getInitialState: function() {
            return {
                confirmShow:false,
                selectedData:{}
            };
        },
        confirmDelete:function(item){
            this.setState({confirmShow:true,selectedData:item});
        },
        handleDelete: function(result){
            this.setState({confirmShow:false});
            if(result){
                $.ajax({
                    url: "/api/groupbuystoreapi/" + this.state.selectedData.GroupBuyStoreId,
                    type: "DELETE",
                    success: function(result) {
                        this.props.refresh();
                    }.bind(this)
                });
            }
        },
        render: function() {
            var rows = this.props.data.rows;
            return (
                <div>
                    <ConfirmDelete
                    show={this.state.confirmShow}
                    onHide={this.handleDelete}
                    selectedData={this.state.selectedData}/>
                    <Table  bordered condensed hover>
                        <thead>
                            <tr>
                              <th>店家名稱</th>
                              <th>備註</th>
                              <th>修改</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                rows.map(function(item,i){
                                    return (
                                        <tr key={item.GroupBuyStoreId}>
                                            <td>{item.StoreName}</td>
                                            <td>{item.Memo}</td>
                                            <td>
                                                <Button>菜單資料管理</Button>
                                                <Button onClick={()=>location.href = "StoreManagementEdit/"+ item.GroupBuyStoreId}>
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
        getInitialState: function() {
            return {
                pageSize:5,
                pageNumber:1,
                searchText:"",
                category:"",
                total:0,
                data:{
                    total:0,
                    rows:[]
                }
            };
        },
        componentDidMount: function () {
            this.getStoreListFromServer();
        },
        getStoreListFromServer: function(){
            //http://localhost:50908/api/groupbuystoreapi?search=d&order=asc&limit=10&offset=0&category=meal&_=1437099137914
            //(new Date().getTime()).toString()
            var state = this.state;
            var params = {
                search: state.searchText,
                limit: state.pageSize,
                offset: state.pageSize * state.pageNumber - state.pageSize,
                category:state.category
            };
            params[(new Date().getTime()).toString()]=null;

            $.ajax({
                url: "/api/groupbuystoreapi/",
                data: params,
                type: "GET",
                success: function(data) {
                    this.setState({data:data});
                    //this.props.onFetch(data);
                }.bind(this)
            });
        },
        handleSelectPage(event, selectedEvent) {
            this.setState({
                pageNumber: selectedEvent.eventKey
            },()=>this.getStoreListFromServer());
        },
        handleCategroyChange:function(category){
            this.setState({category:category},
            ()=>this.getStoreListFromServer());
        },
        handleSearchChange:function(){
            this.setState({searchText:React.findDOMNode(this.refs.Search).value},
            ()=>this.getStoreListFromServer());
        },
        handleGridFetch: function(gridData){
            this.setState({total:gridData.total},
            ()=>this.getStoreListFromServer());
            this.getStoreListFromServer();
        },
        handlePageSizeChange: function(size){
            this.setState({pageSize:size},
            ()=>this.getStoreListFromServer());
        },
        showConfirmDelete:function(callback){
            this.setState({showModal:true});
        },
        renderPaging:function () {
            var pagingBtn = "";
            if(this.state.pageSize<this.state.data.total){
                var items = parseInt(this.state.data.total/this.state.pageSize)
                    +  (this.state.data.total/this.state.pageSize == 0 ? 0 : 1 ),
                    maxButtons = items>=5 ? 5 : items;
                pagingBtn = <div className="pull-right">
                    <Pagination
                      prev={true}
                      next={true}
                      first={true}
                      last={true}
                      ellipsis={true}
                      items={items}
                      maxButtons={maxButtons}
                      activePage={this.state.pageNumber}
                      onSelect={this.handleSelectPage} />
                </div>;
            }
            return pagingBtn;
        },
        render: function() {
            var to = this.state.pageSize * this.state.pageNumber,
                from = to - this.state.pageSize + 1;
            return(
                <div className="store-management-content">
                    <div>
                        <Button onClick={()=>location.href = "StoreManagementEdit"}> + 新增 </Button>
                    </div>
                    <div>
                        <div className="form-inline">
                            <CategoryGroup onCategoryChange={this.handleCategroyChange}/>
                            <input type="email" className="form-control pull-right"
                            placeholder="Search" ref="Search" onChange={this.handleSearchChange}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <StoreGrid
                             data= {this.state.data}
                             refresh ={this.getStoreListFromServer}
                             />
                            <div>
                                <div className="pull-left">
                                    Showing {from} to {to} of {this.state.data.total} rows
                                    <ButtonToolbar>
                                     <SplitButton title={this.state.pageSize} dropup>
                                       {
                                           [5,10,25,50,100].map(function(size,i){
                                               return(
                                                   <MenuItem
                                                   key={i}
                                                   onClick={this.handlePageSizeChange.bind(this,size)}>
                                                   {size}
                                                   </MenuItem>
                                               );
                                           }.bind(this))
                                       }
                                     </SplitButton>
                                    </ButtonToolbar>
                                    records per page
                                </div>
                                {this.renderPaging()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
    React.render(<StoreManagement/>,mountNode);
}
