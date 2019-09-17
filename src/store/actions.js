import * as types from "./mutation-type.js";

export default {
	
	//获取设备全部信息
	getDevicesState({
		commit
	}, data) {
		commit(types.GET_DEVCACHEAll, data);
	},
	setTimePopup({
		commit
	},data){
		commit(types.SET_TIMEPOPUP, data);
	}
};
