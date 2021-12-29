import React, { useMemo } from 'react';
import Item from './Item';
import useYoutube from '../../hooks/useYoutube';

function SearchList() {
  const { list, nextPage } = useYoutube();
  const isEmpty = useMemo(() => (list.length===0), [list]);

  const handleMoreVideos = () => {
    nextPage();
  }

  return (
    <>
      {list.map((video)=>(
        <Item key={video.id.videoId} data={video} />
      ))}
      {!isEmpty && (
        <button onClick={handleMoreVideos}>Cargar más videos</button>
      )}
    </>
  )
}

export default SearchList
