<template>
  <div class="wrapper">
    <div
      v-for="item in listWith"
      :key="item.id"
    >
      <!-- 标题 && 更多 arrow key -->
      <p>
        {{ item.name }}
        <span @click="handleMoreAlbum(item)">更多
          <van-image
            width="20"
            height="20"
            :src="moreIcon"
          /></span>
      </p>

      <!-- 专辑列表 -->
      <row-item
        v-for="childItem in item.resListWith"
        :key="`${childItem.id}`"
        :parentItem="item"
        :list="childItem"
      ></row-item>
    </div>
  </div>
</template>
<script>
import RowItem from "./RowItem";
import ALBUMTYPE from "@/constants/album-type";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    rowMaxNum: {
      type: [Number, String],
      default: 3,
    },
  },
  components: { RowItem },
  mounted () { },
  data () {
    return {
      validateType: [
        ALBUMTYPE.PAYDATA,
        ALBUMTYPE.AUDIO,
        ALBUMTYPE.AUDIOLIST,
        ALBUMTYPE.VIDEOLIST,
      ],
    };
  },
  computed: {
    moreIcon () {
      return require("@/assets/images/more.png");
    },
    //筛选不支持的type数据
    validateList () {
      return this.list.filter((item) =>
        this.validateType.includes(item.type * 1)
      );
    },
    //添加行数据截断的index
    transformColStyle () {
      return this.validateList.map((item) => {
        const columnStyle = this.getColumnStyle(
          item.columnStyle,
          item.resList.length
        );
        return {
          ...item,
          columnStyle,
        };
      });
    },
    //获取对应一行多少列数据的组合
    listWith () {
      return this.transformColStyle.map((item) => {
        const resList = item.resList.map((i, idx) => ({ ...i, idx }));
        const list = item.columnStyle.map((val) => {
          return {
            id: `${val.column}-${val.startIdx}-${val.endIdx}`,
            row: val,
            data: resList.slice(val.startIdx * 1, val.endIdx * 1),
          };
        });

        return {
          ...item,
          resListWith: list,
        };
      });
    },
  },
  filters: {},
  watch: {},
  methods: {
    //更改columnStyle的数据结构,方便后续的slice截断
    getColumnStyle (colStyle = [], len = 0) {
      let lastStartValue = 0;

      //columnStyle为空时，默认截取全数组
      if (colStyle.length < 1)
        return [
          {
            column: len,
            startIdx: 0,
            endIdx: len,
          },
        ];

      let arr = [];
      for (let idx = 0; idx < colStyle.length; idx++) {
        let column = colStyle[idx]["column"];

        //某一行的列数超过rowMaxNum时,截取全部
        if (column * 1 > this.rowMaxNum * 1) {
          arr.push({
            column,
            startIdx: lastStartValue,
            endIdx: len,
          });
          return arr;
        }

        arr.push({
          column: column,
          startIdx: lastStartValue,
          endIdx: lastStartValue * 1 + column * 1,
        });
        lastStartValue += column;
      }
      return arr;
    },
    //event listener: 更多资源
    handleMoreAlbum (item) {
      const { id, name, type } = item;

      switch (type * 1) {
        case ALBUMTYPE.PAYDATA:
          // window.open();
          this.handleRedirectPaylist();
          break;
        case ALBUMTYPE.AUDIO:
          break;
        case ALBUMTYPE.AUDIOLIST:
          this.handleRedirectAudioList(item);
          break;
        case ALBUMTYPE.VIDEOLIST:
          this.handleRedirectVideoList(item);
          break;

        default:
          break;
      }
    },
    //跳转到付费精选页面
    handleRedirectPaylist () {
      this.$store.dispatch("triggerEventTrac", "内容云_付费橱窗");
      this.$router.push({
        path: "/content/paylist",
      });
    },

    //跳转到音频列表页面
    handleRedirectAudioList (item) {
      const { id, name } = item;
      this.$router.push({
        path: "/content/albumlist",
        query: {
          name: name,
          id: id,
        },
      });
    },

    handleRedirectVideoList (item) {
      const { id } = item;
      this.$router.push({
        path: "/content/videolist",
        query: { id },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 91%;
  margin: 0.813rem auto;
  // background-color: #ff0000;

  & > div {
    margin-top: 15px;
    // 标题 && 更多 arrow key
    & > p {
      font-size: 20px;
      color: #222222;
      display: flex;
      align-items: center;
      & > span {
        margin-left: auto;
        font-size: 13px;
        color: #999999;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
