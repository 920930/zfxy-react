import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Image, Button, Input } from 'antd-mobile'
import UserItem from '../../components/item/user';
import { UserOutline, FileOutline } from 'antd-mobile-icons';

type Props = {}

const show = (props: Props) => {
  // 员工id
  const param = useParams()
  // 客户列表
  const [users, setUsers] = useState<{count: number; rows: any[]}>({
    count: 1,
    rows: [
      {id: 1, name: '沐阳', tel: '18081990075', trade: '门窗 五金', desc: '曲折会场', adminerId: 1, adminer: {id: 1, name: '陈国强'}},
      {id: 1, name: '李孝利', tel: '18081990075', trade: '门窗 五金', desc: '曲折会场', adminerId: 1, adminer: {id: 1, name: '陈国强'}},
    ]
  })
  // 跟踪记录
  const [notes, setNotes] = useState<{count: number; rows: any[]}>({
    count: 0,
    rows: []
  })

  useEffect(() => {

  }, [param.id])

  return (
    <>
      <Image src='' height={230} fit='cover' />
      <section className='h-14 relative'>
        <div className='absolute w-5/6 h-20 left-1/2 -top-10 z-50 -translate-x-1/2 shadow-xl bg-white rounded-md bg-opacity-90 py-2.5 pl-4'>
          <ul className='space-y-2 text-xl'>
            <li><span className='font-bold'>姓名：</span>陈国强</li>
            <li className='col-span-2'><span className='font-bold'>电话：</span>18081990075</li>
          </ul>
        </div>
      </section>
      <div className='mt-3 mb-2 flex justify-between px-3'>
        <h3 className='font-bold text-lg'>客户列表({users.count})</h3>
        <Button color='primary' size='small'>新增</Button>
      </div>
      <div className='px-3 flex space-x-3 mb-3'>
        <Input placeholder='请输入客户姓名或手机号' className='flex-1 border px-2 py-1' />
        <Button color='warning' size='small'>查询</Button>
      </div>
      <ul className='text-base px-3'>
        {
          users.rows.map((user) =>
            <UserItem key={user.id}>
              <aside className='flex justify-end space-x-3 mt-2'>
                <Button color='primary' fill='outline' size='small'>编辑</Button>
                <Button color='danger' fill='outline' size='small'>删除</Button>
              </aside>
            </UserItem>
          )
        }
        <div className='flex justify-center mt-3'><Button>加载更多</Button></div>
      </ul>
      <h3 className='font-bold text-lg mb-2 px-3'>跟踪记录(130)</h3>
      <ul className='text-base px-3 space-y-3'>
        <li className='bg-gray-50 p-2'>
          <Link to='/user/1' className='flex justify-between items-center border-b mb-2 pb-2'>
            <h4 className='text-lg space-x-3 flex items-center'>
              <span className='text-gray-800'>客户：李广利</span>
              <span className='inline-block bg-orange-500 text-white px-1 rounded text-sm'>跟进中</span>
            </h4>
            <aside className='text-gray-500'>2023-04-03</aside>
          </Link>
          <Link to='/user/1' className='text-gray-500 pr-1 text3 flex-1'>今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中</Link>
          
          <aside className='flex justify-end space-x-3'>
            <Button color='primary' fill='outline' size='small'>编辑</Button>
            <Button color='danger' fill='outline' size='small'>删除</Button>
          </aside>
        </li>
        <div className='flex justify-center mt-8'><Button>加载更多</Button></div>
      </ul>
    </>
  )
}

export default show