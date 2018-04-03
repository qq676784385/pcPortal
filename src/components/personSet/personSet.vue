<template>
	<div class="setting">
		<div class="title">
			<div class="t1">个人设置</div>
			<div class="edit" @click="editFun">
				<img src="static/img/edit.png">
				<span>编辑</span>
			</div>
		</div>
		<div class="contentset">
			<!-- <div class="info"> -->
				<!-- <div class="key">真实姓名</div> -->
				<!-- <div class="value">{{personalInfo.RealName}}</div> -->
			<!-- </div> -->
			<div class="info">
				<div class="key">姓名</div>
				<div class="value">{{personalInfo.NikeName}}</div>
			</div>
			<div class="info">
				<div class="key">性别</div>
				<div class="value">{{sex[personalInfo.UserSex]}}</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import EditInfo from "./EditInfo.vue"
	export default{
		data(){
			return {
				personalInfo:"",
				sex:["未设置","男","女","保密"]
			}
		},
		methods:{
			getPersonalInfo(){
				// GetNameUserInfo
				this.$http.get(this.$store.state.app.host + "api/Account/GetNameUserInfo",{headers:{ Authorization: this.$store.state.app.token}},{timeout:this.$store.state.app.httpTime})
				.then(
					function(res){
						// this.personalInfo = res.body
						//
						if(res.data.Code == 0){
							this.personalInfo = res.data.Result
							this.$store.state.app.personalInfo = this.personalInfo
							this.$root.set("PersonalPhone",this.personalInfo.PhoneNumber)
						}
					},
					function(err){
						this.$layer.msg("网络连接超时")
					}
				)
			},
			editFun(){
				this.editFrame = this.$layer.iframe({
					content: {
                        content: EditInfo,
                        parent: this,
                        data: []
                    },
                    title: ""
				})
			}
		},
		created(){
			this.$store.state.app.token = this.$root.get("Token")
			this.getPersonalInfo()
		},
		mounted(){
			var that = this
			this.$on("CLOSEFRAME",function(obj){
				that.$layer.close(that.editFrame)
				that.getPersonalInfo()
			})
		},
		components:{
			EditInfo
		}
	}
</script>
<style type="text/css" lang="scss" src="./css/personalSet.scss"></style>
