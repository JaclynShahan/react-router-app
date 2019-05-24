const initialState = {
  newUser: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, newUser: action.payload }

    default:
      return state
  }
}
