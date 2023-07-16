/* eslint-disable prettier/prettier */
const initialState = {
  todoTitle: '',
  toDoDescription: '',
  toDoPriority: '',
  toDoStatus: '',
  allTodos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateTodoTitle':
      return {...state, todoTitle: action.payload};
    case 'updateTodoDescription':
      return {...state, toDoDescription: action.payload};
    case 'updateTodoPriority':
      return {...state, toDoPriority: action.payload};
    case 'updateTodoStatus':
      return {...state, toDoStatus: action.payload};
    case 'updateAllTodos':
      return {...state, allTodos: action.payload};
    default:
      return state;
  }
};

export default reducer;
