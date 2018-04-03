<template>
	<div class="safe">
		<div class="title">
			安全设置
		</div>
		<div class="passportDiv">
			<img src="static/img/safe.png">
			<div class="middle">
				<div class="middleTop">密码已设置</div>
				<div class="middleBottom">用于保护账号信息和登录安全</div>
			</div>
			<div class="rightChange" @click="changePassNumber">
				修 改
			</div>
		</div>
		<div class="passportDiv">
			<img src="static/img/phone.png">
			<div class="middle">
				<div class="middleTop">
					<span v-if="phoneNumber != null">手机{{phoneNumber.substr(0,3)}}****{{phoneNumber.substr(7)}}</span>
					<span v-if="phoneNumber == null">绑定手机号</span>
				</div>
				<div class="middleBottom">可用手机号加密码登录，可通过手机号找回密码</div>
			</div>
			<div class="rightChange" @click="changePhone" v-if="phoneNumber != null">
				更 改
			</div>
			<div class="rightChange" @click="bindPhone" v-if="phoneNumber == null">
				绑 定
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import ChangePassNumber from "./changePassNumber.vue"
	import ChangePhone from "./changePhone.vue"
	import BindPhone from "./bindPhone.vue"
	export default{
		data(){
			return {
				phoneNumber:"18610994480"
			}
		},
		methods:{
			getPersonalInfo(){
				this.$http.get(this.$store.state.app.host + "api/Account/GetNameUserInfo",{headers:{ Authorization: this.$store.state.app.token}},{timeout:this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.personalInfo = res.data.Result
							// this.personalInfo.PhoneNumber = "18610994480"
							this.$store.state.app.personalInfo = this.personalInfo
							this.phoneNumber = this.personalInfo.PhoneNumber
						}
					},
					function(err){
						this.$layer.msg("网络连接超时")
					}
				)
			},
			changePassNumber(){
				this.changePassFrame = this.$layer.iframe({
					content:{
						content: ChangePassNumber,
                        parent: this,
                        data: []
					},
					title:""
				})

			},
			bindPhone(){
				this.bindPhoneFrame = this.$layer.iframe({
					content:{
						content: BindPhone,
                        parent: this,
                        data: []
					},
					title:""
				})

			},
			changePhone(){
				this.changePhoneFrame = this.$layer.iframe({
					content:{
						content: ChangePhone,
                        parent: this,
                        data: []
					},
					title:""
				})
			},
		},
		created(){

		},
		mounted(){
			this.$store.state.app.token = this.$root.get("Token")
			this.getPersonalInfo()
			var that = this
			this.$on("CLOSEALERT",function(obj){
				switch(obj.name){
					case "changePassFrame":
						that.$layer.close(that.changePassFrame)
						console.log(obj.isChange,obj.isChange == "1")
						if(obj.isChange == "1"){
							that.$router.push({path:"/"})
						}

					break;
					case "bindPhoneFrame":
						that.$layer.close(that.bindPhoneFrame)
						that.getPersonalInfo()
					break;
					case "changePhoneFrame":
						that.$layer.close(that.changePhoneFrame)
						if(obj.change === "1"){
							that.bindPhone()
						}
					break;
				}
			})
		},
		components:{
			ChangePassNumber,
			ChangePhone,
			BindPhone
		}
	}
</script>
<style type="text/css" lang="scss" src="./css/personSafe.scss"></style>
