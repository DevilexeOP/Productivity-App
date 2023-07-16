/* eslint-disable prettier/prettier */
export const updateNotesTitle = notesTitle => {
  return dispatch => {
    dispatch({
      type: 'updateNotesTitle',
      payload: notesTitle,
    });
  };
};

export const updateNotesDescription = notesDescription => {
  return dispatch => {
    dispatch({
      type: 'updateNotesDescription',
      payload: notesDescription,
    });
  };
};

export const updateNotesMedia = notesMedia => {
  return dispatch => {
    dispatch({
      type: 'updateNotesMedia',
      payload: notesMedia,
    });
  };
};

export const updateAllNotes = allNotes => {
  return dispatch => {
    dispatch({
      type: 'updateAllNotes',
      payload: allNotes,
    });
  };
};

export const updateTodoTitle = todoTitle => {
  return dispatch => {
    dispatch({
      type: 'updateTodoTitle',
      payload: todoTitle,
    });
  };
};

export const updateTodoDescription = toDoDescription => {
  return dispatch => {
    dispatch({
      type: 'updateTodoDescription',
      payload: toDoDescription,
    });
  };
};

export const updateTodoPriority = toDoPriority => {
  return dispatch => {
    dispatch({
      type: 'updateTodoPriority',
      payload: toDoPriority,
    });
  };
};

export const updateTodoStatus = toDoStatus => {
  return dispatch => {
    dispatch({
      type: 'updateTodoStatus',
      payload: toDoStatus,
    });
  };
};

export const updateAllTodos = allTodos => {
  return dispatch => {
    dispatch({
      type: 'updateAllTodos',
      payload: allTodos,
    });
  };
};
