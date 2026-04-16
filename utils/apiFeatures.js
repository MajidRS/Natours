class APIFeatures {
  constructor(query, queryParams, aliasQuery = {}) {
    this.query = query
    this.customQuery =
      Object.keys(aliasQuery).length > 0 ? aliasQuery : queryParams
  }

  customFilter(obj) {
    const operators = ['lt', 'lte', 'gt', 'gte', 'in']
    const excludedFields = ['sort', 'fields', 'limit', 'page']
    excludedFields.forEach((field) => delete obj[field])
    const result = {}
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (!result[key]) result[key] = {}
        for (const op in obj[key]) {
          if (operators.includes(op)) {
            if (op !== 'in') {
              if (!Number.isNaN(Number(obj[key][op]))) {
                result[key][`$${op}`] = Number(obj[key][op])
              }
            } else {
              result[key][`$${op}`] = obj[key][op].split(',')
            }
          }
        }
      } else {
        result[key] = obj[key]
      }
    }
    return result
  }

  filter() {
    const queryObj = { ...this.customQuery }
    const criteria = this.customFilter(queryObj)
    this.query = this.query.find(criteria)
    return this
  }

  sort() {
    if (this.customQuery.sort) {
      const sortBy = this.customQuery.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }
    return this
  }

  selectFields() {
    if (this.customQuery.fields) {
      const fields = this.customQuery.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select('-__v')
    }
    return this
  }

  pagination() {
    const page = this.customQuery.page * 1 || 1
    const limit = Math.min(this.customQuery.limit * 1 || 10, 100)
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

export default APIFeatures
