import axios from "axios";
import qs from "qs";
import Router from '@/router/index'
let AUTH_TOKEN = (function() {
	return localStorage.getItem("H1_token");
})();
export function fetch(options, isToken) {
	return new Promise((resolve, reject) => {
		const instance = axios.create({
			//instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
			//所有的请求都会带上这些配置，比如全局都要用的身份信息等。
			headers: {
				"Content-Type": "application/json",
				// 'token':"eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJleHAiOjE1ODc0OTA5NTcsIm5iZiI6MTU4Mzg5MDk1N30.4uO3puLj52psZgbfTQgNPkeqzk_pn9-M2-eziyx1WhU",//token从全局变量那里传过来
			},
			timeout: 30 * 1000 // 30秒超时
		});
		// console.log(options.token);
		if (options.token) {
			instance.defaults.headers.common["token"] = AUTH_TOKEN;
			instance.interceptors.request.use(function(config) {
				console.log("AUTH_TOKEN")
				if (AUTH_TOKEN == null) {
					let promisefresh = new Promise(function(resolve, reject) {
						//刷新token
						axios.get("http://api.cloud.alilo.com.cn/api/v4/login/get-token?appKey=hht&appSecret=hht").then(response => {
							config.headers.token = response.data.data;
							localStorage.setItem('H1_token', response.data.data);
							resolve(config);
						})
					});
					return promisefresh;
				}
				let url = config.url;
				if (url.indexOf("login") > -1) {
					localStorage.setItem('H1_token', "");
					config.headers.token = "";
				}
				if (url.indexOf("user") > -1 && url.indexOf("login") < 0) {
					config.headers.token = localStorage.getItem("H1_token");
				}
				return config;
			}, function(err) {
				return Promise.reject(err);
			});
			instance.interceptors.response.use(function(res) {
				// console.log(res)
				if (res.data.code == 2) {
					// console.log("token过期了", Router);
					Router.push({
						name: 'login'
					})
				}
				return res;
			}, function(err) {
				return err;
			});
		}
		instance(options)
			.then(response => {
				//then 请求成功之后进行什么操作
				resolve(response); //把请求到的数据发到引用请求的地方
			})
			.catch(error => {
				// console.log("请求异常信息：" + error);
				reject(error);
			});
	});
}
const cloudUrl = "https://cloud.alilo.com.cn/baby/api/wx/";
const aliloUrl = "https://www.alilo.com.cn";
const tcloudUrl = "https://api.cloud.alilo.com.cn/api/v4/";
const tttcloudUrl = "https://api.cloud.alilo.com.cn/babying/api/t32/user/";
const cid = 66;
//banner轮播图
export default {
	/*  新接口------------------------*/
	//获取首页数据
	getHomeData() {
		return fetch({
			url: tcloudUrl + "page-manage/get-page",
			method: "POST",
			token: true,
			params: {
				channelId: cid,
				pageId: 65
			}
		});
	},
	//多个音频专辑id和渠道号获取专辑详情
	getaudioGroupData(data) {
		return fetch({
			url: tcloudUrl + "audio-group/query-by-ids",
			method: "POST",
			params: data,
			token: true
		});
	},
	//获取分类列表（故事/儿歌/英语/国学）
	getCategoryCode(data) {
		return fetch({
			url: tcloudUrl + "label-set/query-one-category",
			method: "POST",
			params: data,
			token: true
		});
	},
	//收藏单曲
	addFavorData(data) {
		return fetch({
			url: tcloudUrl + "user/favorite/add",
			method: "POST",
			token: true,
			params: data
		});
	},
	//专辑详情
	getAudioData(data) {
		return fetch({
			url: tcloudUrl + "audio-group/get",
			method: "POST",
			token: true,
			params: data
		});
	},
	//视频详情
	getVideoData(data) {
		return fetch({
			url: tcloudUrl + "video-group/get",
			method: "POST",
			params: data,
			token: true
		});
	},
	getSearch(channelId, keyWord, type) {
		return fetch({
			url: "http://api.cloud.alilo.com.cn/api/v4/resource/search",
			method: "post",
			params: {
				channelId: cid,
				topNumber: 10,
				keyWord: keyWord,
				type: type,
				pageNo: 1,
				pageSize: 200
			},
			token: true
		});
	},
	//排行榜
	getRankData(data) {
		return fetch({
			url: tcloudUrl + "week-rank/search",
			method: "post",
			params: data,
			token: true
		});
	},
	//橱窗详情
	getActiveData(data) {
		return fetch({
			url: tcloudUrl + "page-manage/get-active",
			method: "POST",
			params: data,
			token: true
		});
	},
	//热门搜索
	hotKey(val) {
		return fetch({
			url: tcloudUrl + "hot-words/search",
			params: val,
			method: "POST",
			token: true
		})
	},
	//分龄推荐
	differAge(data) {
		return fetch({
			url: tcloudUrl + 'sleep-time/get',
			method: "post",
			params: data,
			token: true
		})
	},
	//banner详情
	getSSECData(data) {
		return fetch({
			url: tcloudUrl + "audio-group/search",
			method: "POST",
			params: data,
			token: true
		});
	},

	/* 旧接口---------------------------*/
	getBannerList() {
		return fetch({
			url: cloudUrl + "getBannerList",
			method: "get",
			token: false,
			params: ""
		});
	},
	//最新推荐
	recommendSpecial(page, pageSize = 7) {
		return fetch({
			url: cloudUrl + "recommendSpecial",
			method: "get",
			token: false,
			params: {
				page: page,
				pageSize: pageSize
			}
		});
	},
	//视频列表
	// getVideoData() {
	// 	return fetch({
	// 		url: cloudUrl + "videoAlbumList",
	// 		method: "get",
	// 		params: {
	// 			page: 0,
	// 			pageSize: 2
	// 		}
	// 	});
	// },
	//视频广告
	getVideoAd() {
		return fetch({
			url: cloudUrl + "ad",
			method: "get",
			token: false,
			params: ""
		});
	},
	//性格养成
	getMusicXGYC(page, pageSize) {
		return fetch({
			url: cloudUrl + "xgyc",
			method: "get",
			token: false,
			params: {
				page: page,
				pageSize: pageSize
			}
		});
	},
	//付费精品
	getPayData() {
		return fetch({
			url: cloudUrl + "ffjx",
			method: "get",
			token: false,
			params: {
				page: 0,
				pageSize: 4
			}
		});
	},

	// 热门主播
	getHostFM() {
		return fetch({
			url: cloudUrl + "rmzb",
			method: "get",
			token: false,
			params: {
				page: 0,
				pageSize: 3
			}
		});
	},

	// 国学熏陶
	getgxxtData(page, pageSize) {
		return fetch({
			url: cloudUrl + "gxxt",
			method: "get",
			token: false,
			params: {
				page: page,
				pageSize: pageSize
			}
		});
	},
	//财商启蒙
	getcsqmData(page, pageSize) {
		return fetch({
			url: cloudUrl + "csqm",
			method: "get",
			token: false,
			params: {
				page: page,
				pageSize: pageSize
			}
		});
	},
	//根据专辑id集合获取多个音频专辑信息
	getAudioSpecialByIDs(data) {
		return fetch({
			url: cloudUrl + "getAudioSpecialByIDs",
			method: "post",
			token: false,
			params: {
				speicalIds: data
			}
		});
	},
	//情商培养
	getqspyData(page, pageSize) {
		return fetch({
			url: cloudUrl + "qspy",
			method: "get",
			token: false,
			params: {
				page: page,
				pageSize: pageSize
			}
		});
	},
	//最新上架
	getNewSpecials() {
		return fetch({
			url: cloudUrl + "newSpecials",
			method: "get",
			token: false,
			params: {
				page: 0,
				pageSize: 10
			}
		});
	},
	//橱窗详情
	// getActiveData(data) {
	//   return fetch({
	//     url: tcloudUrl + "page-manage/get-active",
	//     method: "POST",
	//     params: data,
	//     token: true
	//   });
	// },
	getSleepData(page, pageSize) {
		return fetch({
			url: cloudUrl + "sleepZone",
			method: "get",
			token: false,
			params: {
				page: page,
				pageSize: pageSize
			}
		});
	},
	getHabitData() {
		return fetch({
			url: cloudUrl + "characterTraining",
			method: "get",
			token: false,
			params: ""
		});
	},
	getFavData() {
		return fetch({
			url: cloudUrl + "allListening",
			method: "get",
			token: false,
			params: ""
		});
	},
	getFMData() {
		return fetch({
			url: aliloUrl + "/gw/resource/radioInfo",
			method: "post",
			token: false,
			params: {
				type: 1
			}
		});
	},
	getAlbumsData(page, type) {
		return fetch({
			url: cloudUrl + "enterClassByType",
			method: "post",
			token: false,
			params: {
				page: page,
				pageSize: 20,
				st: 2,
				type: type
			}
		});
	},
	rank() {
		return fetch({
			url: "https://cloud.alilo.com.cn/baby/api/ranking/getRanking",
			method: "get",
			token: false,
			params: {
				channel: 10
			}
		});
	},
	websockLogin(openid, did) {
		return fetch({
			url: hhtUrl + "/wechat/login",
			method: "get",
			token: false,
			params: {
				_: (+new Date()),
				openid: openid,
				diviceid: did
			}
		})
	},
	getSpecialInfo(id) {
		return fetch({
			url: cloudUrl + "getSpecialInfo",
			method: "get",
			token: false,
			params: {
				id: id
			}
		});
	},
	getTSearch(type, key) {
		return fetch({
			url: cloudUrl + "search",
			method: "get",
			token: false,
			params: {
				page: 0,
				pageSize: 350,
				type: type,
				w: key
			}
		});
	},


	getHostDetail(val) {
		return fetch({
			url: cloudUrl + "rmzb/detail",
			method: "get",
			token: false,
			params: {
				zbid: val
			}
		});
	},
	getVideoList(val) {
		return fetch({
			url: cloudUrl + "videoList",
			method: "get",
			token: false,
			params: {
				id: val,
				page: 0,
				pageSize: 200,
			}
		});
	},
	getVideoAlbumList(size) {
		return fetch({
			url: cloudUrl + "videoAlbumList",
			method: "get",
			token: false,
			params: {
				page: 0,
				pageSize: size,
			}
		});
	},

	//-----------------张志鹏---------------------------
	//英语启蒙
	getEnglishData() {
		return fetch({
			url: cloudUrl + "yyqm",
			method: "get",
			token: false,
		})
	},
	getNewEnglishData() {
		return fetch({
			url: tcloudUrl + "equipment/get-yyqm",
			method: "post",
			token: true,
			params:{
				channelId:81,
				pageId:75
			}
		})
	},
};
