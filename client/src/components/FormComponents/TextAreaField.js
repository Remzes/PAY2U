import {Input, Tag} from "antd";
import React from "react";
import _ from "lodash";
const {TextArea} = Input

const isChanged = (prevProps, nextProps) =>
  _.isEqual(prevProps.input, nextProps.input) &&
  _.isEqual(prevProps.meta, nextProps.meta)

export default React.memo(({input, meta, label, placeholder, type="text", className}) => (
  <div className={className}>
    <label>{label}</label>
    <TextArea {...input} type={type} autosize={{ minRows: 2, maxRows: 6 }} placeholder={placeholder}/>
    {meta.error && meta.touched && <Tag color="red">{meta.error}</Tag>}
  </div>
), isChanged)
