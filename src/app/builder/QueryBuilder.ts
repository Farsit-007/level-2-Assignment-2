import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
  const queryObj = { ...this.query };
  const excludeFields = ['searchTerm', 'sort', 'minPrice', 'maxPrice'];
  excludeFields.forEach((el) => delete queryObj[el]);

  const priceFilter: Record<string, unknown> = {};

  if (this.query.minPrice || this.query.maxPrice) {
    priceFilter['price'] = {};
    
    if (this.query.minPrice) {
      (priceFilter['price'] as Record<string, number>)['$gte'] = Number(this.query.minPrice);
    }
    if (this.query.maxPrice) {
      (priceFilter['price'] as Record<string, number>)['$lte'] = Number(this.query.maxPrice);
    }
  }

  this.modelQuery = this.modelQuery.find({ ...queryObj, ...priceFilter } as FilterQuery<T>);

  return this;
}

}

export default QueryBuilder;
