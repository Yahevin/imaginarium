<template>
	<section class="preview">
			<article class="preview__sky hue-rotate"></article>
			<article class="preview__mountains mountain-grid hue-rotate">
				<img class="mountain-grid__item" src="@/assets/img/mountain-left.png">
				<img class="mountain-grid__item" src="@/assets/img/mountain-center.png">
				<img class="mountain-grid__item" src="@/assets/img/mountain-right.png">
			</article>
			<article class="preview__abyss">
				<img src="@/assets/img/abyss.png">
			</article>
	</section>
</template>

<script>
	export default {
		name: "Preview"
	}
</script>

<style scoped>

</style>