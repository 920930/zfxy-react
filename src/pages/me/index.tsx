import { useAppDispatch, clearAll, logoutAction } from '../../store'
import { Button, Avatar } from 'antd-mobile'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/typings'
import axios from 'axios'
import { PictureOutline, SetOutline, TeamOutline, RightOutline, UnorderedListOutline, UserSetOutline, MessageOutline } from 'antd-mobile-icons'
import { useEffect, useState } from 'react'

const Me = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const adminer = useSelector((state: RootState) => state.userReducer.user)
  const [yuyan, setYuyan] = useState('')
  useEffect(() => {
    axios.get('https://api.vvhan.com/api/ian')
      .then(ret => {
        setYuyan(ret.data)
      })
  }, [])

  const logout = () => {
    dispatch(logoutAction())
      .then(() => dispatch(clearAll()))
      .then(() => navigate('/login'))
  }

  return (
    <>
      <div className="flex items-center px-3 py-2 text-base">
        <Avatar src={adminer.avatar} style={{ '--size': '4rem' }} />
        <div className='ml-3'>
          <span className='font-bold text-xl'>{adminer.name}</span>
          <p className='mt-1.5 text-gray-700'>手机号：{adminer.phone}</p>
        </div>
      </div>
      <ul className={`grid grid-cols-${adminer.roleId != 3 ? 3 : 2} px-3 py-2 text-base border-t-8 border-gray-100`}>
        <li className='flex flex-col items-center'>
          <PictureOutline className='text-4xl mb-2' />
          <span>修改头像</span>
        </li>
        <li className='flex flex-col items-center' onClick={() => navigate(`/adminer/${adminer.id}/edit`)}>
          <SetOutline className='text-4xl mb-2' />
          <span>修改信息</span>
        </li>
        { adminer.roleId != 3 &&
          <li className='flex flex-col items-center' onClick={() => navigate(`/adminer/${adminer.id}/edit`)}>
            <UnorderedListOutline className='text-4xl mb-2'/>
            <span>行业分类</span>
          </li>
        }
      </ul>
      <ul className="py-2 text-base border-y-8 border-gray-100 space-y-2">
        <li onClick={() => navigate(`/user/index?adminerId=${adminer.id}`)} className='flex items-center px-3 border-b pb-2'>
          <TeamOutline className='text-3xl mr-3' />
          <span className='flex-1'>我的客户</span>
          <RightOutline className='text-gray-400' />
        </li>
        <li onClick={() => navigate(`/user/0/edit`)} className='flex items-center px-3'>
          <UserSetOutline className='text-3xl mr-3' />
          <span className='flex-1'>新增客户</span>
          <RightOutline className='text-gray-400' />
        </li>
        <li onClick={() => navigate(`/note?adminerId=${adminer.id}`)} className='flex items-center pt-2 px-3 border-t-8 border-gray-100'>
          <MessageOutline className='text-3xl mr-3' />
          <span className='flex-1'>我的记录</span>
          <RightOutline className='text-gray-400' />
        </li>
      </ul>
      {
        <ul className='border-b-8 border-gray-100 text-base'>
          <li onClick={() => navigate('/adminer')} className='flex space-x-3 py-2 px-3 items-center text-gray-900'>
            <TeamOutline className='text-3xl' />
            <span className='flex-1'>员工列表</span>
            <RightOutline className='text-gray-400' />
          </li>
          {
            adminer.roleId != 3 && (<li onClick={() => navigate(`/adminer/0/edit`)} className='flex space-x-3 border-t-8 border-gray-100 py-2 px-3 items-center'>
            <UserSetOutline className='text-3xl' />
            <span className='flex-1'>新增员工</span>
            <RightOutline className='text-gray-400' />
          </li>)
          }
        </ul>
      }
      <p className='m-2'>
        <Button onTouchEnd={logout} block color='danger'>退出登录</Button>
      </p>
      {yuyan && <aside className='px-3 py-1.5 border-t-8 border-gray-100 text-base'>随机谚语：{yuyan}</aside>}
    </>
  )
}

export default Me
