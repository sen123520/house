import React from 'react';
import Login from './login'
import {connect} from 'dva';


function LoginIndex({login, dispatch, loading, location, children}) {

  return (
    <div>
      <Login login={login}  dispatch={dispatch}/>
    </div>
  );



}
function mapStateToProps({project, loading}) {
  return {project: project, loading: loading.models.project}
}

export default connect(mapStateToProps)(LoginIndex);
