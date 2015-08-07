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


App.Component.FileDragAndDrop = React.createClass({
    handleDragStart: function (event) {
        if (typeof this.props.onDragStart === 'function') {
            this.props.onDragStart(event);
        }
    },

    handleDrag: function (event) {
        if (typeof this.props.onDrag === 'function') {
            this.props.onDrag(event);
        }
    },

    handleDragEnter: function (event) {
        if (typeof this.props.onDragEnter === 'function') {
            this.props.onDragEnter(event);
        }
    },

    handleDragLeave: function (event) {
        if (typeof this.props.onDragLeave === 'function') {
            this.props.onDragLeave(event);
        }
    },

    handleDragOver: function (event) {
        event.preventDefault();
        if (typeof this.props.onDragOver === 'function') {
            this.props.onDragOver(event);
        }
    },

    handleDrop: function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files.length > 0) {
            if (typeof this.props.onDrop === 'function') {
                this.props.onDrop(event.dataTransfer);
            }
        }
    },

    handleDragEnd: function (event) {
        if (typeof this.props.onDragEnd === 'function') {
            this.props.onDragEnd(event);
        }
    },

    render: function () {
        return (
          <div
             {...this.props}
             onDragStart={this.handleDragStart}
             onDrag={this.handleDrop}
             onDragEnter={this.handleDragEnter}
             onDragLeave={this.handleDragLeave}
             onDragOver={this.handleDragOver}
             onDrop={this.handleDrop}
             onDragEnd={this.handleDragEnd}
             >
                 {this.props.children}
             </div>
         );
    }
});
