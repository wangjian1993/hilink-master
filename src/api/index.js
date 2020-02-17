import axios from "axios";
import qs from "qs";
export function fetch(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
            //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
            headers: {
                "Content-Type": "application/json"
                // 'token_in_header': global_.token,//token从全局变量那里传过来
            },
            timeout: 30 * 1000 // 30秒超时
        });
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
//banner轮播图
export default {
    getBannerList() {
        return fetch({
            url: cloudUrl + "getBannerList",
            method: "get",
            params: ""
        });
    },
    //最新推荐
    recommendSpecial(page,pageSize=7) {
        return fetch({
            url: cloudUrl + "recommendSpecial",
            method: "get",
            params: {
                page:page,
                pageSize:pageSize
            }
        });
    },
    //视频列表
    getVideoData() {
        return fetch({
            url: cloudUrl + "videoAlbumList",
            method: "get",
            params: {
                page: 0,
                pageSize: 2
            }
        });
    },
    //视频广告
    getVideoAd() {
        return fetch({
            url: cloudUrl + "ad",
            method: "get",
            params: ""
        });
    },
    //性格养成
    getMusicXGYC(page,pageSize) {
        return fetch({
            url: cloudUrl + "xgyc",
            method: "get",
            params: {
                page:page,
                pageSize:pageSize
            }
        });
    },
    //付费精品
    getPayData() {
        return fetch({
            url: cloudUrl + "ffjx",
            method: "get",
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
            params: {
                page: 0,
                pageSize: 3
            }
        });
    },
    // 国学熏陶
    getgxxtData(page,pageSize) {
        return fetch({
            url: cloudUrl + "gxxt",
            method: "get",
            params: {
               page: page,
               pageSize: pageSize
            }
        });
    },
    //财商启蒙
    getcsqmData(page,pageSize) {
        return fetch({
            url: cloudUrl + "csqm",
            method: "get",
            params: {
                page: page,
                pageSize:pageSize
            }
        });
    },
	//根据专辑id集合获取多个音频专辑信息
	getAudioSpecialByIDs(data) {
	  return fetch({
	    url: cloudUrl + "getAudioSpecialByIDs",
	    method: "post",
	    params: {
	      speicalIds: data
	    }
	  });
	},
    //情商培养
    getqspyData(page,pageSize) {
        return fetch({
            url: cloudUrl + "qspy",
            method: "get",
            params: {
                page: page,
                pageSize:pageSize
            }
        });
    },
    //最新上架
    getNewSpecials() {
        return fetch({
            url: cloudUrl + "newSpecials",
            method: "get",
            params: {
                page:0,
                pageSize: 10
            }
        });
    },
    getSleepData(page,pageSize) {
        return fetch({
            url: cloudUrl + "sleepZone",
            method: "get",
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
            params: ""
        });
    },
    getFavData() {
        return fetch({
            url: cloudUrl + "allListening",
            method: "get",
            params: ""
        });
    },
    getFMData() {
        return fetch({
            url: aliloUrl + "/gw/resource/radioInfo",
            method: "post",
            params: {
                type: 1
            }
        });
    },
    getAlbumsData(page,type) {
        return fetch({
            url: cloudUrl + "enterClassByType",
            method: "post",
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
	    params: { channel: 10 }
	  });
	},
    websockLogin(openid, did) {
        return fetch({
            url: hhtUrl + "/wechat/login",
            method: "get",
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
            params: {
                id: id
            }
        });
    },
    //-----------------张志鹏---------------------------
    getSearch(type,key) {
        return fetch({
            url: cloudUrl + "search",
            method: "get",
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
            params: {
                zbid:val
            }
        });
    },
    getVideoList(val) {
        return fetch({
            url: cloudUrl + "videoList",
            method: "get",
            params: {
                id:val,
                page: 0,
                pageSize: 200,
            }
        });
    },
    getVideoAlbumList(size) {
        return fetch({
            url: cloudUrl + "videoAlbumList",
            method: "get",
            params: {
                page: 0,
                pageSize: size,
            }
        });
    },
    //-----------------张志鹏---------------------------

	//英语启蒙
	getEnglishData(){
		return fetch({
			url:cloudUrl + "yyqm",
			method:"get",
		})
	}

};
