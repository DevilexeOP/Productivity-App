const initialState = {
  spaceData: [],
  channelData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateSpaceData':
      return {
        ...state,
        spaceData: action.payload,
      };
    case 'resetSpaceData':
      return {
        ...state,
        spaceData: [],
      };
    case 'updateChannelData':
      return {
        ...state,
        channelData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
