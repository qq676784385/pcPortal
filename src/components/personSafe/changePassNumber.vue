<template>
	<div class="changePassNumber">
		<div class="title">
			<span class="center">修改密码</span>
			<img class="cancel" src="static/img/cancel.png" v-tap="{methods:cancel}">
		</div>
		<div class="cont">
			<div class="info">
				<div class="key">输入原始密码：</div>
				<input class="value" type="password" v-model="oldPassword">
			</div>
			<div class="info">
				<div class="key">输入新密码：</div>
				<input class="value" type="password" v-model="newPassword">
			</div>
			<div class="info">
				<div class="key">确认新密码：</div>
				<input class="value" type="password" v-model="confirmPassword">
			</div>
		</div>
		<div class="btnGroup">
			<div class="btn1" v-tap="{methods:changePasw}">确定</div>
			<div class="btn1" v-tap="{methods:cancel}">取消</div>
		</div>
	</div>
</template>
<script type="text/javascript">

	export default{
		data(){
			return{
				oldPassword:"",
				newPassword:"",
				confirmPassword:""
			}
		},
		methods:{
			cancel(){
				this.$parent.$emit("CLOSEALERT",{name:"changePassFrame",isChange:"0"})
			},
			changePasw(){
				if(this.oldPassword&&this.newPassword&&this.confirmPassword){
					if(this.newPassword == this.confirmPassword){
						this.$http.post(this.$store.state.app.host + "api/Account/ChangePassword",{
							OldPassword:this.oldPassword,
							NewPassword:this.newPassword,
							ConfirmPassword:this.confirmPassword
						},{headers:{Authorization: this.$store.state.app.token}},{timeout: this.$store.state.app.httpTime})
						.then(
							function(res){
								if(res.status == 200){
									this.$layer.msg("密码修改成功，请重新登录")
									this.$parent.$emit("CLOSEALERT",{name:"changePassFrame",isChange:"1"})
								}else{

								}
							},
							function(err){
								this.$layer.msg("密码错误，重新输入")
							}
						)
					}else{
						this.$layer.msg("请再次确认两次密码是否一致")
					}
				}else{
					this.$layer.msg("请输入密码")
				}
			}
		}
	}
</script>
<style type="text/css" lang="scss" src="./css/changePassNumber.scss"></style>
