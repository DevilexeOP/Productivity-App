const initialState = {
  spaceData :[],
}

const reducer = (state = initialState , action) => {
  switch (action.type) {
    case 'updateSpaceData':
      return {
        ...state,
        spaceData: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;
