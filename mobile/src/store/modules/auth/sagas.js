import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { signFailure, signInSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const res = yield call(api.get, `/deliveryman/${id}`);

    res.data.createdAt = format(parseISO(res.data.createdAt), 'dd/MM/yyyy', {
      locale: pt,
    });

    yield put(signInSuccess(res.data));
  } catch (error) {
    Alert.alert(
      'Falha',
      'Houve um erro no login, verifique seu ID de cadastro!'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
