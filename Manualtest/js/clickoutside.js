Vue.directive('clickoutside',{
	bind:function(el,binding,vnode){
		function documontHander(e){
			if(el.contains(e.target)){
				return false
			}
			if(binding.expression){
				binding.value(e);
			}
		}

		el._vueClickoutside_=documontHander;
		document.addEventListener("click",documontHander);
		document.addEventListener("keyup",function(event){
			console.log(binding.modifiers)
			if(event.keyCode == 27&&binding.modifiers.esc){
				binding.value();
			}
		});
	},
	unbind:function(el,binding,vnode){
		document.removeEventListener('click',el._vueClickoutside_);
		delete el._vueClickoutside_;
	},
	update:function(el,binding){
		if (binding.oldValue!=binding.value) {
			binding.value();
		}
		console.log(el);
		console.log(binding);
		//binding.value();
	}
})