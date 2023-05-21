export function isMobile() {
    return navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)
}

export function getScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}