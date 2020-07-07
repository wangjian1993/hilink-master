import * as COMMON_OBJ from "./common-obj";

//content/index

// common
export const PROD_CHANNELID = 66;
export const DEV_CHANNELID = 80;
export const PAGEID = "74";
export const APPKEY = "0717f063e12c404b8951169fcadfcd27";
export const APPSECRET = "o5+hAx5DBYBtmeK0IU4DinQKNJrJ3QQUzpd0nVkQsHl5uqg5H+f80A==";
export const OPENID = "oeVNPv_4FTkUuV8-64CpxCOtngHE";
export const SETTING_USERNAME = "12345678910";
export const SETTING_HEAD = "12345678910";
export const EVENTTRACKINGURL = "https://v1.cnzz.com/z_stat.php?id=1278581916&web_id=1278581916";
export const DISCLAIMER_TITLE = "免责声明";
export const DISCLAIMER_CONTENT = "火火兔内容云以原创及第三方授权作品为主，仅供试听，非用于商业用途。如果内容云分享的资源侵犯了您的权益，请及时联系我们，我司将在最快时间删除相关数据";

export const EVENT_DEVICE_PLAY = "DEVICE_PLAY";
export const CLEARREG = "[`~!@#$^&*()=|{}':;',\\[\\].·<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]";
export const CLEAR_UNSUPPORTED_DEVICE_SIGN = "[*|:·<>]";

export const AUDIO_READYSTATE = COMMON_OBJ.AUDIO_READYSTATE;
export const ACTION_418_NOT_BLUETOOTH_MODE = COMMON_OBJ.ACTION_418_NOT_BLUETOOTH_MODE;

//labelwewe
export const LABEL_INVEST = "问卷调查";
export const LABEL_HISTORY = "历史记录";
export const LABEL_RANKING = "排行榜";
export const LABEL_MY_FAV = "我的收藏";
export const LABEL_MY_ACCOUNT = "我的账号";
export const LABEL_MY_BABY = "我的宝贝";
export const LABEL_SIGNOUT = "退出登录";
export const LABEL_AGE_RECOMMENDATION = "分龄推荐";
export const LABEL_XMLY_AREA = "喜马拉雅专区";
export const LABEL_SEARCH = "search";
export const LABEL_CLICK = "click";
export const LABEL_LISTEN = "listen";
export const LABEL_COLLECT = "collect";
export const LABEL_RECOMMEND = "recommend";
export const LABEL_LOGIN = "login";
export const LABEL_CLICK_BANNER = "click_banner";
export const LABEL_EDIT_CHILD = "edit_baby";
export const LABEL_ADD_CHILD = "add_baby";
export const LABEL_DELETE_CHILD = "delete_baby";
export const LABEL_BLUETOOTH_MODE_TEXT = "设备进入蓝牙模式";
export const LABEL_CARTOON_MODE_TEXT = "设备正在读绘本中";

//commit,action
export const UPDATE_APP_STATE = "UPDATE_APP_STATE";
export const UPDATE_SEARCH_STATE = "UPDATE_SEARCH_STATE";
export const RESET_SEARCH_STATE = "RESET_SEARCH_STATE";
export const CHANGE_CUR_BABY = "CHANGE_CUR_BABY";
export const CHANGE_ALL_BABY = "CHANGE_ALL_BABY";
export const UPDATE_DEVICE_SOCKET_DATA = "UPDATE_DEVICE_SOCKET_DATA";
export const UPDATE_DEVICE_STATE = "UPDATE_DEVICE_STATE";
export const UPDATE_SOCKET_DATA = "UPDATE_SOCKET_DATA";
export const UPDATE_DEVICE_VERSION_URL = "UPDATE_DEVICE_VERSION_URL";
export const CHANGE_DEVICE_ID = "CHANGE_DEVICE_ID";
export const CHANGE_DEVICE_TYPE = "CHANGE_DEVICE_TYPE";
export const CHANGE_DEVICE_IMG = "CHANGE_DEVICE_IMG";
export const CHANGE_DEVICE_MACHINEURL = "CHANGE_DEVICE_MACHINEURL";
export const STORE_SINGLE_SONG_FAVOR = "STORE_SINGLE_SONG_FAVOR";
export const SINGLEDOWNLOAD = "SINGLE_DOWNLOAD_COMMAND";
export const STORE_BATCH_SONG_FAVOR = "STORE_BATCH_SONG_FAVOR";
export const BATCHDOWNLOADCMD = "BATCH_DOWNLOAD_COMMAND";
export const STORE_REQUEST_AUDIOLIST = "STORE_REQUEST_AUDIOLIST";
export const STORE_REQUEST_ALBUMLIST = "STORE_REQUEST_ALBUMLIST";
export const STORE_REQUEST_VIDEOLIST = "STORE_REQUEST_VIDEOLIST";
export const STORE_RECONNECT_WS = "STORE_RECONNECT_WS";
export const STORE_HEARTBEAT_WS = "STORE_HEARTBEAT_WS";
export const STORE_UPDATE_WS_STATE = "STORE_UPDATE_WS_STATE";
export const STORE_INIT_ACTIONS_WEBSOCKET = "STORE_INIT_ACTIONS_WEBSOCKET";
export const STORE_RESET_WEBSOCKET = "STORE_RESET_WEBSOCKET";
export const STORE_OPEN_WEBSOCKET = "STORE_OPEN_WEBSOCKET";
export const STORE_ERROR_WEBSOCKET = "STORE_ERROR_WEBSOCKET";
export const STORE_MESSAGE_WEBSOCKET = "STORE_MESSAGE_WEBSOCKET";
export const STORE_SEND_WEBSOCKET = "STORE_SEND_WEBSOCKET";
export const STORE_CLOSE_WEBSOCKET = "STORE_CLOSE_WEBSOCKET";
export const SET_SONGSLIST = 'SET_SONGSLIST'
export const SET_CUR_LIST = 'SET_CUR_LIST'
export const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM'
export const GET_DEVICESTATE = 'GET_DEVICESTATE'
export const SET_ACTIVE = 'SET_ACTIVE'
export const SET_DEVICETYPE = 'SET_DEVICETYPE'
export const SET_DEVICETYPE_IMG = 'SET_DEVICETYPE_IMG'
export const SET_DID = 'SET_DID'
export const SET_SRC = 'SET_SRC'
export const TOGGLE_SHOW_PLAYER = 'TOGGLE_SHOW_PLAYER'
export const UPDATE_ACTVE_TABBAR = 'UPDATE_ACTVE_TABBAR'


//error
export const ERROR_INIT_WEBSOCKET = "ERROR INTI WEBSOCKET";




//toast - warning
export const TRIGGER_EVENTTRACKING = "triggerEventTrac";
export const TOAST_TIPS = "提示";
export const LABEL_DISFAVOR_CONFIRM = "确认删除该收藏";
export const TOAST_DEVICE_OFFLINE_TEXT = "设备离线中";
export const TOAST_DEVICE_FAVOR_SUCCESS = "设备收藏成功";
export const TOAST_LACK_USER_ID = "用户未登录或缺少userId";
export const TOAST_PHONE_FAV_SUCCESS = "收藏歌曲成功";
export const TOAST_PHONE_DISFAV_SUCCESS = "歌曲已取消收藏";


// EVENT TRACKING 
export const TRACKING_SEARCH_CLICK = 'TRACKING_SEARCH_CLICK'; 
export const TRACKING_BANNER_CLICK = 'TRACKING_BANNER_CLICK'; 
export const TRACKING_ICONLIST_CLICK = 'TRACKING_ICONLIST_CLICK'; 
export const TRACKING_LISTEN_PLAY = 'TRACKING_LISTEN_PLAY'; 
export const TRACKING_COLLECT = 'TRACKING_COLLECT'; 
export const TRACKING_RECOMMEND = 'TRACKING_RECOMMEND'; 
export const TRACKING_LOGIN = 'TRACKING_LOGIN'; 
export const TRACKING_CHILD = 'TRACKING_CHILD'; 
export const TRACKING_DELETE_CHILD = 'TRACKING_DELETE_CHILD'; 
export const TRACKING_SEARCH_TYPE_USERINPUT = 0; 
export const TRACKING_SEARCH_TYPE_HOTKEY = 1; 
export const TRACKING_SEARCH_TYPE_HISTORY = 2; 
export const TRACKING_SEARCH_RESULT_EMPTY = 0; 
export const TRACKING_SEARCH_RESULT_NOTEMPTY = 1; 
export const TRACKING_LISTEN_TYPE_AUDIO = 10; 
export const TRACKING_LISTEN_TYPE_ALBUM = 40; 
export const TRACKING_LISTEN_PLAYMODE_WEBPAGE = 0; 
export const TRACKING_LISTEN_PLAYMODE_DEVICE = 2; 
export const TRACKING_LISTEN_COLLECT_ADD = 1; 
export const TRACKING_LISTEN_COLLECT_DELETE = -1; 
export const TRACKING_CHILD_GENDER_MALE = 1; 
export const TRACKING_CHILD_GENDER_FEMALE = 0; 
export const TRACKING_SEARCH_TYPE_AUDIO = 0; 
export const TRACKING_SEARCH_TYPE_ALBUM = 1; 
export const TRACKING_SEARCH_TYPE_VIDEO = 2; 
export const TRACKING_CONTENT_PROVIDER_XIMA = 'xima';
export const TRACKING_CONTENT_PROVIDER_HHT = 'huohuotu';
