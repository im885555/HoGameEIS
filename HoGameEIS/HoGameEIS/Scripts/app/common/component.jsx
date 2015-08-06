App.Component.Loading = React.createClass({
    getDefaultProps: function () {
        return {
            show:true
        }
    },
    render: function () {
        var style = {};
        !this.props.show && (style.display="none");
        return(
            <span style={style} className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
        )
    }
});