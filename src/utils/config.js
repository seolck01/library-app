// const host = 'https://www.liuchaoqun.top'
let host =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5757/weapp'
    : 'https://www.liuchaoqun.top/weapp'
export default {
  host,
  loginUrl: `${host}/login`
}
