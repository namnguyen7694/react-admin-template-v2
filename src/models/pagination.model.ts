
class PaginationModel<T> {
  page_number:  number | null;
  totalPages: number | null;
  page_size: number | null;
  totalRecords: number | null;
  data: T;
  constructor(input: PaginationModel<T>) {
    this.page_number = input.page_number;
    this.totalPages = input.totalPages;
    this.page_size = input.page_size;
    this.totalRecords = input.totalRecords;
    this.data = input.data;
    return this;
  }
}

export default PaginationModel;
