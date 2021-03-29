import React from 'react';
import './MovieThumb.css';
const MovieThumb = (props) => {
  return (
    <div className="rmdb-moviethumb">
      { console.log("thumbnail", props.image)}
      <img src= `"${props.image}""` alt="moviethumb"/>
     </div>
  )
}

export default MovieThumb
