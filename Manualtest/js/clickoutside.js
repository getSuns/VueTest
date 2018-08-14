Vue.directive('clickoutside',{
	bind:function(el,binding,vnode){
		console.log({"el":el,"binding":binding,"vnode":vnode});
		// 申明一个函数
		function documontHander(e){
			// 判断点击区域是否是指令所在区域的内部
			if(el.contains(e.target)){
				return false
			}
			// binding.expression字符串形式的指令表达式 这里是用来判断该指令有没有表达式
			if(binding.expression){ 
				// 用来执行当前上下文methods中的指定函数 
				binding.value();
			}
		}
		// 用于unbind中移除
		el._vueClickoutside_=documontHander;
		// 监听document点击事件并绑定documentHander
		document.addEventListener("click",documontHander);
		document.addEventListener("keyup",function(event){
			// 判断按键为27（esc）并且modifiers对象中esc为true时
			if(event.keyCode == 27&&binding.modifiers.esc){
				// 执行指令指定函数
				binding.value();
			}
		});
	},
	unbind:function(el,binding,vnode){
		// 移除document的click事件监听 如果不移除 当组件销毁时仍在
		document.removeEventListener('click',el._vueClickoutside_);
		delete el._vueClickoutside_;
	},
	update:function(el,binding){
		if (binding.oldValue!=binding.value) {
			binding.value();
		}
	}
})