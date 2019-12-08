class Figure {
	constructor(iniData) {
		this.id = iniData.id;
		this.position = 0;
		this.direction = 'left';
		this.el = iniData.el;
		this.path = iniData.path;
		this.playerStyle = iniData.playerStyle;
		this.row = 10;
		this.col = 9;
		this.duration = 1000;
	}
	shiftResolve(newPosition) {
		let cells,
				rounds = Math.floor(this.position / this.path.length),
				currPos = this.position - rounds * this.path.length,
				newPos = newPosition - rounds * this.path.length,
				borderCrossing = newPos > this.path.length || newPos < 0;
		
		if (borderCrossing) {
			if (currPos < newPos) {
				newPos -= this.path.length;
				cells = this.path.slice();
				let negativeCells = cells.splice(currPos);
				let positiveCells = cells.splice(0, newPos + 1);
				negativeCells.push(...positiveCells);
				cells = negativeCells;
			} else {
				cells = this.path.slice();
				let positiveCells = cells.splice(0, currPos + 1);
				positiveCells.reverse();
				let negativeCells = cells.splice(newPos);
				negativeCells.reverse();
				positiveCells.push(...negativeCells);
				cells = positiveCells;
			}
		} else {
			if (currPos < newPos) {
				cells = this.path.slice(currPos, newPos + 1);
			} else {
				cells = this.path.slice(newPos, currPos  + 1);
				cells.reverse();
			}
		}
		
		let journey = this.getPath(cells);
		this.setLongJourney(journey);
	}
	getPath(cells) {
		let steps = [],
				journey = [];
		
		cells.forEach((item, index) => {
			if (index < cells.length - 1) {
				steps.push(this.findDirection(cells[index].pos, cells[index + 1].pos));
			}
		});
	
		let direction = steps[0],
				step = 1;
		
		steps.splice(0,1);
		function noteStep(){
			journey.push({
				direction: direction,
				step: step,
			});
		}
		
		steps.forEach((item)=>{
			if (item === direction) {
				step++;
			} else {
				noteStep();
				direction = item;
				step = 1;
			}
		});
		noteStep();
		
		return journey;
	}
	findDirection(cur,next) {
		if (cur.col === next.col) {
			return ((cur.row - next.row) < 0)
				? 'bottom'
				: 'top'
		} else {
			return ((cur.col - next.col) < 0)
				? 'right'
				: 'left'
		}
	}
	async directionResolve(way) {
		switch (way.direction) {
			case 'top':
				await this.moveTop(way.step);
				break;
			case 'right':
				await this.moveRight(way.step);
				break;
			case 'bottom':
				await this.moveBottom(way.step);
				break;
			case 'left':
				await this.moveLeft(way.step);
				break;
		}
	}
	async moveTop(step) {
		let time = Math.abs(step)*this.duration,
				z = this;
		
		this.row -= step;
		
		$(this.el).css('--step', step);
		$(this.el).addClass('player--move_top');
		$(this.el).css('--row', this.row + '/' + (this.row + 1));
		
		return new Promise(resolve => {
			setTimeout(()=>{
				z.position += step;
				$(z.el).removeClass('player--move_top');
				resolve();
			}
			,time)
		})
	}
	async moveRight(step) {
		let time = Math.abs(step)*this.duration,
			z = this;
		
		this.col += step;
		
		$(this.el).css('--step', step);
		$(this.el).addClass('player--move_right');
		$(this.el).css('--col', this.col + '/' + (this.col + 1));
		
		return new Promise((resolve) => {
			setTimeout(function () {
				z.position += step;
				$(z.el).removeClass('player--move_right');
				resolve();
			}, time)
		})
	}
	async moveBottom(step) {
		let time = Math.abs(step)*this.duration,
			z = this;
		
		this.row += step;
		
		$(this.el).css('--step', step);
		$(this.el).addClass('player--move_bottom');
		$(this.el).css('--row', this.row + '/' + (this.row + 1));
		
		return new Promise((resolve) => {
			setTimeout(function () {
				z.position += step;
				$(z.el).removeClass('player--move_bottom');
				resolve();
			}, time)
		})
	}
	async moveLeft(step) {
		let time = Math.abs(step)*this.duration,
			z = this;
		
		this.col -= step;
		
		$(this.el).css('--step', step);
		$(this.el).addClass('player--move_left');
		$(this.el).css('--col', this.col + '/' + (this.col + 1));
		
		return new Promise((resolve) => {
			setTimeout(function () {
				z.position += step;
				$(z.el).removeClass('player--move_left');
				resolve();
			}, time)
		})
	}
	async setLongJourney(journey) {
		for (const way of journey) {
			await this.directionResolve(way);
		}
	}
}

export default Figure ;