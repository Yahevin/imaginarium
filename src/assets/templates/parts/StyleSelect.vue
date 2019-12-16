<template>
		<section class="style">
				<form class="style__form"
						ref="styleForm"
						@submit="makeChoise($event)">
						<article class="style-grid">
								<div v-for="(cell, index) in cells"
								     class="style-grid__item">
										<input type="radio"
										       class="style__radio invisible"
										       :value="cell.style"
										       v-model="style"
													 :id="'style-picker-' + index">
										<label class="style__label"
									       :class="cell.style"
									       :for="'style-picker-' + index"></label>
								</div>
								<div class="style-grid__veil"
										@click="clearChosen"></div>
								<button type="submit"
								       class="style__submit"
								        v-show="styleSelected">
								</button>
						</article>
				</form>
		</section>
</template>

<script>
	import {store} from '../../js/store/index';
	
	export default {
		name: "StyleSelect",
		store,
		data() {
			return {
				style: null,
				cells: [
					{style: 'ps-red'},
					{style: 'ps-green'},
					{style: 'ps-blue'},
					{style: 'ps-pink'},
					{style: 'ps-yellow'},
					{style: 'ps-black'},
					{style: 'ps-violet'},
					{style: 'ps-cyan'},
				],
			}
		},
		computed: {
			styleSelected() {
				return this.style !== null;
			},
			player() {
				return this.$store.getters.player;
			},
		},
		methods: {
			clearChosen() {
				$(this.$refs.styleForm).find('input').checked = false;
				this.style = null;
			},
			async makeChoise(e) {
				e.preventDefault();
				let data = {
					player_style: this.style,
					user_id: this.player.id
				};
				
				await this.$store.dispatch('setPlayerStyle', data);
				this.$emit('start');
			},
		},
	}
</script>

<style lang="scss" scoped>
</style>