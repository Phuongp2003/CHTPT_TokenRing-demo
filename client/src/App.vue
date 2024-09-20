<template>
	<div id="main">
		<h1>Token Ring Client</h1>
		<p>Client ID: {{ clientId }}</p>
		<p>Current Token: {{ token }}</p>
		<button
			@click="passToken"
			:disabled="token !== clientId">
			Pass Token
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				clientId: Math.random().toString(36).substring(7),
				token: null,
			};
		},
		async created() {
			await this.registerClient();
			await this.getToken();
			setInterval(this.getToken, 1000);
		},
		methods: {
			async registerClient() {
				await this.$http.post('http://localhost:3000/register', {
					clientId: this.clientId,
				});
			},
			async getToken() {
				const response = await this.$http.get(
					'http://localhost:3000/token'
				);
				this.token = response.data.token;
			},
			async passToken() {
				await this.$http.post('http://localhost:3000/token', {
					clientId: this.clientId,
				});
				this.getToken();
			},
		},
	};
</script>
