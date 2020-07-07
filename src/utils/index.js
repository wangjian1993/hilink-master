// import SETTINGS from "@/settings";

export function getCookie (name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return decodeURIComponent(arr[2]);
  return null;
}

export function setCookie (name, value, time = 60000) {
  var exp = new Date()
  exp.setTime(exp.getTime() + time * 1)
  document.cookie =
    name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
}

export function getQueryStringValue (key) {
  let data = {};

  let src = window.location.href;
  let index = src.indexOf("?");
  if (index === -1) return data[key];
  let dataStr = src.substring(src.indexOf("?") + 1);
  let dataArray = dataStr.split("&");
  for (let i = 0; i < dataArray.length; i++) {
    let param = dataArray[i].split("=");
    data[param[0]] = param[1];
  }
  return data[key];
}

/**
 * 获取今年或前几年的今日日期
 * 例子: 2020-03-23
 */
export function getDate (distance = 0) {
  const curDate = new Date();
  const year = `${curDate.getFullYear() - distance}`.padStart(2, "0");
  const month = `${curDate.getMonth() * 1 + 1}`.padStart(2, "0");
  const day = `${curDate.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}


export function getFormatDate () {
  const curDate = new Date();
  const year = `${curDate.getFullYear()}`.padStart(2, "0");
  const month = `${curDate.getMonth() * 1 + 1}`.padStart(2, "0");
  const day = `${curDate.getDate()}`.padStart(2, "0");
  let hour = `${curDate.getHours()}`.padStart(2, "0");
  let minute = `${curDate.getMinutes()}`.padStart(2, "0");
  let second = `${curDate.getSeconds()}`.padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function timestampToDate (UNIX_timestamp) {
  if (typeof UNIX_timestamp !== "number" || UNIX_timestamp * 1 === 0)
    return null;
  let a = new Date(UNIX_timestamp);
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = `${a.getDate()}`.padStart(2, "0");
  let time =
    year + "-" + month + "-" + date;
  return time;
}


// 转换宝宝年龄
export function convertChildFormat (data) {
  if (!data || data.length < 1) return [];
  let date = new Date();
  return data.map((item) => {
    let year = item.birthday.split(/[\u4e00-\u9fa5]/g)[0];
    let month = item.birthday.split(/[\u4e00-\u9fa5]/g)[1];
    let childYear = date.getFullYear() - year * 1;
    let childMonth = date.getMonth() + 1 - month * 1;
    let age =
      date.getMonth() + 1 >= month * 1
        ? `${childYear}岁${childMonth}个月`
        : `${childYear - 1}岁${childMonth + 12}个月`;

    return {
      ...item,
      year,
      month,
      age,
    };
  });
}

export function getSliceStr (str, startIdx = 0, endIdx = 0) {
  return `${str}`.substring(startIdx, endIdx);
}

export function convertCoverImage (items = []) {
  return items.map((item) => {
    let coverImage = `${item.coverImage}${SETTINGS.aliyunOSSSuffix}`;
    return {
      ...item,
      coverImage,
    };
  });
}

// 16进制转换为10进制
export function convertHextoDecimal (hex = "") {
  return parseInt(hex, 16);
}

//转换歌曲长度
export function formatTimeLength (list = []) {
  if (list.length < 1) return [];
  return list.map((item) => {
    if (!item.timeLength && item.timeLength !== 0) return item;
    let s = (parseInt((item.timeLength * 1) % 60) + "").padStart(2, "0");
    let m = (parseInt((item.timeLength * 1) / 60) + "").padStart(2, "0");
    return {
      ...item,
      timelengths: m + ":" + s,
    };
  });
}

export function debounce (func, delay) {
  return function (args) {
    let _args = args,
      that = this;
    clearTimeout(func.id);

    func.id = setTimeout(() => {
      func.call(that, _args);
    }, delay);
  };
}

export function merge (target) {
  for (let i = 0, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) target[prop] = value;
      }
    }

  }

  return target;
}

export function getNumberBirthday (str = "") { 
  if (str.length < 1) return;
  let reg = /([\d]+)年([\d]+)月([\d]+)日/;
  let arr = str.match(reg);
  return `${RegExp.$1}-${RegExp.$2}-${RegExp.$3}`;
}


export function report (url, data) {
  if (!url || !data) return;

  let entry = {};
  let image = document.createElement("img");
  let items = [];

  for (let key in data) {
    if (data[key]) items.push(key + "=" + encodeURIComponent(data[key]));
  }

  let name = `img_${+new Date()}`;
  entry[name] = image;

  image.onload = image.onerror = function () {
    entry[name] = image = image.onload = image.onerror = null;
    delete entry[name];
  }

  image.src = url + (url.indexOf('?') < 0 ? "?" : "&") + items.join('&');
}
