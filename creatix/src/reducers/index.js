import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import musicLibrary from './musicLibraryReducer';

const musicLibraryPersistConfig = {
  key: 'musicLibrary',
  storage,
  whitelist: ['likedAlbumIds']
};

const rootReducer = combineReducers({
  musicLibrary: persistReducer(musicLibraryPersistConfig, musicLibrary)
});

export default rootReducer;
