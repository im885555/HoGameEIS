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
                EndTime: null
            }
        },
        _clock:null,
        componentDidMount: function () {
            $.ajax({
                url: "/api/groupbuyapi/" + this.props.GroupBuyId,
                type: "GET",
                success: function (data) {
                    var now = new Date().getTime();
                    var endTime = new Date(data.EndTime).getTime();
                    //con
                    console.log(now, endTime, new Date(), data.EndTime, new Date(data.EndTime));
                    if (endTime > now) {
                        this._clock.setTime((endTime - now)/1000);
                        this._clock.start();
                    }
                    
                    this.setState(data);
                }.bind(this)
            });

            this._clock= $(this.refs.Clock.getDOMNode()).FlipClock(1, {
                clockFace: "DailyCounter",
                countdown: true
            });
        },
        componentWillUnmount: function () {
            
        },
        handleSelect: function (selectedKey) {
            alert('selected ' + selectedKey);
        },
        render: function () {
            var state = this.state;
            return (
                <div>
                    <div className="row">
                        <div className="col-md-3 col-sm-12 col-lg-3">
                            <dl>
                                <dt>團名</dt>
                                <dd>{state.Description}</dd>
                                <dt>店家</dt>
                                <dd>{state.StoreName}</dd>
                                <dt>電話</dt>
                                <dd></dd>
                                <dt>開團者</dt>
                                <dd>{state.CreatorName}</dd>
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
                         <Nav bsStyle='tabs' justified activeKey={"order"} onSelect={this.handleSelect}>
                              <NavItem eventKey={"menuImg"}>圖片</NavItem>
                              <NavItem eventKey={"order"}>訂購單</NavItem>
                              <NavItem eventKey={"paidDetail"}>付費明細</NavItem>
                              <NavItem eventKey={"memo"}>備註</NavItem>
                              <NavItem eventKey={"orderDetail"}>訂單明細</NavItem>
                              <NavItem eventKey={"sendNotice"}>寄發通知</NavItem>
                         </Nav>
                    </div>
                    
                    
                </div>
            );
        }
    });




    return CurrentGroupBuyDetail;
})();