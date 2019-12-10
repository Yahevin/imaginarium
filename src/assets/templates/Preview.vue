<template>
	<section class="preview">
		<transition name="preview-first">
			<div v-show="showFirst"
			     @click="showFirst = false"
			     class="preview__section">
				<article class="preview__mountains mountain-grid hue-rotate">
					<img class="mountain-grid__item" src="@/assets/img/mountain-left.png">
					<img class="mountain-grid__item" src="@/assets/img/mountain-center.png">
					<img class="mountain-grid__item" src="@/assets/img/mountain-right.png">
				</article>
				<article class="preview__abyss">
					<img src="@/assets/img/abyss.png">
				</article>
			</div>
		</transition>
			<div v-show="!showFirst"
					class="preview__section">
					<article class="preview__dark darkness">
					</article>
			</div>
	</section>
</template>

<script>
	export default {
		name: "Preview",
		data() {
			return {
				showFirst: true,
			}
		},
	}
</script>

<style scoped>

</style>