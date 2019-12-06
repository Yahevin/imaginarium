class Figure {
	constructor(iniData) {
		this.id = iniData.id;
		this.position = 0;
		this.direction = 'left';
		this.el = iniData.el;
		this.refs = iniData.refs;
		this.row = 10;
		this.col = 9;
		this.duration = 1000;
	}
	
	shiftResolve(newPosition) {
		if (this.position < newPosition) {
			this.setJourneyForward(newPosition);
		} else {
			this.setJourneyBack(newPosition);
		}
	}
	async setJourneyForward(newPosition) {
		let journey = this.getPath(newPosition);
		
		if(journey.length > 0) {
			journey.push({
				direction: 'next',
				position: newPosition,
			});
			this.setLongJourney(journey);
		} else if (newPosition > this.position) {
			let way = {
				direction: this.direction,
				position: newPosition,
			};
			await this.directionResolve(way);
		}
	}
	async setJourneyBack(newPosition) {
		let journey = this.getPath(newPosition);
		
		if(journey.length > 0) {
			journey.push({
				direction: 'next',
				position: newPosition,
			});
			this.setLongJourney(journey);
		} else if (newPosition < this.position) {
			let way = {
				direction: this.getDirectionBack(this.direction),
				position: newPosition,
			};
			await this.directionResolve(way);
		}
	}
	getPath(pos) {
	
	}
	async directionResolve(way) {
		let step = Math.abs( way.position - this.position);
		this.direction = way.direction === 'next' ? this.direction : way.direction;
		
		switch (this.direction) {
			case 'top':
				await this.moveTop(step);
				break;
			case 'right':
				await this.moveRight(step);
				break;
			case 'bottom':
				await this.moveBottom(step);
				break;
			case 'left':
				await this.moveLeft(step);
				break;
		}
	}
	getDirectionBack(direction) {
		switch (direction) {
			case 'top':
				return 'bottom';
			case 'right':
				return 'left';
			case 'bottom':
				return 'top';
			case 'left':
				return 'right';
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
			console.log('way',way);
			await this.directionResolve(way);
		}
	}
}

export default Figure ;