import {LinkToBlob, LinkToTree} from './link'
import React from 'react';

export default function Breadcrumb({file, directory, rep, com}) {
  const isFile = typeof file != 'undefined';
  const parts = (file || directory).split('/');
  let path = '';
  const link = (part, index) => {
    if (index) path += '/';
    path += part;
    const props = {rep, com, path};
    const Component = isFile && index == parts.length - 1 
      ? LinkToBlob
      : LinkToTree;
    return <Component {...props}>{part}</Component>;
  };

  const children = [];
  parts.forEach((part, index) => {
    if (index) children.push('/');
    children.push(link(part, index));
  });
  
  return <React.Fragment>{children}</React.Fragment>;
}
