export const createTask = task => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('Tasks')
      .add({
        ...task,
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
    const firestore = getFirestore();
    firestore
      .collection('Tasks')
      .doc(id)
      .set(
        {
          name: task.name,
          desc: task.desc,
          thj: task.thj,
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: 'EDITTASK', id, task });
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const editElapsTimeTask = (elapsTime, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('Tasks')
      .doc(id)
      .set(
        {
          elapsTime: elapsTime,
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: 'EDITELAPSTIME', elapsTime });
      })
      .catch(err => {
        console.error(err);
      });
  };
};
