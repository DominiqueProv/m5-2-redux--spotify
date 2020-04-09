import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
const RelatedArtists = ({relatedArtists}) => {

  console.log(relatedArtists);
  const link = relatedArtists.id;
  return(
    <RelLink exact to = {`${link}`}>
    <Wrapper>
      <img src={relatedArtists.images[2].url} alt={relatedArtists.name}/>
      <p>{relatedArtists.name}</p>
    </Wrapper>
    </RelLink>
  );
};

const Wrapper = styled.div`
  flex: 0 0 auto;
  width: 70px;
  margin: 15px;
    img{
      width: 75px;
      height: 75px;
      border-radius: 50%;
      text-align: center;
    }
    p{
      font-size: .7em;
      text-align: center;
    }
`
const RelLink = styled(Link)`
text-decoration: none;
color: white;
`

export default RelatedArtists;
