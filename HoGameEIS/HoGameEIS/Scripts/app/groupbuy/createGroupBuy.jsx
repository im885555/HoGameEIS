App.GroupBuy.CreateGroupBuy = (function () {
    var CreateGroupBuy = React.createClass({
        componentDidMount: function () {
            $("#createGroupbuyForm").submit(function (e) {
                e.stopImmediatePropagation();
                if (!!e.originalEvent && (!!e.originalEvent.detail && e.originalEvent.detail >= 2)) {
                    return false;
                }

                if (!($("input[name='StoreId']").length > 0 && !!$("input[name='StoreId']").val())) {
                    alert("請選擇商家");
                    return false;
                }
            });
            $('#datetimepicker1').datetimepicker({
                defaultDate: new Date(new Date().setHours(new Date().getHours() + 2))
            });
            App.ChooseStoreInit(document.getElementById("ChooseStore"));
        },
        render: function () {
            return(
                <div className="col-sm-12 col-md-10 col-lg-8">
                <form className="form-horizontal create-groupbuy-form" role="form" method="post" id="createGroupbuyForm">
                    <div className="form-group">
                        <label>描述</label>
                        <input type="text" className="form-control" name="Description" placeholder="請輸入描述" required />
                        <label>店家</label>
                        <div id="ChooseStore"></div>
                        <label>結束時間</label>
                        <div className='input-group date' id='datetimepicker1'>
                            <input type='text' name="EndTime" className="form-control" required />
                            <span className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                            <button type="submit" className="btn btn-default">新增</button>
                    </div>
                </form>
            </div>
                );
            }
    });

    return CreateGroupBuy;
})();