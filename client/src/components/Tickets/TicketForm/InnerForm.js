import React from 'react'
import {Field} from "react-final-form";
import InputField from "../../FormComponents/InputField"
import TextAreaField from "../../FormComponents/TextAreaField"
import Buttons from "../../FormComponents/Buttons"
import {required} from "../../../helpers/form/validation"

const InnerForm = ({handleSubmit, submitting, pristine, reset}) => (
  <form className="offers-page__ticket-form__inner" onSubmit={handleSubmit}>
    <Field
      name="tickets[order_id]"
      validate={required}
      render={({input, meta}) => <InputField input={input} meta={meta} label="ID Заказа"
                                             className="offers-page__ticket-form__inner__input-field"
                                             placeholder="ID Заказа"/>}
    />
    <Field
      name="tickets[order_sum]"
      validate={required}
      render={({input, meta}) => <InputField input={input} meta={meta} type="number" label="Сумма Заказа"
                                             className="offers-page__ticket-form__inner__input-field"
                                             placeholder="Сумма Заказа"/>}
    />
    <Field
      name="tickets[comment]"
      render={({input, meta}) => <TextAreaField input={input} meta={meta} label="Комментарии"
                                                className="offers-page__ticket-form__inner__input-field"
                                                placeholder="Комментарии"/>}
    />
    <Field name="tickets[offer_id]" render={() => null}/>
    <Field name="tickets[clicks]" render={() => null}/>
    <Buttons submitting={submitting} pristine={pristine} reset={reset}/>
  </form>
)

export default InnerForm
