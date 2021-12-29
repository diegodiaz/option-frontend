import React from 'react';
import Item from './Item';
import useYoutube from '../../hooks/useYoutube';

function SearchList() {
  const { list } = useYoutube();
  return (
    <>
      {list.map((video)=>(
        <Item key={video.id.videoId} data={video} />
      ))}
    </>
  )
}

export default SearchList
