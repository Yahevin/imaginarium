<template>
	<section class="cards">
		<article class="cards-wrap">
			<div class="cards-item"
			     v-for="card in newCards">
				<img class="cards-item__img"
					:src="card.img_url">
			</div>
		</article>
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