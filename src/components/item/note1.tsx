import { INote } from '@/typings';
import { useNavigate } from 'react-router-dom';
import { userState } from '@/utils/state';
import { UserOutline } from 'antd-mobile-icons';

type Props = {
  showBorder?: boolean;
  note: INote
}

const note = (props: Props) => {
  const { showBorder = true, note } = props
  const navigate = useNavigate()
  const userLink = () => navigate(`/user/${note.user.id}`)
  const adminerLink = () => navigate(`/adminer/${note.adminer.id}`)
  return (
    <li className={showBorder ? 'border-b mb-2 pb-2' : '' }>
      <section className='flex justify-between items-center' onClick={userLink}>
        <h4 className='text-lg flex items-center'>
          <UserOutline className='-mt-0.5' />
          <span className='ml-1 mr-3'>{note.user.name}</span>
           {/* ${userState[note.user.state].class} */}
          <span className={`inline-block text-white px-1 rounded text-sm ${userState[note.user.state].class}`}>{userState[note.user.state].title}</span>
        </h4>
        <aside className='text-gray-500'>{note.createdAt}</aside>
      </section>
      <section className='flex mt-2'>
        <p className='text-gray-500 pr-1 text3 flex-1'>{note.content}</p>
        <div onClick={adminerLink} className='w-14 bg-gray-100 text-center font-bold tracking-widest text-gray-500 pl-4' style={{writingMode: 'vertical-lr', height: '4.3rem'}}>{note.adminer.name}</div>
      </section>
    </li>
  )
}

export default note