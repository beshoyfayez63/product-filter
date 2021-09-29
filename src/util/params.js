export const addParams = (param, args) => {
  const urlParam = new URLSearchParams(param);
  for (let arg in args) {
    urlParam.set(arg, args[arg]);
  }
  return urlParam.toString();
};

export const deleteParams = (param, ...args) => {
  const urlParam = new URLSearchParams(param);
  for (let arg of args) {
    urlParam.delete(arg);
  }
  return urlParam.toString();
};
