import * as Actions from '../../../redux/actions/action-types';

// Post supplier card
export const getSupplierCardAction = (data) => {
  return({
    'type': Actions.GET_SUPPLIER_CARD_INIT,
    'data': data
  });
}

// Financial
export const getFinancialCompaniesAction = (data) => {
  return({
    'type': Actions.GET_FINANCIAL_COMPANIES_INIT,
    'data': data
  });
}

export const getFinancialDepartmentsAction = (data) => {
  return({
    'type': Actions.GET_FINANCIAL_DEPARTMENTS_INIT,
    'data': data
  });
}

export const getFinancialCategoryGroupAction = (data) => {
  return({
    'type': Actions.GET_FINANCIAL_CATEGORY_GROUP_INIT,
    'data': data
  });
}

export const getSBUAction = (data) => {
  return({
    'type': Actions.GET_FINANCIAL_SBU_INIT,
    'data': data
  });
}

export const getFinancialCategoriesAction = (data) => {
  return({
    'type': Actions.GET_FINANCIAL_CATEGORIES_INIT,
    'data': data
  });
}

// Neilson
export const getNeilsonCompaniesAction = (data) => {
  return({
    'type': Actions.GET_NEILSON_COMPANIES_INIT,
    'data': data
  });
}

export const getNeilsonDepartmentsAction = (data) => {
  return({
    'type': Actions.GET_NEILSON_DEPARTMENTS_INIT,
    'data': data
  });
}

export const getNeilsonCategoryGroupAction = (data) => {
  return({
    'type': Actions.GET_NEILSON_CATEGORY_GROUP_INIT,
    'data': data
  });
}

export const getNeilsonCategoriesAction = (data) => {
  return({
    'type': Actions.GET_NEILSON_CATEGORIES_INIT,
    'data': data
  });
}

// Create Scenario
export const postCreateScenarioAction = (data) => {
  return({
    'type': Actions.POST_CREATE_SCENARIO_INIT,
    'data': data
  })
}

// Get archived Scenario
export const getArchivedScenarioAction = (data) => {
  return({
    'type': Actions.GET_ARCHIVED_SCENARIO_INIT,
    'data': data
  })
}

export const reactivate = (data) => {
  return({
    'type': Actions.PUT_REACTIVATE_SCENARIO_INIT,
    'data': data
  })
}

export const discardArchived = (data) => {
  return({
    'type': Actions.POST_DISCARD_ARCHIVED_SCENARIO_INIT,
    'data': data
  })
}

// Get archived Scenario Platform
export const getArchivedScenarioActionPlatform = (data) => {
  return({
    'type': Actions.GET_ARCHIVED_SCENARIO_PLATFORM_INIT,
    'data': data
  })
}

// Post archive Scenario
export const postArchiveScenarioAction = (data) => {
  return({
    'type': Actions.POST_ARCHIVE_SCENARIO_INIT,
    'data': data
  })
}

export const getScenarioCardAction = (data) => {
  return ({
    'type': Actions.GET_SCENARIO_CARD_INIT,
    'data' : data
  })
}

// Put Update Scenario
export const putUpdateScenarioAction = (data) => {
  return({
    'type': Actions.PUT_UPDATE_SCENARIO_INIT,
    'data': data
  })
}

// Get Scenario Brand
export const getScenarioBrandAction = (data) => {
  return({
    'type': Actions.GET_SCENARIO_BRAND_INIT,
    'data': data
  })
}

// Financial Market Hierarchy Mapping
export const getFinancialMarketHierarchyAction = (data) => {
  return({
    'type': Actions.GET_FINANCIAL_HIERARCHY_INIT,
    'data': data
  })
}

// Get Nielsen Brand
export const getNielsenBrandAction = (data) => {
  return({
    'type': Actions.GET_NIELSEN_BRAND_INIT,
    'data': data
  })
}

// Get Buyer List
export const getBuyersListAction = (data) => {
  return({
    type: Actions.GET_LIST_BUYERS_INIT,
    data: data
  })
}

// Remove Closeout Grid Response
export const removeCloseoutGridResponse = () => {
  return ({
    type: Actions.REMOVE_CLOSEOUT_RESPONSE,
    status:1
  })
}

// Library Page Metadata Action
export const getLibraryMetadataAction = (data) => {
  return({
    'type': Actions.GET_LIBRARY_METADATA_INIT,
    'data': data
  });
}

//CloseoutGrid Metadata Action
export const getCloseoutgridMetadataData = (data) => {
  return {
    'type': Actions.GET_CLOSEOUTGRID_META_DATA_INIT,
    'data' : data
  }
}

// Get Scenario List Platform
export const getScenarioListPlatform = (data) => ({
  type: Actions.GET_SCENARIO_LIST_PLATFORM_INIT,
  'data': data
});


// Navigation Metadata Action
export const getNavigationMetadataData = (data) => {
  return {
    'type': Actions.GET_NAVIGATION_META_DATA_INIT,
    'data' : data
  }
}
