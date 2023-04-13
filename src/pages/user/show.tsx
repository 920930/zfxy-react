import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '@/utils/http'
import { Button, Image, WaterMark, InfiniteScroll } from 'antd-mobile'
import { INote, IUser } from '@/typings'
import { userState } from '@/utils/state'
import axios from 'axios'
import NoteItem from '@/components/item/note3'
import { ClockCircleOutline, UserContactOutline } from 'antd-mobile-icons'
import { size } from '@/utils/state'

type Props = {}

const show = (props: Props) => {
  const param = useParams()

  const [user, setUser] = useState<IUser>()
  useEffect(() => {
    http.get<IUser>(`/user/${param.id}`).then(ret => setUser(ret))
  }, [])

  const [page, setPage] = useState(1)
  const [notes, setNotes] = useState<{count: number; rows: INote[]}>({
    count: 0,
    rows: []
  })
  const [hasMore, setHasMore] = useState(false)
  const loadMore = async () => getData()
  
  // 随机图片
  const [imgUrl, setImgUrl] = useState('')
  useEffect(() => {
    getData()
    axios.get('https://api.vvhan.com/api/bing?size=640x480&rand=sj&type=json').then(ret => setImgUrl(ret.data.data.url))
  }, [])

  const getData = () => {
    http.get<{count: number; rows: INote[]}>(`/note?page=${page}&size=${size}&userId=${param.id}`).then(ret => {
      console.log(ret)
      setHasMore(ret.rows.length >= size ? true : false)
      ret.rows.length >= size && setPage(page + 1)
      setNotes(({rows}) => {
        ret.rows.length && (rows = [...rows, ...ret.rows]);
        return {
          count: ret.count,
          rows
        }
      })
    })
  }

  return (
    <>
      <Image src={imgUrl} height={200} fit='cover' />
      <section className='h-20 relative'>
        <div className='absolute w-5/6 h-28 left-1/2 -top-12 z-50 -translate-x-1/2 shadow-xl bg-white rounded-md bg-opacity-90 p-3 text-base'>
          <ul className='grid grid-cols-2 gap-x-3.5 gap-y-2.5'>
            <li><span className='font-bold'>客户：</span>{user?.name}</li>
            <li><span className={`text-white px-1 rounded-sm py-0.5 ${userState[user?user.state:0].class}`}>{userState[user?user.state:0].title}</span></li>
            <li className='col-span-2'><span className='font-bold'>电话：</span>{user?.phone}</li>
            <li className='col-span-2'><span className='font-bold'>行业：</span>{user?.trade?.name}</li>
          </ul>
        </div>
      </section>
      <p className='px-3 text-base'><span className='font-bold'>简介：</span>{user?.desc}</p>
      <p className='text-base mt-3 px-3 flex items-center space-x-2'><ClockCircleOutline /><span>{user?.createdAt}</span></p>
      <p className='text-base mt-3 px-3 flex items-center space-x-2'><UserContactOutline /><span>{user?.adminer?.name}</span></p>
      <h3 className='font-bold text-lg mt-3 px-3 border-t pt-3'>TA的跟踪记录({notes?.count})</h3>
        <ul className='text-base mt-1 px-3 space-y-4'>
          { notes?.rows.map(note => <NoteItem key={note.id} note={note} />) }
        </ul>
        
      <WaterMark content='中储福森客户名单' zIndex={0} />
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={20} />
    </>
  )
}

export default show