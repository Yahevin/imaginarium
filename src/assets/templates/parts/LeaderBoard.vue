<template>
	<section class="">
		<div class="perspective">
			<div class="grid">
				<span class="player"
			      v-for="partyMember in party"
			      :id="'ref_' + partyMember.id">
				</span>
				<div class="cell"
						v-for="(cell, index) in cells">
					{{ index + 1 }}
				</div>
			</div>
		</div>
	</section>
</template>

<script>
  import {store} from '../../js/store/index';
  import boardTwists from '@/assets/js/mixins/boardTwists';
  import Figure from '@/assets/js/mixins/boardMove';
  
  export default {
    name: "LeaderBoard",
    store,
	  mixins: [boardTwists],
	  data() {
    	return {
		    cells: [].length = 100,
		    figures: [],
		    figureSet: new Set(),
		    partyResults: [],
	    }
	  },
	  computed: {
		  party() {
		    return this.$store.getters.party;
		  },
		  partySize() {
		  	return this.figures.length;
		  },
		  gameId() {
			  return this.$store.getters.game.id;
		  },
		  
	  },
	  async mounted () {
		  await this.$store.dispatch('getPartyResults',{room_id: 1});
		  
		  if (this.party.length > this.partySize) {
			  if (this.partySize === 0) {
				  this.party.forEach((partyMember)=>{
					  this.addNewFigure(partyMember);
				  })
			  } else {
				  this.party.forEach((partyMember) => {
					  if (!this.figureSet.has(partyMember.id)) {
						  this.addNewFigure(partyMember);
					  }
				  });
			  }
		  }
		  this.startShifting();
	  },
	  watch: {
		  party: function () {
			
			  this.startShifting();
		  }
	  },
	  methods: {
		  addNewFigure(partyMember) {
			  let figure = new Figure({
				  id: partyMember.id,
				  nickName: partyMember.nickName,
				  playerStyle: partyMember.playerStyle,
				  position: +partyMember.score,
				  twists: this.twists,
				  el: '#ref_' + partyMember.id,
			  });
			
			  this.figures.push(figure);
			  this.figureSet.add(figure.id);
		  },
		  startShifting() {
			  this.party.forEach((newVal)=>{
				  this.figures.forEach((figure)=>{
					  if(figure.id === newVal.id) {
						  figure.shiftResolve(newVal.score);
					  }
				  });
			  });
		  }
	  },
  }
</script>

<style lang="scss" scoped>
</style>