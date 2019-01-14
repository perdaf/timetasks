export const createTask = task => {
  return (dispatch, getState) => {
    // async DB connection code
    dispatch({ type: 'ADDTASK', task });
  };
};
export const deleteTask = id => {
  return (dispatch, getState) => {
    // async DB connection code
    dispatch({ type: 'DELETETASK', id });
  };
};
export const editTask = (id, args) => {
  return (dispatch, getState) => {
    dispatch({ type: 'EDITTASK', id, args });
  };
};
