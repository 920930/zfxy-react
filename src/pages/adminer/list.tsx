import { RightOutline } from 'antd-mobile-icons'
import { Avatar, Button } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/typings'

type Props = {}

const list = (props: Props) => {
  const user = useSelector((state: RootState) => state.userReducer.user)
  return (
    <>
      <ul className='px-3 pt-3 space-y-3'>
        <li className='bg-gray-100 flex p-2 items-center text-base rounded-md'>
          <Link to='/adminer/1' className='order-1 flex-1 ml-2 text-gray-700'>
            <span className='font-bold text-lg'>陈国强</span>
            <p>18081990075</p>
          </Link>
          <Link to='/adminer/1'>
            <Avatar src='' className='border-4 border-white' style={{ '--size': '3.4rem' }} />
          </Link>
          <RightOutline className='order-2' />
        </li>
      </ul>
    </>
  )
}

export default list