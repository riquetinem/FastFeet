import produce from 'immer';

const INITIAL_STATE = {
  deleted: false,
};

export default function deliveries(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliverymen/DELETE_SUCCESS': {
        draft.deleted = true;

        break;
      }

      case '@deliverymen/DELETE_REQUEST': {
        draft.deleted = false;

        break;
      }

      default:
    }
  });
}
