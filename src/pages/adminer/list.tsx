import { RightOutline } from 'antd-mobile-icons'
import { Avatar, Button, InfiniteScroll, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import http from '@/utils/http';
import { size } from '@/utils/state';
import { IAdminer } from '@/typings';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/typings';

const list = () => {
  const navigate = useNavigate();
  // 当前登录用户
  const me = useSelector((state: RootState) => state.userReducer.user)

  const [admienrs, setAdminers] = useState<{count: number; rows: IAdminer[]}>({count: 0, rows: []});
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const loadMore = async () => getAdminers()
  useEffect(() => getAdminers(), [])

  const getAdminers = () => {
    http.get<{count: number; rows: IAdminer[]}>(`/adminer?page=${page}&size=${size}`).then(ret => {
      setHasMore(ret.rows.length >= size ? true : false)
      ret.rows.length >= size && setPage(page + 1)
      setAdminers(({count, rows}) => {
        ret.rows.length && (rows = [...rows, ...ret.rows]);
        return {
          count,
          rows
        }
      })
    })
  }

  const editFn = (id: number, roleId: number) => {
    if(roleId <= me.roleId) {
      return Toast.show({
        content: '权限不足',
      })
    }
    navigate(`/adminer/${id}/edit`)
  }
  return (
    <>
      <ul className='px-3 pt-3 space-y-3'>
        {
          admienrs?.rows.map(adminer => (
            <li className='bg-gray-100 flex p-2 items-center text-base rounded-md' key={adminer.id}>
              <div className='order-1 flex-1 ml-2 text-gray-700' onClick={() => navigate(`/adminer/${adminer.id}`)}>
                <span className={`font-bold text-lg ${adminer.state == 0 ? 'text-gray-400' : ''}`}>{adminer.name}</span>
                <p>{adminer.phone}</p>
              </div>
              <Avatar src={adminer.avatar} style={{ '--size': '3.4rem' }} onClick={() => navigate(`/adminer/${adminer.id}`)} />
              {
                me.roleId !== 3 ? <Button className='order-2' onClick={() => editFn(adminer.id, adminer.roleId)}>编辑</Button> : <RightOutline className='order-2' />
              }
            </li>
          ))
        }
      </ul>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={20} />
    </>
  )
}

export default list