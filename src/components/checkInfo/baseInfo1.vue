<template>
	<div class="step1">
		<div class="checkInfo">
			<div class="p1">
				信息验证
			</div>
			<div class="p2">
				<!-- <div class="info">
					<label>护照号：</label>
					<input type="text" v-model='PassportNumber' disabled="disabled">
				</div> -->
				<div class="info">
					<label>姓名：</label>
					<input type="text" v-model='Name'>
				</div>
				<div class="info">
					<label>国家：</label>
					<input type="text" v-model='CountryName' disabled="disabled">
				</div>
				<div class="info">
					<label>出行目的：</label>
					<select v-model='VisaType'>
						<option value="1">旅游</option>
						<option value="2">工作</option>
						<option value="3">学习</option>
						<option value="4">商务</option>
						<option value="5">探亲</option>
						<option value="6">EVUS</option>
						<option value="7">绿通</option>
					</select>
				</div>
				<div class="info">
					<label>职业：</label>
					<select v-model="Career">
						<option value='1'>自雇</option>
				        <option value='6'>受雇</option>
				        <option value='5'>自由职业</option>
				        <option value='4'>退休</option>
				        <option value='3'>学生（18岁及以上）</option>
				        <option value='2'>学生（18岁以下）</option>
				        <option value='7'>学龄前儿童</option>
					</select>
				</div>
				<div class="info">
					<label>婚姻状况：</label>
					<select v-model="Married">
						<option value="0">未婚</option>
			            <option value="1">已婚</option>
			            <option value="2">离异</option>
			            <option value="3">丧偶</option>
					</select>
				</div>
			</div>
			<div class="p3" @click="CreateUserVisa">
				下一步
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				PassportNumber:"",
				Name:"",
				CountryName:"",
				CountryId:"",
				VisaType:"",
				Career:"",
				Married:"",
				userVisaId:""
			}
		},
		methods:{
			getUserVisa(){
				this.$http.get(this.$store.state.app.host + "api/Manage/UserVisaInfo",{
					params:{
						userVisaId:this.userVisaId,
						isAllFiles:true
					},
					headers:{Authorization: this.$store.state.app.token},
					timeout: this.$store.state.app.httpTime
				})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.PassportNumber = res.data.Result.PassportNumber,
							this.Name = res.data.Result.Name,
							this.CountryName = res.data.Result.CountryName,
							this.CountryName = res.data.Result.Country,
							this.VisaType = res.data.Result.VisaType,
							this.Career = res.data.Result.Identity,
							this.Married = res.data.Result.Married,
							this.userVisaId = res.data.Result.userVisaId
						}

					},
					function(err){

					}
				)
			},
			getUserVisaNZL(){
				this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo4NZL', {
					params: {
						userVisaId: this.userVisaId,
						isAllFiles: true
					},
					headers: { Authorization: this.$store.state.app.token },
					timeout: this.$store.state.app.httpTime
				})
				.then(
					function(res){

					},
					function(err){

					}
				)

			},
			CreateUserVisa(){
				this.$http.post(this.$store.state.app.host + "api/Wechat/CreateUserVisa",{
					PassportNumber:this.PassportNumber,
					Name:this.Name,
					VisaType:this.VisaType,
					Career:this.Career,
					Married:this.Married,
					CountryId:this.CountryId
				},
				{headers:{Authorization: this.$store.state.app.token}},
				{timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$router.push({
								path:"/main/content/info"
							})
						}
					},
					function(err){

					}
				)
			}
		},
		mounted(){
			this.$store.state.app.token = window.localStorage.getItem("Token")
			this.PassportNumber = window.localStorage.getItem("PassportNumber")
			this.CountryId = window.localStorage.getItem("CountryId")
			this.CountryName = window.localStorage.getItem("CountryName")
			this.userVisaId = window.localStorage.getItem("UserVisaId")
			if(this.CountryId ==3&&this.userVisaId){
				//新西兰
				this.getUserVisaNZL()
			}else if(this.userVisaId){
				this.getUserVisa()
			}
		},
		created(){
			if(window.localStorage.getItem("UserVisaId")==''){
				window.localStorage.setItem("PassportNumber", JSON.parse(window.localStorage.getItem('info'))[window.localStorage.getItem('seleCountry')].Passport)
				window.localStorage.setItem("CountryId", JSON.parse(window.localStorage.getItem('info'))[window.localStorage.getItem('seleCountry')].CountryId)
				window.localStorage.setItem("CountryName", JSON.parse(window.localStorage.getItem('info'))[window.localStorage.getItem('seleCountry')].CountryName)

			}


		}
	}
</script>
<style type="text/css" lang="scss" src="./css/checkInfo.scss"></style>
