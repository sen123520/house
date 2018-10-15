import React from 'react'
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import {Tabs} from 'antd'
import Intelligence from './intelligence'
import ProjectInfo from './projectInfo'
import SellPoint from './sellPoint'


const TabPane = Tabs.TabPane;

function ProjectDetail({projectDetail, location, loading, params, dispatch}) {

  const {pathname, query} = location;
  const {tabKey = '1'} = query

  function handleTabChange(key) {
    handleChangeLocation({tabKey: key})
  }

  function handleChangeLocation(data) {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        ...data

      }
    }))
  }

  function onPageChange(pagination) {
    handleChangeLocation({
      page: pagination.current,
      pageSize: pagination.pageSize
    })

  }

  return (
    <div>
      <div>
        <Tabs activeKey={tabKey} onChange={handleTabChange}>
          <TabPane tab="项目信息" key="1">
            {tabKey === "1" && !loading && (
              <ProjectInfo projectDetail={projectDetail} dispatch={dispatch} params={params}/>
            )}
          </TabPane>
          <TabPane tab="最新情报" key="2">
            {tabKey === "2" && (
              <Intelligence onPageChange={onPageChange} objDetail={projectDetail} dispatch={dispatch} params={params}/>
            )}
          </TabPane>
          <TabPane tab="卖点话术" key="3">
            {tabKey === "3" && (
              <SellPoint dispatch={dispatch} objDetail={projectDetail} params={params}/>
            )}
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}


const mapStateToProps = ({projectDetail, loading}) => {
  return {
    projectDetail,
    loading: loading.models.projectDetail
  }
};
export default connect(mapStateToProps)(ProjectDetail);
