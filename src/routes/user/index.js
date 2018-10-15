import React from 'react';

export default function LoginR({children, ...props}) {
  return children || <Login {...props}/>
}
