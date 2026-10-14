import { defineParams } from '@sveltejs/kit/params';

function matchRegion(param: string) {
	return /^(EU|UK|US)$/.test(param);
}

function matchTimestamp(param: string) {
	return /^[0-9]{10}$/.test(param);
}

function matchVersion(param: string) {
	return /^(64|256|512)$/.test(param);
}

export const params = defineParams({
	region: (param) => (matchRegion(param) ? param : undefined),
	timestamp: (param) => (matchTimestamp(param) ? param : undefined),
	version: (param) => (matchVersion(param) ? param : undefined)
});
