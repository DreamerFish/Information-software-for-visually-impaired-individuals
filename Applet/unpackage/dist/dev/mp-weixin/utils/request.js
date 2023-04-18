"use strict";
var common_vendor = require("../common/vendor.js");
var baseUrl = "https://www.gdouhc.top/blind/api";
const get = (params) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + params.url,
      data: params.data,
      header: {
        "content-type": "application/json",
        "token": common_vendor.index.getStorageSync("Authorization")
      },
      method: "get",
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
const post = (params) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + params.url,
      data: params.data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": common_vendor.index.getStorageSync("Authorization")
      },
      method: "POST",
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
const uploadFile = (params) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.uploadFile({
      url: baseUrl + params.url,
      filePath: params.src,
      name: "file",
      formData: {
        realName: "hhh"
      },
      header: {
        "content-type": "multipart/form-data",
        "token": common_vendor.index.getStorageSync("Authorization")
      },
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
exports.get = get;
exports.post = post;
exports.uploadFile = uploadFile;
