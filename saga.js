import { takeLatest, put, call } from 'redux-saga/effects';

import { generateAPI } from '../../../modules/utilities';

import * as Actions from '../../../redux/actions/action-types';

import { service, configuration } from '../../../utils';
import Cookies from 'universal-cookie';

const config = configuration();

const generalMerchandise = 'GENERAL MERCHANDISE';

// Post Supplier Card
export function* watchPostSupplierCard() {
  yield takeLatest(Actions.GET_SUPPLIER_CARD_INIT, callSupplierCardData);
}

export function* callSupplierCardData(action) {
  yield call(getSupplierCardData, action.data);
}

export function* getSupplierCardData(data) {
  const url = generateAPI(config.library.supplierCard, data);

  try {
    const response = yield call(service.api, 'get', url);

    const { status, data } = response;

    yield put({
      type: Actions.GET_SUPPLIER_CARD_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.GET_SUPPLIER_CARD_FAIL,
      status: status,
      data: data,
    });
  }
}

// Get SBU Type based on Financial Category Group
export function* watchFinancialSBUData() {
  yield takeLatest(Actions.GET_FINANCIAL_SBU_INIT, callFinancialSBUData);
}

export function* callFinancialSBUData(action) {
  yield call(fetchFinancialSBUData, action.data);
}

export function* fetchFinancialSBUData(data) {
  const url = generateAPI(config.library.sbu, data);

  try {
    const response = yield call(service.api, 'get', url);

    const { status, data } = response;

    yield put({
      type: Actions.GET_FINANCIAL_SBU_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.GET_FINANCIAL_SBU_FAIL,
      status: status,
      data: data,
    });
  }
}

/* Neilson */

// Create Scenario
export function* watchCreateScenario() {
  yield takeLatest(
    Actions.POST_CREATE_SCENARIO_INIT,
    callPostCreateScenarioData
  );
}

export function* callPostCreateScenarioData(action) {
  yield call(postCreateScenarioData, action.data);
}

export function* postCreateScenarioData(serviceData) {
  let url = '';
  if (serviceData['api']) {
    url = serviceData['api'];
  } else {
    url =
      serviceData['platformPayload'] === 'true'
        ? config.createScenario.createScenario
        : `${config.library.createScenario}${serviceData.apiVersion}`;
  }

  try {
    const response = yield call(
      service.api,
      'post',
      url,
      serviceData.requestObj
    );

    const { status, data } = response;

    yield put({
      type: Actions.POST_CREATE_SCENARIO_SUCCESS,
      status: status,
      data: { scenarioId: data },
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.POST_CREATE_SCENARIO_FAIL,
      status: status,
      data: data,
    });
  }
}

// Get archived Scenario
export function* watchGetArchivedScenario() {
  yield takeLatest(
    Actions.GET_ARCHIVED_SCENARIO_INIT,
    callGetArchivedScenarioData
  );
}

export function* callGetArchivedScenarioData(action) {
  yield call(getArchivedScenarioData, action.data);
}

export function* getArchivedScenarioData(data) {
  const url = config.reporting.findarchivedScenario;
  try {
    const response = yield call(service.api, 'get', url);

    const { status, data } = response;
    yield put({
      type: Actions.GET_ARCHIVED_SCENARIO_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.GET_ARCHIVED_SCENARIO_FAIL,
      status: status,
      data: data,
    });
  }
}

// Get archived Scenario Platform
export function* watchGetArchivedScenarioPlatform() {
  yield takeLatest(
    Actions.GET_ARCHIVED_SCENARIO_PLATFORM_INIT,
    callGetArchivedScenarioDataPlatform
  );
}

export function* callGetArchivedScenarioDataPlatform(action) {
  yield call(getArchivedScenarioDataPlatform, action.data);
}

export function* getArchivedScenarioDataPlatform(data) {
  const cookies = new Cookies();
  const tenantID = cookies && cookies.get('tenantId');
  const findArchivePlatformUrl = generateAPI(config.library.closeoutgridMetadata, {tenantID});
  const response1 = yield call(service.api, 'get', findArchivePlatformUrl);
  const url = response1.data.api;
  try {
    const response = yield call(service.api, 'get', url);
    const { status, data } = response;

    const newData = data.rows.length > 0 ? data.rows.map(item=>{
      const metricsData= JSON.parse(item.metrics)
      return {...item, ...metricsData}
    }): []

    yield put({
      type: Actions.GET_ARCHIVED_SCENARIO_PLATFORM_SUCCESS,
      status: status,
      data: {rows:newData},
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.GET_ARCHIVED_SCENARIO_PLATFORM_FAIL,
      status: status,
      data: data,
    });
  }
}

// Post archived Scenario
export function* watchPostArchiveScenario() {
  yield takeLatest(
    Actions.POST_ARCHIVE_SCENARIO_INIT,
    callPostArchiveScenarioData
  );
}

export function* callPostArchiveScenarioData(action) {
  yield call(postArchiveScenarioData, action.data);
}

export function* postArchiveScenarioData(serviceData) {
  const url = config.library.archivedScenario;

  try {
    const response = yield call(service.api, 'post', url, serviceData);

    const { status, data } = response;

    yield put({
      type: Actions.POST_ARCHIVE_SCENARIO_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.POST_ARCHIVE_SCENARIO_FAIL,
      status: status,
      data: data,
    });
  }
}

export function* watchScenarioCard() {
  yield takeLatest(Actions.GET_SCENARIO_CARD_INIT, callGetScenarioCardData);
}

export function* callGetScenarioCardData(action) {
  yield call(getScenarioCardData, action.data);
}

export function* getScenarioCardData(serviceData) {
  const url = config.library.scenarioCard;

  try {
    const response = yield call(service.api, 'get', url, serviceData);

    const { status, data } = response;

    yield put({
      type: Actions.GET_SCENARIO_CARD_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.GET_SCENARIO_CARD_FAIL,
      status: status,
      data: data,
    });
  }
}

// Put Update Scenario
export function* watchPutUpdteScenarioData() {
  yield takeLatest(Actions.PUT_UPDATE_SCENARIO_INIT, callPutUpdateScenarioData);
}

export function* callPutUpdateScenarioData(action) {
  yield call(putUpdateScenarioData, action.data);
}

export function* putUpdateScenarioData(serviceData) {
  let updateScenarioUrl = config.library.updateScenario;

  if (serviceData.api) {
    updateScenarioUrl = serviceData.api;
    delete serviceData.api;
  }

  const url = generateAPI(updateScenarioUrl, serviceData);

  try {
    const response = yield call(service.api, 'put', url, serviceData);
    const { status, data } = response;

    yield put({
      type: Actions.PUT_UPDATE_SCENARIO_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.PUT_UPDATE_SCENARIO_FAIL,
      status: status,
      data: data,
    });
  }
}

export function* watchPutReactivateScenarioData() {
  yield takeLatest(
    Actions.PUT_REACTIVATE_SCENARIO_INIT,
    callPutReactivateScenarioData
  );
}

export function* callPutReactivateScenarioData(action) {
  yield call(putReactivateScenarioData, action.data);
}

export function* putReactivateScenarioData(serviceData) {
  const url = config.reporting.reactivateScenarios;
  try {
    const response = yield call(service.api, 'put', url, serviceData);
    const { status, data } = response;

    yield put({
      type: Actions.PUT_REACTIVATE_SCENARIO_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.PUT_REACTIVATE_SCENARIO_FAIL,
      status: status,
      data: data,
    });
  }
}

// discard archiveScenario
export function* watchPutDiscardArchivedScenarioData() {
  yield takeLatest(
    Actions.POST_DISCARD_ARCHIVED_SCENARIO_INIT,
    callPutDiscardArchivedScenarioData
  );
}

export function* callPutDiscardArchivedScenarioData(action) {
  yield call(putDiscardArchivedScenarioData, action.data);
}

export function* putDiscardArchivedScenarioData(serviceData) {
  const url = config.reporting.discardArchivedScenarios;
  try {
    const response = yield call(service.api, 'post', url, serviceData);
    const { status, data } = response;

    yield put({
      type: Actions.POST_DISCARD_ARCHIVED_SCENARIO_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.POST_DISCARD_ARCHIVED_SCENARIO_FAIL,
      status: status,
      data: data,
    });
  }
}

// Get Scenario Brand

export function* watchGetScenarioBrandData() {
  yield takeLatest(Actions.GET_SCENARIO_BRAND_INIT, callScenarioBrandData);
}

export function* callScenarioBrandData(action) {
  yield call(getScenarioBrandData, action.data);
}

export function* getScenarioBrandData(serviceData) {
  const url = generateAPI(config.library.brand, serviceData);
  try {
    const response = yield call(service.api, 'get', url);
    const { status, data } = response;

    yield put({
      type: Actions.GET_SCENARIO_BRAND_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.GET_SCENARIO_BRAND_FAIL,
      status: status,
      data: data,
    });
  }
}

// Get Buyers List
export function* watchBuyersList() {
  yield takeLatest(Actions.GET_LIST_BUYERS_INIT, callBuyersList);
}

export function* callBuyersList(action) {
  yield call(fetchBuyersList, action.data);
}
export function* fetchBuyersList(data) {
  const url = generateAPI(config.reporting.getBuyerName, data);

  try {
    const response = yield call(service.api, 'get', url);
    const { status, data } = response;

    yield put({
      type: Actions.GET_LIST_BUYERS_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response
      : { response: error.toString() };

    yield put({
      type: Actions.GET_LIST_BUYERS_FAILURE,
      status: status,
      data: data,
    });
  }
}

// Get Library Metadata
export function* watchLibraryMetadata() {
  yield takeLatest(Actions.GET_LIBRARY_METADATA_INIT, callLibraryMetadata);
}

export function* callLibraryMetadata(action) {
  yield call(fetchLibraryMetadata, action.data);
}

export function* fetchLibraryMetadata(data) {
  const url = generateAPI(config.library.libraryMetadata, data);
  try {
    const response = yield call(service.api, 'get', url);
    const { status, data } = response;

    yield put({
      type: Actions.GET_LIBRARY_METADATA_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;

    yield put({
      type: Actions.GET_LIBRARY_METADATA_FAIL,
      status: status,
      data: {},
    });
  }
}

// Get Scenario List Platform
export function* watchScenarioListPlatform() {
  yield takeLatest(
    Actions.GET_SCENARIO_LIST_PLATFORM_INIT,
    callScenarioListPlatform
  );
}

export function* callScenarioListPlatform(action) {
  yield call(fetchScenarioListPlatform, action.data);
}

export function* fetchScenarioListPlatform(data) {
  const url = data['api'];

  try {
    const response = yield call(service.api, 'get', url);
    const { status, data } = response;

    yield put({
      type: Actions.GET_SCENARIO_LIST_PLATFORM_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;

    yield put({
      type: Actions.GET_SCENARIO_LIST_PLATFORM_FAIL,
      status: status,
      data: {},
    });
  }
}


// Get Navigation Metadata
export function* watchNavigationMetadata() {
  yield takeLatest(Actions.GET_NAVIGATION_META_DATA_INIT, callNavigationMetadata);
}

export function* callNavigationMetadata(action) {
  yield call(fetchNavigationMetadata, action.data);
}

export function* fetchNavigationMetadata(data) {
  const url = generateAPI(config.platform.navigationMetadata, data);
  try {
    const response = yield call(service.api, 'get', url);
    const { status, data } = response;

    yield put({
      type: Actions.GET_NAVIGATION_META_DATA_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;

    yield put({
      type: Actions.GET_NAVIGATION_META_DATA_FAIL,
      status: status,
      data: {},
    });
  }
}

// Get Closeoutgrid Metadata
export function* watchCloseoutgridMetadata() {
  yield takeLatest(Actions.GET_CLOSEOUTGRID_META_DATA_INIT, callCloseoutgridMetadata);
}

export function* callCloseoutgridMetadata(action) {
  yield call(fetchCloseoutgridMetadata, action.data);
}

export function* fetchCloseoutgridMetadata(data) {
  const url = generateAPI(config.library.closeoutgridMetadata, data);
  try {
    const response = yield call(service.api, 'get', url);
    const { status, data } = response;
    yield put({
      type: Actions.GET_CLOSEOUTGRID_META_DATA_SUCCESS,
      status: status,
      data: data,
    });
  } catch (error) {
    const status = error.response ? error.response.status : 500;

    yield put({
      type: Actions.GET_CLOSEOUTGRID_META_DATA_FAIL,
      status: status,
      data: {},
    });
  }
}
