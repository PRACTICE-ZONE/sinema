import React from 'react';
import './MovieThumb.css';
const MovieThumb = (props) => {
  return (
    <div className="rmdb-moviethum">
      <img src={props.image} alt="moviethumb"/>
     </div>
  )
}

export default MovieThumb
