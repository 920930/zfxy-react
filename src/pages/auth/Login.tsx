import logo from '../../assets/logo.png'
import { Form, Button, Input } from 'antd-mobile'
import { UserCircleOutline } from 'antd-mobile-icons'
import { loginAction, useAppDispatch } from '../../store'
import { useNavigate, useSearchParams } from 'react-router-dom'

type Props = {}

const Login = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams(location.search)
  const code = searchParams.get('code')
  !code &&
    (globalThis.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      import.meta.env.VITE_APPID
    }&redirect_uri=${
      globalThis.location.origin
    }/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)

  const onFinish = (value: { phone: string; password: string }) => {
    dispatch(loginAction({ ...value, code: code ?? '' })).then(() =>
      navigate('/index')
    )
  }

  const onWechat = () => {
    dispatch(loginAction({ code: code ?? '' })).then(() => navigate('/'))
  }
  return (
    <>
      <div className="flex justify-center mt-16">
        <img src={logo} alt="logo" className="w-2/3" />
      </div>
      <p className="text-center mb-5 mt-3 text-sm">中福信义公司客户管理系统</p>
      <Form
        name="form"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
        className="px-3"
      >
        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            { required: true, message: '手机号不能为空' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input type='password' placeholder="请输入密码" />
        </Form.Item>
      </Form>
      <p
        className="text-4xl flex flex-col items-center mt-8 text-emerald-500"
        onTouchEnd={onWechat}
      >
        <UserCircleOutline />
        <span className="text-sm">微信登录</span>
      </p>
    </>
  )
}

export default Login
