function myPromise(type, obj = {}) {
    return new Promise(function (resolve, reject) {
        if (type) {
            setTimeout(() => {
                resolve(obj);
            }, 1000)
        } else {
            reject({
                code: 102,
                msg: "sdsd",
                success: false
            });
        }
    });
}

export default myPromise 