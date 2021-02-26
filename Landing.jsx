// @ts-nocheck
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Map as ImmutableMap } from 'immutable';
import Cookies from 'universal-cookie';
import { TitleComponent } from '../../../../components/common/DynamicTitleComponent';
import { RdsCompetitorSelector } from './RdsCompetitorSelector';
import _ from 'lodash';
import clsx from 'clsx';
import { featureFlagValueHelperRedux } from '../../../../modules/utilities';
import * as ApplicationConstants from '../../../../constants/application';
import mixPanelEvent from '../../../../constants/mixpanel-session';

import {
  getReviewAskAction,
  getReviewAskItemsAction,
  getReviewAskExportAction,
  getPlatformUserPreferenceAction,
  savePlatformUserPreferenceAction,
  saveAnchorPlatformSummaryAction,
  updateAnchorSummary,
  getPlatformAnchorLayoutData,
  getPlatformTableData,
  clearPlatformTableData,
  savePlatformSupplierFinancialsAction,
  PostUpdateCustomValue,
  getAssumedProfitRateAction,
  getRdsCompetitorsDataAction,
} from '../../../../redux/actions/negotiations/anchor-action';
import {
  getDNPDataAction,
  clearDnpStore,
  getDNPDownloadAction,
} from '../../../../redux/actions/supplierperformance/supplier-profile-action';

import { Mixpanel } from '../../../../Mixpanel';

import AnchorSectionTemplate from '../../../../containers/negotiations/Anchor/Platform/AnchorSectionTemplate';
import AnchorOmniSummaryTemplate from '../../../../containers/negotiations/Anchor/Platform/AnchorOmniSummaryTemplate';

import { convertLabelElement } from './AnchorUlitilies';

const customMarginAskPercObj = {
  DEADNETPROFIT: 'customDnpPerc',
  SPACEPROFITABILITY: 'customSpPerc',
  IMU: 'customImuPerc',
};

// mapping for margin ask
const mappingInputToState = {
  customDeadNetProfitValue: 'DEADNETPROFIT',
  customSpaceProfitabilityValue: 'SPACEPROFITABILITY',
  customImuValue: 'IMU',
};

const mappingStateToCell = {
  DEADNETPROFIT: 'customDeadNetProfit',
  SPACEPROFITABILITY: 'customSpaceProfitability',
  IMU: 'customImu',
};

const piMappingStateToCell = {
  customPriceInvestmentPercent: 'customAssumedProfit',
};

const brandTypesObj = [
  "All",
  "National",
  "Private"
]

const cookies = new Cookies();

export class AnchorOmni extends Component {
  customMarginKeyEntered = null;

  constructor(props) {
    super(props);
    this.state = this.transformIncomingProps(props);
  }

  transformIncomingProps = (props) => {
    return {
      initialData: {
        scenarioId: props.scenarioListId,
        pageID: 'anchor',
        tenantID: cookies.get('tenantId'),
        viewName: `Anchor_${
          props.scenarioDetails ? props.scenarioDetails.id : null
        }`,
      },
      isDnpOpen: false,
      privateBrand: 1,
      expandAll: false,
      targetDataSource: 1,
      targetDefaultDataSource: 1,
    };
  };

  updateTargetDataSource = (source) => {
    this.setState({ targetDataSource: source });
    if (source === 2) {
      this.updateState('isRdsOpen', true);
      const api = this.props.platformAnchorLayoutData.getIn(
        ['data', 'modals', 'rds', 'breakdownTable', 'api', 'rdsCompetitor'],
        ''
      );
      const reqPayload = {
        api,
      };
      this.props.getRdsCompetitorsData(reqPayload);
    }
  };

  getDefaultPricingDataSource = () => {
    let defaultPricingDataSource = 0;
    const scenarioDetails = this.props.scenarioDetails;
    if (scenarioDetails && scenarioDetails.hierarchy) {
      const sbuValue =
        (scenarioDetails.hierarchy[0].h0 &&
          scenarioDetails.hierarchy[0].h0[0] &&
          scenarioDetails.hierarchy[0].h0[0].value) ||
        '';
      const neilsenArray = ['FOOD', 'CONSUMABLES'];
      if (neilsenArray.indexOf(sbuValue) === -1) {
        defaultPricingDataSource = 1;
      }
    }
    this.updateTargetDataSource(defaultPricingDataSource);
    this.setState({ targetDefaultDataSource: defaultPricingDataSource });
  };

  componentDidMount() {
    Mixpanel.track(mixPanelEvent.ANCHOR_PAGE_SESSION);
    window.addEventListener('unload', () => {
      Mixpanel.time(mixPanelEvent.ANCHOR_PAGE_SESSION);
    });
    this.props.getPlatformAnchorLayoutData(this.state.initialData);
    this.getDefaultPricingDataSource();
  }

  autoSaveAnchorPreferences = () => {
    const { viewName } = this.state.initialData;
    const preferenceFields = this.props.platformAnchorLayoutData.getIn(
      ['data', 'userPreferenceKeys'],
      []
    );
    let preferenceObj = {};
    preferenceFields.forEach((key) => {
      preferenceObj[key] = this.state[key];
    });
    let reqBody = {
      id: this.state['preferenceId'],
      viewName: viewName,
      preferenceName: 'last_viewed',
      isDefault: 'N',
      preference: JSON.stringify(preferenceObj),
    };
    this.props.savePlatformUserPreference(reqBody);
  };

  checkAnchorPlatformSummaryData = (prevprops) => {
    if (
      prevprops.savedAnchorPlatformSummary !==
      this.props.savedAnchorPlatformSummary
    ) {
      const initialized = this.props.savedAnchorPlatformSummary.get(
        ApplicationConstants.PROP_INITIALIZED,
        false
      );
      if (initialized) {
        const summaryData = this.props.savedAnchorPlatformSummary
          .get(ApplicationConstants.PROP_DATA, ImmutableMap({}))
          .toJS();
        this.setState({
          summaryData: { ...summaryData },
        });
      }
    }
  };

  checkAnchorPlatformSupplierFinancialsData = (prevprops, summary) => {
    if (
      prevprops.platformSupplierFinancials !==
      this.props.platformSupplierFinancials
    ) {
      let index = 1;
      for(index; index < summary.length; index++) {
        const financialId = summary[index].financialSection.id;
        const initialized = this.props.platformSupplierFinancials.getIn(
          [financialId, 'fetching'],
          true
        );
        if (!initialized) {
          const supplierFinancialsData = this.props.platformSupplierFinancials
          .getIn([financialId, 'data'], {});
          this.setState({
            [financialId]: { ...supplierFinancialsData },
          });
        }
      }
    }
  };

  checkCustomMarginAsk = (prevProps) => {
    if (prevProps.updateCustomMarginAsk !== this.props.updateCustomMarginAsk) {
      const updateCustomValueInit = this.props.updateCustomMarginAsk.get(
        ApplicationConstants.PROP_INITIALIZED,
        false
      );
      const updateCustomValueService = this.props.updateCustomMarginAsk.getIn(
        [ApplicationConstants.PROP_OTHER, 'key'],
        ''
      );
      const updateCustomValueData = this.props.updateCustomMarginAsk.get(
        updateCustomValueService,
        0
      );
      if (updateCustomValueInit) {
        this.updateState(
          mappingStateToCell[mappingInputToState[updateCustomValueService]],
          updateCustomValueData
        );
      }
    }
  };

  checkAssumedProfitRate = (prevProps) => {
    if (
      prevProps.piCustAssumedProfitRate !== this.props.piCustAssumedProfitRate
    ) {
      const updateCustomValueInit = this.props.piCustAssumedProfitRate.get(
        ApplicationConstants.PROP_INITIALIZED,
        false
      );
      const updateCustomPercentKey = this.props.piCustAssumedProfitRate.getIn(
        [ApplicationConstants.PROP_OTHER, 'key'],
        ''
      );
      const updateCustomValueData = this.props.piCustAssumedProfitRate.get(
        ApplicationConstants.PROP_DATA,
        0
      );
      if (updateCustomValueInit) {
        this.updateState(
          piMappingStateToCell[updateCustomPercentKey],
          updateCustomValueData
        );
      }
    }
  };

  hierarchyPayloadObjProducerUsingFields = (fields, payloadMapping) => {
    const requestObj = {};
    requestObj['hierarchy'] = this.props.scenarioDetails && this.props.scenarioDetails.hierarchy
        ? this.props.scenarioDetails.hierarchy
        : [];
    for (const field in fields) {
      if (field === 'brandType') {
          requestObj[field] = brandTypesObj[this.state[fields[field]]];
          requestObj['piWeeks'] = 'LAST52WEEKS';
      } else if (typeof fields[field] === 'object' && fields[field] !== null) {
        const fieldObject = fields[field];
        let tempObj = {};
        for (const key in fieldObject) {
          tempObj[key] = this.state[fieldObject[key]];
        }
        requestObj[field] = tempObj;
      } else {
        requestObj[field] =
          payloadMapping[this.state[fields[field]]] ||
          this.state[fields[field]];
      }
    }
    return requestObj;
  };

  payloadObjProducerUsingFields = (fields, payloadMapping) => {
    const requestObj = {};
    requestObj['id'] = this.props.scenarioDetails
      ? this.props.scenarioDetails.id
      : null;
    requestObj['type'] = 'WMT';
    for (const field in fields) {
      if (field === 'brandType') {
        requestObj[field] = brandTypesObj[this.state[fields[field]]];
      } else {
        requestObj[field] =
          payloadMapping[this.state[fields[field]]] ||
          this.state[fields[field]];
      }
    }
    return requestObj;
  };

  updateTable = (api, id) => {
    const fields = this.props.platformAnchorLayoutData.getIn([
      'data',
      'requestBodyFields',
    ]);

    const payloadMapping = this.props.platformAnchorLayoutData.getIn(
      ['data', 'payloadMapping'],
      {}
    );

    const requestBody = {
      url: api,
    };

    const body = this.hierarchyPayloadObjProducerUsingFields(
      fields,
      payloadMapping
    );
    if (this.state['priceGapCustPercent']) {
      body['pgPercentage'] = this.state['priceGapCustPercent'];
    }

    requestBody['body'] = body;
    requestBody['key'] = id;
    this.props.getPlatformTableData(requestBody);
  };

  updateCustValue = (api, id, maPercent) => {
    const fields = this.props.platformAnchorLayoutData.getIn([
      'data',
      'requestBodyFields',
    ]);

    const payloadMapping = this.props.platformAnchorLayoutData.getIn(
      ['data', 'payloadMapping'],
      {}
    );

    const requestBody = {
      url: api,
    };

    const body = this.hierarchyPayloadObjProducerUsingFields(
      fields,
      payloadMapping
    );

    if (mappingInputToState[id]) {
      body['marginAskOn'] = mappingInputToState[id];
      body['maPercentage'] = maPercent;
      requestBody['body'] = body;
      requestBody['key'] = id;
      this.props.PostUpdateCustomValue(requestBody);
    } else {
      requestBody['body'] = body;
      requestBody['key'] = id;
      this.props.getAssumedProfitRateAction(requestBody);
    }
  };

  initialTablesLoad = () => {
    const fields = this.props.platformAnchorLayoutData.getIn(
      ['data', 'requestBodyFields'],
      {}
    );

    const payloadMapping = this.props.platformAnchorLayoutData.getIn(
      ['data', 'payloadMapping'],
      {}
    );

    const sectionLength = this.props.platformAnchorLayoutData && this.props.platformAnchorLayoutData.getIn(['data', 'sections']).length || 0;
    let index = 0;
    for (index; index < sectionLength; index++) {
      this.props.platformAnchorLayoutData
      .getIn(['data', 'sections', index, 'askTables'], [])
      .forEach((table) => {
        const requestBody = {
          url: table.api,
        };
        const body = this.hierarchyPayloadObjProducerUsingFields(
          fields,
          payloadMapping
        );
        if (this.state['priceGapCustPercent']) {
          body['pgPercentage'] = this.state['priceGapCustPercent'];
        }
        requestBody['body'] = body;
        requestBody['key'] = table.id;
        this.props.getPlatformTableData(requestBody);
      });
    }
  };

  fetchSummary = (hierarchyPayload, payload, summary) => {
    let summaryData = { data: hierarchyPayload };
    summaryData['api'] = summary.length ? summary[0].summarySection.api : '';
    this.props.saveAnchorPlatformSummary(summaryData);
    this.props.updateAnchorSummary(payload);
  };

  fetchSupplierFinancials = (payload, summary) => {
    let index = 1;
    for(index; index < summary.length; index++) {
      let supplierFinancialsData = { data: payload };
      supplierFinancialsData['api'] = summary.length
        ? summary[index].financialSection.api
        : '';
      supplierFinancialsData['id'] = summary[index].financialSection.id;
      this.props.savePlatformAnchorSupplierFinancials(supplierFinancialsData);
    }
  };

  fetchReviewAsk = (payload) => {
    const reviewAskData = {
      ...payload,
      api: this.props.platformAnchorLayoutData.getIn(
        ['data', 'sections', 2, 'breakdownTable', 'api', 'reviewAsk'],
        ''
      ),
    };
    if (reviewAskData.api) {
      this.props.getReviewAskData(reviewAskData);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { platformAnchorLayoutData } = this.props;

    // Anchor Summary
    const summary = this.props.platformAnchorLayoutData.getIn(
      ['data', 'summary'],
      []
    );

    const fields = this.props.platformAnchorLayoutData.getIn(
      ['data', 'requestBodyFields'],
      {}
    );

    const payloadMapping = this.props.platformAnchorLayoutData.getIn(
      ['data', 'payloadMapping'],
      {}
    );

    const requestObj2 = this.hierarchyPayloadObjProducerUsingFields(
      fields,
      payloadMapping
    );
    const updateRequestObj2 = this.payloadObjProducerUsingFields(
      fields,
      payloadMapping
    );

    const initializedAnchorPlatformUserPreference = this.props.anchorPlatformUserPreference.get(
      ApplicationConstants.PROP_INITIALIZED,
      false
    );

    const marginAskBasedOn = this.state['marginAskBasedOn'];
    const supplierTo = this.state['supplierTo'];

    let selectedCustomMarginAskPerc = null;
    if (supplierTo === 'CUSTOMVALUE') {
      selectedCustomMarginAskPerc = this.state[
        customMarginAskPercObj[marginAskBasedOn]
      ];
    }

    // fetch user preference
    if (
      !_.isEqual(
        platformAnchorLayoutData,
        prevProps.platformAnchorLayoutData
      ) &&
      platformAnchorLayoutData.get('initialized', false)
    ) {
      this.props.getPlatformUserPreference(this.state.initialData);
    }

    // check for payload state change and make api call
    if (initializedAnchorPlatformUserPreference) {
      for (const field in fields) {
        let checkboxChanged = false;
        if(typeof fields[field] === 'object' && fields[field] !== null) {
          const fieldObject = fields[field];
          for (const key in fieldObject) {
            if (this.state[fieldObject[key]] !== prevState[fieldObject[key]]){
              checkboxChanged = true;
            }
          }
        }
        if (this.state[fields[field]] !== prevState[fields[field]] || checkboxChanged) {
          if (
            fields[field] === 'customPriceInvestmentPercent' &&
            this.state['priceInvestmentOn'] !== 'assumedProfitRate'
          ) {
            break;
          }
          this.fetchSummary(requestObj2, updateRequestObj2, summary);
          if (!checkboxChanged) this.fetchSupplierFinancials(requestObj2, summary);
          this.fetchReviewAsk(requestObj2);
          break;
        }
      }
    }

    // Check for Brand change and update all tables & review Ask data
    if (
      initializedAnchorPlatformUserPreference &&
      this.state['privateBrand'] !== prevState['privateBrand']
    ) {
      const sectionLength = this.props.platformAnchorLayoutData && this.props.platformAnchorLayoutData.getIn(['data', 'sections']).length || 0;
      let index = 0;
      for (index; index < sectionLength; index++) {
        platformAnchorLayoutData
        .getIn(['data', 'sections', index, 'askTables'], [])
        .forEach((table) => {
          const requestBody = {
            url: table.api,
          };
          const body = this.hierarchyPayloadObjProducerUsingFields(
            fields,
            payloadMapping
          );
          if (this.state['priceGapCustPercent']) {
            body['pgPercentage'] = this.state['priceGapCustPercent'];
          }
          requestBody['body'] = body;
          requestBody['key'] = table.id;
          if (this.props.anchorTableData.getIn([requestBody['key']], '')) {
            this.props.getPlatformTableData(requestBody);
          }
        });
      }
    }

    // update pg table with custom percent change
    if (
      this.state['priceGapCustPercent'] !== prevState['priceGapCustPercent'] &&
      !prevState['priceGapCustPercent']
    ) {
      platformAnchorLayoutData
        .getIn(['data', 'sections', 0, 'askTables'], [])
        .forEach((table) => {
          if (
            table.id === 'priceGapTable' &&
            this.state['priceGapCustPercent']
          ) {
            this.updateTable(table.api, table.id);
          }
        });
    }

    const preferencefields = this.props.platformAnchorLayoutData.getIn(
      ['data', 'userPreferenceKeys'],
      {}
    );

    // update user preference
    if (initializedAnchorPlatformUserPreference) {
      for (const prefField in preferencefields) {
        if (
          this.state[preferencefields[prefField]] !==
          prevState[preferencefields[prefField]]
        ) {
          this.autoSaveAnchorPreferences();
          break;
        }
      }
    }

    // set preferenceId
    if (
      !_.isEqual(
        prevProps.savedAnchorPlatformUserPreference,
        this.props.savedAnchorPlatformUserPreference
      )
    ) {
      const initialized = this.props.savedAnchorPlatformUserPreference.get(
        ApplicationConstants.PROP_INITIALIZED,
        false
      );
      if (initialized) {
        const savedData = this.props.savedAnchorPlatformUserPreference
          .get(ApplicationConstants.PROP_DATA, ImmutableMap({}))
          .toJS();
        if (savedData && savedData.id) {
          this.setState({ preferenceId: savedData.id });
        }
      }
    }

    if (
      !_.isEqual(
        prevProps.anchorPlatformUserPreference,
        this.props.anchorPlatformUserPreference
      )
    ) {
      const initialized = this.props.anchorPlatformUserPreference.get(
        ApplicationConstants.PROP_INITIALIZED,
        false
      );
      if (initialized) {
        const savedData = this.props.anchorPlatformUserPreference
          .get(ApplicationConstants.PROP_DATA, ImmutableMap({}))
          .toJS();
          if (savedData.preference) {
            let pref = JSON.parse(savedData.preference);
            if (!pref.priceGapCustPercent) {
              pref.priceGapCustPercent=10;
            }
            savedData.preference = JSON.stringify(pref);
          }
        if (savedData && savedData.id && savedData.preference) {
          let preference = JSON.parse(savedData.preference);
          this.setState(
            (prevState) => {
              return {
                preferenceId: savedData.id,
                firstAsk: [undefined, undefined, undefined].fill(
                  preference.expandAll
                ),
                ...preference,
              };
            },
            () => {
              this.initialTablesLoad();
            }
          );
        } else {
          this.initialTablesLoad();
          this.fetchSummary(requestObj2, updateRequestObj2, summary);
          this.fetchSupplierFinancials(requestObj2, summary);
          this.fetchReviewAsk(requestObj2);
        }
      }
    }

    // Updata State
    this.checkAnchorPlatformSummaryData(prevProps);
    this.checkAnchorPlatformSupplierFinancialsData(prevProps, summary);
    this.checkCustomMarginAsk(prevProps);
    this.checkAssumedProfitRate(prevProps);
  }

  componentWillUnmount() {
    Mixpanel.time(mixPanelEvent.ANCHOR_PAGE_SESSION);
    this.props.clearPlatformTableData();
  }

  updateState = (key, value) => {
    if (this.state[key] !== value) {
      this.setState({ [key]: value });
    }
  };

  reviewAskItemCallback = (type, param) => {
    const fields = this.props.platformAnchorLayoutData.getIn(
      ['data', 'requestBodyFields'],
      {}
    );

    const payloadMapping = this.props.platformAnchorLayoutData.getIn(
      ['data', 'payloadMapping'],
      {}
    );

    const requestObj = this.hierarchyPayloadObjProducerUsingFields(
      fields,
      payloadMapping
    );

    if (type === 'items' && param) {
      const data = {
        ...requestObj,
        description: param,
        api: this.props.platformAnchorLayoutData.getIn(
          ['data', 'sections', 2, 'breakdownTable', 'api', 'reviewAskItem'],
          ''
        ),
      };

      this.props.getReviewAskItemsData(data);
    } else if (type === 'export' && param) {
      const data = {
        ...requestObj,
        fileType: param,
        api: this.props.platformAnchorLayoutData.getIn(
          ['data', 'sections', 2, 'breakdownTable', 'api', 'reviewAskExport'],
          ''
        ),
      };

      this.props.getReviewAskExportData(data);
    }
  };

  handleAccordionButtonClick = () => {
    this.setState((prevState) => {
      const expandAll = !prevState.expandAll;

      return {
        expandAll: expandAll,
        firstAsk: [undefined, undefined, undefined].fill(expandAll),
      };
    });
  };

  render() {
    const fetching = this.props.platformAnchorLayoutData.get(
      ApplicationConstants.PROP_FETCHING,
      false
    );
    const newtitle = this.props.scenarioDetails
      ? this.props.scenarioDetails.scenarioTitle
      : '';

    const sectionList = this.props.platformAnchorLayoutData.getIn(
      ['data', 'sections'],
      []
    );
    const title = this.props.platformAnchorLayoutData.getIn(
      ['data', 'pageTitle'],
      ''
    );

    // Summary
    const summary = this.props.platformAnchorLayoutData.getIn(
      ['data', 'summary'],
      []
    );
    const summaryFetching = this.props.savedAnchorPlatformSummary.get(
      ApplicationConstants.PROP_FETCHING,
      false
    );
    const summaryError = this.props.savedAnchorPlatformSummary.get(
      ApplicationConstants.PROP_ERROR,
      false
    );
    // Feature Flags
    const flags = this.props.featureFlag
      .get(ApplicationConstants.PROP_DATA, ImmutableMap({}))
      .toJS();
    const anchorRDSFlag = featureFlagValueHelperRedux(flags, 'anchor_rds');

    return (
      <div className='MuiGrid-container'>
        <div className='MuiGrid-item MuiGrid-grid-md-8'>
          <div className='scenario-details-container anchor-container omni'>
            <TitleComponent title={`${newtitle} – Anchor – Negotiation`} />
            <div
              className={clsx(
                fetching && 'anchor-skeleton-text',
                'spacing-below-title'
              )}
            >
              <h1>{convertLabelElement(title)}</h1>
            </div>
            {sectionList &&
              sectionList.map((section) => {
                return (
                  <AnchorSectionTemplate
                    updateTable={this.updateTable}
                    updateCustValue={this.updateCustValue}
                    state={this.state}
                    fetching={fetching}
                    updateState={this.updateState}
                    sectionData={section}
                    tableData={this.props.anchorTableData}
                    handleAccordionButtonClick={this.handleAccordionButtonClick}
                    toolTips={this.props.platformAnchorLayoutData.getIn(
                      ['data', 'toolTips'],
                      {}
                    )}
                    customMarginAsk={this.props.updateCustomMarginAsk}
                    piCustAssumedProfitRate={this.props.piCustAssumedProfitRate}
                    reviewAsk={this.props.reviewAsk}
                    reviewAskItemCallback={this.reviewAskItemCallback}
                    reviewAskItems={this.props.reviewAskItems}
                    reviewAskExportData={this.props.reviewAskExportData}
                    dnpDownload={this.props.dnpDownload}
                    scenarioDetails={this.props.scenarioDetails}
                    getDNPData={this.props.getDNPData}
                    clearDnpStore={this.props.clearDnpStore}
                    dnpDetail={this.props.dnpDetail}
                    getDNPDownload={this.props.getDNPDownload}
                    anchorProps={this.props}
                    anchorRDSFlag={anchorRDSFlag}
                    updateTargetDataSource={this.updateTargetDataSource}
                    enableTreeData={false}
                  />
                );
              })}
          </div>
        </div>
        <div className='MuiGrid-item MuiGrid-grid-md-4'>
          <div className='summary-container anchor-container omni-summary'>
            <AnchorOmniSummaryTemplate
              state={this.state}
              fetching={summaryFetching}
              error={summaryError}
              summaryTitle={(summary.length && summary[0].summarySection.summaryTitle) || ''}
              anchorSummaryData={this.state['summaryData'] || {}}
              supplierFinancialsData={this.state['storesFinancials'] || []}
              ecommSupplierFinancialsData={this.state['ecommFinancials'] || []}
              supplierFinancialsTitle={
                (summary.length && summary[1].financialSection.label) || ''
              }
              supplierFinancialsEcommTitle={
                (summary.length && summary[2].financialSection.label) || ''
              }
              toolTips={this.props.platformAnchorLayoutData.getIn(
                ['data', 'toolTips'],
                {}
              )}
            />
          </div>
        </div>
        <Fragment>
          {this.state['isRdsOpen'] && anchorRDSFlag && (
            <RdsCompetitorSelector
              state={this.state}
              updateState={this.updateState}
              anchorProps={this.props}
            />
          )}
        </Fragment>
      </div>
    );
  }
}

export const mapStateToProps = (store) => {
  return {
    reviewAsk: store.AnchorReducer.reviewAsk,
    reviewAskItems: store.AnchorReducer.reviewAskItems,
    reviewAskExportData: store.AnchorReducer.reviewAskExportData,
    featureFlag: store.CommonReducer.featureFlag,
    scenarioDetails: store.negotiationReducer.scenariosData.scenario,
    anchorPlatformUserPreference:
      store.AnchorReducer.anchorPlatformUserPreference,
    savedAnchorPlatformUserPreference:
      store.AnchorReducer.anchorSavedPlatformUserPreference,
    savedAnchorPlatformSummary: store.AnchorReducer.AnchorPlatformSummary,
    platformAnchorLayoutData: store.AnchorReducer.getPlatformAnchorLayoutData,
    anchorTableData: store.AnchorReducer.anchorTableData,
    platformSupplierFinancials:
      store.AnchorReducer.AnchorPlatformSupplierFinancials,
    updateCustomMarginAsk: store.AnchorReducer.updateCustomValue,
    piCustAssumedProfitRate: store.AnchorReducer.assumedProfitRate,
    dnpDetail: store.SupplierProfileReducer.supplierDNPDrilldownData,
    dnpDownload: store.SupplierProfileReducer.supplierDNPDownload,
    rdsCompetitors: store.AnchorReducer.rdsCompetitors,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getReviewAskData: (data) => {
      dispatch(getReviewAskAction(data));
    },
    getReviewAskItemsData: (data) => {
      dispatch(getReviewAskItemsAction(data));
    },
    getReviewAskExportData: (data) => {
      dispatch(getReviewAskExportAction(data));
    },
    // anchor plarform apis
    getPlatformUserPreference: (data) => {
      dispatch(getPlatformUserPreferenceAction(data));
    },
    savePlatformUserPreference: (data) => {
      dispatch(savePlatformUserPreferenceAction(data));
    },
    saveAnchorPlatformSummary: (data) => {
      dispatch(saveAnchorPlatformSummaryAction(data));
    },
    updateAnchorSummary: (data) => {
      dispatch(updateAnchorSummary(data));
    },
    getPlatformAnchorLayoutData: (data) => {
      dispatch(getPlatformAnchorLayoutData(data));
    },
    getPlatformTableData: (data) => {
      dispatch(getPlatformTableData(data));
    },
    clearPlatformTableData: () => {
      dispatch(clearPlatformTableData());
    },
    savePlatformAnchorSupplierFinancials: (data) => {
      dispatch(savePlatformSupplierFinancialsAction(data));
    },
    PostUpdateCustomValue: (data) => {
      dispatch(PostUpdateCustomValue(data));
    },
    getAssumedProfitRateAction: (data) => {
      dispatch(getAssumedProfitRateAction(data));
    },
    getDNPData: (data) => {
      dispatch(getDNPDataAction(data));
    },
    clearDnpStore: (data) => {
      dispatch(clearDnpStore(data));
    },
    getDNPDownload: (data) => {
      dispatch(getDNPDownloadAction(data));
    },
    getRdsCompetitorsData: (data) => {
      dispatch(getRdsCompetitorsDataAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnchorOmni);
