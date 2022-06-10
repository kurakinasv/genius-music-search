type OptionsType = {
  method: string;
  headers: { [name: string]: string };
};

export const options: OptionsType = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'genius.p.rapidapi.com',
    'X-RapidAPI-Key': '9423114bedmshdb4787265158ed3p16910bjsn8b2ca0679646',
  },
};

export const BASE_URL = 'https://genius.p.rapidapi.com/';

export const plain = '?text_format=html';
