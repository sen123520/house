import React from 'react';

export default function Project({children, ...props}) {
  return children || <ProjectList {...props}/>
}
