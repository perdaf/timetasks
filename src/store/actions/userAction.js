export const editUser = (id, user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // async call to db
    const firestore = getFirestore();
    const { lastName, firstName, thj, role } = user;

    firestore
      .collection('users')
      .doc(id)
      .set(
        {
          lastName,
          firstName,
          initials: lastName[0] + firstName[0],
          thj,
          role,
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: 'EDITUSER', id, user });
      })
      .catch(err => {
        console.error(err);
      });
  };
};

// delete auth() and user in database
export const deleteUser = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .delete(id)
      .then(res => {
        return firestore
          .collection('users')
          .doc(id)
          .delete()
          .then(() => {
            dispatch({ type: 'DELETEUSER_SUCCESS' });
          });
      })
      .catch(err => {
        dispatch({ type: 'DELETEUSER_ERROR', err });
      });
  };
};
