App.GroupBuy.CurrentGroupBuyDetail = (function () {
    var Button = ReactBootstrap.Button;
    var Nav = ReactBootstrap.Nav;
    var NavItem = ReactBootstrap.NavItem;
    var OverlayTrigger = ReactBootstrap.OverlayTrigger;
    var Popover = ReactBootstrap.Popover;
    var Modal = ReactBootstrap.Modal;
    var Alert = ReactBootstrap.Alert;

    var StoreSelector = App.GroupBuy.Control.StoreSelector;

    var REFRESH_ACTION = "GroupbuyOrderDetailRefresh";
    /*
        background-color: yellow;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10100;
    min-height: 50px;
    */

    var ChangeStoreWindow = React.createClass({
        getInitialState: function () {
            return {
                showStoreSelector: false,
                bsSize: "small",
                labelledby: "contained-modal-title-sg"
            }
        },
        handleSelect: function (item) {
            $.ajax({
                url: "/api/GroupbuyChangeStoreApi/",
                type: "PUT",
                data: {
                    StoreId: item.StoreId,
                    GroupBuyId: this.props.GroupBuyId
                },
                success: function (data) {
                    location.reload();
                }.bind(this)
            });       
        },
        handleShowStoreSelector: function () {
            this.setState({
                showStoreSelector: true,
                bsSize: "large",
                labelledby: "contained-modal-title-lg"
            })
        },
        render: function () {
            var showStoreSelector = this.state.showStoreSelector;
            return(
                <Modal
                onHide={()=>this.props.onHide()}
                bsSize={this.state.bsSize}
                bsStyle='primary'
                aria-labelledby={this.state.labelledby}
                animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>更換店家</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Alert bsStyle='warning'>
                        更換店家後，訂單將會被清空。僅保留已付費明細。
                    </Alert>
                 
                    {!!showStoreSelector &&<StoreSelector onSelect={this.handleSelect} />}
                </Modal.Body>
                <Modal.Footer>
                    {!showStoreSelector && <Button onClick={()=>this.handleShowStoreSelector()} bsStyle='primary'>繼續</Button>}
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
        _countdown: null,
        _webSocket: null,
        componentDidMount: function () {
            this.initCountdown();
            this.getGroupbuyDataFromServer();

            this._webSocket = new App.WebSocket();
            this._webSocket.onmessage = function (msg) {
                msg.id == this.props.GroupBuyId
                && msg.action == REFRESH_ACTION
                && this.getGroupbuyDataFromServer();
            }.bind(this);
        },
        componentWillUnmount: function () {
            this._webSocket.close();
        },
        sendWsRefresh: function () {
            this._webSocket.send({ id: this.props.GroupBuyId, action: REFRESH_ACTION });
        },
        initCountdown: function () {
            this._countdown = $(this.refs.Clock.getDOMNode()).FlipClock(0, {
                clockFace: "DailyCounter",
                countdown: true,
                autoStart: false
            });
        },
        _timeOut:null,
        startCountdown: function (_endtime) {
            var now = moment(new Date()).unix();
            var endTime = moment(_endtime).unix();

            this._countdown.stop();
            this._countdown.setTime(0);
            if (endTime > now) {
                this._countdown.setTime(endTime - now);
                this._countdown.start();
                !!this._timeOut && clearTimeout(this._timeOut);
                this._timeOut = setTimeout(function () {
                    this.getGroupbuyDataFromServer();
                }.bind(this), (endTime - now) * 1000);
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
                    this.sendWsRefresh();
                    //this.getGroupbuyDataFromServer();
                }.bind(this)
            });

        },
        renderPanel: function () {
            var info = {
                isOngoing: this.state.isOngoing,
                isCreator: this.state.isCreator,
            }
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
        handleHideChangeStoreWindow: function (result) {
            this.setState({ showChangeStoreWindow: false });
        },
        renderChangeStoreWindow: function () {
            if (!!this.state.showChangeStoreWindow) {
                return <ChangeStoreWindow {...this.props} onHide={this.handleHideChangeStoreWindow} />
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
                            {/*<Button onClick={()=>this.setState({showChangeStoreWindow:true})}>更換店家</Button>*/}
                            <Button onClick={()=>alert("尚未開放")}>更換店家</Button>
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
