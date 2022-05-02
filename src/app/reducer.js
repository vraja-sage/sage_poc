import { createAction, createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import localStorage from 'redux-persist/lib/storage';
import data from '../__data__';

const LoadingState = {
  IDLE : "IDLE",
  REQUEST : "REQUEST",
  SUCCESS : "DONE",
  FAILURE : "FAILURE"
}

const initialState = {
  views: [],
  components: [],
  loading: {
    state: LoadingState.IDLE
  }
};

/* --------------- Actions ---------------*/
export const fetchData = createAsyncThunk('fetchData', async () => {
  return data;
});

export const setLayoutView = createAction('setLayoutView')

/* --------------- Selectors ---------------*/
const getViews = (state) => state.views;
const getComponents = (state) => state.components;
const getViewById = (id) => (state) => state.views.find((view) => view.id === id);

export const selectors = {
  getViews,
  getViewById,
  getComponents
}

/* --------------- Reducer ---------------*/
const fetchDataPendingReducer = (state) => {
  state.loading = { state: LoadingState.REQUEST };
};

const fetchDataFulfilledReducer = (state, action) => {
  state.views = action.payload.views;
  state.components = action.payload.components;
  state.loading = { state: LoadingState.SUCCESS };
};

const fetchDataRejectedReducer = (state, action) => {
  state.views = [];
  state.loading = {
    state: LoadingState.FAILURE,
    error: action.payload,
  };
};

const setLayoutViewReducer = (state, action) => {
  const view = state.views.find((view) => view.id === action.payload.id);
  if (view) {
    view.componentLayout = action.payload.componentLayout;
  }
};

const slice = createSlice({
  name: "views",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, fetchDataPendingReducer)
    builder.addCase(fetchData.fulfilled, fetchDataFulfilledReducer)
    builder.addCase(fetchData.rejected, fetchDataRejectedReducer)
    builder.addCase(setLayoutView.type, setLayoutViewReducer)
  },
});


const persistConfig = {
  key: 'views',
  storage: localStorage,
  whitelist: ['views', 'components']
}

export default persistReducer(persistConfig, slice.reducer);
