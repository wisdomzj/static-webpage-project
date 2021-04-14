/**
 * 复选框插件
 */
define(function (require, exports, module) {
	
	var exec = {
			
		/**
		 * 获取选中项
		 */
		getSelect : function(){
			
			var checkContent = "";
			
			// 遍历选中
			$(".checkbox:checked").each(function(){
				if(checkContent == ""){
					checkContent += $(this).attr("checkId");
				}else{
					checkContent += "," + $(this).attr("checkId");
				}
			});
			
			return checkContent;
		}	
	};
	
	// 做为jQuery插件提供	
	$.fn.checkSelect = function(command){
		
		if (command	&& exec[command]) {
			return exec[command].apply(this, null);
		}
		
		// 全选
		$("#cb-select-all").click(function(){
			var $checkbox = $(".checkbox");
			if($(this).prop("checked")){
				$checkbox.prop("checked",true);
			}else{
				$checkbox.prop("checked",false);
			}
		});
		
		// 单选
		$(".checkbox").click(function(){
			var flag = true;
			$(".checkbox").each(function(){
				if(!$(this).prop("checked")){
					flag = false;
				}
				
				if(!flag){
					$("#cb-select-all").prop("checked",false);
				}else{
					$("#cb-select-all").prop("checked",true);
				}
			});
		});
	};
});