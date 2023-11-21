import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SystemshownoticeVO, SystemshownoticeForm, SystemshownoticeQuery } from '@/api/systemshow/systemshownotice/types';

/**
 * 查询公告列表
 * @param query
 * @returns {*}
 */

export const listSystemshownotice = (query?: SystemshownoticeQuery): AxiosPromise<SystemshownoticeVO[]> => {
  return request({
    url: '/systemshow/systemshownotice/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询公告详细
 * @param id
 */
export const getSystemshownotice = (id: string | number): AxiosPromise<SystemshownoticeVO> => {
  return request({
    url: '/systemshow/systemshownotice/' + id,
    method: 'get'
  });
};

/**
 * 新增公告
 * @param data
 */
export const addSystemshownotice = (data: SystemshownoticeForm) => {
  return request({
    url: '/systemshow/systemshownotice',
    method: 'post',
    data: data
  });
};

/**
 * 修改公告
 * @param data
 */
export const updateSystemshownotice = (data: SystemshownoticeForm) => {
  return request({
    url: '/systemshow/systemshownotice',
    method: 'put',
    data: data
  });
};

/**
 * 删除公告
 * @param id
 */
export const delSystemshownotice = (id: string | number | Array<string | number>) => {
  return request({
    url: '/systemshow/systemshownotice/' + id,
    method: 'delete'
  });
};
