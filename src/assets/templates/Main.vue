<template>
	<section>
		<surface></surface>
		<dungeon></dungeon>
		<game-play></game-play>
	</section>
</template>

<script>
	import {store} from '../js/store/index';
	import Surface from './Surface';
	import Dungeon from './Dungeon';
	import GamePlay from './GamePlay';
	
	export default {
	  name: "Main",
	  component: {
        Surface,
        Dungeon,
        GamePlay,
	  },
	  store,
      computed: {
        notes() {
          return this.$store.getters.notes;
        }
      },
      methods: {
        addNew() {
          this.$store.dispatch('addNote', { text: 'новая заметка' })
        }
      }
	}
</script>