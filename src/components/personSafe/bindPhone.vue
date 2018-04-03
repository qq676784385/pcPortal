<template>
	<div class="bindPhone">
		<div class="title">
			<span class="center">绑定手机</span>
			<img class="cancel" src="static/img/cancel.png" v-tap="{methods:cancel}">
		</div>
		<div class="cont">
			<div class="info">
				<div class="key">手机号码：</div>
				<input class="value" type="text" placeholder="请输入您的手机号" v-model="phoneNumber">
			</div>
			<div class="info">
				<div class="key">短信验证码：</div>
				<input class="value yzInput" type="text" v-model="yzcode">
				<div class="yanzheng " :class="times<=-1?'':'timeGray'">
					<span v-if="times>-1">({{times}})s</span>
					<span v-if="times<=-1"  v-tap='{methods:sendCode}'>获取验证码</span>
				</div>
			</div>
		</div>
		<div class="btnGroup">
			<div class="btn1" v-tap="{methods:bindOK}">确定</div>
			<div class="btn1" v-tap="{methods:cancel}">取消</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				phoneNumber:"",
				yzcode:"",
				VerifyToken:"",
				times:-1
			}
		},
		methods:{
			sendCode(){
				this.times = 60
				var that = this
				var t = setInterval(function(){
					if(that.times<0){
						that.times = -1
						clearInterval(t)
					}else{
						that.times--
					}
				},1000)
				if(this.times == 60){
					this.$http.get(this.$store.state.app.host + "api/Account/SendPhoneCode",{
						params:{
							phoneNumber:this.phoneNumber
						},
						headers:{ Authorization: this.$store.state.app.token},
						timeout: this.$store.state.app.httpTime
					})
					.then(
						function(res){
							if(res.data.Code == 0){
								this.VerifyToken = res.data.Result
							}

						},
						function(err){

						}
					)
				}
			},
			bindOK(){
				this.$http.post(this.$store.state.app.host + "api/Account/VerfiyPhoneCode",{
					PhoneNumber:this.phoneNumber,
					Code:this.yzcode,
					VerifyToken:this.VerifyToken
				},{headers:{ Authorization: this.$store.state.app.token}},{timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$parent.$emit("CLOSEALERT",{name:"bindPhoneFrame"})
						}else{
							this.$layer.alert("验证码输入错误")
						}
						
					},
					function(err){
						this.$layer.msg("网络连接超时")
					}
				)
			},
			cancel(){
				this.$parent.$emit("CLOSEALERT",{name:"bindPhoneFrame"})
			}
		}
	}
</script>
<style type="text/css" lang="scss" src="./css/bindPhone.scss"></style>
