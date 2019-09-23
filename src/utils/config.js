// const host = 'https://www.liuchaoqun.top/weapp'
// 'http://192.168.3.60:5757/weapp'
const host =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5757/weapp'
    : 'https://www.liuchaoqun.top/weapp'
export default {
  host,
  loginUrl: `${host}/login`
}
