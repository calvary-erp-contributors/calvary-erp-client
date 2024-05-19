import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IAccountBalanceReportItem, defaultValue } from 'app/shared/model/account-balance-report-item.model';

const initialState: EntityState<IAccountBalanceReportItem> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/app/account-balance-report-items';
const apiSearchUrl = 'api/app/_search/account-balance-report-items';

// Actions

export const searchEntities = createAsyncThunk(
  'accountBalanceReportItem/search_entity',
  async ({ query, page, size, sort }: IQueryParams) => {
    const requestUrl = `${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`;
    return axios.get<IAccountBalanceReportItem[]>(requestUrl);
  }
);

export const getEntities = createAsyncThunk('accountBalanceReportItem/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}/report${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios.get<IAccountBalanceReportItem[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
  'accountBalanceReportItem/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IAccountBalanceReportItem>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

// slice

export const AccountBalanceReportItemSlice = createEntitySlice({
  name: 'accountBalanceReportItem',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addMatcher(isFulfilled(getEntities, searchEntities), (state, action) => {
        const { data, headers } = action.payload;
        const links = parseHeaderForLinks(headers.link);

        return {
          ...state,
          loading: false,
          links,
          entities: loadMoreDataWhenScrolled(state.entities, data, links),
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isPending(getEntities, getEntity, searchEntities), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      });
  },
});

export const { reset } = AccountBalanceReportItemSlice.actions;

// Reducer
export default AccountBalanceReportItemSlice.reducer;
