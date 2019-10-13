exports.install = function(Vue) {
	/**获取设备在云上的所有数据
	 *参数
	 *devid,               //string,请取”0”，表示当前设备，暂不支持其它取值
	 *body,                //string, json格式，留空,可选
	 *resultCallback       //string，回调函数名称，成功或失败时，将调用传入resultStr返回结果
	 */
	Vue.prototype.getDevCacheAll = function() {
		console.log("获取设备全部信息")
		window.hilink.getDevCacheAll("0", "", "resultCallback")
	};
	/**直接从设备获取数据
	 *参数
	 *devid,               //string,请取”0”，表示当前设备，暂不支持其它取值
	 *sid,                 //string, 为该设备的service id，取值参见HiLink Profile定义
	 *body,                //string, json格式，可选，{"characteristicName1","characteristicName2"}, 为空则获取sid里面所有的 characteristic 的值
	 *resultCallback       //string，回调函数名称，成功或失败时，将调用传入resultStr返回结果
	 */
	Vue.prototype.getDevInfo = function(sid, data) {
		let body = JSON.stringify(data);
		console.log("获取设备单独信息=======", sid, body)
		window.hilink.getDevInfo("0", sid, body, "deviceInfoCallback");
	};
	/** 
	 * 发送消息给设备
	 *参数
	 *devid,               //string,请取”0”，表示当前设备，暂不支持其它取值
	 *body,                //string,json格式，可选，格式为{"sid1":{"characteristicName1":"1","characteristicName2":"value2"},"switch":{"on":"1","name":"value"}}
	 *resultCallback       //string，回调函数名称，成功或失败时，将调用传入resultStr返回结果
	 */
	Vue.prototype.setDeviceInfo = function(data) {
		let body = JSON.stringify(data);
		// console.log("设置设备数据1111111111111111===", body)
		window.hilink.setDeviceInfo("0", body, "deviceEventCallback");
	};
	//获取本地歌曲
	Vue.prototype.setDeviceSongsInfo = function(data,deviceSongBack) {
		let body = JSON.stringify(data);
		// console.log("设置设备数据22222222222222222===", body)
		window.hilink.setDeviceInfo("0", body, deviceSongBack);
	};
};
