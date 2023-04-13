import { INote } from '@/typings';
import React from 'react';
import { ClockCircleOutline, UserContactOutline } from 'antd-mobile-icons'

type Props = {
  showBorder?: boolean;
  note: INote;
  children?: React.ReactNode
}

const note = (props: Props) => {
  const { showBorder = true, note } = props
  return (
    <li className='bg-green-50 p-3'>
      <div className='flex justify-between border-b mb-2 pb-2'>
        <h4 className='flex items-center space-x-1'><UserContactOutline /> <span>{note.adminer.name}</span></h4>
        <aside className='flex items-center space-x-1'><ClockCircleOutline /> <span className='pt-0.5'>{note.createdAt}</span></aside>
      </div>
      <p className='text-gray-600'>{note.content}</p>
      <aside className='flex justify-end space-x-3'>
        {props.children}
      </aside>
    </li>
  )
}

export default note