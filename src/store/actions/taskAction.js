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
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to db
    const firestore = getFirestore();
    firestore
      .collection('Tasks')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETETASK', id });
      })
      .catch(err => {
        console.error(err);
      });
  };
};
export const editTask = (id, task) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to db
    let newtask = {
      name: task[0][0].value,
      desc: task[0][1].value,
    };
    // console.log('newTask >>>', { newtask });
    const firestore = getFirestore();
    firestore
      .collection('Tasks')
      .doc(id)
      .set({
        ...newtask,
      })
      .then(() => {
        dispatch({ type: 'EDITTASK', id, task });
      })
      .catch(err => {
        console.error(err);
      });
  };
};
