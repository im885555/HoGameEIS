App.GroupBuy.GroupBuyList = (function () {
    var Button = ReactBootstrap.Button;
    var Table = ReactBootstrap.Table;

    var LoadingIcon = App.Component.Loading;

    var GridMixin = App.Mixins.GridMixin;


    var categoryMap = {
        ongoing: "進行中", closed: "已關閉"
    };



    var ListGrid = React.createClass({
        render: function () {
            var rows = this.props.data.rows;
            return (
                <div>
                    <Table  bordered condensed hover>
                        <thead>
                            <tr>
                              <th>開始時間</th>
                              <th>名稱</th>
                              <th>店家名稱</th>
                              <th>開團者</th>
                              <th>狀態</th>
                              <th>截止時間</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                !rows && <tr><td colSpan="6"  className="text-center"><LoadingIcon/></td></tr>
                            }
                            {                                                            
                                !!rows && rows.map(function(item,i){
                                    return (
                                        <tr key={i}>
                                            <td>{item.StartTime}</td>
                                            <td>{item.Description}</td>
                                            <td>{item.StoreName}</td>
                                            <td>{item.CreatorName}</td>
                                            <td>{categoryMap[item.Status]}</td>
                                            <td>{item.EndTime}</td>
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



    var GroupBuyList = React.createClass({
        getDefaultProps: function () {
            return{
                restUri: "/api/groupbuylistapi/",
                categoryOptions: categoryMap
            }
        },
        getInitialState: function () {
            return {                
                pageSize: 10,
                pageNumber: 1,
                searchText: "",
                category: "ongoing",
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
        mixins: [GridMixin],
        render: function () {
            return (
                <div className="store-management-content">
                    <div>
                        <div className="form-inline">
                            {this.renderCategoryGroup()}
                            {this.renderSearch()}
                        </div>
                    </div>
                    <div>
                        <div>
                            <ListGrid
                             data= {this.state.data}
                             refresh ={this.getListFromServer}
                             />
                            {this.renderPageSizeDDL()}
                            {this.renderPaging()}
                        </div>
                    </div>
                </div>
            );
        }
    });




    return GroupBuyList;
})();