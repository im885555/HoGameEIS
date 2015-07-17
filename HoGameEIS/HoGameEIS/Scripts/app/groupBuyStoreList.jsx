



var GroupBuyStoreListInit = function (element) {
    var StoreListInit = function(mountNode){
        const navInstance = (
            <div>
                <div className="row">
                    <button type="button" className="btn btn-default" onClick={this.handleAdd}> + 新增</button>
                </div>
                <div className="row">
                    <div className="form-inline">
                        <CategoryGroup onCategoryChange={this.handleCategroyChange}/>
                        <input type="email" className="form-control pull-right"
                        placeholder="Search" ref="Search" onChange={this.handleSearchChange}/>
                    </div>
                </div>
                <div className="row">
                    <table ref="Grid"></table>
                </div>
            </div>
        );
        React.render(navInstance,mountNode);
    }


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
                <div className="btn-group" role="group">
                    {
                        btnData.map(function (data, i) {
                            var btnClass ="btn btn-default",
                                handleSelect = this.handleSelect.bind(this, data.value);
                            data.value == this.state.current && (btnClass +="active");
                            return (
                                <button key={i} type="button" className={btnClass}
                                onClick={handleSelect} >{data.name}</button>
                            );
                        }.bind(this))
                    }
                </div>
            );
        }
    });

    var GroupBuyStoreList = React.createClass({
        $table:null,
        onSearch:false,
        _category:"",
        componentDidMount: function() {
            this.initWenzhixinGrid();
        },
        initWenzhixinGrid:function () {
            var self= this;
            var operateFormatter = function (value, row, index) {
                return "<button id='menuEdit' type='button' class='btn btn-default'>菜單資料管理</button>" +
                    "<button  id='storeEdit' type='button' class='btn btn-default'>修改店家資料</button>" +
                    "<button id='storeDelete' type='button' class='btn btn-default'>刪除</button>";
            },
            operateEvents = {
                'click #menuEdit': function (e, value, row, index) {
                    alert('You click menuEdit icon, row: ' + JSON.stringify(row));
                    console.log(value, row, index);
                },
                'click #storeEdit': function (e, value, row, index) {
                    alert('You click storeEdit icon, row: ' + JSON.stringify(row));
                    console.log(value, row, index);
                },
                'click #storeDelete': function (e, value, row, index) {
                    $.ajax({
                        url: "/api/groupbuystoreapi/" + row.GroupBuyStoreId,
                        type: "DELETE",
                        success: function(result) {
                            self.WenzhixinGridRefresh();
                        }
                    });
                }
            };
            this.$table = $(React.findDOMNode(this.refs.Grid)).bootstrapTable({
                //queryParams: function (params) { params.category = ""; return params; },
                url: "/api/groupbuystoreapi",
                cache: false,
                height: 608,
                pagination: true,
                pageList: [10, 25, 50, 100, 200],
                sidePagination: "server",
                columns: [{
                    field: 'StoreName',
                    title: '店家名稱'
                }, {
                    field: 'Memo',
                    title: '備註'
                }, {
                    field: 'operate',
                    title: '修改',
                    formatter: operateFormatter,
                    events: operateEvents
                }]
            });
        },
        WenzhixinGridRefresh: function(params) {
            this.$table.bootstrapTable("refresh", {query:  {category:this._category }});
        },
        handleCategroyChange: function(category){
            this._category = category;
            this.WenzhixinGridRefresh();
        },
        handleSearchChange: function () {
            if (!this.onSearch) {
                this.onSearch = true;
                setTimeout((function () {
                    this.$table.data("bootstrap.table").searchText= React.findDOMNode(this.refs.Search).value;
                    this.WenzhixinGridRefresh();
                    //this.$table.data("bootstrap.table")
                    //.onSearch({currentTarget: $(React.findDOMNode(this.refs.Search))});
                    this.onSearch = false;
                }).bind(this), 500);
            }
        },
        handleAdd: function () {
            location.href = 'StoreManagementEdit';
        },
        componentWillUnmount: function () {
            this.$table.find("*").unbind().off();
            this.$table.bootstrapTable("destroy");
        },
        render: function() {
            return (
                <div>
                    <div className="row">
                        <button type="button" className="btn btn-default" onClick={this.handleAdd}> + 新增</button>
                    </div>
                    <div className="row">
                        <div className="form-inline">
                            <CategoryGroup onCategoryChange={this.handleCategroyChange}/>
                            <input type="email" className="form-control pull-right"
                            placeholder="Search" ref="Search" onChange={this.handleSearchChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <table ref="Grid"></table>
                    </div>
                </div>
          );
        }
    });

    React.render(<GroupBuyStoreList />,element);
}



var Button = ReactBootstrap.Button;
var ButtonGroup =  ReactBootstrap.ButtonGroup;
var Table = ReactBootstrap.Table;
var Pagination =  ReactBootstrap.Pagination;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var SplitButton = ReactBootstrap.SplitButton;
var MenuItem = ReactBootstrap.MenuItem;

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

var StoreGrid =  React.createClass({
    getInitialState: function() {
        return {
            data:{
                total:0,
                rows:[]
            }
        };
    },
    componentDidMount: function () {
        this.getStoreListFromServer();
    },
    componentWillReceiveProps: function(nextProps) {
        this.getStoreListFromServer(nextProps);
    },
    getStoreListFromServer: function(nextProps){
        //http://localhost:50908/api/groupbuystoreapi?search=d&order=asc&limit=10&offset=0&category=meal&_=1437099137914
        //(new Date().getTime()).toString()
        var props = nextProps || this.props;
        var params = {
            search: props.searchText,
            limit: props.pageSize,
            offset: props.pageSize * props.pageNumber - props.pageSize,
            category:props.category
        };
        params[(new Date().getTime()).toString()]=null;

        $.ajax({
            url: "/api/groupbuystoreapi/",
            data: params,
            type: "GET",
            success: function(data) {
                this.setState({data:data});
                this.props.onFetch(data);
            }.bind(this)
        });
    },
    handleDelete: function(GroupBuyStoreId){
        $.ajax({
            url: "/api/groupbuystoreapi/" + GroupBuyStoreId,
            type: "DELETE",
            success: function(result) {
                this.getStoreListFromServer();
            }.bind(this)
        });
    },
    render: function() {
        var rows = this.state.data.rows;
        return (
            <Table bordered condensed hover>
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
                                        <Button>修改店家資料</Button>
                                        <Button
                                            onClick={this.handleDelete.bind(this,
                                                item.GroupBuyStoreId)}>
                                            刪除
                                        </Button>
                                    </td>
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
    getInitialState: function() {
        return {
            pageSize:5,
            pageNumber:1,
            searchText:"",
            category:"",
            total:0
        };
    },
    handleSelectPage(event, selectedEvent) {
        this.setState({
            pageNumber: selectedEvent.eventKey
        });
    },
    handleCategroyChange:function(category){
        this.setState({category:category});
    },
    handleSearchChange:function(){
        this.setState({searchText:React.findDOMNode(this.refs.Search).value});
    },
    handleGridFetch: function(gridData){
        this.setState({total:gridData.total});
    },
    handlePageSizeChange: function(size){
        this.setState({pageSize:size});
    },
    render: function() {
        var onAddClick = function(){location.href = "StoreManagementEdit"},
            to = this.state.pageSize * this.state.pageNumber,
            from = to - this.state.pageSize + 1,
            pagingBtn = "";
        if(this.state.pageSize<this.state.total){
            var items = parseInt(this.state.total/this.state.pageSize)
                +  (this.state.total/this.state.pageSize == 0 ? 0 : 1 ),
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
        return(
            <div className="store-management-content">
                <div>
                    <Button onClick={onAddClick}> + 新增 </Button>
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
                     pageSize={this.state.pageSize}
                     pageNumber={this.state.pageNumber}
                     searchText={this.state.searchText}
                     category={this.state.category}
                     onFetch={this.handleGridFetch}
                     />
                    <div>
                        <div className="pull-left">
                            Showing {from} to {to} of {this.state.total} rows
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
                        {pagingBtn}
                    </div>
                </div>
                </div>
            </div>
        );
    }
});



var StoreManagementInit = function(mountNode){
    React.render(<StoreManagement/>,mountNode);
}


/*<div className="row">
    <button type="button" className="btn btn-default" onClick={this.handleAdd}> + 新增</button>
</div>
<div className="row">
    <div className="form-inline">
        <CategoryGroup onCategoryChange={this.handleCategroyChange}/>
        <input type="email" className="form-control pull-right"
        placeholder="Search" ref="Search" onChange={this.handleSearchChange}/>
    </div>
</div>
<div className="row">
    <table ref="Grid"></table>
</div>*/
