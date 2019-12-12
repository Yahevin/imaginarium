let getSiblings = {
	func01(currRow,currCol) {
		return [
			{
				rw: currRow,
				cl: currCol
			},
			{
				rw: currRow,
				cl: currCol - 1
			},
			{
				rw: currRow,
				cl: currCol + 1
			},
			{
				rw: currRow - 1,
				cl: currCol
			},
		];
	},
	func02(currRow,currCol) {
		return [
			{
				rw: currRow -1,
				cl: currCol - 2
			},
			{
				rw: currRow -1,
				cl: currCol - 1
			},
			{
				rw: currRow -1,
				cl: currCol + 1
			},
			{
				rw: currRow - 1,
				cl: currCol + 2
			},
			{
				rw: currRow,
				cl: currCol - 2
			},
			{
				rw: currRow,
				cl: currCol + 2
			},
			{
				rw: currRow + 1,
				cl: currCol - 1
			},
			{
				rw: currRow + 1,
				cl: currCol + 1
			},
			{
				rw: currRow + 1,
				cl: currCol
			},
		];
	},
	func11(currRow,currCol) {
		return [
			{
				rw: currRow,
				cl: currCol
			},
			{
				rw: currRow,
				cl: currCol - 1
			},
			{
				rw: currRow,
				cl: currCol + 1
			},
			{
				rw: currRow + 1,
				cl: currCol
			},
		];
	},
	func12(currRow,currCol) {
		return [
			{
				rw: currRow + 1,
				cl: currCol - 2
			},
			{
				rw: currRow + 1,
				cl: currCol - 1
			},
			{
				rw: currRow + 1,
				cl: currCol + 1
			},
			{
				rw: currRow + 1,
				cl: currCol + 2
			},
			{
				rw: currRow,
				cl: currCol - 2
			},
			{
				rw: currRow,
				cl: currCol + 2
			},
			{
				rw: currRow - 1,
				cl: currCol - 1
			},
			{
				rw: currRow - 1,
				cl: currCol + 1
			},
			{
				rw: currRow - 1,
				cl: currCol
			},
		];
	},
};

export default getSiblings;
