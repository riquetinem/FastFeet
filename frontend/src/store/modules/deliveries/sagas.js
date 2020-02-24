import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { deleteSuccess } from './actions';

function* deleteDelivery({ payload }) {
  try {
    const { id } = payload;
    const res = yield call(api.delete, `/delivery/${id}`);

    yield put(deleteSuccess(res.data));
    toast.success('Encomenda deletada com sucesso!');
    history.push('/deliveries');
  } catch (err) {
    toast.error('Erro ao deletar a encomenda!');
  }
}

export default all([takeLatest('@deliveries/DELETE_REQUEST', deleteDelivery)]);
