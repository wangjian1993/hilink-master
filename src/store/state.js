const state = {
	devicesInfo: [], //设备信息
	timePopup: false,
	playData: [],
	playMode: -1,
	localList: [],
	songsCid: -1,
	loveCid: -1,
	loadingFlag: true,
	localSongList: {
		total: 0,
		channel: -1,
		songs: []
	},
	localTotal: null,
	params: null,
	musicData: [],
	resultStrAll: null,
	lampSwitch: [], //开关
	audioInfo: {
		"song": "",
		"play": "",
		"volume": 0,
		"cutSong": 0
	}, //歌曲信息
	earLight: {
		on: 0
	}, //耳灯
	faceLight: {
		on: 0
	}, //表情灯
	volume: 0, //音量
	isLine: 0,
	lookData: 0,
	deviceTime: 0,
	isBubble:false,
	albumid: [{
			id: 104,
			album: 1171
		},
		{
			id: 105,
			album: 1177
		},
		{
			id: 106,
			album: 1043
		},
		{
			id: 107,
			album: 1179
		}
	],
	devName:'火火兔故事机',
	istimePopu:true,
	upflag:0,
	upDate: false
};

export default state;
