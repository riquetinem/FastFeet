export function deleteRequest(id) {
  return {
    type: '@recipients/DELETE_REQUEST',
    payload: { id },
  };
}

export function deleteSuccess(recipients) {
  return {
    type: '@recipients/DELETE_SUCCESS',
    payload: { recipients },
  };
}

export function addRequest(recipient) {
  return {
    type: '@recipients/ADD_REQUEST',
    payload: { recipient },
  };
}

export function addSuccess(recipient) {
  return {
    type: '@recipients/ADD_SUCCESS',
    payload: { recipient },
  };
}

export function updateRequest(recipient) {
  return {
    type: '@recipients/UPDATE_REQUEST',
    payload: { recipient },
  };
}

export function updateSuccess(recipient) {
  return {
    type: '@recipients/UPDATE_SUCCESS',
    payload: { recipient },
  };
}
