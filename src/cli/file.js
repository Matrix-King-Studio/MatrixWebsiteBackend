export function uploadfile(data) {
  let forms = new FormData()
  forms.append('file',data)
  forms.append('code','20228087')
  return instance({
    method: 'post',
    url: '/upload',
    data: forms,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}