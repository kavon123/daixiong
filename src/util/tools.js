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
    // Img.src = url + '?v=' + Math.random();
    Img.src = url;
    Img.crossOrigin = '';
    console.log("图片创建完成", Img.src)
    Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
        console.log("图片加载完成", Img.src)
        var canvas = document.createElement("canvas"), //创建canvas元素
            width = Img.width, //确保canvas的尺寸和图片一样
            height = Img.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
        dataURL = canvas.toDataURL('image/png'); //转换图片为dataURL
        console.log("转换完成", dataURL)
        callback ? callback(dataURL, k) : null; //调用回调函数
    };
}
export function getReImgBase64(imgSrc, width, height) {
    function getBase64Image(image, width, height) { //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : image.width;
        canvas.height = height ? height : image.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        console.log("核心转换完成")
        return dataURL;
    }
    var image = new Image();
    image.crossOrigin = '';
    image.src = imgSrc;
    console.log("图片地址", imgSrc)
    return new Promise((resolve, reject) => {
        image.onload = function () {
            console.log("图片加载完成")
            let resData = getBase64Image(image, width, height)
            resolve(resData); //将base64传给done上传处理
        }
        image.onerror = err =>{
            console.log("图片加载失败", err)
            reject(err)
        }
    });
}
/*安卓的调用是同步的，如果安卓不给回应，那么后面js代码全被阻塞，就像alert */
export function callAppMethod(command, param, callback, callParam) {
    if (store.getters.isIOS) {
        Bridge.callhandler(
            command,
            param,
            data => {
                callback ?callback(data, callParam):null;
            }
        );
    } else if (window.android) {
        const data = android[command](
            JSON.stringify(param)
        );
        callback ?callback(data, callParam):null;
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
        // var result = ""+parseInt(theTime);
        var result = theTime<10?("0"+theTime):theTime
        if(theTime1 > 0) {
                // result = ""+parseInt(theTime1)+":"+result;
                let tim1 = theTime1<10?("0"+theTime1):theTime1
                result =  tim1 +":"+result;
        }else{
            result = "00:"+result;
        }
        if(theTime2 > 0) {
            // result = ""+parseInt(theTime2)+":"+result;
            let tim2 = theTime2<10?("0"+theTime2):theTime2
            result = tim2 +":"+result;
        }else{
            result = "00:"+result;
        }
    	return result;
	}
