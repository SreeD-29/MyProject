import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import HeaderDetail from '../../containers/supplierperformance/Performance/HeaderDetail';

export class UICustomAgGridHeaderComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ascSort: 'inactive',
      descSort: 'inactive',
      noSort: 'inactive'
    };

    props.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
  }

  componentDidMount() {
    this.onSortChanged();
  }

  componentWillUnmount() {
    this.props.column.removeEventListener('sortChanged', this.onSortChanged);
  }

  onSortChanged() {
    this.setState({
      ascSort: this.props.column.isSortAscending() ? 'active' : 'inactive',
      descSort: this.props.column.isSortDescending() ? 'active' : 'inactive',
      noSort:
        !this.props.column.isSortAscending() &&
        !this.props.column.isSortDescending()
          ? 'active'
          : 'inactive'
    });
  }

  onSortRequested(order, event) {
    this.props.setSort(order, event.shiftKey);
  }

  setTooltipData(metricName, toolTipData) {
    const selectedMetric = toolTipData.filter((metric) => {
      return metric.columnName === metricName;
    });
    return selectedMetric.length > 0 ? selectedMetric[0] : {};
  }

  render() {
    const {
      enableSorting,
      enableToolTip,
      toolTipData,
      displayName
    } = this.props;
    const { ascSort, descSort } = this.state;
    let headContent = null;

    if (enableSorting) {
      let colSortingClass = ascSort || descSort ? 'sort-active' : '';
      let sortType = ascSort === 'active' ? 'desc' : 'asc';
      headContent = (
        <div className={clsx('ag-cost-col-header', colSortingClass)}>
          <div className="ag-cost-header-label">
            {enableToolTip ? (
              <HeaderDetail
                headerName={displayName}
                data={this.setTooltipData(
                  displayName,
                  toolTipData
                )}></HeaderDetail>
            ) : (
              displayName
            )}
          </div>
          <div className="ag-cost-sort-container">
            <div className={clsx('ag-cost-sort-asc', ascSort)}>
              <i
                className="fas fa-caret-up"
                onClick={this.onSortRequested.bind(this, sortType)}
                onTouchEnd={this.onSortRequested.bind(this, sortType)}
              />
            </div>
            <div className={clsx('ag-cost-sort-desc', descSort)}>
              <i
                className="fas fa-caret-down"
                onClick={this.onSortRequested.bind(this, sortType)}
                onTouchEnd={this.onSortRequested.bind(this, sortType)}
              />
            </div>
          </div>
        </div>
      );
    } else {
      headContent = (
        <div className="ag-cost-col-header">
          <div className="ag-cost-header-label">{displayName}</div>
        </div>
      );
    }

    return <Fragment>{headContent}</Fragment>;
  }

  /**
   * Default Props for Custom AgGrid Header Component
   */
  static defaultProps = {
    displayName: '',
    enableSorting: false,
    enableToolTip: false,
    toolTipData: [],
    column: {}
  };

  /**
   * Props Types used in Custom AgGrid Header Component
   */
  static propTypes = {
    displayName: PropTypes.string.isRequired,
    enableSorting: PropTypes.bool,
    enableToolTip: PropTypes.bool,
    setSort: PropTypes.func,
    toolTipData: PropTypes.array,
    column: PropTypes.object
  };
}

export default UICustomAgGridHeaderComp;
