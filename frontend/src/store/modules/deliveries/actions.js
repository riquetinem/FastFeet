export function deleteRequest(id) {
  return {
    type: '@deliveries/DELETE_REQUEST',
    payload: { id },
  };
}

export function deleteSuccess(deliveries) {
  return {
    type: '@deliveries/DELETE_SUCCESS',
    payload: { deliveries },
  };
}
