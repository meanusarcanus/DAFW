import diaryData from './antigravityDiary.json';

export interface DiaryEntry {
  id: string;
  dateTime: string;
  projectFolder: string;
  prompt: string;
  output: string;
  productCreated: string;
  productDescription: string;
}

export interface DiaryPayload {
  lastUpdated: string;
  entries: DiaryEntry[];
}

export const ANTIGRAVITY_DIARY_DATA: DiaryPayload = diaryData as DiaryPayload;

export const getSortedDiaryEntries = (): DiaryEntry[] => {
  return [...ANTIGRAVITY_DIARY_DATA.entries].sort((a, b) => {
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  });
};
