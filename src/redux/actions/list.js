import uuid from 'uuid';

// ADD_LIST
export const addList = (title = '') => ({
  type: 'ADD_LIST',
  newList: {
    id: uuid(),
    title,
    cardArray: []
  }
});

//REMOVE_LIST
export const removeList = (listId) => ({
  type: 'REMOVE_LIST',
  listId
});


//ADD_CARD
export const addCard = (title = '', listId) => ({
  type: 'ADD_CARD',
  newCard: {
    cardId: uuid(),
    title,
    description: ""
  },
  listId
});

//REMOVE_CARD
export const removeCard = (cardId, listId) => ({
  type: 'REMOVE_CARD',
  cardId,
  listId
});

// OPEN_MODAL
export const openModal = () => ({
  type: 'OPEN_MODAL'
});

// CLOSE_MODAL
export const closeModal = () => ({
  type: 'CLOSE_MODAL'
});

//CURRENT_CARD
export const currentCard = (cardId, listId) => ({
  type: 'CURRENT_CARD',
  cardId,
  listId
});

// EDIT_CURRENT_CARD_TITLE
export const editCurrentCardTitle = title => ({
  type: 'EDIT_CURRENT_CARD_TITLE',
  title
});

// EDIT_CURRENT_CARD_DESCRIPTION
export const editCurrentCardDescription = description => ({
  type: 'EDIT_CURRENT_CARD_DESCRIPTION',
  description
});

// EDIT_CURRENT_CARD_DUE_DATE
export const editCurrentCardDueDate = dueDate => ({
  type: 'EDIT_CURRENT_CARD_DUE_DATE',
  dueDate
});

// EDIT_CARD
export const editCard = (cardId, listId, card) => ({
  type: 'EDIT_CARD',
  cardId,
  listId,
  card
})

// DROP_CARD
export const dropCard = (listId, dropResult) => ({
  type: 'DROP_CARD',
  listId,
  dropResult
})

// GET_CARD_DRAG
export const getCardDrag= (listId, index) => ({
  type: 'GET_CARD_DRAG',
  listId,
  index
})

// DROP_LIST
export const dropList = dropResult => ({
  type: 'DROP_LIST',
  dropResult
})

export const applyDrag = (arr, dragResult, currentCard) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }else{
    itemToAdd = currentCard;
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};
