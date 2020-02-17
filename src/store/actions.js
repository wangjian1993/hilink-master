import * as types from "./mutation-type.js";
import {
  savePlay
} from '../assets/js/cache'
export default {

	//获取设备全部信息
	getDevicesInfo({
		commit
	}, data) {
		commit(types.GET_DEVICESINFO, data);
	},
	setTimePopup({
		commit
	}, data) {
		commit(types.SET_TIMEPOPUP, data);
	},
	setPlayData({
		commit
	}, data) {
		commit(types.SET_PLAYDATA, data);
	},
	getLocalList({
		commit
	}, data) {
		commit(types.GET_LOCALLIST, data);
	},
	putLocalList({
		commit
	}, data) {
		commit(types.PUT_LOCALLIST, data);
	},
	setMusciData({
		commit
	}, data) {
		commit(types.SET_MUSICDATA, data);
	},
	setPlayMode({
		commit
	}, data) {
		commit(types.SET_PLAYMODE, data);
	},
	setLoadingFlag({
		commit
	}, data) {
		commit(types.LOADINGFLAG, data);
	},
	setLocalCid({
		commit
	}, data) {
		commit(types.SETLOCALCID, data);
	},
	setEnglishData({
		commit
	}, data) {
		commit(types.ENGLISHDATA, data);
	},
	setDeviceidFlag({
		commit
	}, data) {
		commit("setisDeviceid", data);
	},
	defeatedActions({
		commit
	}, data) {
		commit("defeatedMutation", data);
	},
	locaTipActions({
		commit
	}, data) {
		commit("locaTipMutation", data)
	},
	deviceSwitch({
		commit
	}, data) {
		commit("setswitch", data);
	},
	isTimePopu({
		commit
	}, data) {
		commit("setistimePopu", data)
	},
	locaFlagActions({
		commit
	}, data) {
		commit("locaFlagMutation", data)
	},
	isClickBtnActions({
		commit
	}, data) {
		commit("isClickBtnMutation", data)
	},
	loadingImgActions({
		commit
	}, data) {
		commit("loadingImgMutation", data)
	},
	savePlayHistory({
		commit
	}, data) {
		commit(types.SET_PLAY_HISTORY, savePlay(data))
	},
	//获取设备信息
	getDevCacheAll() {
		if (window.hilink != undefined) {
			console.log("获取全部信息========")
			window.hilink.getDevCacheAll("0", "", "resultCallback");
			window.hilink.getUserRole("shareCallback");
		}
	},
	//获取本地歌曲列表
	setDeviceTime({
		commit
	}, data) {
		commit("setDeviceTimeFn", data)
	},
	actionsUpFlag({
		commit
	}, data) {
		commit(types.SET_UPFLAG, data)
	},
	getDeviceAll({
		commit
	}, data) {
		window.hilink.getDevInfo("0", 'custom', '', "getResultCallback");
	},
	//获取本地歌曲列表
	getDevLocal({
		commit
	}, data) {
		if (window.hilink != undefined) {
			let d = {
				from: 'DID:0',
				to: 'UID:-1',
				action: 405
			};
			let localData = JSON.stringify(d);
			let json = {
				custom: {
					function: localData
				}
			};
			let body = JSON.stringify(json);
			window.hilink.setDeviceInfoWithoutCallback("0", body);
		}
	},
	setDevInfo({
		commit
	}, data) {
		if (window.hilink != undefined) {
			let body = JSON.stringify(data);
			// window.hilink.setDeviceInfoWithoutCallback("0", body,);
			console.log("发送给设备===", body)
			window.hilink.setDeviceInfo("0", body, "getDeviceInfoData");
		}
	},
	setBackPressed({
		commit
	}, data) {
		if (window.hilink != undefined) {
			console.log("重写设备返回========")
			window.hilink.overrideBackPressed(true, "backPressedCallback");
		}
	},
	actionsDeviceName({
		commit
	}, data) {
		commit("setDevName", data);
	},
	delSongsList({
		commit
	}, data) {
		if (window.hilink != undefined) {
			let body = JSON.stringify(data);
			window.hilink.setDeviceInfoWithoutCallback("0", body);
			// window.hilink.setDeviceInfo("0", body,"songsListBack");
		}
	},
	getSongsList({
		commit
	}, data) {
		if (window.hilink != undefined) {
			let body = JSON.stringify(data);
			window.hilink.setDeviceInfoWithoutCallback("0", body);
			// window.hilink.setDeviceInfo("0", body,"delListBack");
		}
	},
	init({
		commit
	}) {
		window.resultCallback = (res) => {
			let json;
			try {
				json = JSON.parse(res);
			} catch (error) {
				var dataStr = res.replace(/:"{/g, ':{');
				dataStr = dataStr.replace(/}",/g, '},');
				dataStr = dataStr.replace(/}"/g, '}');
				dataStr = dataStr.replace(/\\/g, '');
				dataStr = dataStr.replace(/\n/g, '');
				json = JSON.parse(dataStr);
			}
			let deviceid = localStorage.getItem(json.devId);
			let userName = localStorage.getItem('iphone');
			console.log("json==============", json)
			console.log("userName=======", userName)
			if (userName) {
				//相同手机
				console.log("1111")
				if (deviceid == json.devId) {
					commit("setisDeviceid", false);
				} else {
					commit("setisDeviceid", true);
					localStorage.setItem(json.devId, json.devId);
				}
			} else {
				//不同手机
				console.log("2222")
				commit("setisDeviceid", true);
				localStorage.setItem(json.devId, json.devId);
				localStorage.setItem("iphone", true);
			}
			commit("setDevName", json.devName);
			json.services.forEach(function(item, index) {
				commit("resultData", item)
			})

		}

		window.deviceEventCallback = (res) => {
			let json;
			try {
				json = JSON.parse(res);
			} catch (error) {
				var dataStr = res.replace(/:"{/g, ':{');
				dataStr = dataStr.replace(/}",/g, '},');
				dataStr = dataStr.replace(/}"/g, '}');
				dataStr = dataStr.replace(/\\/g, '');
				dataStr = dataStr.replace(/\n/g, '');
				json = JSON.parse(dataStr);
			}
			if (json.sid == "custom") {
				let item = json.data.function;
				commit("resultFunction", item)
			} else {
				commit("resultData", json)
			}
		}

		window.localResult = (res) => {
			console.log("本地歌曲列表", res);
		}
		window.getResultCallback = (res) => {
			let json = JSON.parse(res);
			commit("getDeviceResult", json)
		}
		window.getDeviceInfoData = (res) => {
			let json = JSON.parse(res);
			console.log("发送消息res===", res)
			if (res.errcode != 0) {
				commit(types.LOADINGFLAG, true);
			}
		}

		window.shareCallback = res => {
			console.log("判断设备分享=======", res)
			if (res == 0) {
				commit("isShareDevie", true);
			} else {
				commit("isShareDevie", false);
			}
		}
	}
};
