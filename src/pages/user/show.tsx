import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import http from '@/utils/http'
import { Button, Image, WaterMark, InfiniteScroll, Modal, TextArea } from 'antd-mobile'
import { INote, IUser } from '@/typings'
import { userState } from '@/utils/state'
import axios from 'axios'
import NoteItem from '@/components/item/note3'
import { ClockCircleOutline, UserContactOutline } from 'antd-mobile-icons'
import { size } from '@/utils/state'
import yy from '../../assets/yy.png'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/typings'

type Props = {}

const show = (props: Props) => {
  const adminer = useSelector((state: RootState) => state.userReducer.user)
  const param = useParams()
  const navigate = useNavigate()

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
  const [imgUrl, setImgUrl] = useState(yy)
  useEffect(() => {
    getData()
    axios.get('https://api.vvhan.com/api/bing?size=640x480&rand=sj&type=json').then(ret => setImgUrl(ret.data.data.url))
  }, [])

  const getData = (refre = true) => {
    http.get<{count: number; rows: INote[]}>(`/note?page=${page}&size=${size}&userId=${param.id}`).then(ret => {
      setHasMore(ret.rows.length >= size ? true : false)
      refre && ret.rows.length >= size && setPage(page + 1)
      setNotes(({rows}) => {
        refre ? ret.rows.length && (rows = [...rows, ...ret.rows]) : (rows = ret.rows);
        return {
          count: ret.count,
          rows
        }
      })
    })
  }

  const updateNote = async (num: number) => {
    let content = ''
    if(num) {
      const val = await http.get<INote>(`/note/${num}`)
      content = val.content
    }
    Modal.alert({
      title: '客户跟踪记录',
      showCloseButton: true,
      content: <TextArea defaultValue={content} onChange={(e) => content = e} className='border p-1'></TextArea>,
      onClose: () => content = '',
      onConfirm: () => {
        num 
          ?
          http.put(`/note/${num}`, {content}).then(() => getData(false))
          :
          http.post('/note/store', {content, userId: param.id}).then(() => getData(false))
        
      },
      confirmText: '确定'
    })
  }

  const delNote = (id: number, content: string) => {
    Modal.alert({
      title: '确定删除此条记录吗？',
      content: <><span className='font-bold'>内容为：</span>{content.slice(0, 42)}...</>,
      confirmText: '确定',
      onConfirm(){
        http.del('/note/'+id).then(() => getData(false))
      }
    })
  }

  return (
    <>
      <Image src={imgUrl} height={200} fit='cover' />
      {
        (adminer.roleId <= 2 || ( user && adminer.id === user.adminerId)) &&
        (<aside className='absolute right-5 top-4 space-x-2'>
        <Button size='small' color='primary' onClick={() => navigate(`/user/${param.id}/edit`)}>编辑</Button>
        {/* <Button size='small' color='danger'>删除</Button> */}
        </aside>)
      }
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
      <h3 className='font-bold text-lg mt-3 px-3 border-t pt-3 flex justify-between items-center'>
        <span>TA的跟踪记录({notes?.count})</span>
        {user?.adminerId === adminer.id && <Button onClick={() => updateNote(0)} size='mini' color='success'>新增</Button>}
      </h3>
      <ul className='text-base mt-1 px-3 space-y-4'>
        { notes?.rows.map(note => <NoteItem key={note.id} note={note}>
          { user?.adminerId === adminer.id &&
            <>
              <Button size='mini' color='primary' onClick={() => updateNote(note.id)}>编辑</Button>
              <Button size='mini' color='danger' onClick={() => delNote(note.id, note.content)}>删除</Button>
            </>
          }
        </NoteItem>) }
      </ul>
      <WaterMark content='中储福森客户名单' zIndex={0} />
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={20} />
      <Modal />
    </>
  )
}

export default show