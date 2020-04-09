import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import ArtistRoute from '../ArtistRoute';
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError
} from '../actions';

const DEFAULT_ARTIST_ID = '2CIMQHirSU0MQqyYHq0eOx';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());
    fetch(`/spotify_access_token`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch(err => {
        console.error(err);
        dispatch(receiveAccessTokenError())
      })
  }, []);

  return (
    <Router>
      <Switch>
        <Route path='/artists/:id'>
        <ArtistRoute/>
        </Route>
        <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`}/>
      </Switch>
      <GlobalStyles/>
    </Router>
  );
};

export default App;
