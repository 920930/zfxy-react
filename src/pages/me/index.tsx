import React from 'react'
import { clearAll, useAppDispatch } from '../../store'

type Props = {}

const Me = (props: Props) => {
  const dispatch = useAppDispatch()
  const logout = () => dispatch(clearAll())
  return (
    <>
      <div>Me -- Index</div>
      <div onClick={logout}>logout</div>
    </>
  )
}

export default Me