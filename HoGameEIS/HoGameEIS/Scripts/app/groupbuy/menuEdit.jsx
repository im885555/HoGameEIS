var testData = [
    
];

App.StoreManagementMenuInit = function (mountNode) {
    var Table = ReactBootstrap.Table;
    var Button = ReactBootstrap.Button;


    var getRouterId = function () {
        var params = location.pathname.split("/");
        return params[params.length - 1];
    };
    var storeId = getRouterId();

    var MenuList = React.createClass({
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
                    "":"",
                    meal: "正餐",
                    drink: "飲料",
                    dessert: "點心",
                    groupbuy: "團購",
                    party: "活動"
                };

            return (
                  <Table bordered condensed>
                    <thead>
                      <tr>
                        <th colSpan="5">{storeInfo.StoreName} - {category[storeInfo.Category]}</th>
                      </tr>
                      <tr>
                        <th colSpan="5">
                            <div className="text-danger">
                                雙擊名稱、價錢、備註可直接修改內容
                                <Button className="pull-right">新增項目</Button>
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
                      <tr>
                        <td rowSpan="2">
                            <Button>刪除</Button>
                            <Button>新增子項</Button>
                        </td>
                        <td rowSpan="2">招牌鍋貼</td>
                        <td>10</td>
                        <td>50</td>
                        <td>
                            <Button>刪除</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>12</td>
                        <td>60</td>
                        <td>
                            <Button>刪除</Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
           );
        }
    });

    var StoreManagementMenuEdit = React.createClass({

        render: function () {
            return (
            <div className="row">
                <div className="col-sm-4">
                    <div className="upload-image-zone">
                        Drop images here or click to upload.
                    </div>
                </div>
                <div className="col-sm-8">
                  <MenuList {...this.props}/>
                </div>
            </div>
            );
        }
    });


    React.render(<StoreManagementMenuEdit storeId={storeId} />, mountNode);

};