import React from 'react';

export default function Account({children, ...props}) {
  return children || <AccountList {...props}/>
}
