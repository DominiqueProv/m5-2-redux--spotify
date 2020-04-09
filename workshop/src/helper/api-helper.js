
export function fetchArtistProfile(token, id) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  const url = `https://api.spotify.com/v1/artists/${id}`;
  return fetch(url, options);
}

export function fetchTopTrack(token, id) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=CA`;
  return fetch(url, options);
}

export function fetchRelatedArtists(token, id) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  const url = `https://api.spotify.com/v1/artists/${id}/related-artists`;
  return fetch(url, options);
}

