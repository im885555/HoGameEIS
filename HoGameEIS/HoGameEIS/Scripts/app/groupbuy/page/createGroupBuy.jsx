App.GroupBuy.CreateGroupBuy = (function () {
    var Button = ReactBootstrap.Button;
    var ButtonGroup =  ReactBootstrap.ButtonGroup;
    var Table = ReactBootstrap.Table;
    var Pagination =  ReactBootstrap.Pagination;
    var ButtonToolbar = ReactBootstrap.ButtonToolbar;
    var SplitButton = ReactBootstrap.SplitButton;
    var MenuItem = ReactBootstrap.MenuItem;
    var Modal = ReactBootstrap.Modal;
    var Input = ReactBootstrap.Input;

    var CategoryGroup = App.GroupBuy.Control.CategoryGroup;
    var LoadingIcon = App.Component.Loading;

    var FormWithValidationMixin = App.Mixins.FormWithValidationMixin;
    var GridMixin = App.Mixins.GridMixin;


    var StoreGrid =  React.createClass({
        render: function() {
            var rows = this.props.data.rows;
            return (               
                <Table  bordered condensed hover>
                    <thead>
                        <tr>
                            <th>店家名稱</th>
                            <th>電話</th>
                            <th>備註</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            !rows && <tr><td colSpan="4" className="text-center"><LoadingIcon /></td></tr>
                        }
                        {
                            !!rows && rows.map(function(item,i){
                                return (
                                    <tr key={item.StoreId} onClick={()=>this.props.onHide(item)}>
                                        <td>{item.StoreName}</td>
                                        <td>{item.Tel}</td>
                                        <td>{item.Memo}</td>
                                    </tr>
                                );
                            }.bind(this))
                        }
                    </tbody>
                </Table>

            );
        }
    });


    var StoreManagement = React.createClass({
        getDefaultProps: function () {
            return {
                restUri: "/api/groupbuylistapi/",
                categoryOptions: {
                    "": "",
                    meal: "正餐",
                    drink: "飲料",
                    dessert: "點心",
                    groupbuy: "團購",
                    party: "活動"
                }
            }
        },
        getInitialState: function() {
            return {                
                pageSize:10,
                pageNumber:1,
                searchText:"",
                category:"",
                total:0,
                data:{
                    total:0,
                    rows:null
                }
            };
        },
        componentDidMount: function () {
            this.getStoreListFromServer();
        },
        getStoreListFromServer: function(){
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
        handlePageSizeChange: function(size){
            this.setState({pageSize:size},
            ()=>this.getStoreListFromServer());
        },
        renderPaging:function () {
            var pagingBtn = "";
            if(this.state.pageSize<this.state.data.total){
                var items = parseInt(this.state.data.total/this.state.pageSize)
                    + (this.state.data.total % this.state.pageSize == 0 ? 0 : 1),
                    maxButtons = items>=5 ? 5 : items;
                pagingBtn =
                <div className="pull-right">
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
                <div>
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
                             {...this.props}
                             data= {this.state.data}
                             refresh ={this.getStoreListFromServer}
                             />
                            <div style={{'minHeight': '80px'}}>
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


    var ChooseWindow = React.createClass({
        render:function(){
            return(
                <Modal
                 {...this.props}
                 bsSize='large'
                 bsStyle='primary'
                 aria-labelledby='contained-modal-title-lg'
                 animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>請選擇店家</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StoreManagement {...this.props}/>
                    </Modal.Body>               
                </Modal>
            );
        }
    });

    var ChooseStore = React.createClass({
        getInitialState: function () {
            return {
                showChooseWindow: false,
                selected: { StoreName:""}
            };
        },
        handleHide: function (store) {
            this.setState({ showChooseWindow: false });
            !!store && !!store.hasOwnProperty("StoreId") &&
            this.setState({ selected: store }, this.props.onChange);
        },
        render: function () {
            var selected = this.state.selected;
            var btn =  <Button bsStyle='primary' 
                              onClick={()=>this.setState({showChooseWindow:true})}>
                            選擇店家
                            <ChooseWindow 
                            show={this.state.showChooseWindow}
                            onHide={this.handleHide}/>
                       </Button>
            return (
                <div>
                    <Input type='text' 
                           buttonBefore={btn}
                           style={{cursor: "pointer"}} 
                           label="店家" 
                           value={selected.StoreName} 
                           onClick={()=>this.setState({showChooseWindow:true})}
                           bsStyle= {this.props.bsStyle}
                           help= {this.props.help}
                           onChange={()=>{}}
                           >
                       
                    </Input>     
                    {!!selected && <input type="hidden" name="StoreId" value={selected.StoreId} />}
                </div>
            )
        }
    });

    var ChooseEndTime = React.createClass({
        getInitialState: function () {
            return { value:""}
        },
        componentDidMount: function () {
            var dom = this.refs.el.getDOMNode();
            $(dom).datetimepicker({
                minDate: new Date()
            }).on("dp.change", function (e) {
                if (!e.date) {
                    $(dom).data("DateTimePicker").date(e.oldDate);
                }
                this.setState({ value: this.refs.EndTime.getDOMNode().value });
            }.bind(this))
                .data("DateTimePicker")
                .date(new Date(new Date().setHours(new Date().getHours() + 2)));

        },
        componentWillUnmount: function () {
            $(this.refs.el.getDOMNode()).data("DateTimePicker").destroy();
        },
        render: function () {
            return (
                <div className="form-group">
                        <label>結束時間</label>
                        <div ref="el" className='input-group date'>
                            <input type='text'  ref="EndTime" name="EndTime" className="form-control"/>
                            <span className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>     
            )
        }
});

   

    var CreateGroupBuy = React.createClass({
        mixins: [FormWithValidationMixin],
        getInitialState: function () {
            return {
                Description: "",
                StoreId:""
            };
        },
        getInputValue: function () {
            return {
                Description: this.refs.Description.getValue(),
                StoreId: this.refs.Store.state.selected.StoreId
            };
        },       
        render: function () {
            return(
                <div className="col-sm-12 col-md-10 col-lg-8">
                <form className="form-horizontal create-groupbuy-form" ref="form" role="form" method="post" onSubmit={this.handleSumbit}>
                    <Input  name="Description"
                            ref="Description"
                            type="text"
                            label="描述"
                            placeholder="請輸入描述"
                            {...this.validationPorps("Description","描述不可為空",(o)=>!o)}
                            onChange={this.handleChange}
                            value={this.state.Description} />
                    <ChooseStore ref="Store" 
                                 onChange={this.handleChange} 
                                 {...this.validationPorps("StoreId","店家不可為空",(o)=>!o)}/>
                    <ChooseEndTime />

                    <div className="form-group">
                            <button type="submit" className="btn btn-default" {...this.submitBtnProps()}>新增</button>
                    </div>
                </form>
            </div>
                );
            }
    });

    return CreateGroupBuy;
})();