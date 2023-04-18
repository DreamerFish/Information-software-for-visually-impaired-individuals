"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/detail/detail.js";
  "./pages/mine/mine.js";
  "./pages/login/login.js";
  "./components/news/news.js";
  "./pages/search/search.js";
  "./pages/recognition/recognition.js";
  "./pages/list/list.js";
  "./pages/photoDetails/photoDetails.js";
  "./pages/feedback/feedback.js";
  "./pages/preference/preference.js";
  "./pages/history/history.js";
  "./pages/SinglePhoto/SinglePhoto.js";
  "./pages/listDetail/listDetail.js";
  "./pages/searchResult/searchResult.js";
}
let heartCheck = {
  timeout: 1e5,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function() {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function() {
    this.timeoutObj = setTimeout(() => {
      let msg = {
        msg: "ping",
        toUser: "root"
      };
      common_vendor.index.sendSocketMessage({
        data: JSON.stringify(msg)
      });
      this.serverTimeoutObj = setTimeout(() => {
        common_vendor.index.closeSocket();
      }, this.timeout);
    }, this.timeout);
  }
};
const _sfc_main = {
  onLaunch: function() {
    this.connectStart();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    connectStart() {
      common_vendor.index.connectSocket({
        url: "wss://www.gdouhc.top/blind/api/web",
        success: (res) => {
          console.log("\u8FDB\u5165\u804A\u5929", res);
          this.onSocketMessage();
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "\u7F51\u7EDC\u5F02\u5E38!"
          });
          console.log(err);
        }
      });
    },
    onSocketMessage() {
      common_vendor.index.onSocketOpen(function(res) {
        console.log("WebSocket\u8FDE\u63A5\u5DF2\u6253\u5F00\uFF01");
        heartCheck.reset().start();
      });
      common_vendor.index.onSocketError((err) => {
        console.log("websocket\u8FDE\u63A5\u5931\u8D25", err);
        this.reconnect();
      });
      common_vendor.index.onSocketClose((res) => {
        console.log("WebSocket \u5DF2\u5173\u95ED\uFF01");
        this.reconnect();
      });
    },
    reconnect() {
      console.log("\u91CD\u65B0\u8FDE\u63A5");
      this.lockReconnect = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.connectStart();
      }, 5e3);
    }
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u524D\u7AEF/\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/\u5FAE\u4FE1\u6765\u7684/news/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
