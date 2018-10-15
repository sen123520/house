import { config, constants, request } from "../utils";
import { SERVER } from "../config";

export async function query({ page = 1, pageSize = constants.PAGE_SIZE, id }) {
  let url = `${SERVER}/op-newhouse/information/${id}/list?page=${page}`;
  return request(url, {
    method: "POST"
  });
}

export async function del(id) {
  let url = `${SERVER}/op-newhouse/information/${id}`;
  return request(url, {
    method: "DELETE"
  });
}

/**
 * content, unId
 * @param estateId
 * @param content
 * @returns {Promise.<void>}
 */
export async function add({ content, unId }) {
  let url = `${SERVER}/op-newhouse/information`;
  let reqparam = { estateId: unId, content: content };
  if (content && content !== "") {
    return request(url, {
      method: "POST",
      body: reqparam
    });
  }
}
