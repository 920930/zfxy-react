import { useState } from 'react'
import Message from './components/message/Index'

type Props = {}

const Fun = (props: Props) => {
  const handle = () => {
    Message({text: 'haha'})
  }
  return (
    <button onClick={handle}>Fun</button>
  )
}

export default Fun