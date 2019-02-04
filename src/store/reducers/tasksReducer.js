const initialStates = {};

const tasksReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'ADDTASK':
      console.log('task added to db');
      return state;
    case 'DELETETASK':
      console.log('task deleted >>> ', action.id);
      return state;
    case 'EDITTASK':
      console.log('Task updated >>>', action.id);
      return state;
    case 'EDITELAPSTIME':
      console.log('Time changed, new time :', action.elapsTime);
      return state;
    default:
      return state;
  }
};

export default tasksReducer;
