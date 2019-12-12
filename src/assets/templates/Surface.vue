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
				  :ref="'cell--' + cell.col + '-' + cell.row"
					@mouseover="mouseOver($event.target)">
			</div>
		</div>
		<img class="bg__img" src="https://yastatic.net/s3/bro-bg-store/f509a2ab-80e4-420b-a8a7-f1e7df804c3a.webp">
	</div>
</template>

<script>
  import $ from "jquery";
  import {store} from '../js/store/index';
	import getSiblings from '@/assets/js/mixins/surfaceCells'


  export default {
    name: "Surface",
    store,
	  data() {
    	return {
    		cells: [],
		    siblings: [],
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
				    width = $(document).innerWidth();
		  	
		  	return Math.ceil(width / height* 9 * 1.6);
		  },
		  patternZero(el) {
			  let currRow = $(el).data('row');
			  let currCol = $(el).data('col');
			  
			  this.siblings.forEach((item)=>{
			  	$(item).removeClass('hovered-a').removeClass('hovered-b');
			  });
			  this.siblings = [];
			
			  let siblings1 = getSiblings.func01(currRow,currCol);
			  let siblings2 = getSiblings.func02(currRow,currCol);
				
			  siblings1.forEach((item)=>{
				  let el = 'cell--' + item.cl + '-' + item.rw;
				
				  $(this.$refs[el]).addClass('hovered-a');
				  this.siblings.push(this.$refs[el]);
			  });
			  siblings2.forEach((item)=>{
				  let el = 'cell--' + item.cl + '-' + item.rw;
				
				  $(this.$refs[el]).addClass('hovered-b');
				  this.siblings.push(this.$refs[el]);
			  });
		  },
		  patternOne(el) {
			  let currRow = $(el).data('row');
			  let currCol = $(el).data('col');
			
			  this.siblings.forEach((item)=>{
				  $(item).removeClass('hovered-a').removeClass('hovered-b');
			  });
			  this.siblings = [];
			
			  let siblings1 = getSiblings.func11(currRow,currCol);
			  let siblings2 = getSiblings.func12(currRow,currCol);
			  
			  siblings1.forEach((item)=>{
				  let el = 'cell--' + item.cl + '-' + item.rw;

				  $(this.$refs[el]).addClass('hovered-a');
				  this.siblings.push(this.$refs[el]);
			  });
			  siblings2.forEach((item)=>{
				  let el = 'cell--' + item.cl + '-' + item.rw;
				
				  $(this.$refs[el]).addClass('hovered-b');
				  this.siblings.push(this.$refs[el]);
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
				  z.cells = [];
				  z.createCells();
			  })
		  }
	  }
  }
</script>

<style lang="scss" scoped>

</style>