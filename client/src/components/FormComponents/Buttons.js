import React from "react";
import {Button} from 'antd'
import "./Buttons.scss"

const isChanged = (prevProps, nextProps) =>
  prevProps.submitting === nextProps.submitting &&
  prevProps.pristine === nextProps.pristine

export default React.memo(({submitting, pristine}) => (
  <div className="buttons">
    <Button type="primary" htmlType="submit" disabled={submitting || pristine}>
      Сохранить
    </Button>
  </div>
), isChanged)
