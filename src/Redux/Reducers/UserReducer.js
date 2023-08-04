const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateName':
      return {...state, name: action.payload};
    case 'updateUserName':
      return {...state, username: action.payload};
    case 'updateEmail':
      return {...state, email: action.payload};
    case 'updatePassword':
      return {...state, password: action.payload};
    default:
      return state;
  }
};

export default reducer;
