import { Reducer } from 'umi'
import { BasicEffect } from './../../models/common'
import { message } from 'antd';

import {
  GetEmployeesByCondition,
  searchEmployee,
  removeAndInsert,
  deleteUser,
  update
} from '@/services/tableService'

export interface StateType {
  item: User[],
  currentItem?: User,
  pageSize: number,
  currenetPageIndex: number,
  isAdministrator: boolean,
  TotalItems: number;
  ItemsPerPage: number;
  CurrentPage: number;
  englishName: string;
  wsAlias: string;
  msAlias: string
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
  namespace: 'tableTry',
  state: {
    item: [],
    pageSize: 20,
    currenetPageIndex: 0,
    isAdministrator: true,
    TotalItems: 149,
    CurrentPage: 0,
    ItemsPerPage: 20,
    englishName: '',
    wsAlias: '',
    msAlias: ''

  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(GetEmployeesByCondition, payload);
      const { Result: { Items } } = response
      yield put({
        type: 'save',
        payload: { item: Items },
      });


    },
    *searchEmployee({ payload }, { call, put }) {
      const response = yield call(searchEmployee, payload);
      yield put({
        type: 'save',
        payload: { currentItem: response }
      })
    },
    *removeAndInsert({ payload }, { call, put }) {
      const response = yield call(removeAndInsert, payload);
      if (response.Success) {
        yield put({
          type: 'fetch'
        })
      }
    },
    *deleteUser({ payload }, { call, put }) {
      const response = yield call(deleteUser, payload);
      if (response.Success) {
        message.success('Delete successfully.');
        yield put({
          type: 'fetch',
          payload: {
            currenetPageIndex: 0,
            isAdministrator: true,
            pageSize: 20,
          }
        })
      } else {
        message.error('Delete failed')
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      if (response) {
        yield put({
          type: 'fetch',
          payload: {
            currenetPageIndex: 0,
            isAdministrator: true,
            pageSize: 20,
          }
        })
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  }
}

export default Model

