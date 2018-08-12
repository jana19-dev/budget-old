const initialState = {
    _id: "",
    email: "",
    token: ""
  };
  
  const auth = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          _id: action.payload.data.user._id,
          email: action.payload.data.user.email,
          token: action.payload.data.token,
        }
      case 'LOGIN_FAILED':
        return {
          ...state,
        }
      case 'LOGOUT':
        return {
          ...initialState
        }
      default:
        return state
    }
  }
  
  export default auth