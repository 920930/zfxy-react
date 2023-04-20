import http from '../../utils/http'
import { Button, Input, List, Modal, Space, Switch } from 'antd-mobile'
import { useEffect, useState } from 'react'

const index = () => {
  const [markets, setMarket] = useState<{id: number; name: string; state: boolean}[]>([])
  useEffect(() => {
    getData()
  }, [])

  const getData = () => http.get<{id: number; name: string; state: boolean}[]>('/market').then(ret => setMarket(ret))

  const modelFn = (id: number = 0, name = '', state = true) => {
    let value = {
      name,
      state
    }
    Modal.alert({
      title: id == 0 ? '新增' : '编辑',
      showCloseButton: true,
      content: <>
        <Input className='border-b mb-3' defaultValue={value.name} onChange={e => value.name = e} placeholder='请输入分类名称' />
        <Space justify='between' align='center' block>
          <span className='text-xl'>状态</span>
          <Switch defaultChecked={value.state} onChange={e => {value.state = e}} uncheckedText='关' checkedText='开' />
        </Space>
      </>,
      onConfirm() {
        id == 0
          ? 
            http.post('/market/store', value).then(() => getData())
          : 
            http.put(`/market/${id}`, value).then(() => getData())
      },
      confirmText: '确定',
    })
  }

  return (
    <List header={<Button size='small' onClick={() => modelFn()}>新增</Button>}>
      {markets.map(item => <List.Item key={item.id} onClick={() => modelFn(item.id, item.name)}><span className={item.state ? '' : 'text-red-400'}>{item.name}</span></List.Item>)}
    </List>
  )
}

export default index