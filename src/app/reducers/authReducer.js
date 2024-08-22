const initialAuthState = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  };
  
  const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          error: null,
          loading: false,
        };
      case 'LOGIN_FAILURE':
      case 'AUTH_ERROR':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          error: action.payload,
          loading: false,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          error: null,
          loading: false,
        };
      case 'AUTH_LOADING':
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;