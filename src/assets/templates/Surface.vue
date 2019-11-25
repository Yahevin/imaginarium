<template>
	<div class="bg">
		<div class="bg-grid"
		     ref="backGround"
				 @mouseleave="mouseLeave">
			<div class="bg-grid__item"
					v-for="cell in cells"
					:data-col="cell.col"
					:data-row="cell.row"
					:data-ord="cell.ord"
					@mouseover="mouseOver($event.target)">
			</div>
		</div>
		<img class="bg__img" src="https://yastatic.net/s3/bro-bg-store/f509a2ab-80e4-420b-a8a7-f1e7df804c3a.webp">
	</div>
</template>

<script>
  import {store} from '../js/store/index';
  import $ from "jquery";
  
  export default {
    name: "Surface",
    store,
	  data() {
    	return {
    		cells: [],
	    }
	  },
	  created() {
		  this.createCells();
	  },
	  mounted() {
		  $(document).ready(()=> {
		    this.appearing();
		    this.setResize();
		  });
	  },
	  methods: {
		  createCells() {
			  let rows = 9;
			  let cols = this.getColumns();
			  let i = 1;
			
			  for (let col=0; col < cols; col++) {
				  for (let row=0; row < rows; row++) {
					  this.cells.push({
						  row: row,
						  col: col,
						  ord: i % 2,
					  });
					  i++;
				  }
			  }
		  },
		  getColumns() {
		  	let height = $(document).innerHeight(),
				    width = $(document).innerWidth(),
				    columns = Math.ceil(width / height* 9 * 1.6);
		  	
		  	return columns;
		  },
		  patternOne(el) {
			  var currRow = $(el).data('row');
			  var currCol = $(el).data('col');
			  var $siblings = $(el).siblings().filter((index,item)=>{
			  	$(item).removeClass('hovered-a').removeClass('hovered-b');
			  	if ($(item).data('row') < (currRow + 2) && $(item).data('row') > (currRow - 2)) {
			  		return $(item);
				  }
			  });
			
			  $siblings.each((index,item)=>{
				  var rw = $(item).data('row');
				  var cl = $(item).data('col');
				
				  var res1 = ((rw - 1 === currRow) && (cl === currCol))  ||
					  (((cl - 1 === currCol) || (cl + 1 === currCol)) && (rw === currRow));
				
				  var res2 = ((cl + 1 === currCol) && ((rw + 1 === currRow) || (rw - 1 === currRow))) ||
					  ((cl - 1 === currCol) && ((rw + 1 === currRow) || (rw - 1 === currRow))) ||
					  ((cl === currCol) && (rw + 1 === currRow)) ||
					  ((rw === currRow) && ((cl + 2 === currCol) || (cl - 2 === currCol))) ||
					  ((rw - 1 === currRow) && ((cl + 2 === currCol) || (cl - 2 === currCol)));
				
				  if (res1) {
					  $(item).addClass('hovered-a');
				  } else if (res2) {
					  $(item).addClass('hovered-b');
				  }
				  $(el).removeClass('hovered-b').addClass('hovered-a');
				
			  });
		  },
		  patternZero(el) {
			  var currRow = $(el).data('row');
			  var currCol = $(el).data('col');
			  var $siblings = $(el).siblings().filter((index,item)=>{
				  $(item).removeClass('hovered-a').removeClass('hovered-b');
				  if ($(item).data('row') < (currRow + 2) && $(item).data('row') > (currRow - 2)) {
					  return $(item);
				  }
			  });
			
			  $siblings.each((index,item)=>{
				  var rw = $(item).data('row');
				  var cl = $(item).data('col');
				
				  var res1 = ((rw + 1 === currRow) && (cl === currCol))  ||
					  (((cl - 1 === currCol) || (cl + 1 === currCol)) && (rw === currRow));
				
				  var res2 = ((cl + 1 === currCol) && ((rw + 1 === currRow) || (rw - 1 === currRow))) ||
					  ((cl - 1 === currCol) && ((rw + 1 === currRow) || (rw - 1 === currRow))) ||
					  ((cl === currCol) && (rw - 1 === currRow)) ||
					  ((rw === currRow) && ((cl + 2 === currCol) || (cl - 2 === currCol))) ||
					  ((rw + 1 === currRow) && ((cl + 2 === currCol) || (cl - 2 === currCol)));
				
				  if (res1) {
					  $(item).addClass('hovered-a');
				  } else if (res2) {
					  $(item).addClass('hovered-b');
				  }
				  $(el).removeClass('hovered-b').addClass('hovered-a');
				
			  });
		  },
		  appearing() {
			  let grid = $(this.$refs.backGround);
			  
			  $(grid).addClass('bg-grid--appear');
			  setTimeout(()=>{
				  $(grid).removeClass('bg-grid--appear');
				  $(grid).addClass('bg-grid--appeared');
			  },1400);
		  },
		  mouseOver(el) {
			  if ($(el).data('ord') > 0) {
				  this.patternOne(el);
			  } else {
				  this.patternZero(el);
			  }
		  },
		  mouseLeave() {
			  $('.bg-grid__item').removeClass('hovered-a').removeClass('hovered-b');
		  },
		  setResize() {
		  	let z = this;
		  	
			  $(window).resize(function () {
			  	
			  	console.log('resize')
				  z.cells = [];
				  z.createCells();
			  })
		  }
	  }
  }
</script>

<style lang="scss" scoped>

</style>