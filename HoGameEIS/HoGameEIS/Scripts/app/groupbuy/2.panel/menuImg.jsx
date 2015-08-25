App.GroupBuy.Panel.MenuImg = (function () {
    var Carousel = ReactBootstrap.Carousel;
    var CarouselItem = ReactBootstrap.CarouselItem;
    var Modal = ReactBootstrap.Modal;


    var PopupImageWindow = React.createClass({
        render:function(){
            return(
                <Modal
                {...this.props}
                 dialogClassName='custom-modal-full-page-image'
                 aria-labelledby='contained-modal-title-lg'
                 animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>菜單照片</Modal.Title>
                    </Modal.Header>
                    <Modal.Body closeButton>
                        <Carousel interval={5000000}>
                            {this.props.imgList.map(function(img,i){
                            return(
                            <CarouselItem key={i} onClick={() =>
                                this.setState({showPopupImage:true})}>
                              <img src={img.ImageUrl}  style={{"width":"100%"}}/>
                            </CarouselItem>
                            )
                            }.bind(this))}
                        </Carousel>
                    </Modal.Body>               
                </Modal>
            );
}
});

    var MenuImg = React.createClass({
        getInitialState: function () {
            return {
                imgList: [],
                showPopupImage: false
            };
        },
        componentDidMount: function () {
            $.ajax({
                url: "/api/GroupBuyOrderImageApi/" + this.props.GroupBuyId,
                type: "GET",
                success: function (imgList) {
                    this.setState({ imgList: imgList });
                   // this.getMenuImagesFromServer();
                }.bind(this)
            });
        },
        renderPopupImageWindow: function () {
            if (!!this.state.showPopupImage){
                return <PopupImageWindow 
                        imgList={this.state.imgList}
                        onHide={()=> this.setState({showPopupImage:false})}/>
            }
        },
        render: function () {
            return (
            <div>
                {this.renderPopupImageWindow()}
                <Carousel interval={5000000}>
                    {this.state.imgList.map(function(img,i){
                        return(
                            <CarouselItem key={i} onClick={()=>this.setState({showPopupImage:true})}>
                              <img src={img.ImageUrl} />
                            </CarouselItem>
                        )
                    }.bind(this))}
                </Carousel>
            </div>
           );
        }
    });


    return MenuImg;
})();
