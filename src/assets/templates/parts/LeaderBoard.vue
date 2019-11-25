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
		
		<button @click="start">Старт!</button>
		
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
	    }
	  },
	  computed: {
		  player() {
			  return this.$store.getters.player;
		  },
		  desk() {
		  	return this.$store.getters.desk;
		  },
		  party() {
		    return this.$store.getters.party;
		  },
		  partySize() {
		  	return this.figures.length;
		  }
	  },
	  created() {
		  this.party.forEach((partyMember)=>{
			  this.addNewFigure(partyMember);
		  });
	  },
	  watch: {
      party: function (newParty, oldParty) {
      	
      	if (newParty.length > this.partySize) {
      		if (this.partySize === 0) {
      			newParty.forEach((partyMember)=>{
      				this.addNewFigure(partyMember);
			      })
		      } else {
			      newParty.forEach((partyMember) => {
				      if (!this.figureSet.has(partyMember.id)) {
					      this.addNewFigure(partyMember);
				      }
			      });
		      }
	      };
	
	      newParty.forEach((newVal)=>{
		      this.figures.forEach((figure)=>{
		      	if(figure.id === newVal.id) {
				      figure.shiftResolve(newVal.position);
		      		return;
			      }
		      });
	      });
      },
	  },
	  methods: {
		  addNewFigure(partyMember) {
			  let figure = new Figure({
				  id: partyMember.id,
				  nickName: partyMember.nickName,
				  playerStyle: partyMember.playerStyle,
				  position: partyMember.position,
				  twists: this.twists,
				  el: '#ref_' + partyMember.id,
			  });
			
			  this.figures.push(figure);
			  this.figureSet.add(figure.id);
		  },
    	
    	
      start() {
      	let $player= $(this.$refs.player),
		      data = [{
			      id: 237,
			      position: 41,
			      nickName: 'Horror House',
			      playerStyle: ''
		      }];
      	
      	this.$store.dispatch('getPartyResults', data);
      },
		  
	  },
  }
</script>

<style lang="scss" scoped>
</style>