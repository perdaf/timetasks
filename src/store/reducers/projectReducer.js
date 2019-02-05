const initialStates = {};

const projectReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'ADDPROJECT':
      console.log('Project added to db');
      return state;
    default:
      return state;
  }
};

export default projectReducer;
