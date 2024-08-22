const initialState = {
    lists: [],
    currentList: null,
    loading: false,
    error: null,
  };
  
  const shoppingListReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_LISTS_SUCCESS':
        return { ...state, lists: action.payload, loading: false };
      case 'SET_CURRENT_LIST':
        return { ...state, currentList: action.payload };
      case 'ADD_ITEM':
        return {
          ...state,
          currentList: {
            ...state.currentList,
            items: [...state.currentList.items, action.payload],
          },
        };
        case 'CREATE_LIST':
          return { ...state, lists: [...state.lists, action.payload] };
        case 'DELETE_LIST':
          return {
            ...state,
            lists: state.lists.filter(list => list.id !== action.payload),
            currentList: state.currentList && state.currentList.id === action.payload ? null : state.currentList
          };
      case 'UPDATE_ITEM':
        return {
          ...state,
          currentList: {
            ...state.currentList,
            items: state.currentList.items.map(item =>
              item.id === action.payload.id ? action.payload : item
            ),
          },
        };
      case 'DELETE_ITEM':
        return {
          ...state,
          currentList: {
            ...state.currentList,
            items: state.currentList.items.filter(item => item.id !== action.payload),
          },
        };

        case 'UPDATE_LIST':
          return {
            ...state,
            lists: state.lists.map(list =>
              list.id === action.payload.id ? action.payload : list
            ),
          };
        
      case 'SHARE_LIST':
            return {
              ...state,
              lists: state.lists.map(list =>
                list.id === action.payload.listId
                  ? { ...list, sharedWith: [...(list.sharedWith || []), action.payload.userId] }
                  : list
             ),
        };
      
      case 'LOGOUT':
          return initialState;  
        
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default shoppingListReducer;