import instance, {
  post
} from './http'
instance.defaults.baseURL = 'http://121.37.67.75:11111'
// let post = instance.post

export function test(data) {
  return post('/test', data)
}

export function getTip(data) {
  return post('/problem/getAll', data, (res) => {
    // res.body.dataList.forEach(item => {
    //   item.gmtModified = item.gmtCreate
    // })
    return res
  })
}
export function getBlogs(id) {
  return post('/blog/getBlogs', {
    id,
    pageNumber: 1,
    pageSize: 999
  })
}

//修改题目
export function changeTip(data) {
  delete data.gmdCreate
  // delete data.gmtCreate
  data.gmtCreate = data.gmtCreate.slice(0, 10) + " 00:00:00"
  return post('/problem/updateProblem', data)
}

//删除题目
export function deleteTip(data) {
  return post('/problem/deleteProblem', data)
}
export function addScore(data) {
  return post('/blog/addScore', data)
}

//增加题目
export function addTip(data) {
  return post('/problem/sendProblem', data)
}
export function getUser(data) {
  return post('/user/getAll', data)
}
// 用户登录
export function userLogin(data) {
  return post('/user/login', data)
}
// 获取所有用户列表
export function getAll(data) {
  return post('/user/getAll', data)
}
// 删除用户
export function deleteUser(data) {
  return post('/user/deleteUser', data)
}
// 添加用户
export function add(data) {
  return post('/user/addUser', data)
}
// 修改用户
export function edit(data) {
  return post('/user/updateUser', data)
}
// 查询用户
export function search(data) {
  return post('/user/getByConditions', data)
}