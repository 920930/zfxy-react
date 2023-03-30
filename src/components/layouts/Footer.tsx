import React from 'react'
import { NavBar, TabBar } from 'antd-mobile'
import {
  AppOutline,
  UnorderedListOutline,
  MessageOutline,
  UserOutline,
} from 'antd-mobile-icons';
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {}

const Footer: React.FC<Props> = (props) => {
  const locat = useLocation();
  const navigate = useNavigate();
  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/todu',
      title: '消息',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  return (
    <TabBar activeKey={locat.pathname} onChange={v => navigate(v)} className='fixed bottom-0 left-0 w-full border-t'>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

export default Footer