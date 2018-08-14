// 定义一个名为 button-counter 的新组件
Vue.component('button-pet', {
  data: function () {
    return {
    }
  },
  props:{text:{type:String},color:{type:String},disabled:{type:Boolean}},
  template: '<button :style="{background:color}"  :disabled=disabled @click="handleClickLink"> <span ref="slot"><slot></slot></span></button>',
  methods:{
  	handleClickLink(event,new_window=false){
  		this.$emit('click',event);
  		//this.handleClickLink(event,new_window);
  	}
  }
})