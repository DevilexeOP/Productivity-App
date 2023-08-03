//  register action creators
export const updateName = name => {
  return dispatch => {
    dispatch({
      type: 'updateName',
      payload: name,
    });
  };
};

export const updateUserName = username => {
  return dispatch => {
    dispatch({
      type: 'updateUserName',
      payload: username,
    });
  };
};

export const updateEmail = email => {
  return dispatch => {
    dispatch({
      type: 'updateEmail',
      payload: email,
    });
  };
};

export const updatePassword = password => {
  return dispatch => {
    dispatch({
      type: 'updatePassword',
      payload: password,
    });
  };
};

// notes action creators
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

// Tod0s action creators
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
