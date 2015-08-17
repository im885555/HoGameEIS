App.GroupBuy.StoreManagementEdit = (function () {
    var Input = ReactBootstrap.Input;
    var Row = ReactBootstrap.Row;
    var Col = ReactBootstrap.Col;

    var FormWithValidationMixin = App.Mixins.FormWithValidationMixin;

    var StoreManagementEdit = React.createClass({
        mixins: [FormWithValidationMixin],
        getDefaultProps: function () {
            return {
                storeId: App.Core.UrlParams.id
            };
        },
        getInitialState: function () {
            return {
                Category: "meal"
            };
        },
        componentDidMount: function () {

            var storeId = this.props.storeId;

            if (!!storeId) {
                $.ajax({
                    url: "/api/groupbuystoreapi/" + storeId,
                    type: "GET",
                    success: function (data) {
                        this.setState(data);
                    }.bind(this)
                });
            }
        },
        getInputValue: function () {
            return {
                StoreName: this.refs.StoreName.getValue(),
                Tel: this.refs.Tel.getValue(),
                Address: this.refs.Address.getValue(),
                Memo: this.refs.Memo.getValue()
            };
        },        
        renderCategoryRadio: function () {
            var self=this,
                category= this.state.Category,
                radioProps = [
                    { label: "正餐", value: "meal", checked: category == "meal" },
                    { label: "飲料", value: "drink", checked: category == "drink" },
                    { label: "點心", value: "dessert", checked: category == "dessert" },
                    { label: "團購", value: "groupbuy", checked: category == "groupbuy" },
                    { label: "活動", value: "party", checked: category == "party" },
                ],
                setCategory =function(e){
                    self.setState({Category:e.target.value})
                };

            return(
                <Input label="分類">
                    <Row>
                        {
                            radioProps.map(function(rp,i){
                                return (
                                     <Col key= {i} xs={2}>
                                        <Input name="Category"
                                               onChange={setCategory}
                                               type="radio"
                                               {...rp}/>
                                     </Col>
                                )
                            }.bind(this))
                        }
                    </Row>
                </Input>
                );
        },
        render: function () {
            var state = this.state;

            return(
                 <div className="col-sm-12 col-md-10 col-lg-8">
                    <h4 className="page-header">店家基本資料</h4>
                    <form role="form" ref="form" method="post" onSubmit={this.handleSumbit}>
                        <Input name="StoreName"
                               ref="StoreName"
                               type="text"
                               label="店家名稱"                              
                               placeholder="輸入店家名稱"
                               {...this.validationPorps("StoreName","店家名稱不可為空",(o)=>!o)}
                               onChange={this.handleChange}
                               value={state.StoreName}/>
                        <Input name="Tel"
                               ref="Tel"
                               type="text"
                               label="電話"
                               placeholder="輸入電話"
                               onChange={this.handleChange}
                               value={state.Tel} />
                        <Input name="Address"
                               ref="Address"
                               type="text"
                               label="地址"
                               placeholder="輸入地址"
                               onChange={this.handleChange}
                               value={state.Address} />
                        <Input name="Memo"
                               ref="Memo"
                               type="text"
                               label="備註"
                               placeholder="輸入備註"
                               onChange={this.handleChange}
                               value={state.Memo} />
                        {this.renderCategoryRadio()}
                        <button type="submit" className="btn btn-default"  {...this.submitBtnProps()}>新增/修改</button>
                    </form>
                </div>
                );
            }
    });

    return StoreManagementEdit;
})();
