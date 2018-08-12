export const login = ({email, password}) => ({
    types: ['LOADING', 'LOGIN_SUCCESS', 'LOGIN_FAILED'],
    payload: {
      request:{
        url: '/auth/login',
        method: 'POST',
        data: {email, password}
      }
    },
    success: "Welcome Back",
    failure: "Invalid email/password. Please try again."
  })
  
  export const logout = () => ({
    type: 'LOGOUT'
  })