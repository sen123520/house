import {config, constants, request} from '../utils';
import {SERVER, API_RESTFUL} from '../config';

const ACCOUNT = `${SERVER}/service/accounts`;

//   addPublish
export async function preser({query}) {
  // console.log(query)
  let url = `${PUBLISH}/manage`;
  return request(url, {
    method: 'POST',
    body: query
  });
}

// account service
export async function getList({
  page = 1,
  pageSize = constants.PAGE_SIZE,
  query
}) {
  let url = `${ACCOUNT}/list?page=${page}&pageSize=${pageSize}`;
  // console.log(url);
  // console.log("getList", query);
  return request(url, {
    method: 'POST',
    body: query
  });
}
///service/accounts/detail/{companyNo}
export async function getAccount(id) {
  let url = `${ACCOUNT}/detail/${id}`;
  // console.log(url)
  return request(url, {
    method: 'GET'
  });
}

// export function patch(id, values) {
//   return request(`/api/users/${id}`, {
//     method: 'PATCH',
//     body: JSON.stringify(values),
//   });
// }
export async function patch(id, values) {
  return request(`${ACCOUNT}/changePhone`, {
    method: 'PATCH'
  });
}
export async function update({query}) {
  let url = `${ACCOUNT}/handler/open`;
  return request(url, {
    method: 'POST',
    body: query
  });
}

export async function del({query}) {
  // console.log("del", query);
  let url = `${ACCOUNT}/handler`;
  return request(url, {
    method: 'POST',
    body: query
  });
}

// project service - newhouse 老代码
export async function query({page = 1, pageSize = constants.PAGE_SIZE, query}) {
  let url = `${SERVER}/op-newhouse/estate/list?page=${page}`;
  // console.log("query", query);

  return request(url, {
    method: 'POST',
    body: query
  });
}

export async function getCityDictData() {
  //项目所在城市 字典
  let cityDictUrl = `${SERVER}/op-newhouse/city/list`;
  return request(cityDictUrl, {
    method: 'GET'
  });
}

export async function getPerformanceCityDictData() {
  //业绩城市
  let performanceCityDictUrl = `${SERVER}/op-newhouse/city/listByUser`;
  return request(performanceCityDictUrl, {
    method: 'GET'
  });
}

export async function getDistrictDictData({id}) {
  //区域
  let districtUrl = `${SERVER}/op-newhouse/district/list/${id}`;
  return request(districtUrl, {
    method: 'GET'
  });
}

export async function save(rep) {
  let id = rep.id;
  delete rep.id;
  let url = `${SERVER}/op-newhouse/estate/${id}`;

  return request(url, {
    method: 'PUT',
    body: rep
  });
}

export async function detail(id) {
  let url = `${SERVER}/op-newhouse/estate/info/${id}`;
  // console.log(url);
  return request(url, {
    method: 'GET'
  });
}

export function getEmployeeByCompanyId(id) {
  const url = `${SERVER}/service/companies/${id}`;
  return request(url, {method: 'GET'});
}
