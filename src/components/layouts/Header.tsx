import React from 'react'
import { NavBar, Toast } from 'antd-mobile'

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
      <NavBar back={!show && null} onBack={back}>{title}</NavBar>
    </section>
  )
}

export default Header