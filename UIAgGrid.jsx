import React, { Component } from "react";

import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

class UIAgGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onRowSelected = () => {
    if (this.props.onRowSelected) {
      this.props.onRowSelected();
      return;
    }
    const rows = this.gridApi.getSelectedRows();
    if (this.props.selectedRows) {
      this.props.selectedRows(rows);
    }
  };

  setColumnVisible = () => {
    const { setColumnVisible } = this.props;
    setColumnVisible();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.api
    ) {
        if(prevProps.data !== this.props.data && this.props.setSelectedRows) {
          this.props.setSelectedRows(this.api);
        }
    }
  }
  onGridReady = params => {
    if (this.props.customOnGridReady) {
      this.props.customOnGridReady(params.api, params.columnApi);
    }
    this.api = params.api;
    if (this.props.onGridReady) {
      this.props.onGridReady(params);
      if(this.props.setSelectedRows){
      this.props.setSelectedRows(this.api);
    }
    }
    return (this.gridApi = params.api);
  };

  render() {
    const { headers, data, enablePagination, pageSize, autoGroupColumnDef, groupRowAgg, groupUseEntireRow , gridName, customRowClassRules } = this.props;
    const rootClassName = `ag-theme-material ag-grid-container ${gridName}`;
    return (
      <div className={rootClassName} id="agGrid">
        <AgGridReact
          onGridReady={this.onGridReady}
          onSortChanged={this.props.handleSortChange}
          suppressRowClickSelection={true}
          autoGroupColumnDef={autoGroupColumnDef}
          onRowSelected={this.onRowSelected}
          rowSelection="multiple"
          columnDefs={headers}
          rowData={data}
          groupUseEntireRow={groupUseEntireRow}
          groupRowAggNodes={groupRowAgg}
          groupSelectsChildren={true}
          rowClassRules={customRowClassRules}
          pagination={enablePagination}
          paginationPageSize={pageSize}
          setColumnVisible = {this.setColumnVisible}
          {...this.props}
        />
      </div>
    );
  }
}

UIAgGrid.defaultProps = {
  headers: [],
  data: [],
  enablePagination: false,
  pageSize: 0,
  gridName: "",
  handleSortChange: () => {}
};

UIAgGrid.propTypes = {
  gridName: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  enablePagination: PropTypes.bool,
  pageSize: PropTypes.number,
  selectedRows: PropTypes.func,
  handleSortChange: PropTypes.func
};
export default UIAgGrid;
