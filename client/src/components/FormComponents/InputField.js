import {Input, Tag} from "antd";
import React from "react";
import _ from 'lodash'

const areChanged = (prevProps, nextProps) =>
  _.isEqual(prevProps.input, nextProps.input) &&
  _.isEqual(prevProps.meta, nextProps.meta)

export default React.memo(({input, meta, label, placeholder, type = "text", className}) => (
  <div className={className}>
    <label>{label}</label>
    <Input {...input} type={type} placeholder={placeholder}/>
    {meta.error && meta.touched && <Tag color="red" style={{marginTop: "5px"}}>{meta.error}</Tag>}
  </div>
), areChanged)
