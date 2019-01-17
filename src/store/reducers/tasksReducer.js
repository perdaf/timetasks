const initialStates = {
  tasks: [
    {
      id: 'task001',
      name: 'task 001',
      desc: 'descrip task 001',
      elapsTime: '00:00:00',
    },
    {
      id: 'task002',
      name: 'task 002',
      desc: 'descrip task 002',
      elapsTime: '01:02:00',
    },
    {
      id: 'task003',
      name: 'task 003',
      desc: 'descrip task 003',
      elapsTime: '00:25:03',
    },
  ],
};

const tasksReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'ADDTASK':
      console.log('task added to db');
      return state;
    case 'DELETETASK':
      console.log('task deleted >>> ', action.id);
      //   let tasksIndex = state.tasks.findIndex(task => {
      //     return task.id === action.id;
      //   });
      //   let newtasks = state.tasks.slice();
      //   newtasks.splice(tasksIndex, 1);
      //   return {
      //     ...state,
      //     tasks: newtasks,
      //   };
      return state;
    case 'EDITTASK':
      console.log('Task updated >>>', action.id);
      //   let tasksIndex = state.tasks.findIndex(task => {
      //     return task.id === action.id;
      //   });
      //   let newTasks = state.tasks.slice();
      //   newTasks[tasksIndex] = {
      //     ...newTasks[tasksIndex],
      //     name: action.args[0][0].value,
      //     desc: action.args[0][1].value,
      //   };
      //   return {
      //     tasks: newTasks,
      //   };
      return state;
    default:
      return state;
  }
};

export default tasksReducer;
