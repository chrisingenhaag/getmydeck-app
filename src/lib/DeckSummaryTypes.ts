import type { Region, Version } from './DeckTypes';

export interface SummaryResponse {
	summary: DeckRegionMap;
	allDays: string[];
}

export type DeckRegionMap = {
	[region in Region]: DeckVersionMap;
};

export type DeckVersionMap = {
	[version in Version]: SummaryEntry;
};

export interface SummaryEntry {
	entries: SummaryEntryMap;
}

export interface SummaryEntryMap {
	[date: string]: SummaryBatchEntry;
}

export interface SummaryBatchEntry {
	lastOrderSeconds: number;
	elapsedSeconds: number;
	elapsedDuration: string;
	lastOrderDate: string;
}
