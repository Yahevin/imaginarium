<template>
	<section class="board">
		<div class="board__perspective">
			<div class="board__grid">
				<span class="board__player"
			      v-for="partyMember in party"
			      :id="'ref_' + partyMember.id"
						:class="partyMember.player_style">
				</span>
				<div class="board__cell"
						v-for="(cell,index) in cells"
			      :ref="'cell-' + cell.row + '-' + cell.col"
						:data-col="cell.col"
						:data-row="cell.row"
						:class="cellPurpose(index)">
				</div>
			</div>
		</div>
	</section>
</template>

<script>
  import {store} from '../../js/store/index';
  import Figure from '@/assets/js/mixins/boardMove';
  import $ from "jquery";
  
  export default {
    name: "LeaderBoard",
    store,
	  data() {
    	return {
		    cells: [],
		    cellsCount: 100,
		    figures: [],
		    figureSet: new Set(),
		    partyResults: [],
		    partyChanged: false,
		    pathSet: new Set(),
		    path: [],
		    pathCell: [80,90,89,99,98,97,87,77,67,66,65,75,74,73,63,62,61,51,41,
        31,32,33,43,44,45,35,25,24,14,4,5,6,7,17,27,28,38,48,49,59,69,70],
	    }
	  },
	  props: {
		  active: {
		  	type: Boolean,
			  default: false,
		  },
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
	  created() {
		  for (let i=0; i < this.cellsCount; i++) {
			  this.cells.push({
				  col: i % 10 + 1,
				  row: Math.ceil((i + 1) / 10),
			  })
		  }
	  },
	  async mounted () {
		  let current = {
			  pos: {
				  row: 10,
				  col: 8,
			  }
		  };
		  this.pathSet.add(this.$refs['cell-10-9']);
		  this.pathSet.add(this.$refs['cell-10-8']);
		  this.path.push({
			  cell: 'cell-10-9',
			  pos: {
				  row: 10,
				  col: 9,
			  },
		  });
		  this.path.push({
			  cell: 'cell-10-8',
			  pos: current.pos,
		  });
		
		  for (let i=0; i < 100; i++) {
			  if(current !== undefined) {
				  current = this.findNextCell(current.pos);
				  if(current !== undefined) {
					  this.path.push(current);
				  }
			  } else {
				  break;
			  }
		  }
		  this.path = this.path.map((item)=>{
			  return {
				  pos: item.pos,
				  cell: this.$refs[item.cell],
			  }
		  });
	  },
	  watch: {
		  party: function (newParty,oldParty) {
		  	if (newParty.length === oldParty.length) {
				  newParty.forEach((newItem)=>{
					  oldParty.forEach((oldItem)=>{
					  	if (newItem.id === oldItem.id) {
							  this.partyChanged = newItem.score !== oldItem.score ? true : this.partyChanged;
						  }
					  })
				  });
			  } else {
		  		this.boardIni();
			  }
		  },
		  active: function () {
		  	if (this.partyChanged) {
				  this.partyChanged = false;
				  this.startShifting();
			  }
		  }
	  },
	  methods: {
		  cellPurpose(index) {
			  for (let item of this.pathCell) {
				  if (item === index + 1) {
					  return 'board__cell--path';
				  }
			  }
		  },
		  findNextCell(current) {
		  	let siblings = this.getSiblings(current),
				    resp;
			
			  siblings.forEach((item)=>{
				  if(!this.pathSet.has(this.$refs[item.cell])) {
					  this.pathSet.add(this.$refs[item.cell]);
					  resp = item;
				  }
			  });
			  return resp;
		  },
		  getSiblings(current) {
		  	let siblings = [
					  {
					  	cell: 'cell-' + (current.row + 1) + '-' + current.col,
						  pos: {
					  		row: (current.row + 1),
							  col: current.col,
						  },
					  },
					  {
						  cell: 'cell-' + (current.row - 1) + '-' + current.col,
						  pos: {
							  row: (current.row - 1),
							  col: current.col,
						  },
					  },
					  {
						  cell: 'cell-' + current.row  + '-' + (current.col + 1),
						  pos: {
							  row: current.row,
							  col: (current.col + 1),
						  },
					  },
					  {
						  cell: 'cell-' + current.row  + '-' + (current.col - 1),
						  pos: {
							  row: current.row,
							  col: (current.col - 1),
						  },
					  },
			  ];
		  	
			  return siblings.filter((item)=>{
					if (this.$refs.hasOwnProperty(item.cell) && $(this.$refs[item.cell][0]).hasClass('board__cell--path')) {
							return {
								cell: this.$refs[item.cell][0],
								pos: item.pos,
							};
						}
				});
      },
		  addNewFigure(partyMember) {
			  let figure = new Figure({
				  id: partyMember.id,
				  position: +partyMember.score,
				  path: this.path,
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
		  },
		  boardIni() {
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
			  setTimeout(()=>{
				  this.startShifting();
			  },500);
		  }
	  },
  }
</script>

<style lang="scss" scoped>
</style>