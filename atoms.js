import {atom} from 'recoil';

export const hintListState = atom({
  key: 'hintList',
  default: [],
});

export const tagListState = atom({
  key: 'tagList',
  default: [],
});

export const viewListState = atom({
  key: 'viewList',
  default: [],
});

export const merchantListState = atom({
  key: 'merchantList',
  default: [],
});

export const themeListState = atom({
  key: 'themeList',
  default: [],
});

export const currentThemeState = atom({
  key: 'currentTheme',
  default: {
    id: 0,
    merchantId: 0,
    nameKo: '테마를 선택해 주세요.',
    runningTime: 70,
    isPlaying: false,
    startTime: new Date().getTime(),
    endTime: new Date().getTime + 70 * 1000 * 60,
    startDate: new Date(),
    progress: 0,
    hintCount: 0,
    tagIdList: [],
  },
});
