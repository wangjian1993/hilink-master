// export const mutationsMsg = (state, payload) => {
//   state.tabStates = payload.tabStates;
// }
import * as types from './mutation-type.js';
const mutations = {
	[types.GET_DEVICESINFO](state, data) {
		state.devicesInfo = data;
	},
	[types.SET_TIMEPOPUP](state,data){
		state.timePopup = !state.timePopup;
	},
	[types.SET_PLAYDATA](state,data){
		state.playData=[];
		state.playData =data;
	}
}
export default mutations
