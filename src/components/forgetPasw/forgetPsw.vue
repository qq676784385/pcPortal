<template>
	<div class="forgetpsw">
		<div class="title">找回登录密码</div>
		<div class="forgetCont">
			<div class="info">
				<label>手机号：</label>
				<input type="text" placeholder="请输入手机号" v-model="phoneNumber">
			</div>
			<div class="info">
				<label>验证码：</label>
				<input class="yzInput" type="text" placeholder="请输入正确的验证码" v-model="code">
				<div class="sendcode" v-if="times<=-1" v-tap="{methods:sendCode}">
					<span>发送验证码</span>
				</div>
				<div class="sendcode yzGray" v-if="times>-1">
					<span>{{times}}s</span>
				</div>
			</div>
			<div class="info">
				<label>新密码：</label>
				<input type="password" placeholder="请输入新密码" v-model="newPassword">
			</div>
			<div class="info">
				<label>确认新密码：</label>
				<input type="password" placeholder="请再次输入新密码" v-model="confirmPassword">
			</div>
			<div class="submitBtn" v-tap="{methods:ModifyPassword}">
				提 交
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				times:-1,
				phoneNumber:"",
				newPassword:"",
				confirmPassword:"",
				code:"",
				VerifyToken:""
			}
		},
		methods:{
			sendCode(){
				var that = this
				if(this.phoneNumber){
					this.times = 60
					var t = setInterval(function(){
						if(that.times<0){
							that.times = -1
							clearInterval(t)
						}else{
							that.times--
						}
					},1000)
				}
				if(this.times == 60){
					this.$http.get(this.$store.state.app.host + "api/Account/SendPhoneCode",{
						params:{
							phoneNumber:this.phoneNumber
						},
						timeout: this.$store.state.app.httpTime
					})
					.then(
						function(res){
							if(res.data.Code == 0){
								this.VerifyToken = res.data.Result
							}else{
								this.$layer.msg(res.data.Message)
							}

						},
						function(err){

						}
					)
				}
			},
			ModifyPassword(){
				this.$http.post(this.$store.state.app.host + "api/Account/ModifyPassword",{
					PhoneNumber:this.phoneNumber,
					Code:this.code,
					VerifyToken:this.VerifyToken,
					NewPassword:this.newPassword,
					ConfirmPassword:this.confirmPassword,
				},{timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$layer.msg("密码修改成功，请重新登录")
							this.$router.push({
								path:"/"
							})
						}
					},
					function(err){

					}
				)
			}

		}
	}
</script>
<style type="text/css" lang="scss" src="./forgetPsw.scss"></style>
