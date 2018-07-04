Vue.component('pane',{
	name:'pane',
	template:'\
		<div class="pane css3translate" v-if="show">\
			<slot></slot>\
		</div>',
	props:{
		name:{type:String},
		label:{type:String,default:''},
		closable:{type:Boolean,default:false}
	},
	data:function(){
		return{
			show:false,
			currentName:this.name
			}
	},
	methods:{
		updateNav(){
			this.$parent.updateNav();
		}
	},
	watch:{
		label(){
			this.updateNav();
		},
		name(val){
			this.currentName=val;
			this.updateNav();
		}
	},
	mounted(){
		this.updateNav();

	},
	beforeDestroy(){
		this.updateNav();
	}
})