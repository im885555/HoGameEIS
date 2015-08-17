App.Mixins.FormWithValidationMixin = {
    handleChange: function (callback) {
        this._handleSumbit = false;
        this.setState(this.getInputValue(), () => typeof callback == "function" && callback());
    },
    _handleSumbit: false,
    handleSumbit: function (e) {
        e.preventDefault();
        this._handleSumbit = true;
        this._validation = false;
        this.handleChange(() =>!!this._validation && this.refs.form.getDOMNode().submit());
    },
    submitBtnProps: function () {
        return this._handleSumbit ? { disabled: true } : {};
    },
    _validation: true,
    validationPorps: function (attr, help, context) {
        if (!!this._validation) {
            return {};
        }
        var val = this.state[attr];

        if (context(val)) {
            this._validation = false;
            return {
                bsStyle: "error",
                help: help
            }
        }
        this._validation = true;
        return {};
    }
};