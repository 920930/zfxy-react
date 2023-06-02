import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Avatar, Image, Button, Toast } from 'antd-mobile'
import UserItem from '../../components/item/user';
import Note2 from '../../components/item/note2';
import http from '../../utils/http'
import { IAdminer } from '../../typings';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/typings'

const show = () => {
  const me = useSelector((state: RootState) => state.userReducer.user);
  const navi = useNavigate();
  // 员工id
  const param = useParams();
  // 员工信息含客户，跟单记录
  const [adminer, setAdminer] = useState<IAdminer>();
  useEffect(() => {
    http.get<IAdminer>(`/adminer/${param.id}`)
    .then(ret => setAdminer(ret))
  }, [param.id])

  const outExcel = () => {
    if(me.roleId == 3) return Toast.show('您无权限')
    http.get<{code: string}>('/user/0/excel?type='+param.id).then(ret => navi(`/excel/${ret.code}`))
  }
  return (
    <>
      <section className='relative'>
        <Image src={adminer?.avatar} height={200} fit='cover' style={{ filter: 'blur(30px)'}} />
        <div className='absolute flex w-5/6 h-20 left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 shadow-xl bg-white rounded-md bg-opacity-90 py-2.5 pl-2.5'>
          <Avatar src={adminer ? adminer.avatar : '' } style={{ '--size': '3.85rem' }} />
          <ul className='space-y-2 text-xl ml-2'>
            <li><span className='font-bold'>姓名：</span>{adminer?.name}</li>
            <li className='col-span-2'><span className='font-bold'>电话：</span>{adminer?.phone}</li>
          </ul>
        </div>
        {
          me.roleId != 3 && <aside className="fixed right-5 bottom-20">
            <Button color="success" onClick={outExcel}>导出</Button>
          </aside>
        }
      </section>
      <div className='mt-3 mb-2 flex justify-between px-3'>
        <h3 className='font-bold text-lg'>客户列表({adminer?.userCount})</h3>
      </div>
      <ul className='text-base px-3'>
        {
          adminer?.users.map(user => <UserItem key={user.id} user={user} />)
        }
        <Link to={`/user/index?adminerId=${adminer?.id}`} className='flex justify-center mt-3 text-gray-700'>查看更多</Link>
      </ul>
      <h3 className='font-bold text-lg mb-2 px-3'>跟踪记录({adminer?.noteCount})</h3>
      <ul className='text-base px-3 space-y-3'>
        {
          adminer?.notes.map(note => <Note2 key={note.id} note={note} />)
        }
        <Link to={`/note?adminerId=${adminer?.id}`} className='flex justify-center mt-8 text-gray-700'>查看更多</Link>
      </ul>
    </>
  )
}

export default show