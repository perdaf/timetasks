export const createTask = task => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('Tasks')
      .add({
        ...task,
        createdAt: new Date(),
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
    const { name, desc, deadLine, etat, thj, dev } = task;
    firestore
      .collection('Tasks')
      .doc(id)
      .set(
        {
          name,
          desc,
          deadLine,
          etat,
          thj,
          dev,
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
      .update({
        elapsTime,
      })
      .then(() => {
        dispatch({ type: 'EDITELAPSTIME', elapsTime });
      })
      .catch(err => {
        console.error(err);
      });
  };
};
