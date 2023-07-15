/* eslint-disable prettier/prettier */
import axios from 'axios';
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
