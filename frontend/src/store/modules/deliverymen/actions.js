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

export function addRequest(deliveryman) {
  return {
    type: '@deliverymen/ADD_REQUEST',
    payload: { deliveryman },
  };
}

export function addSuccess(deliveryman) {
  return {
    type: '@deliverymen/ADD_SUCCESS',
    payload: { deliveryman },
  };
}

export function updateRequest(deliveryman) {
  return {
    type: '@deliverymen/UPDATE_REQUEST',
    payload: { deliveryman },
  };
}

export function updateSuccess(deliveryman) {
  return {
    type: '@deliverymen/UPDATE_SUCCESS',
    payload: { deliveryman },
  };
}
