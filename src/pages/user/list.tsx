import { useEffect, useState } from 'react'
import UserItem from '../../components/item/user'
import { InfiniteScroll, Button, Form, Input, Toast, Picker, Radio, Space } from 'antd-mobile'
import { IAdminer, IUser } from '../../typings'
import http from '../../utils/http'
import { size } from '../../utils/state'
import { useSearchParams } from 'react-router-dom'
import { PickerValue } from 'antd-mobile/es/components/picker-view'

export default () => {
  const [query] = useSearchParams();
  const adminerId = query.get('adminerId')
  
  const [users, setUsers] = useState<{count: number; rows: IUser[]}>({
    count: 0,
    rows: []
  })
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const loadMore = async () => getData()
  useEffect(() => getData(), [])
  
  const getData = (p: number | null = null, search: string | null = null) => {
    let url = `/user?page=${p ?? page}&size=${size}`
    adminerId && (url += `&adminerId=${adminerId}`)
    search && (url += `${search}`)
    http.get<{count: number; rows: IUser[]}>(url).then(ret => {
      setHasMore(ret.rows.length >= size ? true : false)
      ret.rows.length >= size && setPage(page + 1)
      setUsers(({count, rows}) => {
        ret.rows.length && (rows = [...rows, ...ret.rows]);
        p && (rows = ret.rows);
        return {
          count,
          rows
        }
      })
    })
  }

  const [form] = Form.useForm();
  const onFinish = (v: {name?: string; phone?: string; state?: string; adminer?: string}) => {
    if(!v.name && !v.phone && !v.adminer && (v.state === undefined)) {
      return Toast.show({
        content: '搜索内容不能为空'
      })
    }
    let search = ''
    v.name && (search += `&name=${v.name}`)
    v.phone && (search += `&phone=${v.phone}`)
    v.state && (search += `&state=${v.state}`)
    if(v.adminer){
      const adminerId = v.adminer.split('-')[0];
      search += `&adminerId=${adminerId}`
    }
    setPage(1)
    getData(1, search)
  }

  const resetFn = () => {
    form.resetFields()
    setPage(1)
    getData(1)
  }

  // 员工列表
  const [adminList, setAdminList] = useState<{value: string; label: string}[]>([]);
  const [visiState, setVisiState] = useState(false);
  const getAdminList = () => {
    setVisiState(true)
    if(adminList.length === 0){
      http.get<IAdminer[]>('/adminer/all?roleId=3').then(ret => {
        const alists = ret.map(i => ({label: i.name, value: i.id+""}))
        setAdminList(alists)
      })
    }
  }
  const pickerAdmin = (i: PickerValue[]) => {
    if(i[0] === null) return Toast.show('请联系管理员增加');
    const ad = adminList.find(item => item.value == i[0]);
    form.setFieldValue('adminer', `${ad?.value}-${ad?.label}`)
  }
  return (
    <>
      <Form form={form} layout='horizontal' onFinish={onFinish} footer={
        <div className='flex space-x-2'>
          <Button block color='primary' size='large' type='submit' className='flex-1'>搜索</Button>
          <Button size='large' onClick={resetFn}>重置</Button>
        </div>
      }>
        <Form.Item name='name' label='用户名'>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='phone' label='用户手机'>
          <Input placeholder='请输入用户手机' />
        </Form.Item>
        <Form.Item name='state' label='用户状态'>
          <Radio.Group>
            <Space justify='between'>
              <Radio value='0'>失效</Radio>
              <Radio value='1'>跟踪</Radio>
              <Radio value='2'>签约</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='adminer' label='员工' onClick={getAdminList}>
          <Input placeholder='请选择员工' readOnly />
        </Form.Item>
      </Form>
      <ul className='mb-3 px-3 text-base'>
        { users.rows.map(user => <UserItem key={user.id} user={user} /> )}
      </ul>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={20} />

      <Picker
        columns={[adminList]}
        visible={visiState}
        onClose={() => setVisiState(false)}
        onConfirm={pickerAdmin}
      />
    </>
  )
}