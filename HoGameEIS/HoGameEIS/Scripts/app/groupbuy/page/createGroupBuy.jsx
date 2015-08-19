App.GroupBuy.CreateGroupBuy = (function () {
    var Button = ReactBootstrap.Button;
    var Table = ReactBootstrap.Table;
    var Pagination =  ReactBootstrap.Pagination;

    var Modal = ReactBootstrap.Modal;
    var Input = ReactBootstrap.Input;


    var LoadingIcon = App.Component.Loading;

    var FormWithValidationMixin = App.Mixins.FormWithValidationMixin;
    var GridMixin = App.Mixins.GridMixin;

    var GetCurrentUser = App.Context.GetCurrentUser;

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
        mixins: [GridMixin],
        getDefaultProps: function () {
            return {
                restUri: "/api/groupbuystoreapi/",
                categoryOptions: {
                    "": "全部",
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
            this.getListFromServer();
        },
        render: function() {
            return(
                <div>
                    <div>
                        <div className="form-inline">
                            {this.renderCategoryGroup()}
                            {this.renderSearch()}
                        </div>
                    </div>
                    <div>
                        <div>
                            <StoreGrid
                             {...this.props}
                             data= {this.state.data}
                             />
                            <div style={{'minHeight': '80px'}}>
                                {this.renderPageSizeDDL()}
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
                this.setState({ value: this.refs.el.getDOMNode().value });
            }.bind(this)).data("DateTimePicker")
            .date(new Date(new Date(new Date().setHours(new Date().getHours() + 2)).setMinutes(0)));
        },
        componentWillUnmount: function () {
            $(this.refs.el.getDOMNode()).data("DateTimePicker").destroy();
        },
        render: function () {
            return (
                <div className="form-group">
                        <label>結束時間</label>
                        <input ref="el" type="text" name="EndTime" className="form-control" />
                    </div>     
            )
        }
});

   

    var CreateGroupBuy = React.createClass({
        mixins: [FormWithValidationMixin],
        getInitialState: function () {
            return {
                Description: GetCurrentUser().FullName + " 的團",
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