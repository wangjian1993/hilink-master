function compressImage (img, size) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  
  let width = img.width;
  let height = img.height;
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, width, height);

  let ndata = canvas.toDataURL("image/jpeg", size);
  return ndata;
}

function dataURItoBlob(base64Data) {
  var byteString;
  if (base64Data.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(base64Data.split(",")[1]);
  else byteString = unescape(base64Data.split(",")[1]);
  var mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

const compress = (file, size, fn) => {
  if (!file || !window.FileReader) return false;//判断支不支持FileReader
  if (/^image/.test(file.type)) {
    let reader = new FileReader();//创建一个reader
       reader.readAsDataURL(file); //将图片转成base64格式
    
    reader.onloadend = function () {//读取成功后的回调
      let result = this.result;
      let img = new Image();
      img.src = result;

      img.onload = function () {
        let data = compressImage(img, size);        
        let blob = dataURItoBlob(data);        
        fn(blob);
      };
    };
  }
}

export default compress;