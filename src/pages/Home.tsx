import React from 'react'
import { Link } from 'react-router-dom'
import UserItem from '../components/item/user';
import NoteItem from '../components/item/note';

type Props = {}

const Home = (props: Props) => {
  return (
    <>
      <ul className='px-3 text-base py-2'>
        <h3 className='font-bold text-xl border-b mb-2 pb-0.5'>今日新增客户</h3>
        {
          true
          ?
          <li className='text-gray-500 h-28 text-center pt-10'>今日暂无新增客户信息</li>
          :
          <>
            { Array.from({length: 5}).map((item, i) => <UserItem key={i} />) }
          </>
        }
      </ul>
      <ul className='px-3 text-base border-t-8 border-gray-100 py-2'>
        <h3 className='font-bold text-xl border-b mb-2 pb-0.5'>今日追踪记录</h3>
        {
          true
          ?
          <li className='text-gray-500 h-28 text-center pt-10'>今日暂无客户跟踪记录</li>
          :
          <>
            { Array.from({length: 5}).map((item, i) => <NoteItem key={i} />) }
          </>
        }
      </ul>
      <ul className='px-3 text-base border-t-8 border-gray-100 py-2'>
        <section className='flex items-center border-b mb-2 pb-0.5'>
          <h3 className='font-bold text-xl'>以往客户列表</h3>
          <Link to='/user' className='flex-1 text-right text-gray-500'>查看更多</Link>
        </section>
        { Array.from({length: 5}).map((item, i) => <UserItem key={i} />) }
      </ul>
      <ul className='px-3 text-base border-t-8 border-gray-100 py-2'>
        <section className='flex items-center border-b mb-2 pb-0.5'>
          <h3 className='font-bold text-xl'>以往追踪记录</h3>
          <Link to='/note' className='flex-1 text-right text-gray-500'>查看更多</Link>
        </section>
        { Array.from({length: 5}).map((item, i) => <NoteItem key={i} />) }
      </ul>
    </>
  )
}

export default React.memo(Home)