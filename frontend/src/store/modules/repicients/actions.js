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
