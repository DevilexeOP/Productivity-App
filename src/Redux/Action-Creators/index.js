//  register action creators
import channel from "../../Components/Workspace/Channel";

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

// Todos action creators
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

// Workspace action creators
export const updateWorkspaceName = workspaceName =>{
  return dispatch => (
    dispatch({
      type:"updateWorkspaceName",
      payload:workspaceName
    })
  )
}

export const updateProjectName = projectName => {
  return dispatch => (
    dispatch({
      type:'updateProjectName',
      payload:projectName
    })
  )
}

// Channel Action creators
export const updateChannelName = channelName => {
  return dispatch =>{
    dispatch({
      type:"updateChannelName",
      payload:channelName
    })
  }
}

// Message action creators
export const updateAllMessages = allMessages =>{
  return dispatch => {
    dispatch({
      type:"updateAllMessages",
      payload:allMessages
    })
  }
}

export const updateSentBy = sentBy => {
  return dispatch =>{
    dispatch ({
      type:"updateSentBy",
      payload:sentBy
    })
  }
}

export const updateMessage = message => {
  return dispatch => {
    dispatch({
      type: "updateMessage",
      payload: message,
    });
  };
};

// Rendering all work spaces
export const updateAllWorkSpaces = allWorkSpaces => {
  return dispatch => {
    dispatch({
      type: "updateAllWorkSpaces",
      payload: allWorkSpaces,
    });
  };
};

// Space Data
export const updateSpaceData = spaceData => {
  return dispatch =>{
    dispatch({
      type:'updateSpaceData',
      payload:spaceData
    })
  }
}

export const updateChannelData = channelData => {
  return dispatch => {
    dispatch({
      type:'updateChannelData',
      payload:channelData
  return dispatch =>{
    dispatch ({
      type:"updateMessage",
      payload:message
    })
  }
}
