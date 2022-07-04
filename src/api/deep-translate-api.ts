import axios from "axios";

const instance = axios.create({
    baseURL: 'https://deep-translate1.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': '5cc0866329msh8b6169514926715p1cb860jsn9771154bd221',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
    }
});

export const deepTranslateAPI = {
    translateRuToEn(text: string) {
       return  instance.post('/language/translate/v2',`{"q":"${text}","source":"ru","target":"en"}`);
    },
    translateEnToRu(text: string) {
        return  instance.post('/language/translate/v2',`{"q":"${text}","source":"en","target":"ru"}`);
    },
}
