//reducer
const initialState = {
  //initialize your state
  newUser: {
    
      createPassword:  "Poop" ,
      createUsername:  "Jaclyn" ,
      email: "Jaclyndshahan@gmail.com",
      firstName:  "Jaclyn",
       id:  "50192375-edea-4e43-b861-52dc17bfb389" ,
      lastName:  "Shahan"
      
  }
};

export default function reducer(state = initialState, action) {
  //const {type, payload} = action destructuring them out if i wanted
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "ADD_USER":
      //console.log('Here is your user new user info:', state)
      return { ...state, newUser: action.payload };

    default:
      return state;
  }
}

//TO DO JACLYN:
//MAKE USER OBJECTS--THE THINGS I PUT IN STATE ALL MY INPUTS
