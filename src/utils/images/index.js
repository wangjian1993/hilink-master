// import contentImages from "./content";

module.exports = {
  // contentImages,
  // avtivity-vo-list
  content: {
    mod: require("@/assets/images/home_mokuai_bg.png"),
    musicIcon: require("@/assets/images/home_icon_yinyue.png"),
    videoIcon: require("@/assets/images/video_white.png"),
    device_online_play_icon: require("@/assets/images/icon_audio.png"),
    device_offline_play_icon: require("@/assets/images/icon_shouting.png"),
    device_offline_playing_icon: require("@/assets/images/huiben_xiangqing_playing.gif"),
    device_offline_pause_icon: require("@/assets/images/playing.png"),

  },
  upgradeOverlay: {
    logo: require('@/assets/images/mask_logo.png')
  },
  videoIcon: require('@/assets/images/icon_video.png'),
  timeIcon: require('@/assets/images/icon_time.png'),
  multiDevices: {
    choosen: require('@/assets/images/multi_devices/ic_chosen@3x.png'),
    add: require('@/assets/images/multi_devices/icon_tianjia@3x.png'),
    noChecked: require('@/assets/images/multi_devices/no_checked.png'),
    checked: require('@/assets/images/multi_devices/checked.png')
  },
  search: {
    notFound: require('@/assets/images/404.png'),
    searchIcon: require('@/assets/images/home_icon_search.png'),
  }
};