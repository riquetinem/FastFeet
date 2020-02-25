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

export function cancelRequest(id) {
  return {
    type: '@deliveries/CANCEL_REQUEST',
    payload: { id },
  };
}

export function cancelSuccess(deliveries) {
  return {
    type: '@deliveries/CANCEL_SUCCESS',
    payload: { deliveries },
  };
}

export function errorFunction() {
  return {
    type: '@deliveries/ERROR',
  };
}
