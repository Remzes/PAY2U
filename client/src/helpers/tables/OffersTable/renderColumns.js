import React from "react"
import {Link} from "react-router-dom"

export default [
  {
    title: 'ID', dataIndex: 'id', key: 'id'
  },
  {
    title: 'Имя', dataIndex: 'name', key: 'name',
    render: (name, record) => <Link key={record.id} to={`/offers/${record.id}`}>{name}</Link>
  }
]
