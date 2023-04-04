import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
  showBorder?: boolean
}

const note = (props: Props) => {
  const { showBorder = true } = props
  const navigate = useNavigate()
  return (
    <li className={showBorder ? 'border-b mb-2 pb-2' : '' } onClick={() => navigate('/user/1')}>
      <section className='flex justify-between items-center'>
        <h4 className='text-lg space-x-3 flex items-center'>
          <span>客户：李广利</span>
          <span className='inline-block bg-orange-500 text-white px-1 rounded text-sm'>跟进中</span>
        </h4>
        <aside className='text-gray-500'>2023-04-03</aside>
      </section>
      <section className='flex mt-2'>
        <p className='text-gray-500 pr-1 text3 flex-1'>今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中</p>
        <div className='w-14 bg-gray-100 text-center font-bold tracking-widest text-gray-500 pl-4' style={{writingMode: 'vertical-lr', height: '4.3rem'}}>陈国强</div>
      </section>
    </li>
  )
}

export default note