// export const mutationsMsg = (state, payload) => {
//   state.tabStates = payload.tabStates;
// }
import * as types from './mutation-type.js';
const mutations = {
	[types.GET_DEVCACHEAll](state, data) {
		state.devicesstate = data;
	},
	[types.SET_TIMEPOPUP](state,data){
		state.timePopup = !state.timePopup;
	},
	[types.SET_PLAYDATA](state,data){
		state.playData=[];
		console.log("修改的数据=========", data)
		state.playData =data;
	}
}
export default mutations
