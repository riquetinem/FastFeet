import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { deleteSuccess, cancelSuccess, errorFunction } from './actions';

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

export default all([
  takeLatest('@deliveries/DELETE_REQUEST', deleteDelivery),
  takeLatest('@deliveries/CANCEL_REQUEST', cancelDelivery),
]);
