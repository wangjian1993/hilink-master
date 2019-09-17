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
	}
}
export default mutations
