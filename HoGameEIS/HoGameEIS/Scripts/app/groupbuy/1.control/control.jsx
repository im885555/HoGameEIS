
App.GroupBuy.Control = (function () {
    var Button = ReactBootstrap.Button,
        ButtonGroup = ReactBootstrap.ButtonGroup,
        CategoryGroup = React.createClass({
        getInitialState: function() {
            return {current:""};
        },
        handleSelect: function(value){
            this.props.onCategoryChange(value);
            this.setState({current:value});
        },
        render: function() {
            var btnData = [
                {name:"全部",value:""},
                {name:"正餐",value:"meal"},
                {name:"飲料",value:"drink"},
                {name:"點心",value:"dessert"},
                {name:"團購",value:"groupbuy"},
                {name:"活動",value:"party"}
            ];
            return (

                    <ButtonGroup>
                        {
                            btnData.map(function (data, i) {
                                var handleSelect = this.handleSelect.bind(this, data.value);
                                return (
                                    <Button key={i}
                                    className = {data.value == this.state.current ? "active" :""}
                                    onClick = {handleSelect}>{data.name}
                                    </Button>
                              );
                            }.bind(this))
                        }
                    </ButtonGroup>

                );
        }
    });
    return {
        CategoryGroup: CategoryGroup
    }
})();

