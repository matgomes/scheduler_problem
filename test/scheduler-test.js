const chai = require('chai');
const handleInput = require('../src/scheduler');

const assert = chai.assert;

const TODAY = "today";
const TOMORROW = "tomorrow";

describe('Scheduler cron parse - specific hour and wildcard minute', () => {
	
	const CURRENT_TIME = "15:30";
	const COMMAND = "/bin/run_me_sixty_times";

	it('Test: should return tomorrow for cron hour before current hour', () => {
		
		const cron = `* 14 ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `14:00 ${TOMORROW} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});

	it('Test: should return today for cron hour equals current hour', () => {
		
		const cron = `* 15 ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `15:30 ${TODAY} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});

	it('Test: should return today cron hour after current hour', () => {
		
		const cron = `* 16 ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `16:00 ${TODAY} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});
	
});


describe('Scheduler cron parse - specific hour and minute', () => {

	const COMMAND = "/bin/run_me_daily";
	
	it('Test: should return tomorrow for already triggered cron (different hour)', () => {
		
		const CURRENT_TIME = "16:10";
		
		const cron = `30 1 ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `1:30 ${TOMORROW} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});
	
	it('Test: should return tomorow for already triggered cron (same hour)', () => {
		
		const CURRENT_TIME = "1:40";
		
		const cron = `10 1 ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `1:10 ${TOMORROW} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});
	
	it('Test: should return today for future cron (different hour)', () => {
		
		const CURRENT_TIME = "16:10";
		
		const cron = `30 1 ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `1:30 ${TOMORROW} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});
	
	it('Test: should return today for future cron (same hour)', () => {
		
		const CURRENT_TIME = "1:10";
		
		const cron = `50 1 ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `1:50 ${TODAY} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});
	
});

describe('Scheduler cron parse - wildcard hour and minute', () => {

	const COMMAND = "/bin/run_me_every_minute";
	
	it('Test: should return today for wildcard hour and minute', () => {
		
		const CURRENT_TIME = "15:30";
		
		const cron = `* * ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `15:30 ${TODAY} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});
	
});

describe('Scheduler cron parse - wildcard hour and specific minute', () => {

	const COMMAND = "/bin/run_me_hourly";
	const CURRENT_TIME = "15:30";
	
	it('Test: should return tomorrow for cron minute before current minute', () => {
		
		const cron = `20 * ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `16:20 ${TODAY} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});
	
	it('Test: should return today for cron minute equals current minute', () => {
		
		const cron = `30 * ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `15:30 ${TODAY} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});
	
	it('Test: should return today for cron minute after current minute', () => {
		
		const cron = `40 * ${COMMAND}`;
		const res = handleInput(cron, CURRENT_TIME);
		const expected = `15:40 ${TODAY} - ${COMMAND}`;
		
		assert.equal(res, expected);
	});
	
});