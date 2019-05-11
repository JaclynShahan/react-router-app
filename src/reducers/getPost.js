//reducer
const initialState = {
    //initialize your state
    newPost: [], //this is actually my array of posts, all of them.
    selectedPost:  {}, // this is my selected Post, that I'm going to leave a comment for.
    searchPosts: []
  };
  
  export default function reducer(state = initialState, action) {
    //const {type, payload} = action destructuring them out if i wanted
    switch (action.type) {    
    case "SET_POST":
    return { ...state, user: action.payload };
    case "ADD_POST":
    //console.log('Here is your user new user info:', state)
    return { ...state, newPost: action.payload };
 // default:
   // return state;
    case "ADD_COMMENT":
    return { ...state, newComment: action.payload };
    case "SELECT_POST":
    return {...state, selectedPost: action.payload};
    case "SEARCH_POSTS":
    return {...state, searchPosts: action.payload};

     default:
     return state;}
  
    }