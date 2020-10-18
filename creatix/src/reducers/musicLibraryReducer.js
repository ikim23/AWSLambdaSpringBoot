import {
  SEARCH_ARTISTS,
  SEARCH_ARTISTS_DONE,
  SEARCH_ARTISTS_FAIL,
  FETCH_ALBUMS,
  FETCH_ALBUMS_DONE,
  FETCH_ALBUMS_FAIL,
  FETCH_LIKED_ALBUMS,
  FETCH_LIKED_ALBUMS_DONE,
  FETCH_LIKED_ALBUMS_FAIL,
  FETCH_ALBUM_DETAIL,
  FETCH_ALBUM_DETAIL_DONE,
  FETCH_ALBUM_DETAIL_FAIL,
  TOGGLE_ALBUM_LIKE,
  DISMISS_ERROR_MESSAGE
} from '../constants/actionTypes';

const initAlbumDetail = {
  name: '',
  artistName: '',
  genre: '',
  released: '',
  imageUrl: ''
};

const initState = {
  isFetching: false,
  artists: [],
  artistName: '',
  albums: [],
  likedAlbumIds: [],
  albumDetail: initAlbumDetail,
  errorMessage: ''
};

const onArtistSearchDone = (state, payload) => {
  if (payload.resultCount) {
    const artists = payload.results.map(x => ({
      id: x.artistId,
      name: x.artistName
    }));
    return { ...state, isFetching: false, artists };
  }
  return { ...state, isFetching: false, artists: [] };
};

const mapAlbums = results =>
  results.filter(x => x.collectionType == 'Album').map(x => ({
    id: x.collectionId,
    name: x.collectionName,
    artistName: x.artistName,
    genre: x.primaryGenreName,
    released: new Date(x.releaseDate).toLocaleDateString(),
    imageUrl: x.artworkUrl60 || x.artworkUrl100 || undefined
  }));

const onFetchAlbumsDone = (state, payload) => {
  if (payload.resultCount) {
    const albums = mapAlbums(payload.results);
    const artistName = albums.length ? albums[0].artistName : '';
    return { ...state, isFetching: false, albums, artistName };
  }
  return { ...state, isFetching: false, albums: [], artistName: '' };
};

const onFetchAlbumDetail = (state, payload) => {
  if (payload.resultCount) {
    const albums = mapAlbums(payload.results);
    return { ...state, isFetching: false, albumDetail: albums[0] };
  }
  return { ...state, isFetching: false, albumDetail: initAlbumDetail };
};

const onToggleLike = (state, payload) => {
  const isLiked = state.likedAlbumIds.includes(payload.albumId);
  const likedAlbumIds = isLiked
    ? state.likedAlbumIds.filter(id => id != payload.albumId)
    : [...state.likedAlbumIds, payload.albumId];
  return { ...state, likedAlbumIds };
};

const musicLibraryReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SEARCH_ARTISTS:
    case FETCH_ALBUMS:
    case FETCH_LIKED_ALBUMS:
    case FETCH_ALBUM_DETAIL:
      return { ...state, isFetching: true };
    case SEARCH_ARTISTS_FAIL:
    case FETCH_ALBUMS_FAIL:
    case FETCH_LIKED_ALBUMS_FAIL:
    case FETCH_ALBUM_DETAIL_FAIL:
      return { ...state, isFetching: false, errorMessage: payload };
    case SEARCH_ARTISTS_DONE:
      return onArtistSearchDone(state, payload);
    case FETCH_ALBUMS_DONE:
    case FETCH_LIKED_ALBUMS_DONE:
      return onFetchAlbumsDone(state, payload);
    case FETCH_ALBUM_DETAIL_DONE:
      return onFetchAlbumDetail(state, payload);
    case TOGGLE_ALBUM_LIKE:
      return onToggleLike(state, payload);
    case DISMISS_ERROR_MESSAGE:
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

export default musicLibraryReducer;
