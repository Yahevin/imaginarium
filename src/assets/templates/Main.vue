<template>
	<section>
		<h1>Hello World</h1>
		
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
	  components: {
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