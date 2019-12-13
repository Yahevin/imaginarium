<template>
	<section class="console">
		<form class="join-form"
		      @submit="addNewCard($event)">
			<input type="text"
			       class="join-form__input"
			       placeholder="image-url"
			       v-model="newCard">
			<input type="submit" class="join-form__submit">
		</form>
	</section>
</template>

<script>
	export default {
		name: "Console",
		data() {
			return {
				newCard: null,
			}
		},
		methods: {
			addNewCard(e) {
				e.preventDefault();
				$.ajax({
					url: '/add-card',
					type: 'POST',
					data: {img_url: this.newCard},
					success:()=>{
						this.newCard = null;
					},
				})
			}
		}
	}
</script>