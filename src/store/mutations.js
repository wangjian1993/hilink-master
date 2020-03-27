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
	[types.SET_PLAY_HISTORY](state, history) {
		state.playHistory = history
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
	[types.LOADINGFLAG](state, data) {
		state.loadingFlag = data;
	},
	[types.ENGLISHDATA](state, data) {
		state.albumid = data;
	},
	[types.SET_UPFLAG](state, data) {
		state.upDate = data;
	},
	[types.SET_AUDIO_DOM](state, data) {
		state.$audio = data;
	},
	[types.SET_AUDIO_ID](state, data) {
		state.audioId = data
		console.log("试听===", data)
	},
	setDevName(state, data) {
		state.devName = data;
	},
	setswitch(state, data) {
		// if (state.isLine == 0) {
		state.lampSwitch = data;
		state.isLine = data;
		state.audioInfo.song = null
		state.audioInfo.cutSong = -1
		state.audioInfo.play = -1
		state.volume = 0
		state.playMode = -1
		state.earLight.on = 0
		state.faceLight.on = 0
		state.lookData = 0
		// }
	},
	setDeviceTimeFn(state, data) {
		state.deviceTime = 0;
	},
	setisDeviceid(state, data) {
		state.isBubble = data;
	},
	defeatedMutation(state, data) {
		state.ifDefeated = data;
	},
	setistimePopu(state, data) {
		state.istimePopu = data;
	},
	locaTipMutation(state, data) {
		state.locaTip = data;
	},
	isShareDevie(state, data) {
		state.isShare = data;
	},
	locaFlagMutation(state, data) {
		state.locaFlag = data;
	},
	isClickBtnMutation(state, data) {
		state.isClickBtn = data;
	},
	loadingImgMutation(state, data) {
		state.loadingImg = data;
		console.log("state.loadingImg", state.loadingImg)
	},
	resultData(state, resData) {
		let type = resData;
		state.loadingFlag = true;
		switch (type.sid) {
			case 'switch':
				state.lampSwitch = resData.data.on;
				state.isLine = resData.data.on;
				if (state.isLine == 0) {
					state.deviceTime = 0;
					state.audioInfo.song = null
					state.audioInfo.cutSong = -1
					state.audioInfo.play = -1
					state.playMode = -1
					state.volume = 0
					state.earLight.on = 0
					state.faceLight.on = 0
					state.lookData = 0
				}
				console.log("设备上报开关===", state.lampSwitch);
				break;
			case 'Music':
				if (state.isLine == 1) {
					// let regex = /[!.、_ 0-9]/g;
					state.audioInfo.song = resData.data.song;
					state.audioInfo.cutSong = resData.data.cutSong;
					state.audioInfo.play = resData.data.play;
					state.volume = resData.data.volume;
				}
				break;
			case 'earLight':
				if (state.isLine == 1) {
					state.earLight.on = resData.data.on;
				}
				console.log("设备耳灯", state.earLight.on)
				break;
			case 'faceLight':
				if (state.isLine == 1) {
					state.faceLight.on = resData.data.on;
				}
				break;
			case "custom":
				if (resData.data.action == '104') {
					let type = resData.data.function;
					state.upflag = type.upflag;
					console.log("type.upflag===============");
					if (state.upflag != 0 && state.upflag != undefined && state.upflag != 1) {
						state.upDate = true;
					} else {
						state.upDate = false;
					}
				}
				break;
			default:
				break;
		}
	},
	getDeviceResult(state, data) {
		console.log("get获取数据====", data)
		if (data.action == 104) {
			var tmp = Date.parse(new Date()).toString();
			tmp = parseInt(tmp.substr(0, 10));
			if (tmp < data.timestamp) {
				console.log("timestamp1111111111111")
				let t = 28800000;
				let m = (data.timestamp - tmp) * 1000;
				state.deviceTime = m - t;
			} else {
				console.log("timestamp2222222222222")
				state.deviceTime = 0;
			}
			state.lookData = data.babylock;
			state.musicData = data;
			state.battery = data.battery
			state.playMode = data.playmode;
		}
	},
	resultFunction(state, customData) {
		var self = this;
		if (customData == undefined) {
			return;
		}
		let action = customData.action;
		state.loadingFlag = true;
		console.log("action=======", action)
		switch (action) {
			case 910:
				state.playMode = customData.playmode;
				break;
			case 628:
				state.lookData = customData.on;
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
				let array = state.localSongList.songs;
				if (state.songsCid != customData.channel) {
					return;
				}
				// state.localSongList.songs = array.concat(customData.songs);
				let list = array.concat(customData.songs);
				const res = new Map();
				let songList = list.filter((list) => !res.has(list.name) && res.set(list.name, 1));
				state.localSongList.songs = songList;
				state.localSongList.channel = customData.channel;
				state.localTotal = customData.total;
				state.limitNumber = Math.ceil(customData.total / 4);
				console.log("customData.total==========", customData.total);
				console.log("state.limitNumber==========", state.limitNumber);
				console.log("songsCid==========", state.songsCid);
				state.localSongList.total = customData.total;
				state.ifDefeated = false;
				state.locaFlag = true;
				state.loadingImg = false;
				state.locaTip = "点击加载更多";
				state.isClickBtn = false;
				break;
			case 642:
				console.log(" customData.albumid", customData.albumid)
				let albumArray = [];
				let str = customData.albumid;
				let str1 = str.split(":");
				str1.forEach(function(item, index) {
					let dataObj = {}
					let array = item.split("=")
					dataObj.id = array[0];
					dataObj.album = array[1];
					albumArray.push(dataObj);
				})
				state.albumid = albumArray;
				console.log("state.albumid===========", state.albumid)
				break;
			case 417:
				break;
			case 638:
				break;
			case 104:
				state.playMode = customData.playmode;
				state.musicData = customData;
				state.battery = customData.battery
				state.upflag = customData.upflag;
				console.log("customData================", customData)
				if (state.upflag != 0 && state.upflag != undefined && state.upflag != 1) {
					state.upDate = true;
				} else {
					state.upDate = false;
				}
				break;
			case 410:

				break;
			case 204:

				break;
			case 424:
				// if (customData.ret == 0) {
				// 	this.$toast({
				// 		message: '歌曲点播成功',
				// 		position: 'bottom',
				// 		duration: '3000',
				// 		className: 'toastActive'
				// 	});
				// }
				break;
			case 632:
				// state.istimePopu =true;
				console.log("customData.timestamp==========", customData.timestamp)
				var tmp = Date.parse(new Date()).toString();
				tmp = parseInt(tmp.substr(0, 10));
				if (tmp < customData.timestamp && state.isLine == 1) {
					let t = 28800000;
					let m = (customData.timestamp - tmp) * 1000;
					state.deviceTime = m - t;
					console.log("state.deviceTime========", state.deviceTime);
				} else {
					state.deviceTime = 0;
				}
				break;
			default:
				break;
		}
	},
}
export default mutations
