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
	},data){
		commit(types.SET_TIMEPOPUP, data);
	},
	setPlayData({
		commit
	},data){
		commit(types.SET_PLAYDATA,data);
	},
	getLocalList({
		commit
	},data){
		commit(types.GET_LOCALLIST,data);
	},
	putLocalList({
		commit
	},data){
		commit(types.PUT_LOCALLIST,data);
	},
	setMusciData({
		commit
	},data){
		commit(types.SET_MUSICDATA,data);
	},
	setPlayMode({
		commit
	},data){
		commit(types.SET_PLAYMODE,data);
	},
};
