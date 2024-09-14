const initialState = {
  retrievedUsername: '',
  retrievedName: '',
  retrievedEmail: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateRetrievedUsername':
      return {...state, retrievedUsername: action.payload};
    case 'updateRetrievedName':
      return {...state, retrievedName: action.payload};
    case 'updateRetrievedEmail':
      return {...state, retrievedEmail: action.payload};
    default:
      return state;
  }
};

export default reducer;
