const loggerMiddleware = (storeAPI) => (next) => (action) => {
  if (!import.meta.env.DEV) return next(action);
  console.group(`Action: ${action.type}`);
  console.log('prev:', storeAPI.getState());
  console.log('action:', action);
  const result = next(action);
  console.log('next:', storeAPI.getState());
  console.groupEnd();
  return result;
};

export default loggerMiddleware;
