import { config, constants, request } from "../utils";
import { SERVER, API_RESTFUL, TEST } from "../config";

const PUBLISH = `${SERVER}/op/release/content`

export async function getList({
  page = 1,
  pageSize = constants.PAGE_SIZE,
  query
}) {
  let url = `${PUBLISH}/search?currentPage=${page}&pageSize=${pageSize}`
  return request(url, {
    method: 'POST',
    body: query
  })
}

export async function newContent({
  query
}){
  // console.log(query)
  let url = PUBLISH
  return request(url, {
    method: 'POST',
    body: query
  })
}

export async function getData({
  id
}){
  // console.log(id)
  let url = `${PUBLISH}/${id}`
  return request(url)
}

export async function deleteFile({
  id
}){
  // console.log(id)
  let url = `${PUBLISH}/file/${id}`
  return request(url, {
    method: 'DELETE'
  })
}

export async function editContent({
  query
}){
  // console.log(query)
  let url = `${PUBLISH}/${query.id}`
  return request(url, {
    method: 'PUT',
    body: query
  })
}

export async function deleteContent({
  id
}){
  // console.log('delete in request:', id)
  let url = `${PUBLISH}/${id}`
  return request(url, {
    method: 'DELETE'
  })
}

export async function estateNameSelect({
  query
}){
  // /keyWord
  // console.log('publish in request: ', query)
  let url = `${SERVER}/op-newhouse/estate/list`
  // console.log('publish in request url：', url)
  return request(url, {
    method: 'POST',
    body: query
  })
}
