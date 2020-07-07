<template>
  <div class="wrapper">
    <span
      v-for="item in rowData"
      :key="item.id"
      :style="wrapperStyle"
      @click="handleAlbumClick(item)"
    >
      <van-row :style="{ height: rowHeight + 'px' }">
        <img
          lazy-load
          :style="{ 'object-fit': imgFit }"
          :src="item.coverImage"
        />
        <cover-index
          :type="albumType"
          :data="item"
          :pdata="parentItem"
        ></cover-index>
      </van-row>
      <p>{{ item.name }}</p>
      <p v-if="parentItem.isPaydata"><span>&#165;</span>{{ item.fee }}</p>
    </span>
  </div>
</template>
<script>
import CoverIndex from "./cover-index";
import { mapState, mapGetters } from "vuex";
import ALBUMTYPE from "@/constants/album-type";
import * as CONSTANTS from "@/constants/index";
export default {
  props: {
    list: {
      type: Object,
      default: () => { },
    },
    parentItem: {
      type: Object,
      default: () => { },
    },
  },
  components: { CoverIndex },
  mounted () { },
  data () {
    return {};
  },
  computed: {
    ...mapGetters(["user", "app", "device"]),
    userId () {
      return this.user.userId || null;
    },
    OPENID () {
      return this.app.openId;
    },
    DEVICEID () {
      return this.device.deviceId;
    },
    DID () {
      return this.device.socket.did;
    },
    /**
     * albumType类型:
     * 10：音频列表
     * 20：视频列表
     * 30：绘本列表
     * 40：音频专辑列表
     * 50：视频专辑列表
     * 60：书单列表
     * 70：轮播广告
     * 80：icon图
     */
    albumType () {
      return this.parentItem.type;
    },
    albumName () {
      return this.parentItem.name;
    },
    albumId () {
      return this.parentItem.id;
    },
    rowData () {
      return this.list.data;
    },
    rowList () {
      return this.list.row;
    },
    //列数
    columnSpan () {
      return this.rowList.column;
    },
    columnPercent () {
      return 100 / this.columnSpan;
    },
    imgFit () {
      if (this.columnSpan * 1 === 1) return "cover";
      return "fill";
    },
    rowHeight () {
      if (this.columnSpan * 1 === 1) return "165";
      if (this.columnSpan * 1 === 2) return "165";
      return "105";
    },
    wrapperStyle () {
      if (this.columnSpan * 1 === 1)
        return {
          width: "100%",
          "min-height": "192px",
        };
      if (this.columnSpan * 1 === 2)
        return {
          width: "165px",
          "min-height": "192px",
        };
      return {
        width: "105px",
        "min-height": "132px",
      };
    },
  },
  filters: {},
  watch: {},
  methods: {
    handleAlbumClick (albumData = {}) {
      this.handleRecommendTracking(albumData);
      switch (this.albumType * 1) {
        case ALBUMTYPE.PAYDATA:
          window.open(albumData.link, "_self");
          break;
        case ALBUMTYPE.AUDIO:
          break;
        case ALBUMTYPE.AUDIOLIST:
          this.handleRedirectAudio(albumData);
          break;
        case ALBUMTYPE.VIDEOLIST:
          this.handleRedirectVideo(albumData);
          break;

        default:
          break;
      }
    },
    async handleRedirectAudio (albumData = {}) {
      const { id } = albumData;
      const item = albumData;

      if (item.isXMLY) {
        let params = {
          msg: `${item.typeName}:${this.DID},${this.OPENID}`,
        };
        const { data } = await this.$axios.getXmlyData(params);
        const resData = data.res.data;
        const deviceKey = `${item.typeName}:${this.DID}`;
        const openKey = this.OPENID;

        let obj = {};
        for (let p in resData) {
          if (p == openKey) {
            obj.openId = resData[p];
          }
          if (p == deviceKey) {
            obj.msg = resData[p];
          }
        }

        setTimeout(() => {
          window.open(
            `http://api.ximalayaos.com/wxalilo/alilo/music.do?open_id=${obj.openId}&device_msg=${obj.msg}`,
            "_self"
          );
        }, 2000);

        return;
      }

      this.$router.push({
        path: "/content/albumDetail",
        query: {
          id: id,
        },
      });
    },
    handleRedirectVideo (albumData = {}) {
      const { id } = albumData;
      this.$router.push({
        path: "/content/video",
        query: {
          id: id,
        },
      });
    },
    //埋点
    handleRecommendTracking (albumData = {}) {
      const { name } = this.parentItem;
      const { idx, id, resType } = albumData;
      const params = {
        type: resType,
        module_name: name,
        locate: idx,
        content_id: id,
        content_name: albumData.name,
      };

      if (albumData.isXMLY) return this.$store.dispatch(
        CONSTANTS.TRACKING_ICONLIST_CLICK,
        CONSTANTS.LABEL_XMLY_AREA
      );
      this.$store.dispatch(CONSTANTS.TRACKING_RECOMMEND, params);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  display: flex;
  margin: 0;
  overflow: auto;
  & > span:first-child {
    margin-left: 0px;
  }
  & > span:last-child {
    margin-right: 0px;
  }

  & > span {
    width: 100%;
    margin-top: 0.2rem;
    margin-left: 6px;
    margin-right: 6px;
    font-size: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > div {
      width: 100%;
      flex-grow: 1;
      display: inline-block !important;
      position: relative;
      border-radius: 0.2rem !important;

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 5px !important;
      }
    }

    // 专辑名称
    & > p {
      width: 100%;
      height: 17px;
      font-size: 14px;
      margin-top: 5px;
      white-space: nowrap;
      overflow: hidden !important;
      flex-grow: 1;
      flex-wrap: nowrap;
      display: inline-block !important;
      text-overflow: ellipsis;
      text-align: left;
      // background-color: #00ffff;
    }

    // 付费精选 价格
    & > p:nth-of-type(2) {
      color: #ff0000;
      & > span {
        margin-right: 4px;
      }
      // letter-spacing: 1px;
    }
  }
}
</style>
<style>
/* .van-image__img {
  border-radius: 0.2rem;
}
.van-image__error {
  border-radius: 0.2rem;
} */
</style>
