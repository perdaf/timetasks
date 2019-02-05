const initialStates = {
  error: null,
};

const userReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'EDITUSER':
      console.log('user updated');
      return state;
    case 'DELETEUSER_SUCCESS':
      console.log('user deleted successfully');
      return state;
    case 'DELETEUSER_ERROR':
      console.log("Erreur lors de la suppression de l'utilisateur");
      return {
        ...state,
        error: action.err.message,
      };
    default:
      return state;
  }
};

export default userReducer;
