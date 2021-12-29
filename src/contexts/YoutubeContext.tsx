import React, { createContext, useReducer } from 'react';
import { VideoType } from './type';
import axios from '../utils/axios';

// ----------------------------------------------------------------------

type stateType = {
  search: string;
  list: VideoType[];
  isSearching: boolean;
}

const initialState: stateType = {
  search: '',
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

  if (action.type === 'SET_REQUEST') {
    return {
      ...state,
      list: action.payload
    };
  }

  return state;
};

const YoutubeContext = createContext({
  ...initialState,
  searchList: (searchWord: string) => Promise.resolve(),
});

interface YoutubeProviderProp {
  children: JSX.Element | JSX.Element[]
}

function YoutubeProvider({ children }: YoutubeProviderProp) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchList = async (searchWord: string) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true
    });

    const response = await axios.post('/api/v1/youtube/search', {searchWord});

    if (response.status === 200) {
      const { items } = response.data;
      dispatch({
        type: 'SET_REQUEST',
        payload: items
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
        searchList
      }}
    >
      {children}
    </YoutubeContext.Provider>
  );
}

export { YoutubeContext, YoutubeProvider };
