<template>
	<div class="editInfo">
		<div class="title">
			<span class="center">编辑个人信息</span>
			<img class="cancel" src="static/img/cancel.png" v-tap="{methods:cancel}">
		</div>
		<div class="cont">
			<!-- <div class="info">
				<div class="key">真实姓名：</div>
				<input class="value" type="text" v-model="personalInfo.RealName">
			</div> -->
			<div class="info">
				<div class="key">姓名：</div>
				<input class="value" type="text" v-model="personalInfo.NikeName">
			</div>
			<div class="info">
				<div class="key">性别：</div>
				<form>
					<!-- <label><input type="radio" name="sex" value="3" v-model="personalInfo.UserSex">保密</label> -->
					<label><input type="radio" name="sex" value="1" v-model="personalInfo.UserSex">男</label>
					<label><input type="radio" name="sex" value="2" v-model="personalInfo.UserSex">女</label>
				</form>
			</div>
		</div>
		<div class="btnGroup">
			<div class="btn1" v-tap="{methods:ChangeUserInfo}">确定</div>
			<div class="btn1" v-tap="{methods:cancel}">取消</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				personalInfo:""
			}
		},
		methods:{
			cancel(){
				this.$parent.$emit("CLOSEFRAME")
			},
			ChangeUserInfo(){
				this.$http.post(this.$store.state.app.host +"api/Account/ChangeUserInfo",{
					UserSex:this.personalInfo.UserSex,
					RealName:this.personalInfo.RealName,
					NikeName:this.personalInfo.NikeName
				},{headers:{ Authorization: this.$store.state.app.token},timeout:this.$store.state.app.httpTime})
				.then(
					function(res){
						console.log(res)
						if(res.status == 200){
							this.$parent.$emit("CLOSEFRAME")
							this.$root.set("NikeName",this.personalInfo.NikeName)
							this.$store.state.info.Name = this.personalInfo.NikeName
						}
					},
					function(err){
						this.$layer.msg("网络连接超时")
					}
				)
			}

		},
		created(){
			this.personalInfo = this.$store.state.app.personalInfo
			if(!this.personalInfo.UserSex){
				this.personalInfo.UserSex = 1
			}
			this.$store.state.app.token = this.$root.get("Token")
		}
	}
</script>
<style type="text/css" lang="scss" src="./css/editInfo.scss"></style>
