import { IUser } from '../../typings';
import React from 'react'
import { Link } from 'react-router-dom';
import { userState } from '../../utils/state';
import {PhoneFill} from 'antd-mobile-icons'

type Props = {
  showBorder?: boolean;
  children?: React.ReactNode;
  user: IUser
}

const kehu = (props: Props) => {
  const { showBorder = true, user } = props;

  return (
    <li className={showBorder ? 'border-b mb-2 pb-2' : '' }>
      <section className='flex'>
        <Link to={`/user/${user.id}`} className={`${props.children === undefined ? 'h-28 pt-3' : 'h-36 flex justify-center'} w-20 bg-gray-100 text-gray-500 relative text-center`}>
          <span className='tracking-widest text-xl font-bold' style={{writingMode: 'vertical-lr'}}>{user.name}</span>
          <span className='absolute bottom-0 left-0 w-full bg-gray-200 tracking-widest'>{user.adminer?.name}</span>
        </Link>
        <section className='flex-1 pl-3'>
          <section className='flex justify-between items-center'>
            <span>行业：{user.trade?.name}</span>
            <aside className={`text-white rounded text-sm ${userState[user.state].class} px-1`}>{userState[user.state].title}</aside>
          </section>
          <section className='flex justify-between items-center mt-1'>
            <aside className='text-gray-500 flex items-center'><PhoneFill /><span>{user.phone}</span></aside>
            {/* <span className='text-gray-500'>{user.createdAt}</span> */}
          </section>
          <p className='text-gray-500 pt-1 border-t mt-1 text2'>{user.desc}</p>
          {props.children && <aside className='flex justify-end space-x-3'>{props.children}</aside>}
        </section>
      </section>
    </li>
  )
}

export default kehu