import {config, constants, request} from '../utils';
import {SERVER} from '../config'

export async function login({
                              loginName,
                              password
                            }) {



  let loginUrl = `${SERVER}/op/login`
  let param = {"loginName": loginName, "password": password}

  return request(loginUrl, {
    method: 'POST',
    body: param
  });
}
