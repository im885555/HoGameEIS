App.Mixins.FormWithValidationMixin = {
    handleChange: function (callback) {
        this._handleSumbit = false;
        this.setState(this.getInputValue(), () => typeof callback == "function" && callback());
    },
    _handleSumbit: false,
    handleSumbit: function (e) {
        e.preventDefault();
        this._handleSumbit = true;
        this._neverSubmit = false;
        this._validation = true;
        this.handleChange(() =>!!this._validation && this.refs.form.getDOMNode().submit());
    },
    submitBtnProps: function () {
        return this._handleSumbit ? { disabled: true } : {};
    },
    _neverSubmit: true,
    _validation: true,
    validationPorps: function (attr, help, context) {
        if (!!this._neverSubmit) {
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
        return {};
    }
};