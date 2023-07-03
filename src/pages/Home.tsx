import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserItem from '../components/item/user';
import NoteItem from '../components/item/note1';
import http from '../utils/http';
import { INote, IUser } from '../typings';

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

interface IMemberNote {
  id: number;
  name: string;
  users: {id: number; createdAt: string}[];
  notes: {id: number; createdAt: string}[];
}

const Home = () => {
  const [datas, setDatas] = useState<TData>({
    users: {today: [], old: [], todayCount: 0, oldCount: 0},
    notes: {today: [], old: [], todayCount: 0, oldCount: 0},
  })
  useEffect(() => {
    http.get<TData>('/index').then(ret => setDatas(ret))
  }, [])

  const [menbers, setMember] = useState<IMemberNote[]>([])
  const [notes, setNote] = useState<IMemberNote[]>([])
  useEffect(() => {
    http.get<{menberUsers: IMemberNote[], menberNotes: IMemberNote[]}>('/msg')
      .then(ret => {
        setMember(ret.menberUsers)
        setNote(ret.menberNotes)
      })
  }, [])
  const now = new Date();
  const fullYear = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  return (
    <>
      <section className='font-bold text-base border-b mb-2 pb-0.5'>
        <span>当前日期：</span>
        <span className=''>{fullYear}年{month}月{date}日 {hour}:{minute < 10 ? `0${minute}` : minute}</span>
      </section>
      <section className='px-3 text-base py-2 bg-red-400 bg-opacity-20'>
        <h3 className='font-bold border-b mb-2 pb-0.5 border-red-200 text-red-800'>7天未新增客户</h3>
        {menbers.map(menber => <Link to={`/adminer/${menber.id}`} key={menber.id} className='text-red-600 mr-3'>{menber.name}</Link>)}
      </section>
      <section className='px-3 text-base py-2 bg-yellow-400 bg-opacity-20'>
        <h3 className='font-bold border-b mb-2 pb-0.5 border-yellow-300 text-yellow-800'>3天未跟踪客户</h3>
        {notes.map(note => <Link to={`/adminer/${note.id}`} key={note.id} className='text-yellow-600 mr-3'>{note.name}</Link>)}
      </section>
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