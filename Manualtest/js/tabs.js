Vue.component('tabs',{
	template:'\
	<div class="tabs">\
		<div class="tabs-bar">\
			<div\
				class="tabs-tab" :class="tabCls(item)"\
				v-for="(item,index) in navList"\
				@click="handleChange(index)">\
				{{item.label}}\
				<button class="closebtn" v-if="showClose(item)" @click.stop="handleclose(item,index)">x</button>\
			</div>\
		</div>\
		<div class="tabs-content">\
			<slot></slot>\
		</div>\
	</div>',
	props:{
		value:{
			type:[String,Number]
		},
		closable:{
                type: Boolean,
                default: false
            }
	},
	data:function(){
		return {
			currentValue:this.value,
			navList:[]
		}
	},
	methods:{
		tabCls:function(item){
			return {
						'tabs-tab-active':item.name===this.currentValue
					}
		},
		getTabs(){
			return this.$children.filter(function(item){
				return item.$options.name==='pane';
			})
		},
		updateNav(){
			this.navList=[];
			var _this=this;
			this.getTabs().forEach(function(pane,index){
				_this.navList.push({
					label:pane.label,
					name:pane.name||index,
					closable:pane.closable
				});
				if(!pane.name)pane.name=index;
				if (index===0) {
					if(!_this.currentValue){
						_this.currentValue=pane.name||index;
					}
				}
			});
			this.updateStatus();
		},
		updateStatus(){
			var tabs=this.getTabs();
			var _this=this;
			tabs.forEach(function(tab){
				return tab.show=tab.name===_this.currentValue;
			})
		},
		handleChange:function(index){
			var nav=this.navList[index];
			var name=nav.name;
			this.currentValue=name;
			this.$emit('input',name);

		},
		handleclose:function(item,index){
		  	const tabs = this.getTabs();
            const tab = tabs[index];
            tab.$destroy();
            //debugger
            if (tab.currentName === this.currentValue) {
                const newTabs = this.getTabs();
                let activeKey = -1;
                if (newTabs.length) {
                    const leftNoDisabledTabs = tabs.filter((item, itemIndex) =>  itemIndex < index);
                    const rightNoDisabledTabs = tabs.filter((item, itemIndex) => itemIndex > index);
                    if (rightNoDisabledTabs.length) {
                        activeKey = rightNoDisabledTabs[0].name;
                    } else if (leftNoDisabledTabs.length) {
                        activeKey = leftNoDisabledTabs[leftNoDisabledTabs.length - 1].name;
                    } else {
                        activeKey = newTabs[0].name;
                    }
                }
                this.activeKey = activeKey;
                this.$emit('input', activeKey);
            }
            this.$emit('on-tab-remove',tab.currentName);
			this.updateNav();

		},
		showClose (item) {
            if (item.closable !== null) {
                return item.closable;
            } else {
                return this.closable;
            }
        },
	},
	watch:{
		value:function(val){
			this.currentValue=val;
		},
		currentValue:function(){
			this.updateStatus();
		}
	}
})
