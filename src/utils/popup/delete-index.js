import {merge} from "@/utils/index";

let isSeed = 1;
let scrollBarWidth = 0;

const hookTransition = (transition) => {
  const getInstance = (element) => {
    let instance = element.__vue__;

    if (!instance) {
      const textNode = element.previousSibling;
      if (textNode.__vue__) {
        instance = textNode.__vue__;
      }
    }

    return instance;
  };

  Vue.transition(transition, {
    afterEnter (el) {
      const instance = getInstance(el);
      if (instance) instance.doAfterOpen && instance.doAfterOpen();
    },
    afterLeave (el) {
      const instance = getInstance(el);
      if (instance) instance.doAfterClose && instance.doAfterClose();
    },
  });
};

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    zIndex: {},
    transition: {
      type: String,
      default: "",
    },
    openDelay: {},
    closeDelay: {},
    modal: {
      type: Boolean,
      default: false,
    },
    modalClass: {},
    modalFade: {
      type: Boolean,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
  },
  created () {
    if (this.transition) hookTransition(transition);
  },
  beforeMount () { },
  beforeDestroy () { },
  data () {
    return {
      opened: false,
      bodyOverflow: null,
      bodyPaddingRight: null,
      rendered: false
    }

  },
  watch: {},
  methods: {
    open () {

      if (!this.rendered) {
        this.rendered = true;
        this.$emit("input", true);
      }
      
      const props = merge({}, this, options, this.$props);

      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }

      clearTimeout(this._openTimer);
      const openDelay = Number(this.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null;
          this.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },
    doOpen () {
      
    },
    doAfterOpen () { },
    close () {
      clearTimeout(this._closeTimer);

      const closeDelay = Number(this.closeDelay);
      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null;
          this.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },
    doClose () { },
    doAfterClose () { }
  },
};
