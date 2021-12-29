import React from 'react';
import './App.css';
import Search from './components/Search';
import SearchList from './components/SearchList';
import { YoutubeProvider } from './contexts/YoutubeContext';

function App() {
  return (
    <YoutubeProvider>
      <div className="App">
        <header className="App-header">
          <Search />
          <SearchList />
        </header>
      </div>
    </YoutubeProvider>
  );
}

export default App;
