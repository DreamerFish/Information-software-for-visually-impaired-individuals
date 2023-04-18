if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(shared, vue) {
  "use strict";
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (shared.toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = shared.toTypeString(v).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = shared.toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$4 = {
    data() {
      return {
        tab_id: 0,
        title: ["\u8D28\u8BE2", "\u8BC6\u522B", "\u6211\u7684"],
        list: [{
          name: "\u63A8\u8350",
          url: "https://img0.baidu.com/it/u=4074740669,2453736771&fm=253&fmt=auto&app=120&f=JPEG?w=726&h=409"
        }, {
          name: "\u6587\u5316",
          url: "https://img1.baidu.com/it/u=2892815924,4215300856&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=334"
        }, {
          name: "\u5A31\u4E50",
          url: "https://img1.baidu.com/it/u=3667390427,992144121&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=250"
        }, {
          name: "\u519B\u4E8B",
          url: "https://img2.baidu.com/it/u=1558252553,998700072&fm=253&fmt=auto&app=120&f=JPEG?w=601&h=401"
        }, {
          name: "\u8D22\u7ECF",
          url: "https://img0.baidu.com/it/u=449784068,2025630918&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=359"
        }, {
          name: "\u79D1\u6280",
          url: "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00368-2504.jpg"
        }, {
          name: "\u4F53\u80B2",
          url: "https://img1.baidu.com/it/u=287010323,336248677&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=459"
        }],
        minelist: ["\u6536\u542C\u5386\u53F2", "\u6211\u7684\u8BA2\u9605", "\u6211\u559C\u6B22\u7684", "\u6211\u7684\u4E0B\u8F7D", "\u8BBE\u7F6E", "\u53CD\u9988"],
        user: uni.getStorageSync("user")
      };
    },
    onLoad(options) {
      formatAppLog("log", "at pages/index/index.vue:91", options);
      this.tab_id = options.tab_id || 0;
      this.user = uni.getStorageSync("user");
    },
    onShow: function() {
    },
    methods: {
      detail(e) {
        formatAppLog("log", "at pages/index/index.vue:99", e);
        uni.navigateTo({
          url: "../detail/detail?sort=" + e
        });
      },
      bindtop(e) {
        this.tab_id = e;
      },
      logIn(res) {
        uni.navigateTo({
          url: "../login/login"
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u9876\u90E8tab "),
      vue.createElementVNode("view", {
        class: "top_tab",
        st: ""
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.title, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "tabitem",
            key: index,
            onClick: ($event) => $options.bindtop(index)
          }, [
            vue.createElementVNode("view", {
              class: vue.normalizeClass($data.tab_id == index ? "selected" : "")
            }, vue.toDisplayString(item), 3)
          ], 8, ["onClick"]);
        }), 128))
      ]),
      vue.createCommentVNode(" \u641C\u7D22 "),
      $data.tab_id != 2 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "content"
      }, [
        vue.createElementVNode("view", { class: "input" }, " \u641C\u7D22 "),
        vue.createCommentVNode(" \u63A8\u8350 "),
        $data.tab_id == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: ""
        }, [
          vue.createElementVNode("view", { class: "" })
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" \u5206\u9875 "),
        $data.tab_id == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "list"
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.list, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "item",
              onClick: ($event) => $options.detail(item.name),
              key: index
            }, [
              vue.createElementVNode("view", { class: "" }, vue.toDisplayString(item.name), 1),
              vue.createElementVNode("view", { class: "item_image" }, [
                vue.createElementVNode("image", {
                  src: item.url,
                  mode: "scaleToFill"
                }, null, 8, ["src"])
              ])
            ], 8, ["onClick"]);
          }), 128))
        ])) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" \u6211\u7684 "),
      $data.tab_id == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "mine"
      }, [
        vue.createElementVNode("view", { class: "info" }, [
          vue.createCommentVNode(" \u5934\u50CF "),
          vue.createElementVNode("view", { class: "img" }, [
            vue.createElementVNode("image", {
              src: "https://img1.baidu.com/it/u=1659441821,1293635445&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
              mode: "scaleToFill"
            })
          ]),
          vue.createElementVNode("view", {
            class: "login",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.logIn && $options.logIn(...args))
          }, [
            vue.createElementVNode("view", { class: "login_text" }, " \u70B9\u51FB\u767B\u5F55 "),
            vue.createElementVNode("view", { class: "login_text1" }, " \u767B\u5F55\u4E4B\u540E\u6211\u4EEC\u66F4\u61C2\u4F60 ")
          ])
        ]),
        vue.createCommentVNode(" \u5217\u8868 "),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.minelist, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "minelist",
            key: index
          }, [
            vue.createElementVNode("view", { class: "text" }, vue.toDisplayString(item), 1)
          ]);
        }), 128))
      ])) : vue.createCommentVNode("v-if", true)
    ], 64);
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "/Users/mac/Desktop/uinapp/\u57FA\u4E8E\u7528\u6237\u884C\u4E3A\u5206\u6790\u7684\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/pages/index/index.vue"]]);
  var baseUrl = "https://www.gdouhc.top/blind/api";
  const get = (params) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseUrl + params.url,
        data: params.data,
        header: {
          "content-type": "application/json",
          "token": uni.getStorageSync("Authorization")
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
      uni.request({
        url: baseUrl + params.url,
        data: params.data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "token": uni.getStorageSync("Authorization")
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
      uni.uploadFile({
        url: baseUrl + params.url,
        filePath: params.src,
        name: "file",
        formData: {
          realName: "hhh"
        },
        header: {
          "content-type": "multipart/form-data",
          "token": uni.getStorageSync("Authorization")
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
  var bgAudioManager = uni.getBackgroundAudioManager();
  const _sfc_main$3 = {
    data() {
      return {
        info: [],
        audioNesw: ""
      };
    },
    onLoad(options) {
      this.title = options.sort;
      uni.setNavigationBarTitle({
        title: options.sort
      });
      this.news(options.sort);
      uni.onSocketMessage((res) => {
        formatAppLog("log", "at pages/detail/detail.vue:45", "\u6536\u5230\u670D\u52A1\u5668\u5185\u5BB9\uFF1A", JSON.parse(res.data));
        if (JSON.parse(res.data).Bytext != void 0) {
          this.info = this.info.concat(JSON.parse(res.data).Bytext);
        } else {
          this.voice = JSON.parse(res.data).ByVoice;
        }
        formatAppLog("log", "at pages/detail/detail.vue:52", this.info);
        this.audio();
      });
    },
    onPullDownRefresh() {
      this.info = [], this.news(this.title);
      this.serialNumber = 0;
    },
    onReachBottom() {
      formatAppLog("log", "at pages/detail/detail.vue:65", 555);
    },
    methods: {
      news(e) {
        get({
          url: "/news/sendTypeToDeepin",
          data: {
            typeName: e
          }
        }).then((res) => {
          formatAppLog("log", "at pages/detail/detail.vue:78", res);
        });
      },
      audio(e) {
        formatAppLog("log", "at pages/detail/detail.vue:85", e || 0);
        formatAppLog("log", "at pages/detail/detail.vue:86", "\u97F3\u9891\u83B7\u53D6");
        const {
          newsId,
          newsTitle,
          newsContent
        } = this.info[e || 0];
        formatAppLog("log", "at pages/detail/detail.vue:92", newsId, newsContent, newsTitle);
        post({
          url: "/news/createToVoice",
          data: {
            native_voice_name: "xiaoyan",
            newsId,
            newsContent,
            newsTitle,
            speed: 100,
            volume: 0
          }
        }).then((res) => {
          formatAppLog("log", "at pages/detail/detail.vue:107", res.data.data.data, "1213124");
          this.audioNesw = res.data.data.data;
          this.play(res.data.data.data, newsTitle);
        });
      },
      change(e) {
        this.audio(e.detail.current);
        formatAppLog("log", "at pages/detail/detail.vue:116", this.info[e.detail.current]);
        if (e.detail.current == this.info.length - 2) {
          this.news();
        }
      },
      play(url, newsTitle) {
        bgAudioManager.title = newsTitle;
        bgAudioManager.singer = "\u6682\u65E0";
        bgAudioManager.pause(true);
        bgAudioManager.coverImgUrl = "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png";
        bgAudioManager.src = url;
        bgAudioManager.duration;
        bgAudioManager.currentTime;
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("swiper", {
      class: "scroll",
      vertical: "true",
      "indicator-dots": "true",
      onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args))
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.info, (item, index) => {
        return vue.openBlock(), vue.createElementBlock("swiper-item", {
          class: "page",
          key: index
        }, [
          vue.createCommentVNode(" \u4FE1\u606F "),
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("view", { class: "title" }, vue.toDisplayString(item.newsId) + ":" + vue.toDisplayString(item.newsTitle), 1),
            vue.createElementVNode("view", { class: "text" }, vue.toDisplayString(item.newsContent), 1)
          ]),
          vue.createCommentVNode(" \u64AD\u653E\u5668 "),
          vue.createElementVNode("view", { class: "player" }, [
            vue.createCommentVNode(' 	<audio :src="this.audioNesw" controls="true" author="\u6682\u65E0" @play="play"></audio> '),
            vue.createElementVNode("view", { class: "iconfont icon-zanting" })
          ])
        ]);
      }), 128))
    ], 32);
  }
  var PagesDetailDetail = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "/Users/mac/Desktop/uinapp/\u57FA\u4E8E\u7528\u6237\u884C\u4E3A\u5206\u6790\u7684\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/pages/detail/detail.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("image", {
        class: "logo",
        src: "/static/logo.png"
      }),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode("text", { class: "title" }, vue.toDisplayString($data.title), 1)
      ])
    ]);
  }
  var PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "/Users/mac/Desktop/uinapp/\u57FA\u4E8E\u7528\u6237\u884C\u4E3A\u5206\u6790\u7684\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/pages/mine/mine.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        login: false,
        sort: true,
        src: ""
      };
    },
    onLoad(options) {
    },
    methods: {
      logins(e) {
        this.login = true;
        this.sort = e;
      },
      takePhoto() {
        const camera = uni.createCameraContext();
        camera.takePhoto({
          quality: "high"
        }).then((res) => {
          this.src = res.tempImagePath;
          formatAppLog("log", "at pages/login/login.vue:54", "\u62CD\u7167");
          uploadFile({
            url: "/face/register",
            src: res.tempImagePath
          }).then((res2) => {
            switch (JSON.parse(res2.data).data.msg) {
              case "\u7528\u6237\u5DF2\u5B58\u5728":
                this.logIn(this.src);
                break;
              case "\u6CE8\u518C\u6210\u529F":
                uni.setStorageSync("Authorization", res2.header.Authorization);
                uni.setStorageSync("user", JSON.parse(res2.data).data.user);
                uni.reLaunch({
                  url: "../index/index?login=true&tab_id=" + 2
                });
                uni.showToast({
                  title: "\u767B\u5F55\u6210\u529F",
                  duration: 2e3
                });
                break;
              default:
                uni.showToast({
                  title: "\u767B\u5F55\u5931\u8D25",
                  duration: 2e3
                });
                break;
            }
            formatAppLog("log", "at pages/login/login.vue:82", res2, "111");
            uni.setStorageSync("Authorization", res2.header.Authorization);
          });
        });
      },
      logIn(e) {
        formatAppLog("log", "at pages/login/login.vue:90", e);
        uploadFile({
          url: "/face/login",
          src: e
        }).then((res) => {
          formatAppLog("log", "at pages/login/login.vue:96", JSON.parse(res.data), res);
          switch (JSON.parse(res.data).data.msg) {
            case "\u767B\u5F55\u6210\u529F":
              uni.setStorageSync("Authorization", res.header.Authorization);
              uni.setStorageSync("user", JSON.parse(res.data).data.user);
              uni.reLaunch({
                url: "../index/index?login=true&tab_id=" + 2
              });
              uni.showToast({
                title: "\u767B\u5F55\u6210\u529F",
                duration: 2e3
              });
              break;
            default:
              uni.showToast({
                title: "\u767B\u5F55\u5931\u8D25",
                duration: 2e3
              });
              break;
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login" }, [
      vue.createCommentVNode(" \u767B\u5F55\u9875\u9762 "),
      !$data.login ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "success"
      }, [
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.logins(true))
        }, " \u4EBA\u8138\u767B\u5F55 "),
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.logins(false))
        }, " \u58F0\u7EB9\u767B\u5F55 ")
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" \u9A8C\u8BC1\u9875\u9762 "),
      $data.login ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "fail"
      }, [
        $data.sort ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: ""
        }, [
          vue.createElementVNode("camera", {
            "device-position": "front",
            flash: "auto",
            onError: _cache[2] || (_cache[2] = (...args) => _ctx.error && _ctx.error(...args)),
            style: { "width": "100%", "height": "300px" }
          }, null, 32),
          vue.createElementVNode("button", {
            type: "primary",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.takePhoto && $options.takePhoto(...args))
          }, "\u62CD\u7167"),
          vue.createElementVNode("image", {
            mode: "widthFix",
            src: $data.src
          }, null, 8, ["src"])
        ])) : vue.createCommentVNode("v-if", true),
        !$data.sort ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: ""
        }, " \u5F55\u97F3 ")) : vue.createCommentVNode("v-if", true)
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/mac/Desktop/uinapp/\u57FA\u4E8E\u7528\u6237\u884C\u4E3A\u5206\u6790\u7684\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/pages/login/login.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/detail/detail", PagesDetailDetail);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/login/login", PagesLoginLogin);
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
        uni.sendSocketMessage({
          data: JSON.stringify(msg)
        });
        this.serverTimeoutObj = setTimeout(() => {
          uni.closeSocket();
        }, this.timeout);
      }, this.timeout);
    }
  };
  const _sfc_main = {
    onLaunch: function() {
      this.connectStart();
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:34", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:37", "App Hide");
    },
    methods: {
      connectStart() {
        uni.connectSocket({
          url: "wss://www.gdouhc.top/blind/api/web",
          success: (res) => {
            formatAppLog("log", "at App.vue:45", "\u8FDB\u5165\u804A\u5929", res);
            this.onSocketMessage();
          },
          fail: (err) => {
            uni.showToast({
              title: "\u7F51\u7EDC\u5F02\u5E38!"
            });
            formatAppLog("log", "at App.vue:53", err);
          }
        });
      },
      onSocketMessage() {
        formatAppLog("log", "at App.vue:60", "123");
        uni.onSocketOpen(function(res) {
          formatAppLog("log", "at App.vue:63", "WebSocket\u8FDE\u63A5\u5DF2\u6253\u5F00\uFF01");
          heartCheck.reset().start();
        });
        uni.onSocketError((err) => {
          formatAppLog("log", "at App.vue:68", "websocket\u8FDE\u63A5\u5931\u8D25", err);
          this.reconnect();
        });
        uni.onSocketClose((res) => {
          formatAppLog("log", "at App.vue:74", "WebSocket \u5DF2\u5173\u95ED\uFF01");
          this.reconnect();
        });
      },
      reconnect() {
        formatAppLog("log", "at App.vue:80", "\u91CD\u65B0\u8FDE\u63A5");
        this.lockReconnect = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.connectStart();
        }, 5e3);
      }
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/mac/Desktop/uinapp/\u57FA\u4E8E\u7528\u6237\u884C\u4E3A\u5206\u6790\u7684\u89C6\u969C\u4EBA\u58EB\u8D44\u8BAF\u8F85\u52A9\u8F6F\u4EF6/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(uni.VueShared, Vue);
