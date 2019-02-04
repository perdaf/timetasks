const initialStates = {};

const userReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'EDITUSER':
      console.log('user updated');
      return state;
    default:
      return state;
  }
};

export default userReducer;
