import React from "react";
import PropTypes from "prop-types";

import UISelectField from "../../../../components/common/UISelectField";

const AnchorDropdown = (props) => {
  const {
    className,
    name,
    options,
    defaultOption,
    fetching,
    callBack,
  } = props;

  return (
        <UISelectField
          type="dropDown"
          name={name}
          defaultValue={defaultOption}
          fullWidth={false}
          className={className}
          fetching={fetching}
          choices={options}
          callBack={callBack}
        />
  );
};

AnchorDropdown.defaultProps = {
  name: "selectField",
  className: null,
  choices: [],
  defaultValue: "",
  fullWidth: true,
};

AnchorDropdown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    })
  ).isRequired,
  defaultOption: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fetching: PropTypes.bool,
  fullWidth: PropTypes.bool,
  callBack: PropTypes.func,
};

export default AnchorDropdown;
