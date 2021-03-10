import React, { Component } from 'react';
import './Home.css';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config'
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import Spinner from '../elements/Spinner/Spinner';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
export default class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  }
  componentDidMount() {
    this.setState({ loading: true })
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endPoint);
  }
  fetchItems = (endPoint) => {
    fetch(endPoint)
    .then(response => response.json())
      .then( response => {
        this.setState({
          movies: [...this.state.movies, ...response.results]
        })
      })
  }
  render() {
    return (
      <div className="rmdb-home">
        <HeroImage/>
        <SearchBar/>
        <FourColGrid/>
        <Spinner/>
        <LoadMoreBtn/>
      </div>
    )
  }
}
