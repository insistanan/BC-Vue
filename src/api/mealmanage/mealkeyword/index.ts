import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MealkeywordVO, MealkeywordForm, MealkeywordQuery } from '@/api/mealmanage/mealkeyword/types';

/**
 * 查询关键词列表
 * @param query
 * @returns {*}
 */

export const listMealkeyword = (query?: MealkeywordQuery): AxiosPromise<MealkeywordVO[]> => {
  return request({
    url: '/mealmanage/mealkeyword/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询关键词详细
 * @param id
 */
export const getMealkeyword = (id: string | number): AxiosPromise<MealkeywordVO> => {
  return request({
    url: '/mealmanage/mealkeyword/' + id,
    method: 'get'
  });
};

/**
 * 新增关键词
 * @param data
 */
export const addMealkeyword = (data: MealkeywordForm) => {
  return request({
    url: '/mealmanage/mealkeyword',
    method: 'post',
    data: data
  });
};

/**
 * 修改关键词
 * @param data
 */
export const updateMealkeyword = (data: MealkeywordForm) => {
  return request({
    url: '/mealmanage/mealkeyword',
    method: 'put',
    data: data
  });
};

/**
 * 删除关键词
 * @param id
 */
export const delMealkeyword = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mealmanage/mealkeyword/' + id,
    method: 'delete'
  });
};
