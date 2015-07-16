



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

var CategoryGroup = React.createClass({
    getInitialState: function() {
        return {current:""};
    },
    handleSelect: function(value){
        //this.props.onCategoryChange(value);
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
                            var btnClass ="btn btn-default",
                                handleSelect = this.handleSelect.bind(this, data.value);
                            data.value == this.state.current && (btnClass ="active");
                            return (
                                <Button
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

var PaginationAdvanced = React.createClass({
  getInitialState() {
    return {
      activePage: 1
    };
  },

  handleSelect(event, selectedEvent) {
    this.setState({
      activePage: selectedEvent.eventKey
    });
  },

  render() {
    return (
      <Pagination
        prev={true}
        next={true}
        first={true}
        last={true}
        ellipsis={true}
        items={20}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.handleSelect} />
    );
  }
});

var StoreGrid = React.createClass({
    render: function() {
        return(
            <div>
                <Table bordered condensed hover>
                    <thead>
                        <tr>
                          <th>店家名稱</th>
                          <th>備註</th>
                          <th>修改</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>1</td>
                          <td>Mark</td>
                          <td>Otto</td>
                        </tr>
                    </tbody>
                </Table>
                <div className="form-inline">
                    Showing 1 to 10 of 13 rows10  records per page
                </div>
            </div>
        );
    }
});

var StoreManagement = React.createClass({
    componentWillUnmount: function () {

    },
    getStoreListFromServer: function(){

    },
    render: function() {
        return(
            <div>
                <div>
                    <Button> + 新增</Button>
                </div>
                <div>
                    <div className="form-inline">
                        <CategoryGroup/>
                        <input type="email" className="form-control pull-right"
                        placeholder="Search" ref="Search" onChange={this.handleSearchChange}/>
                    </div>
                </div>
                <div>
                    <StoreGrid/>
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
