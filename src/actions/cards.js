import {
  MOVE_CARD,
  CREATE_CARD,
  DELETE_CARD,
  EDIT_CARD,
  VOTE_UP,
  VOTE_DOWN,
} from '../../shared';

import {
  SEND_SOCKET,
  REVEAL_EDIT_CARD,
  TOGGLE_CARD_DROPDOWN,
  CLOSE_CARD_DROPDOWNS,
} from '../constants';

export function moveCard({id, left = 0, top = 0}) {
  return {
    [SEND_SOCKET]: {
      type: MOVE_CARD,
      payload: {
        id,
        position: {
          left: isNaN(left) ? 0 : left,
          top: isNaN(top) ? 0 : top,
        },
      }
    },
  };
}

export function createCard(text) {
  return {
    [SEND_SOCKET]: {
      type: CREATE_CARD,
      payload: {
        text,
      },
    },
  };
}

export function deleteCard(id) {
  return {
    [SEND_SOCKET]: {
      type: DELETE_CARD,
      payload: {
        id,
      },
    },
  };
}

export function revealEditCard(id) {
  return {
    type: REVEAL_EDIT_CARD,
    payload: {
      id,
    },
  };
}

export function voteCardUp(id) {
  return {
    [SEND_SOCKET]: {
      type: VOTE_UP,
      payload: {
        id,
      },
    },
  };
}

export function voteCardDown(id) {
  return {
    [SEND_SOCKET]: {
      type: VOTE_DOWN,
      payload: {
        id,
      },
    },
  };
}

export function toggleDropdown(id) {
  return (dispatch, getState) => {
    const val = getState().cards.getIn([id, 'showDropdown'], false);

    return dispatch({
      type: TOGGLE_CARD_DROPDOWN,
      payload: {
        id,
        val: !val,
      },
    });
  };
}

export function closeDropdowns() {
  return {
    type: CLOSE_CARD_DROPDOWNS,
  };
}

export function saveCard(id, text) {
  return {
    [SEND_SOCKET]: {
      type: EDIT_CARD,
      payload: {
        id,
        text,
      },
    },
  };
}

export default {
  moveCard,
  createCard,
  deleteCard,
  revealEditCard,
  saveCard,
  toggleDropdown,
  closeDropdowns,
  voteCardUp,
  voteCardDown,
};
