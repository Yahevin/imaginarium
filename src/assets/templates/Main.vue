<template>
	<section>
		<h1>GO</h1>
		<div v-for='note in notes'>
			{{ note.text }}
		</div>
		<button @click='addNew'>Добавить заметку</button>
	</section>
</template>

<script>
	import {store} from '../js/store/index'
	
	export default {
	  name: "Main",
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