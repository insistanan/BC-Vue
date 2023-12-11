import request from '@/utils/request';
import { AxiosPromise } from 'axios';

export const todayMealDetail = () => {
  return request({
    url: '/indexEchart/todayMealDetail',
    method: 'get'
  });
};

export const tenDayMealDetail = () => {
  return request({
    url: '/indexEchart/tenDayMealDetail',
    method: 'get'
  });
};

export const yestodayGroudingMealDetail = () => {
  return request({
    url: '/indexEchart/yestodayGroudingMealDetail',
    method: 'get'
  });
};
