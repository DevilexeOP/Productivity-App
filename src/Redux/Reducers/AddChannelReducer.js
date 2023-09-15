const initialState = {
  channelName: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "updateChannelName":
      return {
        ...state, channelName: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
