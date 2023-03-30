import React from 'react'
import { NavBar, Toast } from 'antd-mobile'
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'

type Props = {
  show?: boolean;
  title?: string;
}

const Header: React.FC<Props> = (props) => {
  const { show = true, title } = props
  const back = () =>
    Toast.show({
      content: '点击了返回区域',
      duration: 1000,
    })
  return (
    <section className='border-b'>
      <NavBar
        className='relative flex-1'
        back={!show && null}
        onBack={back}
        right={<SearchOutline className='text-xl' />}
      >{title}</NavBar>
    </section>
  )
}

export default Header