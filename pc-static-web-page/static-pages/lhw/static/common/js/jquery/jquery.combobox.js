/**
 * 定义下拉选择框
 * @author cshiyong@linewell.com
 * @since 2015-11-3
 */
;
!(function ($) {
	
	/**
	 * 判断是否是json对象
	 */
	var isJsonFunc = function(obj){
		var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
		return isjson;
	}
	
	
	var exec = {
		/**
		 * 选中回调
		 */
		selectHandler:function(){
			
		},
		/**
		 * 值操作
		 * 
		 */
		value : function () {
			
			if (arguments.length > 0) { // 参数不为空，设值
				this.attr("data-val", arguments[0] || "");
				var $selectItem = null;
				if (!arguments[0]) { // ""
					$selectItem = this.find("dd").eq(0);
					this.find("dt").text(this.find("dd").eq(0).html()).attr("title",this.find("ul li").eq(0).html());
				} else {
					$selectItem = this.find("dd[value='" + arguments[0] + "']");
				}
				this.find("dt").text($selectItem.html() || arguments[0]).attr("title", $selectItem.html() || arguments[0]);
				
				var options = this.data('options');
				 
				if(options&&options.clickBack){
					options.clickBack(arguments[0]);
				}
			} else { // 获取值
				return this.attr("data-val");
			}
		},
		
		/**
		 * 数据操作
		 * @param {Array} 下拉数据
		 * @param {Boolean} 是否默认选中第一个节点
		 */
		data : function () {
			if (arguments.length > 0) {
				// 清空下拉列表
				var $scrollWrapper = this.find(".scroll-wrapper");
				$scrollWrapper.find("dd").remove();
				this.removeAttr("data-val");
				
				if (!arguments[0] || arguments[0].length == 0) {
					return;
				}
				
				// 重新绑定数据
				var valueField = this.attr("valueField") || "id";
				var textField = this.attr("textField") || "name";
				var firstValue = arguments[0][0][valueField];
				var $ul =$scrollWrapper; 
				for (var i = 0, len = arguments[0].length; i < len; i++) {
					$ul.append($("<dd/>").attr("value", arguments[0][i][valueField])
							.html(arguments[0][i][textField]).attr("title", arguments[0][i][textField]));
				}
				(arguments[1] === false) || exec["value"].call(this, firstValue);
			} else {
				// TODO 获取所有数据
			}
		}
	};
	
	// 做为jQuery插件提供
	$.fn.ComboBox = function (command) {
		
		var self = this;
		//查看是否是json对象，如果不是，直接执行相关命令
		if(command){
			if (command	&& exec[command]) {
				return exec[command].apply(this, Array.prototype.slice.call(arguments, 1));
			}else{
				//
				self.data('options',command);
			}
		}
		
		// 下拉框集合
		var comboboxListArr = [];
		
		this.each(function () {
			
			// 点击body时隐藏
			var $combobox = $(this).not("[initialized='initialized']");
			
			comboboxListArr.push($combobox);
			
			// 鼠标移入移出事件
			$combobox.click(function () {
				
				// 关闭其他下拉框 add by wzhikai
				for(var i=0, len=comboboxListArr.length; i<len; i++){
					$(comboboxListArr[i]).not($combobox).removeClass("over");
				}
				
				$combobox.toggleClass("over");
				return false;
			});
			
			$("body").on("click", function () {
				$combobox.removeClass("over");
			});
			
			// 选中项
			$combobox.on("click", "dd", function(e) {
				exec["value"].call($combobox, $(e.target).attr("value") || "");
				$combobox.trigger("select");
				$combobox.removeClass("over");
				return false;
			});
			
			// 标识已初始化，对已初始化过的不再重复绑定事件  modify by cyixiang
			$combobox.attr("initialized", "initialized");			
			
			var value = $combobox.attr("data-val");
			value && $combobox.ComboBox("value", value);
			
		});
		
		return this;
	};
}) (jQuery);