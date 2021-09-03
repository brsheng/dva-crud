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
  currentItem?: User
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
    item: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(GetEmployeesByCondition, payload);
            
      const {Result} = response
      const {Items, TotalItems} = Result
      yield put({
        type: 'save',
        payload: { item: Items,TotalItems},
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
      console.log(response);
      }
    },
    *deleteUser({ payload }, { call, put }) {
      const response = yield call(deleteUser, payload);
      
      if (response.Success) {
        message.success('Delete successfully.');
        yield put({
          type: 'fetch'
        })
      } else {
        message.error('Delete failed')
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      if (response) {
        yield put({
          type: 'fetch'
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

