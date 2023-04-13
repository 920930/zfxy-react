import { useEffect, useState } from 'react'
import UserItem from '../../components/item/user'
import { InfiniteScroll } from 'antd-mobile'
import { IUser } from '@/typings'
import http from '@/utils/http'
import { size } from '@/utils/state'
import { useSearchParams } from 'react-router-dom'

export default () => {
  const [query] = useSearchParams();
  const adminerId = query.get('adminerId')
  
  const [users, setUsers] = useState<{count: number; rows: IUser[]}>({
    count: 0,
    rows: []
  })
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const loadMore = async () => getData()
  useEffect(() => getData(), [])
  
  const getData = () => {
    let url = `/user?page=${page}&size=${size}`
    adminerId && (url += `&adminerId=${adminerId}`)
    http.get<{count: number; rows: IUser[]}>(url).then(ret => {
      setHasMore(ret.rows.length >= size ? true : false)
      ret.rows.length >= size && setPage(page + 1)
      setUsers(({count, rows}) => {
        ret.rows.length && (rows = [...rows, ...ret.rows]);
        return {
          count,
          rows
        }
      })
    })
  }

  return (
    <>
      <ul className='my-3 px-3 text-base'>
        { users.rows.map(user => <UserItem key={user.id} user={user} />) }
      </ul>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={20} />
    </>
  )
}