import { Reducer } from 'umi';
import { message } from 'antd';
import { BasicEffect } from './../../models/common';

import {
  GetEmployeesByCondition,
  searchEmployee,
  removeAndInsert,
  deleteUser,
  update,
} from '@/services/userService';

export interface StateType {
  item: User[];
  currentItem?: User;
  currenetPageIndex: number;
  isAdministrator: boolean;
  TotalItems: number;
  ItemsPerPage: number;
  CurrentPage: number;
  userRoles: string;
  userDatas: string;
  englishName?: string;
  wsAlias?: string;
  msAlias?: string;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: BasicEffect;
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'users',
  state: {
    item: [],
    currenetPageIndex: 0,
    isAdministrator: true,
    TotalItems: 0,
    CurrentPage: 1,
    ItemsPerPage: 20,
    userRoles: '',
    userDatas: '',
    englishName: '',
    wsAlias: '',
    msAlias: '',
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(GetEmployeesByCondition, payload);
      const {
        Result: { Items, TotalItems, CurrentPage },
      } = response;
      yield put({
        type: 'save',
        payload: { item: Items, TotalItems, CurrentPage },
      });
    },
    *searchEmployee({ payload }, { call, put }) {
      const response = yield call(searchEmployee, payload);
      yield put({
        type: 'save',
        payload: { currentItem: response },
      });
    },
    *removeAndInsert({ payload }, { call, put, select }) {
      const response = yield call(removeAndInsert, payload);
      const { userRoles, userDatas, wsAlias } = yield select(
        (state: any) => state.user,
      );
      if (response.Success) {
        yield put({
          type: 'save',
          payload: {
            userRoles,
            userDatas,
            wsAlias,
          },
        });
      }
    },
    *deleteUser({ payload }, { call, put }) {
      const response = yield call(deleteUser, payload);
      if (response.Success) {
        message.success('Delete successfully.');
        yield put({
          type: 'save',
        });
      } else {
        message.error('Delete failed');
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      if (response) {
        yield put({
          type: 'save',
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
