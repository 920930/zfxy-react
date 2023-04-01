import { clearAll, useAppDispatch } from '../../store'
import { Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Me = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(clearAll())
    navigate('/login')
  }

  return (
    <>
      <div>Me -- Index</div>
      <Button onTouchEnd={logout}>退出登录</Button>
    </>
  )
}

export default Me
