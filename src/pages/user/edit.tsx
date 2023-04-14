import { useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Radio, Switch, Space, TextArea, Picker } from 'antd-mobile'
import http from '@/utils/http'
import { useState } from 'react'

const edit = () => {

  const [pickVisible, setPickVisible] = useState(false)
  return (
    <Form>
      <Form.Item name='name' label='客户姓名' rules={[{ required: true }]}>
        <Input placeholder='请输入姓名' />
      </Form.Item>
      <Form.Item name='phone' label='客户手机' rules={[{ required: true }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}>
        <Input placeholder='请输入手机' />
      </Form.Item>
      <Form.Item name='desc' label='客户简单介绍' rules={[{ required: true }]}>
        <TextArea placeholder='请输入简单介绍' />
      </Form.Item>
      <Form.Item name='state' label='客户状态'>
        <Radio.Group>
          <Space>
            <Radio value={1}>已失效</Radio>
            <Radio value={2}>跟进中</Radio>
            <Radio value={3}>已签约</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </Form>
  )
}

export default edit