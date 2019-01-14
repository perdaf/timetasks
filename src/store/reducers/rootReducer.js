import uniqid from 'uniqid';

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

const rootReducer = (state = initialStates, action) => {
  if (action.type === 'ADDTASK') {
    let newTask = {
      id: uniqid(),
      name: action.task[0][0].value,
      desc: action.task[0][1].value,
      elapsTime: '00:00:00',
    };
    return {
      tasks: [...state.tasks, newTask],
    };
  }
  if (action.type === 'DELETETASK') {
    let tasksIndex = state.tasks.findIndex(task => {
      return task.id === action.id;
    });
    let newtasks = state.tasks.slice();
    newtasks.splice(tasksIndex, 1);
    return {
      ...state,
      tasks: newtasks,
    };
  }
  if (action.type === 'EDITTASK') {
    let tasksIndex = state.tasks.findIndex(task => {
      return task.id === action.id;
    });
    let newTasks = state.tasks.slice();
    newTasks[tasksIndex] = {
      ...newTasks[tasksIndex],
      name: action.args[0][0].value,
      desc: action.args[0][1].value,
    };
    return {
      tasks: newTasks,
    };
  }
  //   if (action.type === 'SAVETIMETASK') {
  //     let tasksIndex = state.tasks.findIndex(task => {
  //       return task.id === action.id;
  //     });
  //     let newTasks = state.tasks.slice();
  //     newTasks[tasksIndex] = {
  //       ...newTasks[tasksIndex],
  //       elapsTime: action.time,
  //     };
  //     return {
  //       tasks: newTasks,
  //     };
  //   }

  return state;
};

export default rootReducer;
