import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { deleteSuccess, addSuccess, updateSuccess } from './actions';

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

function* addDeliveryman({ payload }) {
  try {
    const { name, email, avatar_id } = payload.deliveryman;
    const deliveryman = {
      name,
      email,
      avatar_id,
    };

    const res = yield call(api.post, '/deliveryman', deliveryman);

    toast.success('Cadastro realizado com sucesso');

    yield put(addSuccess(res.data));
    history.push('/deliverymen');
  } catch (err) {
    toast.error('Erro ao cadastrar o entregador!');
  }
}

function* updateDeliveryman({ payload }) {
  try {
    const { id, name, email, avatar_id } = payload.deliveryman;
    const deliveryman = {
      id,
      name,
      email,
      avatar_id,
    };

    const res = yield call(api.put, `/deliveryman/${id}`, deliveryman);

    toast.success('Entregador atualizado com sucesso');

    yield put(updateSuccess(res.data));
    history.push('/deliverymen');
  } catch (err) {
    toast.error('Erro ao atualizar o entregador!');
  }
}

export default all([
  takeLatest('@deliverymen/DELETE_REQUEST', deleteDeliveryman),
  takeLatest('@deliverymen/ADD_REQUEST', addDeliveryman),
  takeLatest('@deliverymen/UPDATE_REQUEST', updateDeliveryman),
]);
