//reducer
const initialState = { //initialize your state
  newUser: [],
  loginHolder: ''
}

export default function reducer(state = initialState, action) {
    //const {type, payload} = action destructuring them out if i wanted
switch (action.type) {
case "SET_USER":
return { ...state, newUser: action.payload }

default:
return state
}
}