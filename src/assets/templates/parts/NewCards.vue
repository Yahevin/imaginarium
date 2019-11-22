<template>
	<section class="">
		<article class=""
			v-for="card in newCards">
			<div class="">
				<img class=""
					:src="card.img_url">
			</div>
		</article>
		<button @click="enough">
			enough
		</button>
	</section>
</template>

<script>
	import {store} from '../../js/store/index';
	
	export default {
		name: "NewCards",
		data() {
			return {
			
			}
		},
		store,
		computed: {
			newCards() {
				return this.$store.getters.newCards;
			},
			player() {
				return this.$store.getters.player;
			},
			game() {
				return this.$store.getters.game;
			},
		},
		methods: {
			enough() {
				this.$emit('enough');
			}
		},
	}
</script>

<style scoped>

</style>