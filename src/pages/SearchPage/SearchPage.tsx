import { useState } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'genius.p.rapidapi.com',
    'X-RapidAPI-Key': '9423114bedmshdb4787265158ed3p16910bjsn8b2ca0679646',
  },
};

const reqSearchData = async (value: string) => {
  const url = `https://genius.p.rapidapi.com/search?q=${value}`;

  try {
    let response = await fetch(url, options);
    let data = await response.json();
    return data.response.hits;
  } catch (error: any) {
    console.error('Error:', error.message);
    return [];
  }
};

const SearchPage = () => {
  const [result, setResult] = useState<any[]>([]);
  const [value, setValue] = useState('');

  const clickHandler = () => {
    reqSearchData(value)
      .then((res) => setResult(res))
      .catch((e) => console.log('error:', e.message));
  };

  const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  let songs = result.map((song) => (
    <li key={song.result.id}>{song.result.full_title}</li>
  ));

  return (
    <div>
      Search page
      <div>
        <input type="text" value={value} onChange={inputHandler} />
        <button onClick={clickHandler}>Search</button>
        {result.length > 0 ? (
          <div>
            <ul>{songs}</ul>
            <img src={result[0].result.header_image_url} width="300px" alt="" />
          </div>
        ) : (
          <div>No results</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
