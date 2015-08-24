App.GroupBuy.CurrentGroupBuyDetail = (function () {
    var Button = ReactBootstrap.Button;
    var Nav = ReactBootstrap.Nav;
    var NavItem = ReactBootstrap.NavItem;


    var CurrentGroupBuyDetail = React.createClass({
        getDefaultProps: function () {
            return {
                GroupBuyId: App.Core.UrlParams.id
            };
        },
        getInitialState: function () {
            return {
                currentPanel: App.Core.UrlParams.tab ||  "Order",
                data: {}
            }
        },
        _countdown:null,
        componentDidMount: function () {
            this.initCountdown();
            this.getGroupbuyDataFromServer();
        },
        initCountdown: function () {
            this._countdown = $(this.refs.Clock.getDOMNode()).FlipClock(0, {
                clockFace: "DailyCounter",
                countdown: true,
                autoStart: false
            });
        },
        startCountdown: function (_endtime) {
            var now = moment(new Date()).unix();
            var endTime = moment(_endtime).unix();

            if (endTime > now) {
                this._countdown.setTime(endTime - now);
                this._countdown.start();
            }
        },
        getGroupbuyDataFromServer: function () {
            $.ajax({
                url: "/api/groupbuyapi/" + this.props.GroupBuyId,
                type: "GET",
                success: function (data) {
                    this.startCountdown(data.EndTime);
                    this.setState({ data: data });
                }.bind(this)
            });
        },
        componentWillUnmount: function () {

        },
        renderPanel: function () {
            var panelConf = {
                MenuImg: (<App.GroupBuy.Panel.MenuImg {...this.props}></App.GroupBuy.Panel.MenuImg>),
                Order: (<App.GroupBuy.Panel.Order  {...this.props}></App.GroupBuy.Panel.Order>),
                PaidDetail: (<App.GroupBuy.Panel.PaidDetail  {...this.props}></App.GroupBuy.Panel.PaidDetail>),
                Memo: (<div>{this.state.data.Memo}</div>),
                OrderDetail: (<App.GroupBuy.Panel.OrderDetail  {...this.props}></App.GroupBuy.Panel.OrderDetail>),
                SendNotice: (<div>SendNotice</div>)
            };
            return panelConf[this.state.currentPanel];
        },
        render: function () {
            var data = this.state.data;
            return (
                <div>
                    <div className="row">
                        <div className="col-md-3 col-sm-12 col-lg-3">
                            <dl>
                                <dt>團名</dt>
                                <dd>{data.Description}</dd>
                                <dt>店家</dt>
                                <dd>{data.StoreName}</dd>
                                <dt>電話</dt>
                                <dd>{data.Tel}</dd>
                                <dt>開團者</dt>
                                <dd>{data.CreatorName}</dd>
                            </dl>
                        </div>
                        <div className="col-md-9 col-sm-12 col-lg-6">
                            <div ref="Clock"></div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-lg-3">
                            <Button bsStyle="primary">延長</Button>
                            <Button bsStyle="success">提前結束</Button>
                            <Button bsStyle="info">委託收費</Button>
                            <Button bsStyle="warning">訂單列印</Button>
                            <Button bsStyle="danger">代理點餐</Button>
                        </div>

                    </div>
                    <hr/>
                    <div className="row">
                         <Nav bsStyle='tabs' justified
                              activeKey={this.state.currentPanel}
                              onSelect={(selectedKey)=>{
                                  this.setState({ currentPanel: selectedKey });
                                  window.history.pushState("", "", location.pathname + "?tab="+selectedKey);
                                  //location.search = "tab="+selectedKey;
                              }}>
                              <NavItem eventKey={"MenuImg"}>圖片</NavItem>
                              <NavItem eventKey={"Order"}>訂購單</NavItem>
                              <NavItem eventKey={"PaidDetail"}>付費明細</NavItem>
                              <NavItem eventKey={"Memo"}>備註</NavItem>
                              <NavItem eventKey={"OrderDetail"}>訂單明細</NavItem>
                              <NavItem eventKey={"SendNotice"}>寄發通知</NavItem>
                         </Nav>
                    </div>
                    {this.renderPanel()}

                </div>
            );
        }
    });




    return CurrentGroupBuyDetail;
})();
