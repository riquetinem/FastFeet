export function deleteRequest(id) {
  return {
    type: '@deliverymen/DELETE_REQUEST',
    payload: { id },
  };
}

export function deleteSuccess(deliverymen) {
  return {
    type: '@deliverymen/DELETE_SUCCESS',
    payload: { deliverymen },
  };
}
