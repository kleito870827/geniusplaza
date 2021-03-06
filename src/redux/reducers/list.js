import {applyDrag} from '../actions/list';

const defaultState = {
  listArray: [],
  currentCard: {
    cardId: '',
    title: '',
    description: '',
    listId: '',
    dueDate: ''
  },
  getCard: {
    listId: '',
    index: '',
    currentCardObj: {}
  },
  cardOpenModal: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return {
        ...state,
        listArray: [...state.listArray, action.newList]
      }
    case 'REMOVE_LIST':
      return {
        ...state,
        listArray: state.listArray.filter((list) => {
          return list.id !== action.listId;
        })
      }
    case 'ADD_CARD':
      const newCard = state.listArray.map((list) => {
        if(list.id === action.listId){
          return{
            id: list.id,
            title: list.title,
            cardArray: [...list.cardArray, action.newCard]
          }
        }else{
          return list;
        }
      })
      return {
        ...state,
        listArray: newCard
      }
    case 'REMOVE_CARD':
      const removeCard = state.listArray.map((list) => {
        if(list.id === action.listId){
          return{
            id: list.id,
            title: list.title,
            cardArray: list.cardArray.filter((list) => {
              return list.cardId !== action.cardId;
            })
          }
        }else{
          return list;
        }
      })
      return {
        ...state,
        listArray: removeCard
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        cardOpenModal: true
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        cardOpenModal: false
      };
    case 'CURRENT_CARD':
      const getList = state.listArray.filter((list) => {
        return list.id === action.listId;
      })[0];
      const getCard = getList.cardArray.filter((card) => {
          return card.cardId === action.cardId;
      })[0]

      return {
        ...state,
        currentCard: {
          ...getCard,
          listId: action.listId
        }
      }
    case 'EDIT_CURRENT_CARD_TITLE':
      return{
        ...state,
        currentCard: {
          ...state.currentCard,
          title: action.title
        }
      }
    case 'EDIT_CURRENT_CARD_DESCRIPTION':
      return{
        ...state,
        currentCard: {
          ...state.currentCard,
          description: action.description
        }
      }
    case 'EDIT_CURRENT_CARD_DUE_DATE':
      return{
        ...state,
        currentCard: {
          ...state.currentCard,
          dueDate: action.dueDate
        }
      }
    case 'EDIT_CARD':
      const editCard = state.listArray.map((list) => {
        if(list.id === action.listId){
          return{
            id: list.id,
            title: list.title,
            cardArray: list.cardArray.map((list) => {
              if(list.cardId === action.cardId){
                return{
                  cardId: list.cardId,
                  title: action.card.title,
                  description: action.card.description,
                  dueDate: action.card.dueDate
                }
              }else{
                return list;
              }
            })
          }
        }else{
          return list;
        }
      })
      return {
        ...state,
        listArray: editCard
      }
    case 'GET_CARD_DRAG':
      const curList = state.listArray.filter(p => p.id === action.listId)[0];
      const currentCardObj =  curList.cardArray[action.index];

      return{
        ...state,
        getCard: {
          listId: action.listId,
          index: action.index,
          currentCardObj
        }
    }
    case 'DROP_CARD':
      if (action.dropResult.removedIndex !== null || action.dropResult.addedIndex !== null) {

        const listArray = Object.assign([], state.listArray);

        const column = listArray.filter(p => p.id === action.listId)[0];
        const columnIndex = listArray.indexOf(column);

        const newColumn = Object.assign({}, column);
        newColumn.cardArray = applyDrag(newColumn.cardArray, action.dropResult, state.getCard.currentCardObj);

        listArray.splice(columnIndex, 1, newColumn);

        return{
          ...state,
          listArray
        }
      }else{
        return state;
      }
    case 'DROP_LIST':

    const list = Object.assign([], state.listArray);

    const listArray = applyDrag(list, action.dropResult);

      return {
        ...state,
        listArray
      }

    default:
      return state;
  }
}
