import fs from 'fs';

const recommender = (neighborhoodSize) => {};

let numUsers = 0;
let numItems = 0;
let users = [];
let items = [];
let data = {};
let similarities = {}

const run = () => {
	// extract data from text file
	const text = fs.readFileSync('./tests/test2.txt', 'utf8');
	const textArr = text.split('\n');

	numUsers = parseInt(textArr[0].split(' ')[0]);
	numItems = parseInt(textArr[0].split(' ')[1]);
	users = textArr[1].split('\r')[0].split(' ');
	items = textArr[2].split('\r')[0].split(' ');

	// create object cotaining item rating data for each user
	for (let i = 0; i < numUsers; i++) {
		let ratings = {};
		for (let j = 0; j < numItems; j++) {
			const item = textArr[3 + i].split(' ')[j];
			ratings[items[j]] = parseInt(item);
		}
		data[users[i]] = ratings;
	}

	console.log('Number of Users:', numUsers);
	console.log('Number of Items:', numItems);
	console.log(items);

	for(let i = 0; i < numUsers; i++){
		for(let j = 0; j < numItems; j++){
			if(data[users[i]][items[[j]]] == '-1'){
				console.log('user', users[i], data[users[i]])
			}
		}
	}

	const similarityUser1 = similarityCalculator('Alice', 'User1');
	const similarityUser2 = similarityCalculator('Alice', 'User2');
	const similarityUser3 = similarityCalculator('Alice', 'User3');
	const similarityUser4 = similarityCalculator('Alice', 'User4');

	console.log('PCC Alice, User1:', similarityUser1)
	console.log('PCC Alice, User2:', similarityUser2)
	console.log('PCC Alice, User3:', similarityUser3)
	console.log('PCC Alice, User4:', similarityUser4)
};

// const pearsonsCorrelationCoeffiecient = (user, item, avg) => {
// 	avg + 
// };

const similarityCalculator = (userA, userB) => {
	const sumRatingsUserA = getSumRatings(data[userA]);
	const sumRatingsUserB = getSumRatings(data[userB]);

	const avgRatingUserA = getAvgRatings(sumRatingsUserA);
	const avgRatingUserB = getAvgRatings(sumRatingsUserB);

	const userAValues = Object.values(data[userA]);
	const userBValues = Object.values(data[userB]);

	const numeratorSum = userAValues.reduce((acc, curr, i) => {
		if (curr != -1) return acc + (curr - avgRatingUserA) * (userBValues[i] - avgRatingUserB);
		return acc + 0;
	}, 0);

	const denominatorSumUserA = userAValues.reduce((acc, curr, i) => {
		if (curr != -1) return acc + (curr - avgRatingUserA) ** 2;
		return acc + 0;
	}, 0);

	const denominatorSumUserB = userAValues.reduce((acc, curr, i) => {
		if (curr != -1) return acc + (userBValues[i] - avgRatingUserB) ** 2;
		return acc + 0;
	}, 0);

	const similarity = numeratorSum / (Math.sqrt(denominatorSumUserA) * Math.sqrt(denominatorSumUserB));
	return Math.round(similarity * 100) / 100;
};

const getSumRatings = (data) => Object.values(data).filter((item) => item != -1);
const getAvgRatings = (ratings) => ratings.reduce((a, c) => a + c) / ratings.length;

run();
