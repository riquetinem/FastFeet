import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { deleteSuccess } from './actions';

function* deleteDeliveryman({ payload }) {
  try {
    const { id } = payload;
    const res = yield call(api.delete, `/deliveryman/${id}`);

    yield put(deleteSuccess(res.data));
    toast.success('Entregador deletado com sucesso!');
    history.push('/deliverymen');
  } catch (err) {
    toast.error('Erro ao deletar o entregador!');
  }
}

export default all([
  takeLatest('@deliverymen/DELETE_REQUEST', deleteDeliveryman),
]);
