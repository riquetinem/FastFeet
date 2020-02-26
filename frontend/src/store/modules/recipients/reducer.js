import produce from 'immer';

const INITIAL_STATE = {
  deleted: false,
};

export default function recipients(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipients/DELETE_SUCCESS': {
        draft.deleted = true;

        break;
      }

      case '@recipients/DELETE_REQUEST': {
        draft.deleted = false;

        break;
      }
      default:
    }
  });
}
