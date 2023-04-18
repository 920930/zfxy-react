import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Switch,
  Space
} from 'antd-mobile'
import http from '@/utils/http'
import { IAdminer } from '@/typings'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/typings'

type Props = {}

const edit = (props: Props) => {
  const me = useSelector((state: RootState) => state.userReducer.user)
  const navigate = useNavigate()
  const params = useParams()
  const [form] = Form.useForm()

  useEffect(() => {
    if(params.id && params.id !== '0') {
      http.get<IAdminer>(`/adminer/${params.id}`).then(ret => {
        const {name, phone, state, roleId} = ret;
        form.setFieldsValue({name, phone, state, roleId})
      })
    }
  }, [])
  const onFinish = (values: any) => {
    params.id ? params.id == '0' ? storeFn(values) : editFn(values) : ''
  }
  const editFn = (values: any) => {
    http.put(`/adminer/${params.id}/edit`, values).then(() => navigate('/adminer'))
  }
  const storeFn = (values: any) => {
    http.post(`/adminer/store`, values).then(() => navigate('/adminer'))
  }

  const [passRules, setPassRules] = useState(false)
  useEffect(() => {
    const id = params.id
    id && id === '0' && setPassRules(true)
  }, [params.id])
  const passwordValid = (_: any, value: string) => {
    const pwd = form.getFieldValue('password')
    return pwd === value ? Promise.resolve() : Promise.reject('两次密码不一致')
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        state: true,
        roleId: 3
      }}
      footer={<Button block type='submit' color='primary' size='large'>提交</Button>}
    >
      <Form.Item name='name' label='姓名' rules={[{ required: true }]}>
        <Input placeholder='请输入姓名' />
      </Form.Item>
      <Form.Item name='phone' label='手机' rules={[{ required: true }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}>
        <Input placeholder='请输入手机' />
      </Form.Item>
      <Form.Item name='password' label='密码' rules={[ { required: passRules }, {min: 6}]}>
        <Input placeholder='请输入密码' type='password' />
      </Form.Item>
      <Form.Item name='passwordConfig' label='确认密码' rules={[{validator: passwordValid}]}>
        <Input placeholder='请输入确认密码' type='password' />
      </Form.Item>
      <Form.Item name='state' valuePropName="checked" label='状态' childElementPosition='right' layout='horizontal'>
        <Switch uncheckedText='离职' checkedText='正常'  />
      </Form.Item>
      <Form.Item name='roleId' label='角色' hidden={me.roleId != 1}>
        <Radio.Group>
          <Space>
            <Radio value={1}>管理员</Radio>
            <Radio value={2}>管理员</Radio>
            <Radio value={3}>员工</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </Form>
  )
}

export default edit