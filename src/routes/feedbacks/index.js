import React from 'react';

export default function Feedbacks({children, ...props}) {
  return children || <FeedbacksList {...props}/>
}
