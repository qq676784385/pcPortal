<template>
	<div class="changePhone">
		<div class="title">
			<span class="center">认证手机号码</span>
			<img class="cancel" src="static/img/cancel.png" v-tap="{methods:cancel}">
		</div>
		<div class="cont">
			<div class="info">
				<div class="text">
					更改后，您将无法再使用此手机号进行找回密码及登录相关操作。
				</div>
				<!-- 测试人员手机号修改成功后，要同时手动修改 测试用户临时文件JSON ，对应账户的手机号。 -->
				<div class="text" style='color:red' v-if='isTest'>
					【重要】如果您的账号是测试账号，请联系管理员进行更改手机号的操作！
				</div>

			</div>
			<div class="info info2">
				<div class="key">已绑定手机号：</div>
				<span class="text">{{phoneNumber.substr(0,3)}}****{{phoneNumber.substr(7)}}</span>
			</div>
			<div class="info">
				<div class="key">请输入已绑定手机号：</div>
				<input class="value" type="text" placeholder="请输入您的手机号" v-model="allPhoneNum">
			</div>
		</div>
		<div class="btnGroup">
			<div class="btn1" v-tap="{methods:saveChangePhone}">下一步</div>
			<div class="btn1" v-tap="{methods:cancel}">取消</div>
		</div>
	</div>
</template>
<script type="text/javascript">

	export default{
		data(){
			return{
				isTest:false,
				phoneNumber:"",
				allPhoneNum:""
			}
		},
		methods:{
			cancel(){
				this.$parent.$emit("CLOSEALERT",{name:"changePhoneFrame",change:"0"})
			},
			saveChangePhone(){
				if(this.allPhoneNum == this.phoneNumber){
					this.$parent.$emit("CLOSEALERT",{name:"changePhoneFrame",change:"1"})
				}else{
					this.$layer.msg("请输入正确的手机号")
				}
			}
		},
		created(){
			this.isTest = window.localStorage.getItem('isTest')==1?true:false
			this.phoneNumber = this.$store.state.app.personalInfo.PhoneNumber
			console.log(this.phoneNumber)
		}

	}
</script>
<style type="text/css" lang="scss" src="./css/changePhone.scss"></style>
