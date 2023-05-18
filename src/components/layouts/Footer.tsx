import React from 'react'
import { Footer as AntFooter, TabBar } from 'antd-mobile'
import {
  AppOutline,
  UnorderedListOutline,
  TeamOutline,
  UserOutline,
  HandPayCircleOutline
} from 'antd-mobile-icons';
import { useLocation, useNavigate } from 'react-router-dom'

const Footer: React.FC = () => {
  const locat = useLocation();
  const navigate = useNavigate();
  const tabs = [
    {
      key: '/index',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/user/index',
      title: '客户',
      icon: <TeamOutline />,
    },
    {
      key: '/note',
      title: '记录',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  return (
    <>
      <AntFooter
        label={ <p className='flex items-center space-x-2'><HandPayCircleOutline /> <span>忠福信义公司客服管理系统</span></p> }
        content='@ 2023 Zcfsjt.com All rights reserved'
      />
      <TabBar activeKey={locat.pathname} onChange={v => navigate(v)} className='fixed bottom-0 left-0 bg-white w-full border-t h-14'>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} className='text-3xl' />
        ))}
      </TabBar>
      <p className='h-14'></p>
    </>
  )
}

export default React.memo(Footer)