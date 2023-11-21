import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SystemshowslideVO, SystemshowslideForm, SystemshowslideQuery } from '@/api/systemshow/systemshowslide/types';

/**
 * 查询首页幻灯片列表
 * @param query
 * @returns {*}
 */

export const listSystemshowslide = (query?: SystemshowslideQuery): AxiosPromise<SystemshowslideVO[]> => {
  return request({
    url: '/systemshow/systemshowslide/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询首页幻灯片详细
 * @param id
 */
export const getSystemshowslide = (id: string | number): AxiosPromise<SystemshowslideVO> => {
  return request({
    url: '/systemshow/systemshowslide/' + id,
    method: 'get'
  });
};

/**
 * 新增首页幻灯片
 * @param data
 */
export const addSystemshowslide = (data: SystemshowslideForm) => {
  return request({
    url: '/systemshow/systemshowslide',
    method: 'post',
    data: data
  });
};

/**
 * 修改首页幻灯片
 * @param data
 */
export const updateSystemshowslide = (data: SystemshowslideForm) => {
  return request({
    url: '/systemshow/systemshowslide',
    method: 'put',
    data: data
  });
};

/**
 * 删除首页幻灯片
 * @param id
 */
export const delSystemshowslide = (id: string | number | Array<string | number>) => {
  return request({
    url: '/systemshow/systemshowslide/' + id,
    method: 'delete'
  });
};
