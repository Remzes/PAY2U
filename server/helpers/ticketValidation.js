export default ticket => {
  const errors = {}
  let isValid = true

  if (!ticket.offer_id) {
    errors.offer_id = "ID Предложения не определено"
    isValid = false
  }
  if (!ticket.order_id) {
    errors.order_id = "ID Закана не определено"
    isValid = false
  }
  if (!ticket.order_sum) {
    errors.order_sum = "Сумма Заказа не определена"
    isValid = false
  }
  if (!ticket.clicks) {
    errors.clicks = "Нужно выбрать хотя бы один клик"
    isValid = false
  }

  return { errors, isValid }
}
