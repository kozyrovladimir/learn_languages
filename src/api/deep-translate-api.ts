import axios from 'axios';

import { API_URL, API_SUB_URL, API_HOST, API_KEY } from '../constants/api';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
});

export const deepTranslateAPI = {
  translateRuToEn(text: string) {
    return instance.post(API_SUB_URL, `{"q":"${text}","source":"ru","target":"en"}`);
  },
  translateEnToRu(text: string) {
    return instance.post(API_SUB_URL, `{"q":"${text}","source":"en","target":"ru"}`);
  },
};
