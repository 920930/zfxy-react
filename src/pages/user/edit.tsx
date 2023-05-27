import { useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Radio, Space, TextArea, Picker, Switch, Popup, CheckList, Toast } from 'antd-mobile'
import http from '../../utils/http'
import { useEffect, useState } from 'react'
import { IUser, TTrade } from '../../typings'
import { PickerValue } from 'antd-mobile/es/components/picker-view'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/typings'
import { debounce } from '../../utils/state';

const edit = () => {
  const [form] = Form.useForm()
  const me = useSelector((state: RootState) => state.userReducer.user)
  // const [user, setUser] = useState<IUser>()
  // 路由params获取用户id，0新增,其他更新
  const param = useParams()
  const id = Number.parseInt(param.id || '0')
  useEffect(() => {
    if(id !== 0) {
      http.get<IUser>(`/user/${param.id}`).then(ret => {
        // setUser(ret)
        form.setFieldsValue(ret)
        form.setFieldValue('tradeId', `${ret.tradeId}-${ret.trade?.name}`)
        const markes = ret.markets?.map(item => (`${item.id}-${item.name}`));
        form.setFieldValue('markets', markes?.join(','))
        form.setFieldValue('adminerId', `${ret.adminerId}-${ret.adminer?.name}`)
        if(ret.markets) {
          const de = ret.markets.map(item => item.id + '')
          setMarkeDefault(de)
        }
      })
    }
  }, [param.id])

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
  // 项目显示隐藏
  const [markShow, setMarkShow] = useState(false);
  // 项目选中初始数据
  const [marketDefault, setMarkeDefault] = useState<string[]>([]);
  // 如果是更新行业或员工id
  const [pickVisible, setPickVisible] = useState<boolean>(false)
  const onConfirmPickValue = (v: PickerValue[]) => {
    if(v[0] === null) return Toast.show('请联系管理员增加');
    const vv = trades.find(item => item.value === v[0])
    form.setFieldValue('tradeId', `${vv?.value}-${vv?.label}`)
  }

  // 提交表单
  const onFinish = (v: any) => {
    if(param.id) {
      param.id === '0' ? storeFn(v) : editFn(v)
    }
  }
  const navigate = useNavigate()
  // 防抖
  const storeFn = debounce((v: any) => {
    http.post<{id: number}>('/user/store', v).then(ret => navigate(`/user/${ret.id}`))
  })
  const editFn = debounce((v: any) => {
    http.put(`/user/${param.id}`, v).then(() => navigate(`/user/${param.id}`))
  })

  const marketToForm = (val: string[]) => {
    const ret = markets.filter(item => val.includes(item.value)).map(item => `${item.value}-${item.label}`)
    form.setFieldValue('markets', ret.join(','))
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
        <Form.Item name='tradeId' label='客户行业' rules={[{ required: true }]} onClick={() => setPickVisible(true)}>
          <Input placeholder='请选择客户行业' readOnly />
        </Form.Item>
        <Form.Item name='markets' label='意向市场' rules={[{ required: true }]} onClick={() => setMarkShow(true)}>
          <Input placeholder='请选择意向市场' readOnly />
        </Form.Item>
      </Form>

      <Picker
        columns={[trades]}
        visible={pickVisible}
        onConfirm={onConfirmPickValue}
        onClose={() => setPickVisible(false)}
      />

      <Popup
        visible={markShow}
        showCloseButton
        closeOnMaskClick
        onClose={() => setMarkShow(false)}
        bodyStyle={{ height: '50vh' }}
      >
        <div style={{ padding: '38px 24px', overflowY: 'scroll', height: '100%' }}>
        <CheckList multiple defaultValue={marketDefault} onChange={marketToForm}>
          {
            markets.map(item => <CheckList.Item value={item.value} key={item.value}>{item.label}</CheckList.Item>)
          }
        </CheckList>
        </div>
      </Popup>
    </>
  )
}

export default edit