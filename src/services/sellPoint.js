import { config, constants, request } from "../utils";
import { SERVER } from "../config";

export async function add({ content, unId }) {
  let url = `${SERVER}/op-newhouse/talk-technique`;
  // console.log("url", url);
  let reqparam = { estateId: unId, content: content };
  if (content && content !== "") {
    // console.log("reqparam", reqparam);
    return request(url, {
      method: "POST",
      body: reqparam
    });
  }
}

export async function detail({ id }) {
  let url = `${SERVER}/op-newhouse/talk-technique/${id}`;
  // console.log("url", url);
  return request(url, {
    method: "GET"
  });
}
