import { useAppDispatch, clearAll, logoutAction } from '../../store'
import { Button, Image } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/typings'
import axios from 'axios'
import { PictureOutline, SetOutline, TeamOutline, FileOutline, FaceRecognitionOutline, UserSetOutline } from 'antd-mobile-icons'
import { useEffect, useState } from 'react'

type Props = {}

const Me = (props: Props) => {
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
        <Image src={adminer.avatar} width={60} height={60} />
        <div className='ml-3'>
          <span className='font-bold text-xl'>{adminer.name}</span>
          <p className='mt-1.5 text-gray-700'>手机号：{adminer.phone}</p>
        </div>
      </div>
      <ul className="grid grid-cols-4 gap-5 px-3 py-2 text-base border-y-8 border-gray-100">
        <li className='flex flex-col items-center'>
          <TeamOutline className='text-4xl mb-1' />
          <span>我的客户</span>
        </li>
        <li className='flex flex-col items-center'>
          <FileOutline className='text-4xl mb-1' />
          <span>跟踪记录</span>
        </li>
        <li className='flex flex-col items-center'>
          <PictureOutline className='text-4xl mb-1' />
          <span>修改头像</span>
        </li>
        <li className='flex flex-col items-center'>
          <SetOutline className='text-4xl mb-1' />
          <span>修改信息</span>
        </li>
      </ul>
      
      {
        adminer.ruleId <= 3 &&
        <ul className='border-b-8 border-gray-100 text-base'>
          <li className='flex space-x-3 py-2 px-3 items-center'>
            <UserSetOutline className='text-3xl' />
            <span>员工列表</span>
          </li>
          <li className='flex space-x-3 border-t-8 border-gray-100 py-2 px-3 items-center'>
            <UserSetOutline className='text-3xl' />
            <span>新增员工</span>
          </li>
          <li className='flex space-x-3 border-t-8 border-gray-100 py-2 px-3 items-center'>
            <UserSetOutline className='text-3xl' />
            <span>编辑员工</span>
          </li>
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
