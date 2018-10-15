import React from 'react';
import PublishContentList from './list/index'

export default function PublishContent({children, ...props}) {
  return children || <PublishContentList {...props}/>
}
