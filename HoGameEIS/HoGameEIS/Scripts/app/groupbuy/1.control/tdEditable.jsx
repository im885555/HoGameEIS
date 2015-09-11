App.GroupBuy.Control.TdEditable = (function () {
    var LoadingIcon = App.Component.Loading;

    var TdEditable = React.createClass({
        getInitialState: function () {
            return {
                locked:false
            }
        },
        _webSocket: null,
        componentDidMount: function () {
            if (!!this.props.lockId) {
                this._webSocket = new App.WebSocket("TdEditable_" + this.props.lockId,
                  function (msg) {
                      msg.id == this.props.lockId && msg.user != App.Context.GetCurrentUser().EmployeeId && this.setState({ locked: true });
                      msg.id == this.props.lockId && !!msg.done && this.setState({ locked: false });
                  }.bind(this));
            }
        },
        componentWillUnmount: function () {
            !!this.props.lockId && this._webSocket.close(); 
        },
        changeTimeout: null,
        oldValue: null,
        strParser: function (_str) {
            var str = $("<p>" + _str + "</p>").text();
            if (!!this.props.number) {
                str = $.trim(str);
                str = !str ? "0" : str;
                str = str.replace(/[^0-9]/g, "");
                str = parseInt(str,10);
                isNaN(str) && (str=0);
            }
            str = $.trim(str);
            return str;
        },
        handleEdit: function () {
            setTimeout(function () {
                str = this.strParser(this.refs.editDom.getDOMNode().innerHTML);
                this.refs.editDom.getDOMNode().innerHTML = str;
                !!this.changeTimeout && clearTimeout(this.changeTimeout);
                this.changeTimeout = setTimeout(function () {
                    !!this.props.lockId && this._webSocket.send({
                        id: this.props.lockId,
                        done: true
                    });
                    if (str == this.oldValue) return;
                    this.oldValue = str;
                    !!this.props.handleChange &&
                    this.props.handleChange(this.props.uid, str);
                }.bind(this), 0);
            }.bind(this), 0);
        },
        handleKeyPress: function (e) {
            if (e.which == 13) {
                event.preventDefault();
                this.handleEdit();
            }
        },
        handleFocus: function () {
            !!this.props.lockId && this._webSocket.send({ id: this.props.lockId, user: App.Context.GetCurrentUser().EmployeeId });
            //console.log("focus");
            var str = this.oldValue = this.strParser(this.props.html);
            !!this.props.number && parseInt(str, 10) == 0 &&
             setTimeout(()=>document.execCommand("selectAll"), 0);
        },
        render: function () {
            var isIE = function () {
                return navigator.userAgent.indexOf('MSIE') !== -1
                    || navigator.appVersion.indexOf('Trident/') > 0
            },
            attribute = {
                onBlur: this.handleEdit,
                onDrop: this.handleEdit,
                onKeyPress: this.handleKeyPress,
                onFocus: this.handleFocus,
                contentEditable: true,
                dangerouslySetInnerHTML: { __html: this.props.html }
            };
            if (this.state.locked == true) {
                return(
                    <td  {...this.props}>{this.props.html}<LoadingIcon /></td>
                    )
            }
            if (isIE()) {
                return(
                    <td {...this.props}>
                       <div ref="editDom" {...attribute}>
                       </div>
                    </td>
                )
            } else {
                return (
                    <td ref="editDom"
                        {...this.props} {...attribute}></td>
                )
            }
        }
    });
    return TdEditable;
})();

