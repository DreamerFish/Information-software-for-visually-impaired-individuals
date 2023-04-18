var baseUrl = "https://www.gdouhc.top/blind/api";
export const get = (params) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + params.url,
            data: params.data,
            header: {
                'content-type': 'application/json', // 默认值
           "token": uni.getStorageSync('Authorization'),
            },
            method: 'get',
            success: (res) => {
				
                resolve(res);
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export const post = (params) => {
    // var baseUrl = 'https://rrr.mynatapp.cc';
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + params.url,
            data: params.data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded", // 默认值
                "token": uni.getStorageSync('Authorization'),
            },
            method: 'POST',
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err)
            }

        })
    })
}
export const uploadFile = (params) => {
    //var baseUrl = 'https://rrr.mynatapp.cc';
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: baseUrl+params.url , //仅为示例，非真实的接口地址
            filePath: params.src,
            name: 'file',
            formData: {
                realName:"hhh"
            },
            header: {
                'content-type': 'multipart/form-data', // 默认值
                "token": uni.getStorageSync('Authorization'),
            },
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
export const requestuploadFile1 = (params) => {
    //var baseUrl = 'https://rrr.mynatapp.cc';
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: baseUrl + '/FindPet', //仅为示例，非真实的接口地址
            filePath: params.url,
            name: 'file',
            formData: {
                'type': params.type,
                // 'PID': params.PID,
            },
            header: {
                'content-type': 'multipart/‘form-data', // 默认值
                "token": uni.getStorageSync('Authorization'),
            },
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}