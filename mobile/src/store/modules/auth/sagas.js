import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { signFailure, signInSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const res = yield call(api.get, `/deliveryman/${id}/deliveries`);

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
