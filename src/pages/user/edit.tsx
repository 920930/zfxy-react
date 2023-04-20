import { useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Radio, Space, TextArea, Picker, Switch } from 'antd-mobile'
import http from '../../utils/http'
import { useEffect, useState } from 'react'
import { IAdminer, IUser, TTrade } from '../../typings'
import { PickerValue } from 'antd-mobile/es/components/picker-view'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/typings'

const edit = () => {
  const [form] = Form.useForm()
  const me = useSelector((state: RootState) => state.userReducer.user)
  const [user, setUser] = useState<IUser>()
  // 路由params获取用户id，0新增,其他更新
  const param = useParams()
  const id = Number.parseInt(param.id || '0')
  useEffect(() => {
    if(id !== 0) {
      http.get<IUser>(`/user/${param.id}`).then(ret => {
        setUser(ret)
        form.setFieldsValue(ret)
        form.setFieldValue('tradeId', `${ret.tradeId}-${ret.trade?.name}`)
        form.setFieldValue('marketId', `${ret.marketId}-${ret.market?.name}`)
        form.setFieldValue('adminerId', `${ret.adminerId}-${ret.adminer?.name}`)
      })
    }
  }, [param.id])

  // 员工列表
  const [adminers, setAdminers] = useState<{label: string; value: string}[]>([])
  useEffect(() => {
    http.get<IAdminer[]>('/adminer/all').then(ret => setAdminers(ret.map(item => ({label: item.name, value: `${item.id}`}))))
  }, [])
  // 行业列表
  const [trades, setTrades] = useState<{label: string; value: string}[]>([])
  useEffect(() => {
    http.get<TTrade[]>('/trade').then(ret => setTrades(ret.map(item => ({label: item.name, value: `${item.id}`}))))
  }, [])
  // 项目列表
  const [markets, setMarkets] = useState<{label: string; value: string}[]>([])
  useEffect(() => {
    http.get<TTrade[]>('/market').then(ret => setMarkets(ret.map(item => ({label: item.name, value: `${item.id}`}))))
  }, [])
  // 如果是更新行业或员工id
  const [pickVisible, setPickVisible] = useState<{type: 'trade' | 'adminer' | 'market'; bool: boolean}>({type: 'trade', bool: false})
  const [pickValue, setPickValue] = useState<PickerValue[]>([])
  const onConfirmPickValue = (v: PickerValue[]) => {
    if(!v[0]) return
    setPickValue(v)
    const vv =  pickVisible.type === 'trade'
      ? trades.find(item => item.value === v[0])
      : pickVisible.type === 'adminer'
        ? adminers.find(item => item.value === v[0])
        : markets.find(item => item.value === v[0])
    form.setFieldValue(pickVisible.type === 'trade' ? 'tradeId' : pickVisible.type === 'adminer' ? 'adminerId' : 'marketId', `${vv?.value}-${vv?.label}`)
  }

  // 提交表单
  const onFinish = (v: any) => {
    if(param.id) {
      param.id === '0' ? storeFn(v) : editFn(param.id, v)
    }
  }
  const navigate = useNavigate()
  const storeFn = (v: any) => {
    http.post<{id: number}>('/user/store', v).then(ret => navigate(`/user/${ret.id}`))
  }
  const editFn = (uid: string, v: any) => {
    http.put(`/user/${uid}`, v).then(() => navigate(`/user/${uid}`))
  }

  const showPickFn = (type: 'trade' | 'adminer' | 'market' = 'trade') => {
    setPickVisible({type, bool: true})
    // 如果是新增客户，v = underfined
    // const v = type === 'trade' ? `${user?.tradeId}` : type === 'adminer' ? `${user?.adminerId}` :  `${user?.marketId}`;
    // v && setPickValue([v])
  }
  return (
    <>
      <Form
        initialValues={{
          state: 1,
          adminerId: `${me.id}-${me.name}`,
          sex: true
        }}
        form={form}
        onFinish={onFinish}
        footer={<Button block type='submit' color='primary' size='large'>提交</Button>}
      >
        <Form.Item name='name' label='客户姓名' rules={[{ required: true }]}>
          <Input placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item name='phone' label='客户手机' rules={[{ required: true }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}>
          <Input placeholder='请输入手机' />
        </Form.Item>
        <Form.Item name='sex' label='客户性别' layout='horizontal' childElementPosition='right' valuePropName='checked'>
          <Switch checkedText='女' uncheckedText='男' />
        </Form.Item>
        <Form.Item name='area' label='意向租赁面积' rules={[{ required: true }]}>
          <Input placeholder='请输入意向租赁面积' />
        </Form.Item>
        <Form.Item name='timer' label='意向租赁时长' rules={[{ required: true }]}>
          <Input placeholder='请输入意向租赁时长' />
        </Form.Item>
        <Form.Item name='address' label='客户地址' rules={[{ required: true }]}>
          <Input placeholder='请输入地址' />
        </Form.Item>
        <Form.Item name='desc' label='客户简单介绍' rules={[{ required: true }]}>
          <TextArea placeholder='请输入简单介绍' />
        </Form.Item>
        <Form.Item name='state' label='客户状态'>
          <Radio.Group>
            <Space>
              <Radio value={0}>已失效</Radio>
              <Radio value={1}>跟进中</Radio>
              <Radio value={2}>已签约</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='tradeId' label='客户行业' rules={[{ required: true }]} onClick={() => showPickFn('trade')}>
          <Input placeholder='请选择客户行业' readOnly />
        </Form.Item>
        <Form.Item name='marketId' label='意向市场' rules={[{ required: true }]} onClick={() => showPickFn('market')}>
          <Input placeholder='请选择意向市场' readOnly />
        </Form.Item>
        <Form.Item name='adminerId' label='员工' hidden={me.roleId == 3} rules={[{ required: true }]} onClick={() => showPickFn('adminer')}>
          <Input placeholder='请选择员工' readOnly />
        </Form.Item>
      </Form>

      <Picker
        columns={[pickVisible.type === 'trade' ? trades : pickVisible.type === 'adminer' ? adminers : markets]}
        visible={pickVisible.bool}
        onClose={() => setPickVisible({bool: false, type: 'trade'})}
        value={pickValue}
        onConfirm={onConfirmPickValue}
      />
    </>
  )
}

export default edit