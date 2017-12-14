//var serverUrl = "http://192.168.3.14:8116/trans5/";
var serverUrl = "https://2.trans5.cn/trans5/";

function ajax(url,param, sendFun, compFun, callBack) {
	var userinfo = $api.getStorage("userinfo");
   var params = {};
   params.url = serverUrl+url;
   if(param.headers)
       params.headers = param.headers
   else   
       params.headers = {"from":"rest"};
       
    
   //params.headers = {"session_id":guid()};
   if(userinfo && api.winName!="applogin")
      params.headers.fcr = userinfo.fcr;
   else
      params.headers.session_id = guid();   
   if(param.method)
     params.method = param.method;
   else
        params.method="post";

     params.encode = false
    if(param.returnAll)
     params.returnAll = param.returnAll;    
   sendFun && sendFun();
   if(param.data)
      params.data = param.data;
   else{
      params.data = {"body":param}
   }
   if(param.dataType)
      params.dataType = param.dataType;
   console.log(JSON.stringify(params));
   api.ajax(params,function(ret,err){
       console.log(JSON.stringify(ret));
       if(typeof(ret)=="string")
          ret = JSON.parse(ret);
       if(ret.code==9999){
          api.toast("msg",ret.message);
          return;
       }   
   	   if(ret){
   	       if(ret.data.retCode && ret.data.retCode=="-2"){
   	          
   	          api.toast("msg",ret.data.errMsg);
   	              api.openWin({
				        name: 'applogin',
				        url: api.wgtRootDir+'html/login/login.html'
			        });
   	          
   	          
   	       }
   	       else{
   	          if (ret.code != 1000) {
				api.toast("msg",ret.message);
				return;
			  }  
			  
   	          callBack && callBack(ret.data);
   	          
   	       }
   	   }else{
   	       api.alert({ msg: JSON.stringify(err) });
   	   }
   });   
   
  


}

function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
function guid() {
    return (S4()+"-"+S4()+"-"+S4()+S4()+S4()+S4()+S4()+S4());
}
//时间戳转DateTime
function timeStamp2String (time){
    var datetime = new Date();
     datetime.setTime(time);
     var year = datetime.getFullYear();
     var month = datetime.getMonth() + 1;
     if(month < 10 ) {
    	 month = "0" + month;
     }
     var date = datetime.getDate();
     if(date < 10 ) {
    	 date = "0" + date;
     }
     var hour = datetime.getHours();
     if(hour < 10 ) {
    	 hour = "0" + hour;
     }
     var minute = datetime.getMinutes();
     if(minute < 10 ) {
    	 minute = "0" + minute;
     }
     var second = datetime.getSeconds();
     if(second < 10 ) {
    	 second = "0" + second;
     }
     var mseconds = datetime.getMilliseconds();
     return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second ;
};

function getUserInfo(){
   var userinfo = $api.getStorage("userinfo");
   return userinfo;
}

//获取当前登录人机构id
function getUserDeptId(callBack) {
	var deptId = null;
	$.ajax({ url: serverUrl+"bi/QueryMainAction/getUserDept",
		headers: {
			       session_id:guid(),from:"rest",			               
			     },
			  	 method:"POST"
	}).success(function(data){	
		var ret = JSON.parse(data);
		if (ret.code != 1000) {
			//error_msg(ret.message);
			api.toast(ret.message,{ duration:'long', type:'div' });
			return;
		}  
		/**deptId = ret.data.id;*/
		callBack(ret.data);
	});
	
	return deptId;
}

//获取每页行数 
function pageSizeApp(callBack){
	var iDisplayLength = 0;
	
	$.ajax({ url: serverUrl+"bi/param/pagesizeApp",
		headers: {
			       session_id:guid(),from:"rest",			               
			     },
			  	 method:"POST"
	}).success(function(data){	
		var ret = JSON.parse(data);
		if (ret.code != 1000) {
			api.toast(ret.message,{ duration:'long', type:'div' });
			return;
		} 
		
		callBack(ret.data);
	});
	
	return iDisplayLength;
} 

//特殊字符验证
function stripscript(obj) { 
	var reg = new RegExp("[@#\$\&|'`\\\\/\"]");
	var s = "";
	for(var i = 0; i < obj.value.length; i++) {
		s = s + obj.value[i].replace(reg,'');
	}
	//obj.value = obj.value.replace(reg,'');
	obj.value = s;
}

//判断字符串长度，包含中文
function getStrLength(str) {
	var l = str.length;
	var blen = 0;
	for(i=0; i<l; i++) {
		if ((str.charCodeAt(i) & 0xff00) != 0) {
			blen ++;
		}
		blen ++;
	}
	
	return blen;
}

//验证电话号码
function checkPhone(tel) {
	var pattern = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
	return pattern.test(tel); 
}

/**  
 * 将数值四舍五入(保留2位小数)后格式化成金额形式  
 *  
 * @param num 数值(Number或者String)  
 * @return 金额格式的字符串,如'1,234,567.45'  
 * @type String  
 */    
function formatCurrency(num) {    
    num = num.toString().replace(/\$|\,/g,'');    
    if(isNaN(num))    
    num = "0";    
    sign = (num == (num = Math.abs(num)));    
    num = Math.floor(num*100+0.50000000001);    
    cents = num%100;    
    num = Math.floor(num/100).toString();    
    if(cents<10)    
    cents = "0" + cents;    
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)    
    num = num.substring(0,num.length-(4*i+3))+','+    
    num.substring(num.length-(4*i+3));    
    return (((sign)?'':'-') + num + '.' + cents);    
}

function checkMobileNo(mblNo){
	var pattern = /^1[34578]\d{9}$/; 
    return pattern.test(mblNo); 
}

/**设置图片展示路径
 * 
 * @param {Object} path 图片路径
 * @param {Object} version  app还是pc，为空默认app
 * @param {Object} width  图片显示宽度，app可以为空，pc为空默认为144
 * @param {Object} height 图片显示高度，app为空默认120，pc为空默认为132
 */
function setPicSrc(path, version, width, height) {
	if(version == undefined) {
		version = "app";
	}
	if(version == "app") {
		if(height == undefined) {
			height = "120";
		}		
		return path + "?x-oss-process=image/resize,m_pad,h_" + height;
	} else if(version == "pc") {
		if(height == undefined) {
			height = "132";
		}
		if(width == undefined) {
			width = "144";
		}		
		return path + "?x-oss-process=image/resize,m_pad,h_" + height + ",w_" + width;
	}
	
	return "";
}

/**
*判断数组是否为空
*/
function isEmpty(value) {
  return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
}
