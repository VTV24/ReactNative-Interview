const countPairNumbers = (numbers) => {
	const map = {};
	let count = 0;

	numbers.forEach((number) => {
		if (map[number]) {
			// if the number is already in the map, increment the count
			count += map[number];
			map[number] += 1;
		} else {
			map[number] = 1;
		}
	});

	return count;
};

console.log(countPairNumbers([1, 2, 3, 3, 5, 3, 4, 5])); // --> 4
console.log(countPairNumbers([1, 2, 3, 3, 5, 3, 4, 5, 5])); // --> 6
