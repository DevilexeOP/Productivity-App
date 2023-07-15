/* eslint-disable prettier/prettier */
const initialState = {
  allNotes: [],
  notesTitle: '',
  notesDescription: '',
  notesMedia: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateNotesTitle':
      return {...state, notesTitle: action.payload};
    case 'updateNotesDescription':
      return {...state, notesDescription: action.payload};
    case 'updateNotesMedia':
      return {...state, notesMedia: action.payload};
    case 'updateAllNotes':
      return {...state, allNotes: action.payload};
    default:
      return state;
  }
};

export default reducer;
