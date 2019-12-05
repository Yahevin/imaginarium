class Figure {
	constructor(iniData) {
		this.id = iniData.id;
		this.position = 0;
		this.twists = iniData.twists;
		this.direction = 'left';
		this.el = iniData.el;
		this.row = 10;
		this.col = 9;
		this.duration = 1000;
	}
	
	shiftResolve(newPosition) {
		let journey = this.twists.filter((twist,index)=>{
				if (this.position < twist.position &&  twist.position <= newPosition) {
					return twist;
				}
			});
		
		if(journey.length > 0) {
			journey.push({
				direction: 'next',
				position: newPosition,
			});
			console.log('journey',journey);
			this.setLongJourney(journey);
		} else {
			let way = {
				direction: this.direction,
				position: newPosition,
			};
			console.log('way',way);
			this.directionResolve(way);
		}
	}
	async directionResolve(way) {
		let step = way.position - this.position;
		
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
		
		this.direction = way.direction === 'next' ? this.direction : way.direction;
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