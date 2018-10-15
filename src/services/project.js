import { config, constants, request } from "../utils";
import { SERVER } from "../config";

export async function query({
  page = 1,
  pageSize = constants.PAGE_SIZE,
  query
}) {
  let url = `${SERVER}/op-newhouse/estate/list?page=${page}`;
  // console.log("query", query);
  return request(url, {
    method: "POST",
    body: query
  });
}

export async function getCityDictData() {
  //项目所在城市 字典
  let cityDictUrl = `${SERVER}/op-newhouse/city/list`;
  return request(cityDictUrl, {
    method: "GET"
  });
}

export async function getPerformanceCityDictData() {
  //业绩城市
  let performanceCityDictUrl = `${SERVER}/op-newhouse/city/listByUser`;
  return request(performanceCityDictUrl, {
    method: "GET"
  });
}

export async function getDistrictDictData({ id }) {
  //区域
  let districtUrl = `${SERVER}/op-newhouse/district/list/${id}`;
  return request(districtUrl, {
    method: "GET"
  });
}

export async function save(rep) {
  let id = rep.id;
  delete rep.id;
  let url = `${SERVER}/op-newhouse/estate/${id}`;
  alert(url);
  return request(url, {
    method: "PUT",
    body: rep
  });
}

export async function detail(id) {
  let url = `${SERVER}/op-newhouse/estate/info/${id}`;
  // console.log(url);
  return request(url, {
    method: "GET"
  });
}
