import React from 'react';
import UISingleTab from '../../../../components/common/UISingleTab';

const AnchorFilter = (props) => {
  const { title, value, onChangeBrands, brandChoices } = props;
  const onChange = (val) => {
    const selectedBrand = brandChoices.filter((brand) => brand.label === val);

    onChangeBrands(selectedBrand[0]['value']);
  };

  return (
    <div>
      <UISingleTab
        label={title}
        value={value}
        onChange={val => onChange(val)}
        tabChoices={brandChoices.map((brand) => brand.label)}
      />
    </div>
  );
};

export default AnchorFilter;
