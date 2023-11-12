import fs from 'fs';
import { it } from 'node:test';

const recommender = (neighborhoodSize) => {};

let numUsers = 0;
let numItems = 0;
let users = [];
let items = [];
let data = {};

const run = () => {
	// extract data from text file
	const text = fs.readFileSync('./tests/test.txt', 'utf8');
	const textArr = text.split('\n');

	numUsers = parseInt(textArr[0].split(' ')[0]);
	numItems = parseInt(textArr[0].split(' ')[1]);
	users = textArr[1].split(' ');
	items = textArr[2].split(' ');

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
	console.log(data);
	similarityCalculator('Alice', 'User1');
};

const pearsonsCorrelationCoeffiecient = () => {};

const similarityCalculator = (userA, userB) => {
	const sumRatingsUserA = getSumRatings(data[userA]);
	const sumRatingsUserB = getSumRatings(data[userB]);

	const avgRatingUserA = getAvgRatings(sumRatingsUserA);
	const avgRatingUserB = getAvgRatings(sumRatingsUserB);

	const numeratorSum = 

	console.log(sumRatingsUserA, sumRatingsUserB, avgRatingUserA, avgRatingUserB);
};

const getSumRatings = (data) => Object.values(data).filter((item) => item != -1);
const getAvgRatings = (ratings) => ratings.reduce((a, c) => a + c) / ratings.length;

run();
