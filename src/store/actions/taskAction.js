export const createTask = task => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to db
    let newtask = {
      name: task[0][0].value,
      desc: task[0][1].value,
      elapsTime: '00:00:00',
    };
    // console.log('newTask >>>', { newtask });
    const firestore = getFirestore();
    firestore
      .collection('Tasks')
      .add({
        ...newtask,
      })
      .then(() => {
        dispatch({ type: 'ADDTASK', task });
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const deleteTask = id => {
  return (dispatch, getState) => {
    // async call to db
    dispatch({ type: 'DELETETASK', id });
  };
};
export const editTask = (id, args) => {
  return (dispatch, getState) => {
    // async call to db
    dispatch({ type: 'EDITTASK', id, args });
  };
};
