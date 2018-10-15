import { config, constants, request } from "../utils";
import { SERVER, API_RESTFUL } from "../config";

const ACCOUNT = `${SERVER}/tool/feedbacks`;

// export async function getList({query,page,pageSize}) {
//      console.log(page,pageSize)
//     //let url = `${ACCOUNT}/list?page=${page}&pageSize=${pageSize}`
//     let url = `http://10.0.33.14:50031/tool/feedbacks/list?page=${page}&pageSize=${pageSize}`
//     return request(url,{
//         method: "POST"
//     })
// }

export async function getList({page = 1,pageSize = constants.PAGE_SIZE,query}) {
    let url = `${ACCOUNT}/list?page=${page}&pageSize=${pageSize}`;
    // console.log(page,pageSize)
    // console.log("getList2132131", query);
    return request(url, {
      method: "POST",
      body: query
    });
  }

export async function detail(id){
    let url =`${ACCOUNT}/${id}`
    // console.log("url",url)
    return request(url,{
        method: "GET"
    })
} 