export default update => ({
  onChange: (selectedRowKeys, selectedRows) => {
    // Сериализация на бекенде будет кушать RAM, поэтому делаем тут
    update(JSON.stringify([...selectedRows].map(r => r.hash)))
  },
})
