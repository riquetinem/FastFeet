import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { deleteSuccess } from './actions';

function* deleteRecipient({ payload }) {
  try {
    const { id } = payload;
    const res = yield call(api.delete, `/recipient/${id}`);

    yield put(deleteSuccess(res.data));
    toast.success('Entregador deletado com sucesso!');
    history.push('/recipients');
  } catch (err) {
    toast.error('Erro ao deletar o entregador!');
  }
}

export default all([takeLatest('@recipients/DELETE_REQUEST', deleteRecipient)]);
