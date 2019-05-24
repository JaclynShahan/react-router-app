import React, { Component } from 'react'
import { Icon } from 'antd'
import './Search.css'
import { connect } from 'react-redux'

class Search extends Component {
  constructor () {
    super()
    this.state = {
      searchString: '',
      searchArr: []
    }
  }

  updateSearchString (searchString) {
    this.setState({ searchString })
  }

  onSearch = () => {
    if (this.state.searchString.length > 0) {
      const filteredPost = this.props.getPost.newPost.filter(post => {
        if (
          post.subject
            .toLowerCase()
            .includes(this.state.searchString.toLowerCase()) ||
          post.text
            .toLowerCase()
            .includes(this.state.searchString.toLowerCase())
        ) {
          return true
        } else {
          return false
        }
      })
      console.log(filteredPost)
      this.props.setSearchPost(filteredPost)
    } else {
      this.props.setSearchPost([])
    }
  }
  onKeyPress = e => {
    const key = e.keyCode || e.which
    if (key == 13) {
      this.onSearch()
    }
  }

  render () {
    const searchString = this.state.searchString
    return (
      <section className='Search__parent'>
        <div className='Search__content'>
          <input
            placeholder='Search Your Feed'
            value={searchString}
            onChange={e => this.updateSearchString(e.target.value)}
            onKeyPress={e => this.onKeyPress(e)}
          />

          <Icon
            onClick={() => this.onSearch()}
            type='search'
            style={{ fontSize: '15px', margin: '5px' }}
          />
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  setSearchPost (searchPosts) {
    dispatch({
      type: 'SEARCH_POSTS',
      payload: searchPosts
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
