
export const getDate = (timestamp) => {
    let date = new Date(timestamp);
    let Y = date.getFullYear() + '/';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    let D = date.getDate() + ' ';
    return Y + M + D
}

export const getDateAll = (timestamp) => {
    let date = new Date(timestamp);
    let Y = date.getFullYear() + '.';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds() + "";
    return Y + M + D + h + m + s;
}

export const getDates = (timestamp) => {
    let date = new Date(timestamp);
    let Y = date.getFullYear() + '年';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
    let D = date.getDate() + '日';
    let h = date.getHours() + '时';
    let m = date.getMinutes() + '分';
    let s = date.getSeconds() + "秒";
    return [Y + M + D, h + m + s]
}

export const judgeClient = () => {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
    if (isAndroid) {
        return 'Android';
    } else if (isIOS) {
        return 'IOS';
    } else {
        return 'PC';
    }
}