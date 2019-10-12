import store from './../store/index.js'
import Bridge from '@/util/bridge'

export function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png"); // 可选其他值 image/jpeg
    // console.log("转换完成", dataURL)
    return dataURL;
}
export function getBase64(url, callback, k) {
    //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
    var Img = new Image(),
        dataURL = '';
    Img.src = url + '?v=' + Math.random();
    Img.setAttribute('crossorigin', 'anonymous');
    Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
        var canvas = document.createElement("canvas"), //创建canvas元素
            width = Img.width, //确保canvas的尺寸和图片一样
            height = Img.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
        dataURL = canvas.toDataURL('image/png'); //转换图片为dataURL
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
export function callAppMethod(command, param, callback) {
    if (store.getters.isIOS) {
        Bridge.callhandler(
            command,
            param,
            data => {
                callback ?callback(data):null;
            }
        );
    } else if (window.android) {
        const data = android[command](
            JSON.stringify(param)
        );
        callback ?callback(data):null;
    }
}
//將秒數格式化為時分秒
export function formatSeconds(value) {
	    var theTime = parseInt(value);// 秒
	    var theTime1 = 0;// 分
	    var theTime2 = 0;// 小时
	    if(theTime > 60) {
	        theTime1 = parseInt(theTime/60);
	        theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
	            theTime2 = parseInt(theTime1/60);
	            theTime1 = parseInt(theTime1%60);
            }
	    }
        var result = ""+parseInt(theTime);
        if(theTime1 > 0) {
       	 	result = ""+parseInt(theTime1)+":"+result;
        }
        if(theTime2 > 0) {
        	result = ""+parseInt(theTime2)+":"+result;
        }
    	return result;
	}
