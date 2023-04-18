"use strict";
var common_vendor = require("../../../../common/vendor.js");
function ChildrenMixin(parent, options = {}) {
  options.indexKey || "index";
  return {
    inject: {
      [parent]: {
        default: null
      }
    },
    mounted() {
      this.parent = this[parent];
      this.bindRelation();
    },
    beforeUnmount() {
      if (this.parent) {
        this.parent.children = this.parent.children.filter((item) => item !== this);
        common_vendor.index.$emit("childrenReady" + this.parent._uid, this);
      }
    },
    methods: {
      bindRelation() {
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          return;
        }
        const children = [...this.parent.children, this];
        this.parent.children = children;
        this.index = this.parent.children.indexOf(this);
        common_vendor.index.$emit("childrenReady" + this.parent._uid, this);
      }
    }
  };
}
function ParentMixin(parent) {
  return {
    provide() {
      return {
        [parent]: this
      };
    },
    created() {
      this.children = [];
    },
    beforeUnmount() {
      common_vendor.index.$off("childrenReady" + this._uid);
    }
  };
}
exports.ChildrenMixin = ChildrenMixin;
exports.ParentMixin = ParentMixin;
