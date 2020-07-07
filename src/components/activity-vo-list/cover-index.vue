<script>
import CoverPay from "./cover-pay";
import CoverCount from "./cover-count";
import ALBUMTYPE from "@/constants/album-type";

export default {
  props: {
    type: {
      type: [String, Number],
      default: 0,
    },
    data: {
      type: Object,
      default: () => {},
    },
    pdata: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    CoverPay,
    CoverCount,
  },
  render(h) {
    const self = this;
    let comp = "";
    if (this.data.isXMLY) return; //过滤掉插入的喜马拉雅专辑

    switch (self.pdata.type * 1) {
      case ALBUMTYPE.PAYDATA:
        comp = "cover-pay";
        break;
      case ALBUMTYPE.VIDEOLIST:
      case ALBUMTYPE.AUDIOLIST:
        comp = "cover-count";
        break;
      default:
        break;
    }

    return h(comp, {
      props: {
        type: self.type,
        data: self.data,
        pdata: self.pdata,
      },
    });
  },
};
</script>
