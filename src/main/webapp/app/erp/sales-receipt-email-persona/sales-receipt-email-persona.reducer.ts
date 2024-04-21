import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, ERPEntityState, serializeAxiosError } from 'app/shared/reducers/reducer-erp.util';
import { ISalesReceiptEmailPersona, defaultValue } from 'app/shared/model/sales-receipt-email-persona.model';

const initialState: ERPEntityState<ISalesReceiptEmailPersona> = {
  loading: false,
  errorMessage: null,
  entities: [],
  selectedEntities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/app/sales-receipt-email-personas';
const apiSearchUrl = 'api/app/_search/sales-receipt-email-personas';

// Actions

export const searchEntities = createAsyncThunk(
  'salesReceiptEmailPersona/search_entity',
  async ({ query, page, size, sort }: IQueryParams) => {
    const requestUrl = `${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`;
    return axios.get<ISalesReceiptEmailPersona[]>(requestUrl);
  }
);

export const getEntities = createAsyncThunk('salesReceiptEmailPersona/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios.get<ISalesReceiptEmailPersona[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
  'salesReceiptEmailPersona/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<ISalesReceiptEmailPersona>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getSelectedEntity = createAsyncThunk(
  'salesReceiptEmailPersona/fetch_selected_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<ISalesReceiptEmailPersona>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'salesReceiptEmailPersona/create_entity',
  async (entity: ISalesReceiptEmailPersona, thunkAPI) => {
    const result = await axios.post<ISalesReceiptEmailPersona>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'salesReceiptEmailPersona/update_entity',
  async (entity: ISalesReceiptEmailPersona, thunkAPI) => {
    const result = await axios.put<ISalesReceiptEmailPersona>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'salesReceiptEmailPersona/partial_update_entity',
  async (entity: ISalesReceiptEmailPersona, thunkAPI) => {
    const result = await axios.patch<ISalesReceiptEmailPersona>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'salesReceiptEmailPersona/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<ISalesReceiptEmailPersona>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const SalesReceiptEmailPersonaSlice = createEntitySlice({
  name: 'salesReceiptEmailPersona',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(getSelectedEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEntities = [...state.selectedEntities, action.payload.data];
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities, searchEntities), (state, action) => {
        const { data, headers } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
        state.selectedEntities = [];
        state.entities = [];
      })
      .addMatcher(isPending(getEntities, getEntity, getSelectedEntity, searchEntities), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = SalesReceiptEmailPersonaSlice.actions;

// Reducer
export default SalesReceiptEmailPersonaSlice.reducer;
