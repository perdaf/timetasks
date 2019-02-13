const initialStates = {};

const projectReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'ADDPROJECT':
      console.log('Project added to db');
      return state;
    case 'EDITPROJECT':
      console.log('Project updated');
      return state;
    case 'DELETEPROJECT':
      console.log('project deleted');
      return state;
    default:
      return state;
  }
};

export default projectReducer;
