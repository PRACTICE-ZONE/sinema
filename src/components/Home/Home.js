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

  searchItems = (searchTerm) => {
    let endPoint = ''
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    })
    if(searchTerm === "") {
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&query${searchTerm}`
    }
  }

  loadMoreItems = () => {
    let endPoint = '';
    this.setState({ loading: true});
    if(this.state.searchTerm === '') {
       endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage+1}`;
    } else {
       endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&query${this.state.searchTerm}&page=${this.state.currentPage+1}`;
    }
    this.fetchItems(endPoint);
  }

  fetchItems = (endPoint) => {
    fetch(endPoint)
    .then(response => response.json())
      .then( response => {
        this.setState({
          movies: [...this.state.movies, ...response.results],
          heroImage: this.state.heroImage || response.results[0],
          loading: false,
          currentPage: response.page,
          totalPages: response.total_pages
        })
      })
  }
  render() {
    return (
      <div className="rmdb-home">
        {this.state.heroImage?
        <div> 
          <HeroImage
          image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}/${this.state.heroImage.backdrop_path}`}
          title = {this.state.heroImage.original_title}
          text = {this.state.heroImage.overview}
          />
          <SearchBar/>
        </div> : null }
        <FourColGrid/>
        <Spinner/>
        <LoadMoreBtn/>
      </div>
    )
  }
}
