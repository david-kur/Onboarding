import _ from 'lodash';

export function paginate(data, pageNumber, rowsPerPage) {
  const fromIndex = (pageNumber - 1) * rowsPerPage;
  return _(data).slice(fromIndex).take(rowsPerPage).value();
}
