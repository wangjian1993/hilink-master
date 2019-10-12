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
	},
	[types.GET_LOCALLIST](state,data){
		state.localList =data;
	},
	[types.PUT_LOCALLIST](state,data){
		console.log("data ==========",data);
		state.localTotal =data.total
		if(state.localCid == data.channel){
			console.log("相同文件============")
			state.localSongList=state.localSongList.concat(data.songs);
		}else {
			console.log("不相同文件============")
			state.localSongList=[];
			state.localSongList=data.songs;
		}
	},
	[types.SET_LOCALCID](state,data){
		state.localCid=data
	},
	[types.SET_LOCALTOTAL](state,data){
		console.log("歌曲总数量======",data)
		state.localTotal=data
	},
	[types.SET_AWAITFLAG](state,data){
		state.awaitFlag =!state.awaitFlag;
	}
}
export default mutations
