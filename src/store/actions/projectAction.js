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
