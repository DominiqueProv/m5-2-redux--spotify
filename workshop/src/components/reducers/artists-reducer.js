
const initialState = {
  currentArtist: null,
  status: 'idle',
  topTrack: null,
  relatedArtists: null,
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ARTIST': {
      return { ...state, status: 'loading' }
    }
    case 'RECEIVE_ARTIST': {
      return { ...state, currentArtist: action.payload, status: 'idle' }
    }
    case 'RECEIVE_ARTIST_ERROR': {
      return { ...state, status: 'error' }
    }
    case 'REQUEST_TOPTRACK': {
      return { ...state, status: 'loading' }
    }
    case 'RECEIVE_TOPTRACK': {
      return { ...state, topTrack: action.payload, status: 'idle' }
    }
    case 'RECEIVE_TOPTRACK_ERROR': {
      return { ...state, status: 'error' }
    }
    case 'REQUEST_RELATED_ARTISTS': {
      return { ...state, status: 'loading' }
    }
    case 'RECEIVE_RELATED_ARTISTS': {
      return { ...state, relatedArtists: action.payload, status: 'idle' }
    }
    case 'RECEIVE_RELATED_ARTISTS_ERROR': {
      return { ...state, status: 'idle' }
    }
    case 'FINISH_RECEIVING_ALL_ARTIST_INFO': {
      return { ...state, status: 'idle' }
    }
    default: {
      return state;
    }
  }
}

