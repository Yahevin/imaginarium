<template>
	<section>
		<preview v-if="!start"
			@start="begin"></preview>
		<dungeon></dungeon>
		<game-play v-show="start"></game-play>
	</section>
</template>

<script>
	import {store} from '../js/store/index';
	import Dungeon from './Dungeon';
	import GamePlay from './GamePlay';
	import Preview from './Preview';

	export default {
	  name: "Main",
	  components: {
      Dungeon,
      GamePlay,
		  Preview,
	  },
	  store,
		data() {
      return {
				start: true,
	    }
		},
    computed: {

    },
    methods: {
	  	begin() {
			  this.start = true;
		  },
    },
	}
</script>
