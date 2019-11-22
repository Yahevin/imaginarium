<template>
		<section class="style">
				<form ref="styleForm"
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
						</article>
						<input type="submit"
						       class="style__submit"
						       v-show="styleSelected">
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
			makeChoise(event) {
				event.preventDefault();
				let data = {
					player_style: this.style,
					user_id: this.player.id
				};
				
				this.$store.dispatch('setPlayerStyle', data);
				this.$emit('start');
			},
		},
	}
</script>

<style lang="scss" scoped>
	.style {
		&-grid {
			display: grid;
			grid-template-columns: repeat(6,1fr);
			grid-template-rows: 1fr 1fr 1fr;
			justify-items: center;
			grid-gap: 20px 0;
			&__item {
				width:50%;
				padding-top:50%;
				position: relative;
				z-index: 1;
				
				/*left*/
				&:nth-of-type(1),
				&:nth-of-type(6) {
					grid-column: 1 / span 2;
				}
				/*center*/
				&:nth-of-type(2),
				&:nth-of-type(7) {
					grid-column: 3 / span 2;
				}
				/*right*/
				&:nth-of-type(3),
				&:nth-of-type(8) {
					grid-column: 5 / span 2;
				}
				/*center-left*/
				&:nth-of-type(4) {
					width:25%;
					padding-top:25%;
					grid-column: 1 / span 4;
					grid-row: 2 / 3;
				}
				/*center-right*/
				&:nth-of-type(5) {
					width:25%;
					padding-top:25%;
					grid-column: 3 / span 4;
					grid-row: 2 / 3;
				}
			}
			&__veil {
				position: absolute;
				z-index: 0;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
		&__radio {
			&:checked + label {
				box-shadow: 0 0 8px 2px #FFD700;
				animation: 0.3s onTapped;
			}
		}
		&__label {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			position: absolute;
			top: 0;
			left: 0;
			transition: all 0.2s ease-in-out;
		}
		&__submit {
			position: relative;
			z-index: 1;
		}
	}
</style>