import { combineReducers } from 'redux';
import {  Map as ImmutableMap, fromJS, mergeDeep } from 'immutable';

import * as ApplicationConstants from '../../../constants/application';

import * as Actions from '../../../redux/actions/action-types';
import { reduxState } from '../../../modules/utilities';

const anchorSaved = (state, action) => {
  let { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_ANCHOR_SAVED_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_ANCHOR_SAVED_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_ANCHOR_SAVED_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

const totalCOGS = (state, action) => {
  const { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_TOTAL_COGS_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_TOTAL_COGS_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_TOTAL_COGS_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

const marginAsk = (state, action) => {
  const { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_MARGIN_ASK_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_MARGIN_ASK_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_MARGIN_ASK_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

const customMarginAsk = (state, action) => {
  const { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_CUSTOM_MARGIN_ASK_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_CUSTOM_MARGIN_ASK_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_CUSTOM_MARGIN_ASK_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

const priceGapAsk = (state, action) => {
  const { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_PRICE_GAP_ASK_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_PRICE_GAP_ASK_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_PRICE_GAP_ASK_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_CUSTOM_PRICE_GAP_ASK_SUCCESS:
      const priceGapAskData = state.get(ApplicationConstants.PROP_DATA,ImmutableMap({}));
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, mergeDeep(priceGapAskData, data));

    default:
      return state;
  }
}

const customPriceGapAsk = (state, action) => {
  const { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_CUSTOM_PRICE_GAP_ASK_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_CUSTOM_PRICE_GAP_ASK_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_CUSTOM_PRICE_GAP_ASK_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

const reviewAsk = (state, action) => {
  const { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_ANCHOR_REVIEW_ASK_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_ANCHOR_REVIEW_ASK_SUCCESS:
      return state.withMutations((newState) => {
        newState.set(ApplicationConstants.PROP_INITIALIZED, true);
        newState.set(ApplicationConstants.PROP_FETCHING, false);
        newState.set(ApplicationConstants.PROP_ERROR, false);
        newState.set(ApplicationConstants.PROP_STATUS, status);
        newState.setIn([ApplicationConstants.PROP_DATA, 'breakdown'], fromJS(data));
      });

    case Actions.GET_ANCHOR_REVIEW_ASK_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

const reviewAskItems = (state, action) => {
  const { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_ANCHOR_REVIEW_ASK_ITEMS_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_ANCHOR_REVIEW_ASK_ITEMS_SUCCESS:
      return state.withMutations((newState) => {
        newState.set(ApplicationConstants.PROP_INITIALIZED, true);
        newState.set(ApplicationConstants.PROP_FETCHING, false);
        newState.set(ApplicationConstants.PROP_ERROR, false);
        newState.set(ApplicationConstants.PROP_STATUS, status);
        newState.setIn([ApplicationConstants.PROP_DATA, 'breakdownItems'], fromJS(data));
      });

    case Actions.GET_ANCHOR_REVIEW_ASK_ITEMS_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

const reviewAskExportData = (state, action) => {
  const { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_ANCHOR_REVIEW_ASK_EXPORT_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_ANCHOR_REVIEW_ASK_EXPORT_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_ANCHOR_REVIEW_ASK_EXPORT_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

const supplierFinancials = (state, action) => {
  let { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_ANCHOR_SUPPLIER_FINANCIALS_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_ANCHOR_SUPPLIER_FINANCIALS_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_ANCHOR_SUPPLIER_FINANCIALS_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

const priceInvestment = (state, action) => {
  let { status = 0, data = {} } = action;
  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_PRICE_INVESTMENT_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_PRICE_INVESTMENT_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_PRICE_INVESTMENT_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

const assumedProfitRate = (state, action) => {
  let { status = 0, data = {} } = action;

  if(state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch(action.type) {
    case Actions.GET_ASSUMED_PROFIT_RATE_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_ASSUMED_PROFIT_RATE_SUCCESS:
      if (data.url) {
        const columnKey = state.getIn([ApplicationConstants.PROP_OTHER, 'key']);
        return reduxState(state, true, false, false, status, columnKey, fromJS(data));
      } else {
        return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));
      }

    case Actions.GET_ASSUMED_PROFIT_RATE_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
};


// Save Anchor Summary
const anchorSummary = (state, action) => {
  const { status = 0, data = {} } = action;

  if (state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch (action.type) {
    case Actions.POST_ANCHOR_SUMMARY_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.POST_ANCHOR_SUMMARY_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.POST_ANCHOR_SUMMARY_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
};

// Update Anchor Summary
const updateAnchorSummary = (state, action) => {
  const { status = 0, data = {} } = action;

  if (state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch (action.type) {
    case Actions.PUT_ANCHOR_SUMMARY_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.PUT_ANCHOR_SUMMARY_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.PUT_ANCHOR_SUMMARY_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
}

//Get Platform User Preference Based On viewName
const anchorPlatformUserPreference = (state, action) => {
  const { status = 0, data = {} } = action;

  if (state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch (action.type) {
    case Actions.GET_ANCHOR_PLATFORM_USER_PREFERENCE_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_ANCHOR_PLATFORM_USER_PREFERENCE_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_ANCHOR_PLATFORM_USER_PREFERENCE_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
};

//Save Platform User Preference
const anchorSavedPlatformUserPreference = (state, action) => {
  const { status = 0, data = {} } = action;

  if (state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch (action.type) {
    case Actions.POST_ANCHOR_PLATFORM_USER_PREFERENCE_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.POST_ANCHOR_PLATFORM_USER_PREFERENCES_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.POST_ANCHOR_PLATFORM_USER_PREFERENCES_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
};

// Save Anchor Platform Summary
const AnchorPlatformSummary = (state, action) => {
  const { status = 0, data = {} } = action;

  if (state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch (action.type) {
    case Actions.POST_ANCHOR_PLATFORM_SUMMARY_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.POST_ANCHOR_PLATFORM_SUMMARY_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.POST_ANCHOR_PLATFORM_SUMMARY_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
};

// Save Anchor Platform Supplier Financials
const AnchorPlatformSupplierFinancials = (state, action) => {
  const { status = 0, data = {} } = action;
  if (state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch (action.type) {
    case Actions.POST_ANCHOR_PLATFORM_SUPPLIER_FINANCIALS_INIT:
      const supplierFinancialData = state.getIn([action['data']['id'], 'data'], {});
      return state.set(action['data']['id'], ImmutableMap({fetching: true, data: supplierFinancialData}));

    case Actions.POST_ANCHOR_PLATFORM_SUPPLIER_FINANCIALS_SUCCESS:
      return state.set(data['id'] || 'ecommFinancials', ImmutableMap({fetching: false, data}));

    case Actions.POST_ANCHOR_PLATFORM_SUPPLIER_FINANCIALS_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
};

// Get Anchor Platform Metadata
const getPlatformAnchorLayoutData = (state, action) => {
  const { status = 0, data = {} } = action;

  if (state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch (action.type) {
    case Actions.GET_PLATFORM_ANCHOR_LAYOUTDATA:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_PLATFORM_ANCHOR_LAYOUTDATA_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));

    case Actions.GET_PLATFORM_ANCHOR_LAYOUTDATA_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));

    case Actions.GET_PLATFORM_ANCHOR_LAYOUTDATA_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));

    default:
      return state;
  }
};

// Get Anchor Table Data
const anchorTableData = (state, action) => {
  const { status = 0, data = {} } = action;
  if (state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }
  switch (action.type) {
    case Actions.GET_ANCHOR_TABLE_DATA_INIT:
      const tableData = state.getIn([action['data']['key'], 'data'], {});
      return state.set(action['data']['key'], ImmutableMap({fetching: true, data: tableData}));

    case Actions.GET_ANCHOR_TABLE_DATA_CLEAR:
      return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));

    case Actions.GET_ANCHOR_TABLE_DATA_SUCCESS:
      return state.set(data['key'], ImmutableMap({fetching: false, data}));

    case Actions.GET_ANCHOR_TABLE_DATA_FAIL:
      return state;

    default:
      return state;
  }
};

// update margin ask custom value
const updateCustomValue = (state, action) => {
  const { status = 0, data = {} } = action;

  if (state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }
  switch (action.type) {
    case Actions.POST_CUST_MARGIN_ASK_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.POST_CUST_MARGIN_ASK_SUCCESS:
      const columnKey = state.getIn([ApplicationConstants.PROP_OTHER, 'key']);

      return reduxState(state, true, false, false, status, columnKey, fromJS(data));

    case Actions.POST_CUST_MARGIN_ASK_FAIL:
      return state;

    default:
      return state;
  }
};

const rdsCompetitors = (state, action) => {
  const { status = 0, data = {} } = action;

  if (state === undefined) {
    return reduxState(undefined, false, false, false, status, ApplicationConstants.PROP_DATA, ImmutableMap(data));
  }

  switch (action.type) {
    case Actions.GET_RDS_COMPETITORS_INIT:
      return reduxState(state, false, true, false, status, ApplicationConstants.PROP_OTHER, ImmutableMap(data));

    case Actions.GET_RDS_COMPETITORS_SUCCESS:
      return reduxState(state, true, false, false, status, ApplicationConstants.PROP_DATA, fromJS(data));

    case Actions.GET_RDS_COMPETITORS_FAIL:
      return reduxState(state, false, false, true, status, ApplicationConstants.PROP_DATA, fromJS(data));

    default:
      return state;
  }
};

export default combineReducers({
  anchorSaved,
  totalCOGS,
  marginAsk,
  customMarginAsk,
  priceGapAsk,
  customPriceGapAsk,
  reviewAsk,
  reviewAskItems,
  reviewAskExportData,
  supplierFinancials,
  priceInvestment,
  assumedProfitRate,
  anchorSummary,
  anchorPlatformUserPreference,
  anchorSavedPlatformUserPreference,
  AnchorPlatformSummary,
  AnchorPlatformSupplierFinancials,
  getPlatformAnchorLayoutData,
  updateAnchorSummary,
  anchorTableData,
  updateCustomValue,
  rdsCompetitors
});
