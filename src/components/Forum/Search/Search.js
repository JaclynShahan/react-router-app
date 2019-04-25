import React, { Component } from 'react';
import { Icon } from 'antd';
import './Search.css';



// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

class Search extends Component {
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" />

          <Icon type='search'/>
        </div>
        
      </section>
    )
  }
}

export default Search;