import React from 'react';
import PropTypes from 'prop-types';
import {Select} from 'antd';
import styles from './index.less';

const Option = Select.Option;

class SelectBasic extends React.Component {
  handleFilter = (input, option) => {
    return (
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    );
  };

  handleChange = (...arg) => {
    const {onChange, onBeforeChange} = this.props;

    if (onBeforeChange && !onBeforeChange(...arg)) {
      return;
    }
    onChange && onChange(...arg);
  };

  render() {
    const {dataSource = [], value, ...rest} = this.props;

    const options = !dataSource
      ? []
      : dataSource.map((item, index) => {
          if (typeof item.value === 'number') {
            item.value = item.value.toString();
          }
          return (
            <Option
              key={item.value}
              value={item.value}
              title={item.name || item.text}
            >
              {item.name || item.text || item.label}
            </Option>
          );
        });

    let newValue = value;

    if (typeof value === 'number') {
      newValue = value.toString();
    }

    const selectProps = {
      filterOption: this.handleFilter,
      className: styles['select-basic'],
      placeholder: '请选择',
      value: newValue,
      ...rest,
      onChange: this.handleChange
    };

    return <Select {...selectProps}>{options}</Select>;
  }
}

SelectBasic.propTypes = {
  dataSource: PropTypes.array
};

export default SelectBasic;
