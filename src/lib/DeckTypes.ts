export type Version = '64' | '256' | '512';
export type Region = 'EU' | 'UK' | 'US';

export interface DeckResultsPageData {
	region: Region;
	version: Version;
	timestamp: string;
}

export interface DeckData {
	personalInfo: PersonalInfo;
}

export interface PersonalInfo {
	prettyText: string;
	htmlText: string;
	elapsedTimePercentage: number;
	historicData: HistoricDeckbotData[];
	lastDataUpdate: string;
	lastBatchDate: string;
	region: Region;
	version: Version;
}
export interface HistoricDeckbotData {
	date: string;
	elapsedTimePercentage?: number;
	increasedPercentage?: number;
}

export interface ChartData {
	labels: string[];
	datasets: ChartDataSet[];
	yMarkers?: YMarker[];
}

export interface ChartDataSet {
	values: number[];
}

export interface YMarker {
	label: string;
	value: number;
	type: string;
}
