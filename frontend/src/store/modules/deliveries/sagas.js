import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  deleteSuccess,
  cancelSuccess,
  errorFunction,
  addSuccess,
  updateSuccess,
} from './actions';

function* deleteDelivery({ payload }) {
  try {
    const { id } = payload;
    const res = yield call(api.delete, `/delivery/${id}`);

    yield put(deleteSuccess(res.data));
    toast.success('Encomenda deletada com sucesso!');
    history.push('/deliveries');
  } catch (err) {
    toast.error('Erro ao deletar a encomenda!');
    yield put(errorFunction());
  }
}

function* cancelDelivery({ payload }) {
  try {
    const { id } = payload;
    const res = yield call(api.delete, `/problem/${id}/cancel-delivery`);

    yield put(cancelSuccess(res.data));
    history.push('/problems');
    toast.success('Encomenda cancelada com sucesso!');
  } catch (err) {
    toast.error('Erro ao cancelar a encomenda!');
    yield put(errorFunction());
  }
}

function* addDelivery({ payload }) {
  try {
    const { deliveryman_id, recipient_id, product } = payload.delivery;

    const delivery = {
      deliveryman_id,
      recipient_id,
      product,
    };

    const res = yield call(api.post, '/delivery', delivery);
    toast.success('Encomenda realizada com sucesso!');

    yield put(addSuccess(res.data));
    history.push('/deliveries');
  } catch (err) {
    toast.error('Erro ao adicionar a entrega!');
  }
}

function* updateDelivery({ payload }) {
  try {
    const { id, deliveryman_id, recipient_id, product } = payload.delivery;

    const delivery = {
      id,
      deliveryman_id,
      recipient_id,
      product,
    };

    console.tron.log(delivery);

    const res = yield call(api.put, `/delivery/${id}`, delivery);
    toast.success('Encomenda atualizada com sucesso!');

    yield put(updateSuccess(res.data));
    history.push('/deliveries');
  } catch (err) {
    toast.error('Erro ao atualizar a entrega!');
  }
}

export default all([
  takeLatest('@deliveries/DELETE_REQUEST', deleteDelivery),
  takeLatest('@deliveries/CANCEL_REQUEST', cancelDelivery),
  takeLatest('@deliveries/ADD_REQUEST', addDelivery),
  takeLatest('@deliveries/UPDATE_REQUEST', updateDelivery),
]);
