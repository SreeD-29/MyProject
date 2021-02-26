import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

export function filterListOfArray(a, b) {
  return a.filter(str => str && str.includes(b.toUpperCase()));
}

const UIBrandChips = (props) => {
  const { scenarioBrands, chipText } = props;
  const filteredScenarioBrands = scenarioBrands && scenarioBrands.filter(brand=>{
    return (brand !== "")
  })

   const [anchorEl, setAnchorEl] = React.useState(null);
   const [textValue, setTextValue] = React.useState("");

   const [filteredBrands,setFilteredBrands] = React.useState(null);

   const handleClick = (event) => {
    event.stopPropagation();
    setFilteredBrands(filteredScenarioBrands);
    setAnchorEl(event.currentTarget);
    };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
 const stopPropagation = event => {
  event.stopPropagation();
 }
const searchChange = (event) => {
    const value = event.target.value  || "";
    setFilteredBrands(filterListOfArray(filteredScenarioBrands,value));
    setTextValue(value);
  }
const open = Boolean(anchorEl);
const id = open ? 'ui-brands-popover' : undefined;

  return (  <span className="anchor-select based-select small chip-style scenario-menu-container">
      {filteredScenarioBrands && filteredScenarioBrands.length > 0 && (
        <span className="chip-style-container">
          <Button
            aria-controls={id}
            aria-haspopup="true"
            onClick={handleClick} className="btn-ui-brands-popover">
            {`${chipText} (${filteredScenarioBrands.length})`}
            <ArrowDropDownIcon />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            className="ui-brands-popover"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
         { open && <div className="scenario-menuitem-container" onClick={stopPropagation}>
         <TextField
            name="searchSide"
            value={textValue}
            fullWidth={true}
            margin="dense"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <button type="button" className="MuiButtonBase-root closebtn" onClick={searchChange}>
                   {textValue && textValue.length > 0 && <CloseIcon />}
                </button>
              )
            }}
            onChange={searchChange}
            />
          <ul
            className="MuiList-root MuiMenu-list MuiList-padding"
            role="menu"
            tabIndex="-1">
            {filteredBrands && filteredBrands.map((option, i) => (
            <li
              key={i}
              className="MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button"
              tabIndex="-1"
              role="menuitem"
              aria-disabled="false">
              <Typography variant="inherit" noWrap>{option}</Typography>
              <span className="MuiTouchRipple-root"></span>
            </li>
            ))}
          </ul>
          </div>}
        </Popover>
        </span>
      )}
    </span>
  );
};

UIBrandChips.defaultProps = {
  chipText: 'Brands'
};

UIBrandChips.propTypes = {
  chipText: PropTypes.string,
  scenarioBrands: PropTypes.array.isRequired
};

export default UIBrandChips;
