<!-- <template>
	<div>
		<table>
			<thead>
				<tr><th><input type="checkbox" @click=checkAll() :checked="checkedlist.length==list.length"/></th><th>商品名称</th><th>商品单价</th><th>商品数量</th><th>操作</th></tr>
			</thead>
			<tbody>
			<tr v-for="(item,index) in list">
				<td><input type="checkbox" @click=checkBtn(item) :checked="checkedid.indexOf(item.id)>=0"/></th></td>
				<td>{{item.name}}</td>
				<td>{{item.price}}</td>
				<td><button @click=handleReduce(index) :disabled="item.count==1">-</button>{{item.count}}<button @click=handleAdd(index)>+</button></td>
				<td><button @click="removeBtn">移除</button></td>

			</tr>
			</tbody>
		</table>
		<div style="text-align: left;">总价：{{totalPrice}}</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				list:[
						{
							id:1,
							name:'iphone 4',
							price:'4888',
							count:1
						},
						{
							id:2,
							name:'iphone 5',
							price:'5888',
							count:1
						},
						{
							id:3,
							name:'iphone 6',
							price:'6888',
							count:1
						},
						{
							id:4,
							name:'iphone 7',
							price:'7888',
							count:1
						}
					],
				checkedlist:[],
				checkedid:[],
				checkAllstate:false,
			}
		},
		computed:{
			totalPrice:function(){
				var total=0;
				for(var i =0;i<this.checkedlist.length; i++){
					var item =this.checkedlist[i];
					total+=item.price*item.count;
				}
				return total.toString().replace(/\B ( ?= (\d{3} ) +$ ) /g,',');
			},
		},
		methods:{
			handleReduce:function(index){
				if (this.list[index].count===1) {return}
				this.list[index].count--;
			},
			handleAdd:function(index){
				this.list[index].count++;
			},
			removeBtn:function(index){
				this.list.splice(index,1);
			},
			checkBtn:function(item){
				var checkedlist=this.checkedlist;
				var checkedid=this.checkedid;
				var index=checkedid.indexOf(item.id);
				if (index>=0) {
					checkedid.splice(index,1);
					checkedlist.splice(index,1);
				}else{
					checkedid.push(item.id);
					checkedlist.push(item);
				}

			},
			checkAll:function(){
				var that=this;
				if (this.checkAllstate) {
					this.checkAllstate=false;
					this.checkedlist=[];
					this.checkedid=[];
				}else{
					this.checkAllstate=true;
					this.checkedlist=this.list;
					this.list.forEach(function(c){
						that.checkedid.push(c.id);
					})
					
				}
			}
		}
	}
</script> -->

<template>
	<div>
	<p style="text-align:left;"><input  style="text-align: left;" type="checkbox" @change="checkAll()" v-model="checkAllstate"/>全选</p>
		<div  v-for="(item,index) in list">
			<h4 style="text-align: left;">{{item.typeName}}</h4>
			<table>
				<thead>
					<tr><th><input type="checkbox" @change="check_list(index)" v-model="item.this_all"/></th><th>商品名称</th><th>商品单价</th><th>商品数量</th><th>操作</th></tr>
				</thead>
				<tbody>
				<tr v-for="(o,i) in item.typedata">
					<td><input type="checkbox" @change="click_input(index,i)"  v-model="o.check_one"/></th></td>
					<td>{{o.name}}</td>
					<td>{{o.price}}</td>
					<td><button @click="handleReduce(i)" :disabled="o.count==1">-</button>{{o.count}}<button @click="handleAdd(i)">+</button></td>
					<td><button @click="removeBtn">移除</button></td>

				</tr>
				</tbody>
			</table>
		</div>
		<div style="text-align: left;">总价：{{totalPrice}}</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				list:[
						{
							typeName:"电子",
							id:"e11",
							this_all:false,
							typedata:[
								{
									id:"1",
									name:'iphone 4',
									price:'4888',
									check_one:false,
									count:1
								},
								{
									id:"2",
									name:'iphone 5',
									price:'5888',
									check_one:false,
									count:1
								}
							]
						},
						{
							typeName:"书籍",
							this_all:false,
							id:"e12",
							typedata:[
								{
									id:"3",
									name:'vue智障',
									price:'48',
									check_one:false,
									count:1
								},
								{
									id:"4",
									name:'编程大傻子',
									price:'50',
									check_one:false,
									count:1
								}
							]
						},
						{
							typeName:"食品",
							this_all:false,
							id:"e13",
							typedata:[
								{
									id:5,
									name:'麻辣小鱼仔',
									price:'30',
									check_one:false,
									count:1
								},
								{
									id:6,
									name:'川湘豆腐干',
									price:'20',
									check_one:false,
									count:1
								}
							]
						}					
					],
				checkedlist:[],
				checkAllstate:false
			}
		},
		computed:{
			totalPrice:function(){
				var that=this;
				var total=0;
				that.list.forEach(item=>{
					item.typedata.forEach(item1=>{
						if (item1.check_one) {
							total+=item1.price*item1.count;
						}
					})
				})
				return total.toString().replace(/\B ( ?= (\d{3} ) +$ ) /g,',');
			}
		},
		methods:{
			handleReduce:function(index){
				if (this.list[index].count===1) {return}
				this.list[index].count--;
			},
			handleAdd:function(index){
				this.list[index].count++;
			},
			removeBtn:function(index){
				this.list.splice(index,1);
			},
			click_input:function(index,nindex){
				var that=this;//filter y
				var aa=that.list[index].typedata.filter(item=>{return item.check_one==true})/////y
				aa.length==that.list[index].typedata.length?that.list[index].this_all=true:that.list[index].this_all=false;
				this.checkmethod();
			},
			checkAll:function(){
				var that = this;  
			    that.list.forEach(item1 => {  
			      item1.this_all=that.checkAllstate  
			      item1.typedata.forEach(item2 => {  
			        item2.check_one=that.checkAllstate  
			      })  
			    });  
			},
			check_list:function(index){
				var that=this;
				that.list[index].typedata.forEach(item=>{item.check_one=that.list[index].this_all});
				this.checkmethod();
			},
			checkmethod:function(){
				var that=this;
				var aa=that.list.filter(item=>{return item.this_all==true})/////y
				aa.length==that.list.length?that.checkAllstate=true:that.checkAllstate=false;
			}
		}
	}
</script>










