function isValueNumber(value){
	return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'');
}
Vue.component('input-number',{
	template:'<div class="input-number">\
		<input type="text" :value="currentValue" @change="handleChange"  @keyup.up="handleUp" @keyup.down="handleDown">\
		<button @click="handleDown" :disabled="currentValue<= min">-</button>\
		<button @click="handleUp" :disabled="currentValue>=max">+</button>\
	</div>',
	props:{
		max:{
			type:Number,
			default:Infinity
		},
		min:{
			type:Number,
			default:-Infinity
		},
		value:{
			type:Number,
			default:0
		},
		step:{
			type:Number,
			default:1
		}
	},
	data:function(){
		return {
			currentValue:this.value
		}
	},
	watch:{
		currentValue:function(val){
			this.$emit('input',val);
		},
		value:function(val){
			this.updateValue(val);
		}

	},
	methods:{
		updateValue:function(val){
			if (val>this.max) val=this.max;
			if (val<this.min) val=this.min;
			this.currentValue=val;
		},
		handleChange:function(event){
			var val=event.target.value.trim();
			if (isValueNumber(val)) {
				val=Number(val);
				this.currentValue=val;
				if (val>this.max) {
					this.currentValue=this.max;
				}
				if (val<this.min) {
					this.currentValue=this.min;
				}
			}else{
				event.target.value=this.currentValue;
			}
		},
		handleDown:function(val){
			if (val<=this.min) return
				this.currentValue-=Number(this.step);
		},
		handleUp:function(val){
			if (val>=this.max) return
				this.currentValue+=Number(this.step);
		}
	},
	mounted:function(){
		this.updateValue(this.value)
	}

})