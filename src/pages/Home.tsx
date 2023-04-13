import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserItem from '../components/item/user';
import NoteItem from '../components/item/note1';
import http from '@/utils/http';
import { INote, IUser } from '@/typings';
import { Image } from 'antd-mobile';
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/typings'

type Props = {}

type TData = {
  users: {
    today: IUser[];
    old: IUser[];
    todayCount: number;
    oldCount: number;
  }
  notes: {
    today: INote[];
    old: INote[];
    todayCount: number;
    oldCount: number;
  }
}

const Home = (props: Props) => {
  const user = useSelector((state: RootState) => state.userReducer.user)
  const [datas, setDatas] = useState<TData>({
    users: {today: [], old: [], todayCount: 0, oldCount: 0},
    notes: {today: [], old: [], todayCount: 0, oldCount: 0},
  })
  useEffect(() => {
    http.get<TData>('/index').then(ret => setDatas(ret))
  }, [])
  return (
    <>
      <Image src={`https://api.vvhan.com/api/ipCard?tip=您好 ${user.name}`} height={230} />
      <ul className='px-3 text-base py-2'>
        <h3 className='font-bold text-xl border-b mb-2 pb-0.5'>今日新增客户({datas.users.todayCount})</h3>
        {
          datas.users.today.length
          ?
          <>{ datas.users.today.map(user => <UserItem user={user} key={user.id} />) }</>
          :
          <li className='text-gray-500 h-28 text-center pt-10'>今日暂无新增客户信息</li>
        }
      </ul>
      <ul className='px-3 text-base border-t-8 border-gray-100 py-2'>
        <h3 className='font-bold text-xl border-b mb-2 pb-0.5'>今日追踪记录({datas.notes.todayCount})</h3>
        {
          datas.notes.today.length
          ?
          <> { datas.notes.today.map(note => <NoteItem note={note} key={note.id} />) } </>
          :
          <li className='text-gray-500 h-28 text-center pt-10'>今日暂无客户跟踪记录</li>
        }
      </ul>
      <ul className='px-3 text-base border-t-8 border-gray-100 py-2'>
        <section className='flex items-center border-b mb-2 pb-0.5'>
          <h3 className='font-bold text-xl'>以往客户列表({datas.users.oldCount})</h3>
          <Link to='/user' className='flex-1 text-right text-gray-500'>查看更多</Link>
        </section>
        { datas.users.old.map(user => <UserItem user={user} key={user.id} />) }
      </ul>
      <ul className='px-3 text-base border-t-8 border-gray-100 py-2'>
        <section className='flex items-center border-b mb-2 pb-0.5'>
          <h3 className='font-bold text-xl'>以往追踪记录({datas.notes.oldCount})</h3>
          <Link to='/note' className='flex-1 text-right text-gray-500'>查看更多</Link>
        </section>
        { datas.notes.old.map(note => <NoteItem note={note} key={note.id} />) }
      </ul>
    </>
  )
}

export default Home