export const createTask = task => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('Tasks')
      .add({
        ...task,
        createdAt: new Date(),
      })
      .then(res => {
        return firestore
          .collection('Project')
          .doc(task.projet)
          .get()
          .then(doc => {
            // get all old tasks

            let oldTask =
              Object.getOwnPropertyNames(doc.data().tasks).length > 0
                ? doc.data().tasks
                : [];
            // add the new task in list
            oldTask.push({ name: res.id });
            // set the new tasks array in the nestin tasks
            return firestore
              .collection('Project')
              .doc(task.projet)
              .set({ tasks: oldTask }, { merge: true })
              .then(() => {
                dispatch({ type: 'ADDTASK', task });
              });
          });
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
    // get the task
    firestore
      .collection('Tasks')
      .doc(id)
      .get()
      .then(doc => {
        // recup le projet auquel la tache es assigné
        const projet = doc.data().projet || null;
        console.log('PROJET >>>', projet);
        if (projet !== null) {
          return firestore
            .collection('Project')
            .doc(projet)
            .get()
            .then(proj => {
              // recup la liste des taches dans le bon projet
              let tasksArr = proj.data().tasks;
              // on retourne une liste SANS la tache en question
              const newtasksArr = tasksArr.filter(task => task.name !== id);
              // on reecrit la liste des taches modifier dans le tableau des tasks du projet
              return firestore
                .collection('Project')
                .doc(projet)
                .set({ tasks: newtasksArr }, { merge: true })
                .then(() => {
                  // finalement on supprime la tache
                  return firestore
                    .collection('Tasks')
                    .doc(id)
                    .delete()
                    .then(() => {
                      dispatch({ type: 'DELETETASK', id });
                    })
                    .catch(err => {
                      console.error(err);
                    });
                });
            });
        } else {
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
        }
      })
      .catch(err => console.error('Somthing gone wrong', err));
  };
};

export const editTask = (id, task) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to db
    const firestore = getFirestore();
    const { name, desc, startAt, deadLine, etat, thj, dev, coutEstime } = task;
    firestore
      .collection('Tasks')
      .doc(id)
      .set(
        {
          name,
          desc,
          startAt,
          deadLine,
          coutEstime,
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
      .get()
      .then(tsk => {
        // recup le thj de la tache
        const tj = tsk.data().thj;
        const cout = Math.round((tj / 7) * (elapsTime / 1000 / 60 / 60));
        return firestore
          .collection('Tasks')
          .doc(id)
          .update({
            elapsTime,
            cout,
          })
          .then(() => {
            dispatch({ type: 'EDITELAPSTIME', elapsTime });
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
