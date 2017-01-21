/* eslint-disable */
(function (l) {
  if (l.search) {
    const q = {};
    l.search.slice(1).split('&').forEach((v) => {
      const a = v.split('=');
      q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
    });
    if (q.p !== undefined) {
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + (q.p || '') +
        (q.q ? (`?${q.q}`) : '') +
        l.hash
      );
    }
  }
}(window.location));
