import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
  showBorder?: boolean
}

const kehu = (props: Props) => {
  const { showBorder = true } = props;
  const navigate = useNavigate()

  return (
    <li className={showBorder ? 'border-b mb-2 pb-2' : '' } onClick={() => navigate('/user/1')}>
      <section className='flex'>
        <div className='h-28 w-24 bg-gray-100 text-gray-500 relative text-center pt-3'>
          <span className='tracking-widest text-xl font-bold' style={{writingMode: 'vertical-lr'}}>买买提</span>
          <span className='absolute bottom-0 left-0 w-full bg-gray-200 tracking-widest'>陈国强</span>
        </div>
        <section className='flex-1 pl-3'>
          <section className='flex justify-between items-center'>
            <span>行业：门窗</span>
            <aside className='text-white rounded text-sm bg-green-500 px-1'>已签约</aside>
          </section>
          <section className='flex justify-between items-center'>
            <aside className='text-gray-500'>180****0075</aside>
            <span className='text-gray-500'>2023-04-03</span>
          </section>
          <p className='text-gray-500 pt-1 border-t mt-1 text2'>简介：客户从事门窗行业多年客户从事门窗行业多年客户从事门窗年客户从事门窗行业多年</p>
        </section>
      </section>
    </li>
  )
}

export default kehu