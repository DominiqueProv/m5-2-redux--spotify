import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtistProfile, fetchTopTrack, fetchRelatedArtists } from '../../helper/api-helper';
import { numFollowers } from '../utils';
import {
  requestArtist,
  receiveArtistData,
  receiveArtistError,
  requestTopTrack,
  receiveTopTrack,
  receiveTopTrackError,
  requestRelatedArtists,
  receiveRelatedArtists,
  receiveRelatedArtistsError,
  finishReceivingAllArtistInfo,
} from '../actions';
import styled from 'styled-components'
import PlayButton from 'react-play-button';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import RelatedArtist from "../RelatedArtists";


const SelectedArtist = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token)
  const state = useSelector((state) => state.artists)
  const { topTrack, currentArtist, relatedArtists } = state;
  const { id } = useParams();
  const white = 'white'
  const [play, setPlay] = useState(false)
  useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtist())
    const artistFetchPromise = fetchArtistProfile(accessToken, id)
      .then(res => res.json())
      .then(payload => {
        dispatch(receiveArtistData(payload));
      }).catch((err) => {
        console.log(err);
        dispatch(receiveArtistError(err))
      });

    dispatch(requestTopTrack())
    const artistTopTrack = fetchTopTrack(accessToken, id)
      .then(res => res.json())
      .then(payload => {
        dispatch(receiveTopTrack(payload))
        console.log(payload)
      }).catch((err) => {
        console.log(err);
        dispatch(receiveTopTrackError(err))
      });

    dispatch(requestRelatedArtists())
    const relatedArtists = fetchRelatedArtists(accessToken, id)
      .then(res => res.json())
      .then(payload => {
        dispatch(receiveRelatedArtists(payload))
        console.log(payload)
      }).catch((err) => {
        console.log(err);
        dispatch(receiveRelatedArtistsError(err))
      });

    Promise.all([artistFetchPromise, artistTopTrack, relatedArtists])
      .then(() => dispatch(finishReceivingAllArtistInfo()))
      .catch((err) => {
        console.log(err);
        dispatch(receiveArtistError(err))
      });
  }, [accessToken, id])

  let followers = '';
  if (currentArtist) {
    followers = numFollowers(currentArtist.followers.total)
  }

  if (!currentArtist && !topTrack && !relatedArtists) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Loader
          type="Oval"
          color="#FF4FD8"
          height={50}
          width={50}
          timeout={3000}
        />
      </div>
    )
  }

  return (
    <>
      {currentArtist && topTrack && relatedArtists &&
        <Wrapper>
          <ImgWrapper>
            <img src={currentArtist.images[0].url} alt={currentArtist.name} width='300px' />
          </ImgWrapper>
          <ArtistName>{currentArtist.name}</ArtistName>
          <h3 style={{ color: '#FF4FD8', paddingTop: '30px' }}>
            {followers} <span style={{ color: 'white' }}>followers</span></h3>
          <div style={{ display: 'flex' }}>
            {topTrack.tracks.slice(0, 3).map(track => (
              <div style={{ margin: '10px' }}>
                <PlayButton style={{ padding: '10px' }}
                  url={track.preview_url}
                  playIconColor={white}
                  stopIconColor={white}
                  idleBackgroundColor={'rgba(75, 75, 75, 0.4)'}
                  progressCircleColor={'#3354FF'}
                  progressCircleWidth={3}
                  active={play === track.id}
                  play={() => setPlay(track.id)}
                  stop={() => setPlay(null)}
                />
              </div>
            ))}
          </div>
          <h2 style={{ marginTop: '40px' }}>tags</h2>
          <TagsBox>
            <h3>{currentArtist.genres[1]}</h3>
            <h3>{currentArtist.genres[2]}</h3>
          </TagsBox>
          <h2 style={{ marginTop: '40px' }}>related artists</h2>
          <RelatedWrapper>
            {relatedArtists.artists.map(artist => (
              <RelatedArtist relatedArtists={artist} />
            ))}
          </RelatedWrapper>
        </Wrapper>
      }
    </>
  )
};

const RelatedWrapper = styled.div`
display: flex;
flex-wrap: nowrap;
overflow-x: auto;
width: 100%;
overflow: auto;
scroll-snap-type: x proximity;
&::-webkit-scrollbar {
    display: none;
  }
`


const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ImgWrapper = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 80px;
  position: relative;
`
const ArtistName = styled.div`
  font-size: 4em;
  position: absolute;
  top: 270px;
  font-weight: 600;
`
const TagsBox = styled.div`
  display: flex;
  width: 400px;
  justify-content: center;
    h3{
      background-color: rgba(75, 75, 75, 0.4);
      border-radius: 8px;
      padding: 10px 20px;
      font-size: .9em;
      margin: 0 10px;
    }
`

export default SelectedArtist;


