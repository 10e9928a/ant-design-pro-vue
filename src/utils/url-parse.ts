// 获取hash路由参数
export const getHashParams = () => {
  const hash = window.location.hash
  const hashParams = hash.split('?')[1]
  if (!hashParams) return {}

  const params = hashParams.split('&')
  const paramsObj: any = {}
  params.forEach((item) => {
    const key = item.split('=')[0]
    const value = item.split('=')[1]
    paramsObj[key] = value
  })
  return paramsObj
}

// 获取hash的路径path
export const getHashPath = () => {
  const hash = window.location.hash
  const hashPath = hash.split('?')[0]
  return hashPath
}
