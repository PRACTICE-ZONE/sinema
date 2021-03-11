import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css'

export default class SearchBar extends Component {
  state = {
    value: ""
  }

  timeout = null;
  doSearch = event => {
    this.setState({ value: event.target.value, })
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value)
    }, 500);
  }
  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-search-content">
          <FontAwesome className="rmdb-fa-search"/>
          <input type="text"
           className="rmdb-searchbar-input"
           placeholder="search"
           onChange= {this.doSearch}
           value = {this.state.value}
          />
        </div>
      </div>
    )
  }
}
