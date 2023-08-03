const initialState = {
  name: '',
  userName: '',
  email: '',
  password: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateName':
      return {...state, name: action.payload};
    case 'updateUserName':
      return {...state, userName: action.payload};
    case 'updateEmail':
      return {...state, email: action.payload};
    case 'updatePassword':
      return {...state, password: action.payload};
    default:
      return state;
  }
};

export default reducer;
