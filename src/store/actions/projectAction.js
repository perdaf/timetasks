export const createProject = proj => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('Project')
      .add({
        ...proj,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: 'ADDPROJECT', proj });
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const editProject = (id, project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to db
    const firestore = getFirestore();
    const { name, desc, deadLine, budget } = project;
    firestore
      .collection('Project')
      .doc(id)
      .set(
        {
          name,
          desc,
          deadLine,
          budget,
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: 'EDITPROJECT', id, project });
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const deleteProject = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to db
    const firestore = getFirestore();
    firestore
      .collection('Project')
      .doc(id)
      .get()
      .then(proj => {
        const tasks = proj.data().tasks;
        if (tasks.lenght > 0) {
          tasks.map(res => {
            let taskId = res.name;
            return firestore
              .collection('Tasks')
              .doc(taskId)
              .delete()
              .then(() => {
                dispatch({ type: 'DELETETASK', taskId });
              })
              .catch(err => {
                console.error(err);
              });
          });
        } else {
          return;
        }
      })
      .then(() => {
        return firestore
          .collection('Project')
          .doc(id)
          .delete()
          .then(() => {
            dispatch({ type: 'DELETEPROJECT', id });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  };
};
