const initialState = {
  workspaceName:"",
  projectName:""
}

const reducer = (state = initialState , action) => {
  switch (action.type) {
    case 'updateWorkspaceName':
      return {
        ...state,workspaceName: action.payload
      }
    case 'updateProjectName':
      return {
        ...state,projectName: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
