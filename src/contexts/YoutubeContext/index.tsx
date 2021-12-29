import React, { createContext, useReducer } from 'react';
import { VideoType } from './type';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

type stateType = {
  search: string;
  list: VideoType[];
  nextPage: string;
  prevPage: string;
  isSearching: boolean;
}

const initialState: stateType = {
  search: '',
  nextPage: '',
  prevPage: '',
  list: [],
  isSearching: false
};

const reducer = (state: any, action: any) => {

  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      isSearching: action.payload
    };
  }

  if (action.type === 'SET_INIT_REQUEST') {
    return {
      ...state,
      isSearch: true,
      search: action.payload
    };
  }

  if (action.type === 'SET_REQUEST') {
    return {
      ...state,
      list: action.payload.items,
      nextPage: action.payload.nextPageToken,
      prevPage: action.payload.prevPageToken || null,
    };
  }

  return state;
};

const YoutubeContext = createContext({
  ...initialState,
  searchList: (searchWord: string) => Promise.resolve(),
  nextPage: () => Promise.resolve(),
});

interface YoutubeProviderProp {
  children: JSX.Element | JSX.Element[]
}

function YoutubeProvider({ children }: YoutubeProviderProp) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // function that search a list of videos by keywords
  const searchList = async (searchWord: string) => {
    dispatch({
      type: 'SET_INIT_REQUEST',
      payload: searchWord
    });

    const response = await axios.post('/api/v1/youtube/search', {searchWord});

    if (response.status === 200) {
      const { data } = response;
      dispatch({
        type: 'SET_REQUEST',
        payload: data
      });  
    }

    dispatch({
      type: 'SET_LOADING',
      payload: false
    });
    return searchWord;
  };

  // function that request the next page of the search
  const nextPage = async () => {
    dispatch({
      type: 'SET_LOADING',
      payload: true
    });

    const { search: searchWord, nextPage: pageToken } = state;
    
    const response = await axios.post('/api/v1/youtube/search', {searchWord, pageToken });

    if (response.status === 200) {
      const { data } = response;
      const combineList = [...state.list, ...data.items];
      // filter the unique items video ID because the api returns the same video on different pages.  
      const items = [...combineList.reduce((a, c)=>{
        a.set(c.id.videoId, c);
        return a;
      }, new Map()).values()];
      dispatch({
        type: 'SET_REQUEST',
        payload: {
          ...data,
          items,
        }
      });  
    }

    dispatch({
      type: 'SET_LOADING',
      payload: false
    });
    return searchWord;
  };

  return (
    <YoutubeContext.Provider
      value={{
        ...state,
        searchList,
        nextPage
      }}
    >
      {children}
    </YoutubeContext.Provider>
  );
}

export { YoutubeContext, YoutubeProvider };
