import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SystemshowmenupicVO, SystemshowmenupicForm, SystemshowmenupicQuery } from '@/api/systemshow/systemshowmenupic/types';

/**
 * 查询菜谱图片列表
 * @param query
 * @returns {*}
 */

export const listSystemshowmenupic = (query?: SystemshowmenupicQuery): AxiosPromise<SystemshowmenupicVO[]> => {
  return request({
    url: '/systemshow/systemshowmenupic/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询菜谱图片详细
 * @param id
 */
export const getSystemshowmenupic = (id: string | number): AxiosPromise<SystemshowmenupicVO> => {
  return request({
    url: '/systemshow/systemshowmenupic/' + id,
    method: 'get'
  });
};

/**
 * 新增菜谱图片
 * @param data
 */
export const addSystemshowmenupic = (data: SystemshowmenupicForm) => {
  return request({
    url: '/systemshow/systemshowmenupic',
    method: 'post',
    data: data
  });
};

/**
 * 修改菜谱图片
 * @param data
 */
export const updateSystemshowmenupic = (data: SystemshowmenupicForm) => {
  return request({
    url: '/systemshow/systemshowmenupic',
    method: 'put',
    data: data
  });
};

/**
 * 删除菜谱图片
 * @param id
 */
export const delSystemshowmenupic = (id: string | number | Array<string | number>) => {
  return request({
    url: '/systemshow/systemshowmenupic/' + id,
    method: 'delete'
  });
};
