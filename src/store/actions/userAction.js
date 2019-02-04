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
