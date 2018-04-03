<template>
	<div class="main">
		<div>
			<component is="Banner"></component>
		</div>
		<div v-if="nowRouter!='forgetPassword'">
			<component is="SideBar"></component>
		</div>
		<div>
			<router-view/>
			<!-- <component is="Content"></component> -->
		</div>
	</div>
</template>
<script type="text/javascript">
	import Banner from "../banner/banner.vue"
	import SideBar from "../sidebar/sidebar.vue"
	// import Content from "../content/content.vue"

	export default{
		data(){
			return {
				nowRouter:""
			}
		},
		watch:{
			$route(to,from){
				console.log(to,"??",from)
			}
		},
		components:{
			Banner,
			SideBar
		},
		created(){
			this.nowRouter = this.$route.fullPath.split("/")[2]
		}
	}
</script>
<style type="text/css">
	@import url(./css/style.css);
	@import url(../css/mobiscroll.2.13.2.css);
	/*@import url(../css/mobiscroll.custom-2.17.0.min.css);*/
</style>
