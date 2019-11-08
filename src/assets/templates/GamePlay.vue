<template>
	<section>
		<join @start="startGame"></join>
	</section>
</template>

<script>
  import {store} from '../js/store/index';
  import Join from  './parts/Join';
  import MineCards from  './parts/MineCards';
  import PlayTable from  './parts/PlayTable';
  import LeaderBoard from './parts/LeaderBoard';
  
  export default {
    name: "GamePlay",
    components: {
      Join,
      MineCards,
      PlayTable,
      LeaderBoard,
    },
    store,
	  methods: {
		  startGame() {
		    console.log('go')
		  }
	  }
  }
</script>

<style scoped>

</style>