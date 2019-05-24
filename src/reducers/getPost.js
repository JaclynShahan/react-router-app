const initialState = {
  newPost: [],
  selectedPost: {},
  searchPosts: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_POST':
      return { ...state, user: action.payload }
    case 'ADD_POST':
      return { ...state, newPost: action.payload }

    case 'ADD_COMMENT':
      return { ...state, newComment: action.payload }
    case 'SELECT_POST':
      return { ...state, selectedPost: action.payload }
    case 'SEARCH_POSTS':
      return { ...state, searchPosts: action.payload }

    default:
      return state
  }
}
