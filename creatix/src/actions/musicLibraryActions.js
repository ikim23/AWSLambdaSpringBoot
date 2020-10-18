import axios from 'axios';
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

const httpError = 'Woops! Problem occured while fetching data.';

export const searchArtists = term => dispatch => {
  dispatch({ type: SEARCH_ARTISTS });
  axios
    .get('https://itunes.apple.com/search', {
      params: { term, entity: 'musicArtist' }
    })
    .then(({ data }) => dispatch({ type: SEARCH_ARTISTS_DONE, payload: data }))
    .catch(() => dispatch({ type: SEARCH_ARTISTS_FAIL, payload: httpError }));
};

export const fetchAlbums = artistId => dispatch => {
  dispatch({ type: FETCH_ALBUMS });
  axios
    .get('https://itunes.apple.com/lookup', {
      params: { id: artistId, entity: 'album' }
    })
    .then(({ data }) => dispatch({ type: FETCH_ALBUMS_DONE, payload: data }))
    .catch(() => dispatch({ type: FETCH_ALBUMS_FAIL, payload: httpError }));
};

export const fetchLikedAlbums = albumIds => dispatch => {
  if (!albumIds || !albumIds.length) return;
  dispatch({ type: FETCH_LIKED_ALBUMS });
  axios
    .get('https://itunes.apple.com/lookup', {
      params: { id: albumIds.join(','), entity: 'album' }
    })
    .then(({ data }) =>
      dispatch({ type: FETCH_LIKED_ALBUMS_DONE, payload: data })
    )
    .catch(() =>
      dispatch({ type: FETCH_LIKED_ALBUMS_FAIL, payload: httpError })
    );
};

export const fetchAlbumDetail = albumId => dispatch => {
  dispatch({ type: FETCH_ALBUM_DETAIL });
  axios
    .get('https://itunes.apple.com/lookup', {
      params: { id: albumId, entity: 'album' }
    })
    .then(({ data }) =>
      dispatch({ type: FETCH_ALBUM_DETAIL_DONE, payload: data })
    )
    .catch(() =>
      dispatch({ type: FETCH_ALBUM_DETAIL_FAIL, payload: httpError })
    );
};

export const toggleAlbumLike = albumId => ({
  type: TOGGLE_ALBUM_LIKE,
  payload: { albumId }
});

export const dismissErrorMessage = () => ({
  type: DISMISS_ERROR_MESSAGE
});
