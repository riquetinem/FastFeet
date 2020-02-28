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

export function addRequest(delivery) {
  return {
    type: '@deliveries/ADD_REQUEST',
    payload: { delivery },
  };
}

export function addSuccess(delivery) {
  return {
    type: '@deliveries/ADD_SUCCESS',
    payload: { delivery },
  };
}

export function updateRequest(delivery) {
  return {
    type: '@deliveries/UPDATE_REQUEST',
    payload: { delivery },
  };
}

export function updateSuccess(delivery) {
  return {
    type: '@deliveries/UPDATE_SUCCESS',
    payload: { delivery },
  };
}
