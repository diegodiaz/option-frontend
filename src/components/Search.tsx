import React, { useState } from "react";
import useYoutube from '../hooks/useYoutube';

function Search() {
  const { searchList } = useYoutube();
  const [searchWord, setSearchWord] = useState<string>('');
  const handleSearch = async () => {
    await searchList(searchWord);
  }

  return (
    <div style={{ flex: 1, flexDirection: 'row' }}>
      <input
        value={searchWord}
        placeholder='Buscar'
        onChange={(e)=>setSearchWord(e.target.value)}
      />
      <button onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

export default Search
