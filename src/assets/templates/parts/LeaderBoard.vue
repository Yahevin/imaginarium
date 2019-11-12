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
	
	.player {
		--row: 10/11;
		--col: 9/10;
		--step: 1;
		
		grid-column: var(--col);
		grid-row: var(--row);
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: blue;
		
		&--move_top {
			animation: move_top calc(1s * var(--step)) ease-out;
		}
		&--move_right {
			animation: move_right calc(1s * var(--step)) ease-out;
		}
		&--move_bottom {
			animation: move_bottom calc(1s * var(--step)) ease-out;
		}
		&--move_left {
			animation: move_left calc(1s * var(--step)) ease-out;
		}
	}
	
	.perspective {
		perspective: 1000px;
		transform-style: flat;
		width: 500px;
		height: 600px;
		margin: 0 auto;
		overflow: hidden;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(10, 1fr);
		grid-gap: 5px;
		width: 500px;
		height: 500px;
		transform-style: preserve-3d;
		transform: rotateX(45deg) rotateZ(45deg);
		margin: 0 auto;
	}
	.cell {
		width: 100%;
		height: 100%;
		
		&:nth-of-type(80),
		&:nth-of-type(90),
		&:nth-of-type(89),
		&:nth-of-type(99),
		&:nth-of-type(98),
		&:nth-of-type(97),
		&:nth-of-type(87),
		&:nth-of-type(77),
		&:nth-of-type(67),
		&:nth-of-type(66),
		&:nth-of-type(65),
		&:nth-of-type(75),
		&:nth-of-type(74),
		&:nth-of-type(73),
		&:nth-of-type(63),
		&:nth-of-type(62),
		&:nth-of-type(61),
		&:nth-of-type(51),
		&:nth-of-type(41),
		&:nth-of-type(31),
		&:nth-of-type(32),
		&:nth-of-type(33),
		&:nth-of-type(43),
		&:nth-of-type(44),
		&:nth-of-type(45),
		&:nth-of-type(35),
		&:nth-of-type(25),
		&:nth-of-type(24),
		&:nth-of-type(14),
		&:nth-of-type(4),
		&:nth-of-type(5),
		&:nth-of-type(6),
		&:nth-of-type(7),
		&:nth-of-type(17),
		&:nth-of-type(27),
		&:nth-of-type(28),
		&:nth-of-type(38),
		&:nth-of-type(48),
		&:nth-of-type(49),
		&:nth-of-type(59),
		&:nth-of-type(69),
		&:nth-of-type(70)
		{
			background-color: #34d9e2;
		}
	}
	
	@keyframes move_top {
		0% {
			transform: translateY(calc(100% * var(--step)));
		}
		100% {
			transform: translateY(0);
		}
	}
	@keyframes move_right {
		0% {
			transform: translateX(calc(-100% * var(--step)));
		}
		100% {
			transform: translateY(0);
		}
	}
	@keyframes move_bottom {
		0% {
			transform: translateY(calc(-100% * var(--step)));
		}
		100% {
			transform: translateY(0);
		}
	}
	@keyframes move_left {
		0% {
			transform: translateX(calc(100% * var(--step)));
		}
		100% {
			transform: translateY(0);
		}
	}
</style>