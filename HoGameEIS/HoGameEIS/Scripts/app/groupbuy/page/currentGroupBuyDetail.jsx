App.GroupBuy.CurrentGroupBuyDetail = (function () {
    var Button = ReactBootstrap.Button;
    var Nav = ReactBootstrap.Nav;
    var NavItem = ReactBootstrap.NavItem;
    var OverlayTrigger = ReactBootstrap.OverlayTrigger;
    var Popover = ReactBootstrap.Popover;
    var Modal = ReactBootstrap.Modal;

    var StoreSelector = App.GroupBuy.Control.StoreSelector;

    var ChangeStoreWindow = React.createClass({
        getInitialState: function () {
            return {
                showStoreSelector: false
            }
        },
        handleSelect: function (item) {
        },
        handleShowStoreSelector: function () {

        },
        render: function () {
            return(
                <Modal
                onHide={()=>this.props.onHide()}
                bsSize='small'
                bsStyle='primary'
                aria-labelledby='contained-modal-title-sm'
                animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>更換店家</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  更換店家後，訂單將會被清空。僅保留已付費明細。
                    <StoreSelector onSelect={this.handleSelect} />
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={()=>this.props.onHide()} bsStyle='primary'>繼續</Button>
                  <Button onClick={()=>this.props.onHide()} >取消</Button>
                </Modal.Footer>
              </Modal>
                );
        }

    });

    var CurrentGroupBuyDetail = React.createClass({
        getDefaultProps: function () {
            return {
                GroupBuyId: App.Core.UrlParams.id
            };
        },
        getInitialState: function () {
            return {
                isOngoing:false, //團購是否進行中
                isCreator:false, //使用者是否為開團者
                currentPanel: App.Core.UrlParams.tab ||  "Order",
                data: {},
                extendTimeInputVal: 5,
                showChangeStoreWindow:false
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

            this._countdown.setTime(0);
            if (endTime > now) {
                this._countdown.setTime(endTime - now);
                this._countdown.start();
                return true;
            } else {
                return false;
            }

        },
        getGroupbuyDataFromServer: function () {
            $.ajax({
                url: "/api/groupbuyapi/" + this.props.GroupBuyId,
                type: "GET",
                success: function (data) {
                    var isOngoing = this.startCountdown(data.EndTime);
                    this.setState({ data: data, isOngoing: isOngoing, isCreator: data.IsCreator });
                }.bind(this)
            });
        },
        handleExtendTime: function () {
            var endTime = !!this.state.isOngoing ? moment(this.state.data.EndTime) : moment();
            this.updateEndTime(endTime.add(this.refs.entendTimeInput.getDOMNode().value, 'minutes').format());
        },
        updateEndTime: function (endTime) {
            $.ajax({
                url: "/api/GroupbuyEndTimeApi/" + this.props.GroupBuyId,
                type: "PUT",
                data: {
                    EndTime: endTime
                },
                success: function (data) {
                    this.getGroupbuyDataFromServer();
                }.bind(this)
            });

        },
        componentWillUnmount: function () {

        },
        renderPanel: function () {
            var info = $.extend({}, {}, this.state);
            var panelConf = {
                MenuImg: (<App.GroupBuy.Panel.MenuImg {...this.props}/>),
                Order: (<App.GroupBuy.Panel.Order  {...this.props} groupBuyInfo={info}/>),
                PaidDetail: (<App.GroupBuy.Panel.PaidDetail  {...this.props} groupBuyInfo={info}/>),
                Memo: (<div>{this.state.data.Memo}</div>),
                OrderDetail: (<App.GroupBuy.Panel.OrderDetail  {...this.props}/>),
                SendNotice: (<div>尚未開放</div>)
            };
            return panelConf[this.state.currentPanel];
        },
        handleHideChangeStoreWindow: function () {
            this.setState({ showChangeStoreWindow: false });
        },
        renderChangeStoreWindow: function () {
            if (!!this.state.showChangeStoreWindow) {
                return <ChangeStoreWindow onHide={this.handleHideChangeStoreWindow}/>
        }
    },
        render: function () {
            var data = this.state.data;
            return (
                <div>
                    {this.renderChangeStoreWindow()}
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
                        {!!this.state.isCreator &&
                        <div className="col-md-12 col-sm-12 col-lg-3">
                            <input type="text"
                                   style={{width:"60px"}} 
                                   className="form-control display-inline-block" 
                                   value={this.state.extendTimeInputVal}
                                   ref= "entendTimeInput"
                                   onChange={(e)=>this.setState({extendTimeInputVal: App.Utility.ParseInt(e.target.value)})}/>                           
                            <Button bsStyle="primary" 
                                    onClick={this.handleExtendTime}>延長(分)</Button>
                            {!!this.state.isOngoing &&<Button bsStyle="success" onClick={()=>this.updateEndTime(moment().format())}>提前結束</Button>}
                            <Button bsStyle="info" onClick={()=>alert("尚未開放")}>委託收費</Button>
                            <Button bsStyle="warning" 
                                    onClick={()=>window.open('/GroupBuy/Print/'+this.props.GroupBuyId , '', config='toolbar=no,location=no')}>
                                        訂單列印</Button>
                            <Button bsStyle="danger" onClick={()=>alert("尚未開放")}>代理點餐</Button>
                            <Button bsStyle="success" onClick={()=>this.setState({showChangeStoreWindow:true})}>更換店家</Button>
                        </div>
                        }
                    </div>
                    <hr/>
                    <div className="row">
                         <div className="col-sm-12 col-md-10 col-lg-8">
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
                    </div>
                    {this.renderPanel()}

                </div>
            );
        }
    });




    return CurrentGroupBuyDetail;
})();
