import React from 'react';
function linkTo(parts, extra) {
    const href = '/' + parts.filter(Boolean).join('/');
    if (href === window.location.pathname)
        extra.className = [extra.className, 'current'].filter(Boolean).join(' ');
    return <a {...extra} href={href}/>;
}

export function LinkToBlob({rep, com, path, ...extra}) {
    return linkTo([rep, '-/blob', com, path], extra);
}

export function LinkToTree({rep, com, path, ...extra}) {
    return linkTo([rep, '-/tree', com, path], extra);
}
