const initialState = {
    allWorkSpaces : []
}

const reducer = (state = initialState , action ) => {
    switch (action.type) {
        case 'updateAllWorkSpaces':
            return {
                ...state,
                allWorkSpaces: action.payload
            }
        default:
            return state;
    }
}

export default reducer;
