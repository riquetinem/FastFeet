import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { deleteSuccess, updateSuccess, addSuccess } from './actions';

function* deleteRecipient({ payload }) {
  try {
    const { id } = payload;
    const res = yield call(api.delete, `/recipient/${id}`);

    yield put(deleteSuccess(res.data));
    toast.success('Destinatário deletado com sucesso!');
    history.push('/recipients');
  } catch (err) {
    toast.error('Erro ao deletar o destinatário!');
  }
}

function* addRecipient({ payload }) {
  try {
    const {
      name,
      cep,
      rua,
      bairro,
      numero,
      complemento,
      cidade,
      estado,
    } = payload.recipient;

    const recipient = {
      name,
      cep,
      rua,
      bairro,
      numero,
      complemento,
      cidade,
      estado,
    };

    const res = yield call(api.post, '/recipient', recipient);

    toast.success('Cadastro realizado com sucesso');

    yield put(addSuccess(res.data));
    history.push('/recipients');
  } catch (err) {
    toast.error('Erro ao cadastrar o destinatário!');
  }
}

function* updateRecipient({ payload }) {
  try {
    const {
      id,
      name,
      cep,
      rua,
      bairro,
      numero,
      complemento,
      cidade,
      estado,
    } = payload.recipient;

    const recipient = {
      name,
      cep,
      rua,
      bairro,
      numero,
      complemento,
      cidade,
      estado,
    };

    const res = yield call(api.put, `/recipient/${id}`, recipient);

    toast.success('Destinatário atualizado com sucesso');

    yield put(updateSuccess(res.data));
    history.push('/recipients');
  } catch (err) {
    toast.error('Erro ao atualizar o destinatário!');
  }
}

export default all([
  takeLatest('@recipients/DELETE_REQUEST', deleteRecipient),
  takeLatest('@recipients/ADD_REQUEST', addRecipient),
  takeLatest('@recipients/UPDATE_REQUEST', updateRecipient),
]);
