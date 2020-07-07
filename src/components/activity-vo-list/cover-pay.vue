<template>
  <div class="wrapper" :style="{ backgroundImage: `url(${IMAGES.mod})` }">
    付费
  </div>
</template>
<script>
import ALLIMAGES from "@/utils/images/index";
import ALBUMTYPE from "@/constants/album-type";
export default {
  props: {
    type: {
      required: true,
      type: [String, Number],
      default: 0,
    },
    data: {
      required: true,
      type: Object,
      default: () => {},
    },
    pdata: {
      required: true,
      type: Object,
      default: () => {},
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    IMAGES() {
      return ALLIMAGES.content;
    },
    icon() {
      if (this.type * 1 === ALBUMTYPE.AUDIOLIST) return this.IMAGES.musicIcon;
      if (this.type * 1 === ALBUMTYPE.VIDEOLIST) return this.IMAGES.videoIcon;
      return null;
    },
    childResCount() {
      if (this.type * 1 === 10) return this.data.browseCount;
      return this.data.childResCount;
    },
    coverText() {
      if (this.type * 1 === ALBUMTYPE.AUDIOLIST) return "首";
      if (this.type * 1 === ALBUMTYPE.VIDEOLIST) return "集";
      return null;
    },
  },
  mounted() {},
  filters: {},
  watch: {},
  methods: {},
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 45px;
  height: 20px;
  position: absolute;
  top: 0px;
  right: 0px;
  border-top-right-radius: 0.2rem !important;
  border-bottom-left-radius: 5px !important;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #dfba4d;
  // justify-content: space-around;
  & > div:first-of-type {
    width: 16px;
    height: 16px;
    margin-left: 2px;
    margin-right: 2px;
  }
}
</style>
