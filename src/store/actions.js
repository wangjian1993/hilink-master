import * as types from "./mutation-type.js";

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
		console.log("英语data ==============",data)
		commit(types.ENGLISHDATA, data);
	},
	//获取设备信息
	getDevCacheAll() {
		if (window.hilink != undefined) {
			window.hilink.getDevCacheAll("0", "", "resultCallback");
		}
	},
	//获取本地歌曲列表
	setDeviceTime({
		commit
	}, data) {
		commit("setDeviceTimeFn",data)
	},
	getDeviceAll({
		commit
	},data){
		window.hilink.getDevInfo("0", 'custom','', "getResultCallback");
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
			let json = { custom: { function: localData } };
			let body = JSON.stringify(json);
			window.hilink.setDeviceInfoWithoutCallback("0", body);
			// window.hilink.getDevInfo("0", 'custom',body, "getResultCallback");
		}
	},
	setDevInfo({
		commit
	}, data) {
		if (window.hilink != undefined) {
			let body = JSON.stringify(data);
			window.hilink.setDeviceInfoWithoutCallback("0", body);
		}
	},
	delSongsList({
		commit
	}, data) {
		if (window.hilink != undefined) {
			let body = JSON.stringify(data);
			window.hilink.setDeviceInfoWithoutCallback("0", body);
		}
	},
	getSongsList({
		commit
	}, data) {
		if (window.hilink != undefined) {
			let body = JSON.stringify(data);
			window.hilink.setDeviceInfoWithoutCallback("0", body);
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
			let info = {
				devName: json.devName,
				roomName: json.roomName
			}
			let deviceid = localStorage.getItem('deviceid');
			console.log("deviceid========",deviceid)
			if (deviceid == json.devId) {
				commit("setisDeviceid",false);
			}else {
				commit("setisDeviceid", true);
				localStorage.setItem("deviceid",json.devId);
			}
			commit("setDevName", info);
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
		
		window.localResult =(res) => {
			console.log("本地歌曲列表",res);
		}
		window.getResultCallback =(res) =>{
			let json = JSON.parse(res);
			commit("getDeviceResult", json)
		}
		window.getDeviceInfoData = (res) => {
			let json = JSON.parse(res);
			if(res.errcode != 0){
				commit(types.LOADINGFLAG, true);
			}
		}

		window.allResultCallback = res => {
			console.log("测试多条发送", res)
		}
	}
};
