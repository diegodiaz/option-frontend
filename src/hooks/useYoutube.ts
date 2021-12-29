import { useContext } from 'react';
import { YoutubeContext } from '../contexts/YoutubeContext';

// ----------------------------------------------------------------------

const useAuth = () => useContext(YoutubeContext);

export default useAuth;
