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
	}
};
