const catchAsync = (middlewareFunction) => {
  return (req, res, next) => {
    middlewareFunction(req, res, next).catch(next)
  }
}

export default catchAsync
