App.Mixins.GridMixin = (function () {
    var Button = ReactBootstrap.Button;
    var ButtonGroup = ReactBootstrap.ButtonGroup;
    var Pagination = ReactBootstrap.Pagination;
    var ButtonToolbar = ReactBootstrap.ButtonToolbar;
    var SplitButton = ReactBootstrap.SplitButton;
    var MenuItem = ReactBootstrap.MenuItem;

    return {
    getListFromServer: function () {
        //?search=d&order=asc&limit=10&offset=0&category=meal&_=1437099137914
        var state = this.state;
        var params = {
            search: state.searchText,
            limit: state.pageSize,
            offset: state.pageSize * state.pageNumber - state.pageSize,
            category: state.category
        };
        params[(new Date().getTime()).toString()] = null;

        $.ajax({
            url: this.props.restUri,
            data: params,
            type: "GET",
            success: function (data) {
                this.setState({ data: data });

                if (data.rows.length == 0 && state.pageNumber > 1) {
                    this.setState({
                        pageNumber: state.pageNumber-1
                    }, () =>this.getListFromServer());
                }
            }.bind(this)
        });
    },
    handleSelectPage(event, selectedEvent) {
        this.setState({
            pageNumber: selectedEvent.eventKey
        }, () =>this.getListFromServer());
    },
    handleCategroyChange: function (category) {
        this.setState({ category: category },
        () =>this.getListFromServer());
    },
    handleSearchChange: function () {
        this.setState({ searchText: React.findDOMNode(this.refs.Search).value },
        () =>this.getListFromServer());
    },
    handlePageSizeChange: function (size) {
        this.setState({ pageSize: size },
        () =>this.getListFromServer());
    },
    renderPaging: function () {
        var pagingBtn = "";
        if (this.state.pageSize < this.state.data.total) {
            var items = parseInt(this.state.data.total / this.state.pageSize)
                + (this.state.data.total % this.state.pageSize == 0 ? 0 : 1),
                maxButtons = items >= 5 ? 5 : items;
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
    renderCategoryGroup: function () {
        var opts = this.props.categoryOptions, btnData = [];
        for (var key in opts) {
            btnData.push({ name: opts[key], value: key });
        }           
        return (

                <ButtonGroup>
                    {
                        btnData.map(function (data, i) {
                            //var handleSelect = this.handleSelect.bind(this, data.value);
                            return (
                                <Button key={i}
                                className = {data.value == this.state.category ? "active" :""}
                                onClick={()=>this.handleCategroyChange(data.value)}>{data.name}
                                </Button>
                            );
                        }.bind(this))
                    }
                </ButtonGroup>

            );
    },
    renderPageSizeDDL: function () {
        var to = this.state.pageSize * this.state.pageNumber,
            from = to - this.state.pageSize + 1;
        return(
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
            );
    },
    renderSearch: function () {
        return(
            <input type="email" className="form-control pull-right"
                        placeholder="Search" ref="Search" onChange={this.handleSearchChange}/>
            );
        }
    }
})();

