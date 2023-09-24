
export default function auth ({ next }) {
  if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
    return next({ name: 'loginPage' });
  }
  return next();
}

