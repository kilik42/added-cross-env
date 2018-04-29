import { takeLatest, call, put, select } from 'redux-saga/effects';
import {CREATE_PROFILE_ACTION, UPDATE_ACTION} from './constants';
import {createdAction, updatedAction } from './actions';
import {makeSelectCreateProfile} from './selectors';
import { profileApi, updateProfileApi} from './api';
import { login as loginGLobal } from 'containers/App/actions';
import { saveState } from 'utils/persistState';
import { setToken } from 'utils/axios';
import { makeSelectCurrentUser} from 'containers/App/selectors';
import { fromJS } from 'immutable';

export function* create(params) {
  const profileDetails = yield select(makeSelectCreateProfile());
  const response = yield call(profileApi, profileDetails);
  // console.log(response.data.profile);
  const currentUser = yield select(makeSelectCurrentUser());
  const { user, access_token, refresh_token } = currentUser;
  const profile = response.data.profile; 
  const loginInfo = fromJS({ user, access_token, refresh_token, profile });
  setToken(access_token);
  saveState(loginInfo);

  yield put(loginGLobal(loginInfo));
  yield put(createdAction(response.data.profile));
  
}

// update profile 
export function* update(params) {
  const profileDetails = yield select(makeSelectCreateProfile());
  const response = yield call(updateProfileApi, profileDetails);
  console.log(response);
  const currentUser = yield select(makeSelectCurrentUser());
  const { user, access_token, refresh_token } = currentUser;
  const profile = response.data.profile; 
  // console.log(profile);
  const loginInfo = fromJS({ user, access_token, refresh_token, profile });
  setToken(access_token);
  saveState(loginInfo);

  yield put(loginGLobal(loginInfo));
  yield put(updatedAction(response.data.profile));
  
}


// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CREATE_PROFILE_ACTION, create);
  yield takeLatest(UPDATE_ACTION, update);

}
