import React, { useState } from "react";
import './index.css';
import useYoutube from '../../hooks/useYoutube';

function Search() {
  const { searchList, isSearching } = useYoutube();
  const [searchWord, setSearchWord] = useState<string>('');
  const handleSearch = async () => {
    await searchList(searchWord);
  }

  return (
    <div className="Search-root">
      <input
        disabled={isSearching}
        value={searchWord}
        placeholder='Buscar'
        onChange={(e)=>setSearchWord(e.target.value)}
      />
      <button
        disabled={isSearching}
        onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

export default Search
