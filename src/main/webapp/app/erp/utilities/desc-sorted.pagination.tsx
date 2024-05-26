export const getDescSortedSortState = (
  location: { search: string },
  itemsPerPage: number,
  sortField = 'id',
  sortOrder = 'desc'
): IPaginationBaseState => {
  const pageParam = getUrlParameter('page', location.search);
  const sortParam = getUrlParameter('sort', location.search);
  let sort = sortField;
  let order = sortOrder;
  let activePage = 1;
  if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
    activePage = parseInt(pageParam, 10);
  }
  if (sortParam !== '') {
    sort = sortParam.split(',')[0];
    order = sortParam.split(',')[1];
  }
  return { itemsPerPage, sort, order, activePage };
};

export interface IPaginationBaseState {
  itemsPerPage: number;
  sort: string;
  order: string;
  activePage: number;
}

const getUrlParameter = (name: string, search: string): string => {
  const url = new URL(`http://localhost${search}`); // using a dummy url for parsing
  return url.searchParams.get(name) || '';
};

export const overrideDescPaginationStateWithQueryParams = (paginationBaseState: IPaginationBaseState, locationSearch: string) => {
  const params = new URLSearchParams(locationSearch);
  const page = params.get('page');
  const sort = params.get('sort');
  if (page && sort) {
    const sortSplit = sort.split(',');
    paginationBaseState.activePage = +page;
    paginationBaseState.sort = sortSplit[0];
    paginationBaseState.order = sortSplit[1];
  }
  return paginationBaseState;
};
