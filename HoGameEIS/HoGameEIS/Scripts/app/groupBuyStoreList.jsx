var GroupBuyStoreList = React.createClass({
    render: function() {
        return (
          <div className="groupBuyStoreList">
            <div className="row">
            <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-default">全部</button>
                <button type="button" className="btn btn-default">正餐</button>
                <button type="button" className="btn btn-default">餐飲</button>
                <button type="button" className="btn btn-default">點心</button>
                <button type="button" className="btn btn-default">團購</button>
                <button type="button" className="btn btn-default">活動</button>
            </div>
            </div>
            <div className="row">
                <div>
                    <form className="form-inline" role="form">
                        <div className="form-group">
                            <div className="input-group">
                                <label className="sr-only" for="exampleInputEmail2">關鍵字</label>
                                <div className="input-group-addon">關鍵字</div>
                                <input type="email" className="form-control" id="exampleInputEmail2" placeholder="欲搜尋的文字"/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-default">搜尋</button>

                        <button type="button" className="btn btn-default" onclick="location.href = 'StoreManagementEdit'">新增</button>
                    </form>
                </div>


            </div>
          </div>
      );
    }
});
