//reducer
const initialState = { //initialize your state
  newUser: [
      {
          firstName: '',
          lastName: '',
          email: '',
          createUsername: '',
          createPassword: ''
      }
  ],
  
}

export default function reducer(state = initialState, action) {
    //const {type, payload} = action destructuring them out if i wanted
switch (action.type) {
case "SET_USER":
console.log('Here is your user new user info:', state)
return { ...state, newUser: state.newUser + action.payload }

default:
return state
}
}

//TO DO JACLYN:
//MAKE USER OBJECTS--THE THINGS I PUT IN STATE ALL MY INPUTS