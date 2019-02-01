const initialStates = {
  authError: null,
};

const authReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed',
      };
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
      };
    case 'SIGNOUT_SUCCESS':
      console.log('sign out successfully');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('Signup successfully');
      return {
        ...state,
        authError: null,
      };
    case 'SIGNUP_ERROR':
      console.log("Erreur lors de l'enregistrement");
      return {
        ...state,
        authError: action.err.message,
      };
    default:
      return state;
  }
};

export default authReducer;
