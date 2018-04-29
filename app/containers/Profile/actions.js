/*
 *
 * Profile actions
 *
 */

import {
  CREATE_PROFILE_ACTION,
  CREATED_ACTION,
  UPDATE_ACTION,
  UPDATED_ACTION,
} from './constants';

export function createProfileAction(payload) {
  return {
    type: CREATE_PROFILE_ACTION,
    payload
  };
}

export function createdAction(payload) {
  return {
    type: CREATED_ACTION,
    payload
  };
}

export function updateAction(payload) {
  return {
    type: UPDATE_ACTION,
    payload
  };
}

export function updatedAction(payload) {
  return {
    type: UPDATED_ACTION,
    payload
  };
}

