
var succ_html = '<div class="am-modal am-modal-alert tip-modal" tabindex="-1" id="succ_msg_1" style="z-index: 9999;">';
succ_html += '   	<div class="am-modal-dialog">';
succ_html += '           <div class="am-modal-hd"></div>';
succ_html += '           <div class="am-modal-bd">';
succ_html += '               <div class="am-padding-top am-padding-bottom">';
succ_html += '                   <img src="images/right-o-s.png" width="20">';
succ_html += '                   <span class="am-padding-left-sm"> #msg#</span>';
succ_html += '               </div>';
succ_html += '           </div>';
succ_html += '           <div class="am-modal-footer">';
succ_html += '               <span class="am-modal-btn alink" id="btn_okHide">确定</span>';
succ_html += '           </div>';
succ_html += '       </div>';
succ_html += '   </div>';

 /***
 弹出成功提示
**/ 
function succ_msg(msg,callBack){
	var hasCallBack=arguments.length>1;
    if($('#succ_msg_1'))	
	   $('#succ_msg_1').remove(); 
	$("body").append(succ_html.replace("#msg#",msg).replace('#id#','\'succ_msg_1\''));
	$("#btn_okHide").click(function(){
		close_layer("succ_msg_1"); 
		if(hasCallBack){
			callBack&&callBack(); 
		} 
	}); 
	
	var $modal = $('#succ_msg_1');
	$modal.modal({'closeViaDimmer':false});
}

function  close_layer(id){
	var $modal = $('#'+id);
	if($modal){
		$modal.modal('close');
	}
	 
} 
var error_html = '<div class="am-modal am-modal-alert tip-modal" tabindex="-1" id="error_pop_1" style="z-index: 9999;">';
error_html += '   	<div class="am-modal-dialog">';
error_html += '			<div class="am-modal-hd"></div>';
error_html += '			<div class="am-modal-bd">';
error_html += '			    <div class="am-padding-top am-padding-bottom">';
error_html += '			        <img src="images/wrong-r-s.png" width="20">';
error_html += '			        <span class="am-padding-left-sm">#error#</span>';
error_html += '			    </div>';
error_html += '			</div>';
error_html += '			<div class="am-modal-footer">';
error_html += '			    <span class="am-modal-btn alink" id="btn_errHide">确定</span>';
error_html += '			</div>';
error_html += '		</div>';
error_html += '</div>';

 /**
 弹出异常提示
**/ 
function error_msg(error,callback){
	var hasCallBack=arguments.length>1;
	if($('#error_pop_1'))	
	   $('#error_pop_1').remove();
	 
	$("body").append(error_html.replace("#error#",error));
	
	$("#btn_errHide").click(function(){
		close_layer("error_pop_1"); 
		if(hasCallBack){
			callback(); 
		} 
	}); 
	$('#btn_errHide').bind('keypress',function(event){  
		 if(event.keyCode == "13"){  
			 close_layer("error_pop_1"); 
			 if(hasCallBack){
				 callback(); 
			 } 
        }  
    });
	var $modal = $('#error_pop_1'); 
	$modal.modal({ 
        'closeViaDimmer':false
    });  
    
}

var warning_html = '<div class="am-modal am-modal-alert tip-modal" tabindex="-1" id="warning_pop_1" style="z-index: 9999;">';
warning_html += '   	<div class="am-modal-dialog">';
warning_html += '			<div class="am-modal-hd"></div>';
warning_html += '			<div class="am-modal-bd">';
warning_html += '			    <div class="am-padding-top am-padding-bottom">';
warning_html += '			        <img src="images/tan-b-s.png" width="20">';
warning_html += '			        <span class="am-padding-left-sm">#warning#</span>';
warning_html += '			    </div>';
warning_html += '			</div>';
warning_html += '			<div class="am-modal-footer">';
warning_html += '			    <span class="am-modal-btn alink" id="btn_warningHide">确定</span>';
warning_html += '			</div>';
warning_html += '		</div>';
warning_html += '</div>';

 /**
 弹出异常提示
**/ 
function warning_msg(warning,callback){
	var hasCallBack=arguments.length>1;
	if($('#warning_pop_1'))	
	   $('#warning_pop_1').remove();
	$("body").append(warning_html.replace("#warning#",warning));
	$("#btn_warningHide").click(function(){
		close_layer("warning_pop_1"); 
		if(hasCallBack){
			callback(); 
		} 
	}); 
	$('#btn_warningHide').bind('keypress',function(event){  
		 if(event.keyCode == "13"){  
			 close_layer("warning_pop_1"); 
			 if(hasCallBack){
				 callback(); 
			 } 
        }  
    });
	var $modal = $('#warning_pop_1'); 
	$modal.modal({ 
        'closeViaDimmer':false
    });  
    
}   

var confirm_html = '<div class="am-modal am-modal-confirm tip-modal" tabindex="-1" id="doc-modal-confirm" style="z-index: 9999;">';
confirm_html += '   	<div class="am-modal-dialog">';
confirm_html += '			<div class="am-modal-hd"></div>';
confirm_html += '			<div class="am-modal-bd">';
confirm_html += '			    <div class="am-padding-top am-padding-bottom">#tips#</div>';
confirm_html += '			</div>';
confirm_html += '		<div class="am-modal-footer">';
confirm_html += '		    <span class="am-modal-btn alink" data-am-modal-confirm id="btn_ok">确定</span>';
confirm_html += '		    <span class="am-modal-btn alink" data-am-modal-cancel onclick="close_layer(#id#)">取消</span>';
confirm_html += '		</div>';
confirm_html += '	</div>';
confirm_html += '</div>';

function  confirm_msg(tips,callback){
	if($('#doc-modal-confirm'))	
	   $('#doc-modal-confirm').remove();
	$("body").append(confirm_html.replace("#tips#",tips).replace("#id#",'\'doc-modal-confirm\''));
	$("#btn_ok").click(function(){
		close_layer('doc-modal-confirm');
		callback && callback();
	});
	var $modal = $('#doc-modal-confirm');
	$modal.modal({
        //width : 370,
        'closeViaDimmer':false
    });
}

function waiting(id,msg){
	if($("#l_"+id).length==0){
		var html = '<div id="l_' + id + '"><div class="am-modal am-modal-loading am-modal-no-btn am-modal-active" tabindex="-1" style="display: block; margin-top: -50px; z-index: 9999;"><div class="am-modal-dialog"><div class="am-modal-hd">#msg#</div><div class="am-modal-bd"><span class="am-icon-spinner am-icon-spin"></span></div></div></div><div class="am-dimmer am-active" data-am-dimmer="" style="display: block;background-color: rgba(0,0,0,0.4);"></div></div>';
		$("body").append(html.replace("#msg#",msg));
	} 
}

function waited(id)
{
	if($("#l_"+id).length>0){
	   $("#l_" + id).remove();
	}
} 
