import produce from 'immer';

const INITIAL_STATE = {
  deleted: false,
};

export default function deliveries(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveries/DELETE_SUCCESS': {
        draft.deleted = true;

        break;
      }

      case '@deliveries/DELETE_REQUEST': {
        draft.deleted = false;

        break;
      }

      case '@deliveries/CANCEL_REQUEST': {
        draft.deleted = false;

        break;
      }

      case '@deliveries/CANCEL_SUCCESS': {
        draft.deleted = false;

        break;
      }

      case '@deliveries/ERROR': {
        draft.deleted = false;

        break;
      }
      default:
    }
  });
}
