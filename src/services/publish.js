import { config, constants, request, axios } from "../utils";
import { PUBLISH } from "../config";

const LISTPUB = `${PUBLISH}/op/release/manage`;
const POP = `${PUBLISH}/op/release/content`

export async function getPublishList({
    currentPage = 1,
    pageSize = constants.PAGE_SIZE,
    query
  }) {
    let url = `${LISTPUB}/search?pageSize=${pageSize}&currentPage=${currentPage}`;
    return request(url, {
      method: "POST",
      body: query
    });
  }
  export async function remove(id) {
    return request(`${LISTPUB}/${id}`, {
      method: 'DELETE',
    });
  }
  export async function change(id,status) {
    return request(`${LISTPUB}/${id}`, {
      method: 'PUT',
      body:status
    });
  }
  
  export async function getPopList({
    currentPage = 1,
    pageSize = 10,
    ...query
  }) {
    // console.log('service', query)
    let popUrl = `${POP}/search?pageSize=${pageSize}&currentPage=${currentPage}`;
    return request(popUrl, {
      method: "POST",
      body: query
    });
  }
