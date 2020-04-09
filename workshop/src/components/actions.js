
export const requestAccessToken = () => ({
  type: 'REQUEST_ACCESS_TOKEN',
});

export const receiveAccessToken = (token) => ({
  type: 'RECEIVE_ACCESS_TOKEN',
  token,
});

export const receiveAccessTokenError = () => ({
  type: 'RECEIVE_ACCESS_TOKEN_ERROR',
});

export const requestArtist = () => ({
  type: 'REQUEST_ARTIST',
});

export const receiveArtistData = (payload) => ({
  type: 'RECEIVE_ARTIST',
  payload,
});

export const receiveArtistError = () => ({
  type: 'RECEIVE_ARTIST_ERROR',
});

export const requestTopTrack = () => ({
  type: 'REQUEST_TOPTRACK'
})
export const receiveTopTrack = (payload) => ({
  type: 'RECEIVE_TOPTRACK',
  payload,
})

export const receiveTopTrackError = () => ({
  type: 'RECEIVE_TOPTRACK_ERROR'
})
export const requestRelatedArtists = () => ({
  type: 'REQUEST_RELATED_ARTISTS'
})
export const receiveRelatedArtists = (payload) => ({
  type: 'RECEIVE_RELATED_ARTISTS',
  payload,
})
export const receiveRelatedArtistsError = () => ({
  type: 'RECEIVE_RELATED_ARTISTS_ERROR',
})

export const finishReceivingAllArtistInfo = () => ({
  type: 'FINISH_RECEIVING_ALL_ARTIST_INFO',
});