App.GroupBuy.Control.StoreSelector = (function () {
    var Button = ReactBootstrap.Button;
    var Table = ReactBootstrap.Table;
    var Pagination = ReactBootstrap.Pagination;

    var LoadingIcon = App.Component.Loading;

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
                                    <tr key={item.StoreId} onClick={()=>this.props.onSelect(item)}>
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

    var StoreSelector = React.createClass({
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
    return StoreSelector;
})();

