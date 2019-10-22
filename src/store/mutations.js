// export const mutationsMsg = (state, payload) => {
//   state.tabStates = payload.tabStates;
// }
import * as types from './mutation-type.js';
const mutations = {
	[types.GET_DEVICESINFO](state, data) {
		state.devicesInfo = data;
	},
	[types.SET_TIMEPOPUP](state, data) {
		state.timePopup = !state.timePopup;
	},
	[types.SET_PLAYDATA](state, data) {
		state.playData = [];
		state.playData = data;
	},
	[types.GET_LOCALLIST](state, data) {
		state.localList = data;
	},
	[types.PUT_LOCALLIST](state, data) {
		state.localTotal = data.total
		let cid = localStorage.getItem("cid");
		// if (data.channel == cid) {
		state.localSongList = data;
		// } else {
		// 	state.localSongList = data;
		// }
	},
	[types.SET_MUSICDATA](state, data) {
		state.musicData = data;
	},
	[types.SET_PLAYMODE](state, data) {
		state.playMode = data;
	},
	[types.SETLOCALCID](state, data) {
		state.songsCid = data;
	},
	[types.LOADINGFLAG](state,data){
		state.loadingFlag =data;
	},
	setDevName(state,data){
		state.devName =data;
		console.log("state.devName==",state.devName)
	},
	setDeviceTimeFn(state,data){
		state.deviceTime =0;
	},
	resultData(state, resData) {
		let type = resData;
		state.loadingFlag =true;
		console.log("state.loadingFlag========",state.loadingFlag)
		switch (type.sid) {
			case 'switch':
				state.lampSwitch = resData.data.on;
				state.isLine = resData.data.on;
				console.log("设备上报开关===", state.lampSwitch);
				break;
			case 'Music':
				state.audioInfo.song = resData.data.song;
				state.audioInfo.cutSong = resData.data.cutSong;
				state.audioInfo.play = resData.data.play;
				state.volume = resData.data.volume;
				console.log("音乐上下一曲", state.audioInfo.cutSong)
				console.log("音乐开关===", state.audioInfo.play)
				console.log("音乐名称===", state.audioInfo.song)
				console.log("音乐音量===", state.volume)
				break;
			case 'earLight':
				state.earLight.on = resData.data.on;
				console.log("设备耳灯", state.earLight.on)
				break;
			case 'faceLight':
				state.faceLight.on = resData.data.on;
				console.log("设备表情灯", state.faceLight.on)
				break;
			case "custom":
				if (resData.data.action == '104') {
					state.playMode = resData.data.playmode;
					console.log("设备播放模式====", state.playMode);
				}
				break;
			default:
				break;
		}
	},
	resultFunction(state, customData) {
		var self = this;
		if (customData == undefined) {
			return;
		}
		let action = customData.action;
		state.loadingFlag =true;
		console.log("action=======",action)
		switch (action) {
			case 910:
				state.playMode = customData.playmode;
				console.log("设置播放模式===", state.playMode)
				break;
			case 628:
				state.lookData = customData.on;
				console.log("设置童锁===", state.lookData)
				break;
			case 406:
				console.log("customData.lists[0]", customData.lists[0])
				state.localList = customData.lists[0];
				let localListArray = state.localList.channels;
				localListArray.forEach(function(item, i) {
					if (item.name == "我的收藏") {
						state.loveCid = item.cid
					}
				});
				break;
			case 402:
				let obj = {
					total: 0,
					channel: -1,
					songs: []
				};
				let array = state.localSongList.songs
				state.localSongList.songs = array.concat(customData.songs);
				state.localSongList.channel = customData.channel;
				state.localSongList.total = customData.total;
				state.localTotal = customData.total;
				console.log("获取本地歌曲列表===", state.localSongList)
				break;
			case 642:
				let albumArray = [];
				let str = customData.albumid;
				let str1 = str.split(":");
				str1.forEach(function(item, index) {
					albumArray.push(item.split("="))
				})
				state.albumid = albumArray;
				console.log("英语启蒙查询===", state.albumid)
				break;
			case 417:
				if (customData.ret == 0) {
					// this.$toast({
					// 	message: "歌曲收藏成功",
					// 	position: "bottom",
					// 	duration: "3000",
					// 	className: "toastActive"
					// });
				}
				break;
			case 638:
				break;
			case 104:
				state.musicData = customData;
				break;
			case 410:
				// this.$toast({
				// 	message: "歌曲添加下载成功",
				// 	position: "bottom",
				// 	duration: "3000",
				// 	className: "toastActive"
				// });
				break;
			case 424:
				if (customData.ret == 0) {
					// this.$toast({
					// 	message: "歌曲删除成功",
					// 	position: "bottom",
					// 	duration: "3000",
					// 	className: "toastActive"
					// });
					// this.devicesAction(641);
				}
				break;
			case 632:
				var tmp = Date.parse(new Date()).toString();
				tmp = parseInt(tmp.substr(0, 10));
				if (tmp < customData.timestamp) {
					let t =28800000;
					let m = (customData.timestamp - tmp) * 1000;
					state.deviceTime =m -t;
				} else {
					console.log("关闭设备定时=============")
					state.deviceTime = 0;
					console.log("state.deviceTime",state.deviceTime)
				}
				break;
			default:
				break;
		}
	},
}
export default mutations
