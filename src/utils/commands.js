
import BASE64TOOLS from "./base64";

export default {
  /**
   * 歌曲批量收藏
   * h5:{“from”:”UID:“,”to”:”DID:“,”action”:416,songlistname:”专辑名称”,songlistid:”专辑id”,songs:[{id:0,name:”火火兔”,url:””}]}}songs多首歌曲
   * 设备:{“from”:”UID:“,”to”:”DID:“,”action”:417,”ret”:0} ret:0成功收藏
   */
  getBatchFavorMsg: function (params) {
    const {uid, did, songs, songlistname, songlistid} = params;
    let msg = `{"from":"UID:${uid}","to":"DID:${did}","action":416,"songs":${songs},"songlistname":"${songlistname}","songlistid":${songlistid}}`
    let encodeMsg = BASE64TOOLS.doEncode(msg);
    return `{"protocolType":0,"body":"${encodeMsg}"}`
  },
  /**
   * 歌曲单曲收藏
   * h5:{“from”:”UID:“,”to”:”DID:“,”action”:416,songs:[{id:0,name:”火火兔”,url:””}]}
   * 设备:{“from”:”UID:“,”to”:”DID:“,”action”:417,”ret”:0} ret:0成功收藏
   */
  getSingleFavorMsg: function (params) {
    // var msg =
    //     '{"protocolType":0,"body":"' +
    //     that.$base64.doEncode(
    //       '{"from":"UID:' +
    //         that.uid +
    //         '","to":"DID:' +
    //         that.did +
    //         '","action":416,"songs":' +
    //         songs +
    //         "}"
    //     ) +
    //   '"}';
    
    const {uid, did, songs} = params;
    let msg = `{"from":"UID:${uid}","to":"DID:${did}","action":416,"songs":${songs}}`
    let encodeMsg = BASE64TOOLS.doEncode(msg);
    return `{"protocolType":0,"body":"${encodeMsg}"}`
  }
}