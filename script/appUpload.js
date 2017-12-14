var basePath = "http://192.168.3.55:8088/trans5/";// 引用这个JS文件，必须赋值，"http://192.168.1.91:8080"

var tmpPath = "", remoteBucket = "", quality = 80, picPath = "", max = 1;

// 上传图片
function showAction() {
	api.actionSheet({
		title : '上传图片',
		cancelTitle : '取消',
		buttons : [ '拍照', '从手机相册选择' ]
	}, function(ret, err) {
		if (ret) {
			getPicture(ret.buttonIndex);
		}
	});
}

function getPicture(sourceType) {
	if (sourceType == 1) { // 拍照
		api.getPicture({
			sourceType : 'camera',
			encodingType : 'jpg',
			mediaValue : 'pic',
			allowEdit : false,
			destinationType : 'url',
			quality : quality,
			saveToPhotoAlbum : true
		}, function(ret, err) {
			if (ret) {
				upload(ret);
			} else {
				//alert(JSON.stringify(err));
			}
		});
	} else if (sourceType == 2) { // 从相机中选择
		api.getPicture({
			sourceType : 'library',
			encodingType : 'jpg',
			mediaValue : 'pic',
			destinationType : 'url',
			quality : quality,
			targetWidth : 750,
			targetHeight : 750
		}, function(ret, err) {
			if (ret) {
				upload(ret);
			} else {
				//alert(JSON.stringify(err));
			}
		});
		return;
	}
}

function upload(ret, picPath) {
	var path =ret.data;
	var iBegin = path.lastIndexOf(".");
	var	fileName = uuid(32,16) +  path.substring(iBegin);
	api.ajax({
		method : "post",
		url : basePath + "bi/fileUpload/uploadFileApp",
		data : {
			values : {
				"fileName" : fileName,
				"remoteBucket" : remoteBucket
			},
			files : {
				"fileName" : path
			}
		},
		dataType : 'json',
		returnAll : false,
	}, function(ret, err) {
		if (ret) {
			uploadBack(ret.data);// 上传成功后回调方法，在你的JSP中定义
		} else {
			api.alert(err);
		}
	});
}

function uuid(len, radix) {
	    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	    var uuid = [], i;
	    radix = radix || chars.length;
	    if (len) {
	      // Compact form
	      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	    } else {
	      // rfc4122, version 4 form
	      var r;
	      // rfc4122 requires these characters
	      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	      uuid[14] = '4';
	      // Fill in random data.  At i==19 set the high bits of clock sequence as
	      // per rfc4122, sec. 4.1.5
	      for (i = 0; i < 36; i++) {
	        if (!uuid[i]) {
	          r = 0 | Math.random()*16;
	          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	        }
	      }
	    }
	    return uuid.join('');
	}