/**
 * 多选框插件
 */
define(function (require, exports, module) {
	var exec = {
			
		/**
		 * 获取选中项
		 */
		getVal : function(){
			var industry = "";
			var $industryVal = $(".industryVal");
			$industryVal.each(function(){
				var $this = $(this);
				if(industry == ""){
					industry += $this.attr("value");
				}else{
					industry += "," + $this.attr("value");
				}		
			});
			
			return industry;
		},
		
		validate : function(){
			if($("#showIndustry").html() == "&nbsp;"){
				$("#industryMsg").html("请选择支持入驻的行业");
				return false;
			}else{
				$("#industryMsg").html("");
			}
			return true;
		}		
	};
	
	// 做为jQuery插件提供	
	$.fn.chosenMore = function(command){
		if (command) {
			if (command == "validate") {
				return exec.validate()
			} else if (command == "getVal") {
				return exec.getVal();
			}
		}
		
		$("#industryList dd").each(function(){
			var $this = $(this);
			var checked = $this.attr("check");
			if(checked == "true"){
				$("#showIndustry").append("<span><span class='industryVal' value="+$this.attr("value")+">"+$this.text()+"</span><span class='icon-delete'></span></span>");						
				$this.addClass("disabled");
			}				
		});

		// 下拉显示
		$("#industry").hover(function(){
			$(this).addClass("over");
			
		},function(){
			$(this).removeClass("over");
		});
		
		// 选中项
		$("#industry dd").click(function(){
			var $this = $(this);
			
			if(!$this.hasClass("disabled")){
				$("#showIndustry").append("<span><span class='industryVal' value="+$this.attr("value")+">"+$this.text()+"</span><span class='icon-delete'></span></span>");
				exec.validate();
			}
			$this.addClass("disabled");
		});
		
		// 关闭选项
		$("#showIndustry").on("click",".icon-delete", function(){
			var $this = $(this);
			$this.parent().remove();
			$(".scroll-wrapper dd:contains("+$this.prev().text()+")").removeClass("disabled");
		});		
	};	
});