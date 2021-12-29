import React, { useMemo } from 'react';
import './index.css';
// hooks
import useYoutube from '../../hooks/useYoutube';
// components
import Item from './Item';
import Loading from "../Loading";

function SearchList() {
  const { list, nextPage, isSearching } = useYoutube();
  const isEmpty = useMemo(() => (list.length===0), [list]);

  const handleMoreVideos = () => {
    nextPage();
  }

  return (
    <div className='List-videos-root'>
      {list.map((video)=>(
        <Item key={video.id.videoId} data={video} />
      ))}
      {isSearching ? (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <Loading />
        </div>
      ) : (
        <>
          {!isEmpty && (
            <button onClick={handleMoreVideos}>Cargar más videos</button>
          )}
        </>
      )}
    </div>
  )
}

export default SearchList
