const initialState = {
  allMessages: [],
  sentBy: '',
  message: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateAllMessages':
      return {
        ...state,
        allMessages: action.payload,
      };
    case 'updateSentBy':
      return {
        ...state,
        sentBy: action.payload,
      };
    case 'updateAddMessage':
      return {
        ...state,
        allMessages: [...state.allMessages, action.payload],
      };
    case 'removeMessage':
    case 'updateMessage':
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
