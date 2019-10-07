import store from './../store/index.js'

export function getBase64Image(img) {
    img.crossOrigin = "*";
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png"); // 可选其他值 image/jpeg
    return dataURL;
}
export function getBase64(url, callback, k) {
    //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
    var Img = new Image(),
        dataURL = '';
    Img.src = url + '?v=' + Math.random();
    Img.setAttribute('crossorigin', 'anonymous');
    // Img.crossOrigin = '';
    console.log(url)
    console.log(Img.crossOrigin)
    Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
        var canvas = document.createElement("canvas"), //创建canvas元素
            width = Img.width, //确保canvas的尺寸和图片一样
            height = Img.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
        dataURL = canvas.toDataURL('image/png'); //转换图片为dataURL
        console.log("转换王朝")
        console.log(dataURL)
        callback ? callback(dataURL, k) : null; //调用回调函数
    };
}
export function getReImgBase64(img) {
    function getBase64Image(img, width, height) { //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : img.width;
        canvas.height = height ? height : img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        return dataURL;
    }
    var image = new Image();
    image.crossOrigin = '';
    image.src = img;
    return new Promise((resolve, reject) => {
        image.onload = function () {
            resolve(getBase64Image(image)); //将base64传给done上传处理
        }
    });
}
export function callAppMethod(param, callback) {
    if (store.getters.isIOS) {
        this.$bridge.callhandler(param,
            data => {
                callback(data);
            }
        );
    } else {
        if(window.android){
            const data = android.DX_encryptionRequest(
                JSON.stringify(param)
            );
            callback(data);
        }
    }
}