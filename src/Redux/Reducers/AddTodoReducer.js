/* eslint-disable prettier/prettier */
const initialState = {
  todoTitle: '',
  todoDescription: '',
  todoPriority: '',
  todoStatus: '',
  allTodos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateTodoTitle':
      return {...state, todoTitle: action.payload};
    case 'updateTodoDescription':
      return {...state, todoDescription: action.payload};
    case 'updateTodoPriority':
      return {...state, todoPriority: action.payload};
    case 'updateTodoStatus':
      return {...state, todoStatus: action.payload};
    case 'updateAllTodos':
      return {...state, allTodos: action.payload};
    default:
      return state;
  }
};

export default reducer;
