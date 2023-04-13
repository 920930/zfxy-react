import { INote } from '@/typings';
import React from 'react';
import { Link } from 'react-router-dom';
import { ClockCircleOutline, UserContactOutline } from 'antd-mobile-icons'

type Props = {
  note: INote;
  children?: React.ReactNode
}

const note = (props: Props) => {
  const { note } = props
  return (
    <li className='bg-green-50 p-2'>
      <Link to={`/user/${note.user.id}`} className='flex justify-between items-center border-b mb-2 pb-2'>
        <h4 className='text-lg space-x-3 flex items-center'>
          <div className='space-x-1 flex items-center text-gray-800'>
            <UserContactOutline />
            <span>{note.user.name}</span>
          </div>
          <span className='inline-block bg-orange-500 text-white px-1 rounded text-sm'>跟进中</span>
        </h4>
        <aside className='text-gray-500'>{note.createdAt}</aside>
      </Link>
      <Link to={`/user/${note.user.id}`} className='text-gray-500 pr-1 text3 flex-1'>{note.content}</Link>
      <aside className='flex justify-end space-x-3'>
        {props.children}
      </aside>
    </li>
  )
}

export default note