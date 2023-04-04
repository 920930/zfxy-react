import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Image, WaterMark } from 'antd-mobile'

type Props = {}

const show = (props: Props) => {
  const param = useParams()
  const [lizi, setLizi] = useState({
    en: '',
    zh: '',
    pic: ''
  })
  useEffect(() => {
    axios.get('https://api.vvhan.com/api/en?type=sj')
      .then(ret => setLizi(ret.data.data))
  }, [param.id])
  return (
    <>
      <Image src={lizi.pic} height={200} fit='cover' />
      <section className='h-20 relative'>
        <div className='absolute w-5/6 h-28 left-1/2 -top-12 z-50 -translate-x-1/2 shadow-xl bg-white rounded-md bg-opacity-90 p-3 text-base'>
          <ul className='grid grid-cols-2 gap-x-3.5 gap-y-2.5'>
            <li><span className='font-bold'>客户：</span>李孝利</li>
            <li><span className='bg-green-500 text-white px-1 rounded-sm py-0.5'>已签约</span></li>
            <li className='col-span-2'><span className='font-bold'>电话：</span>18081990075</li>
            <li className='col-span-2'><span className='font-bold'>行业：</span>门窗、灯饰</li>
          </ul>
        </div>
      </section>
      <p className='px-3 text-base'><span className='font-bold'>简介：</span>客户从事门窗行业多年客户从事门窗行业多年客户从事门窗年客户从事门窗行业多年</p>
      <p className='text-base mt-3 px-3'><span className='font-bold'>创立时间：</span>2023-04-02</p>
      <p className='text-base mt-3 px-3'><span className='font-bold'>跟单员工：</span>陈国强</p>
      <h3 className='font-bold text-lg mt-3 px-3 border-t pt-3'>TA的跟踪记录</h3>
          <ul className='text-base mt-1 px-3 space-y-4'>
            <li className='bg-green-50 p-3'>
              <div className='flex justify-between border-b mb-2 pb-2'>
                <h4>跟单人：黄健</h4>
                <aside>跟单时间：2023-04-02</aside>
              </div>
              <p className='text-gray-600'>今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中</p>
            </li>
            <li className='bg-green-50 p-3'>
              <div className='flex justify-between border-b mb-2 pb-2'>
                <h4>跟单人：黄健</h4>
                <aside>跟单时间：2023-04-02</aside>
              </div>
              <p className='text-gray-600'>今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中</p>
            </li>
            <li className='bg-green-50 p-3'>
              <div className='flex justify-between border-b mb-2 pb-2'>
                <h4>跟单人：黄健</h4>
                <aside>跟单时间：2023-04-02</aside>
              </div>
              <p className='text-gray-600'>今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中</p>
            </li>
            <li className='bg-green-50 p-3'>
              <div className='flex justify-between border-b mb-2 pb-2'>
                <h4>跟单人：黄健</h4>
                <aside>跟单时间：2023-04-02</aside>
              </div>
              <p className='text-gray-600'>今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中</p>
            </li>
            <li className='bg-green-50 p-3'>
              <div className='flex justify-between border-b mb-2 pb-2'>
                <h4>跟单人：黄健</h4>
                <aside>跟单时间：2023-04-02</aside>
              </div>
              <p className='text-gray-600'>今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中</p>
            </li>
            <li className='bg-green-50 p-3'>
              <div className='flex justify-between border-b mb-2 pb-2'>
                <h4>跟单人：黄健</h4>
                <aside>跟单时间：2023-04-02</aside>
              </div>
              <p className='text-gray-600'>今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中</p>
            </li>
            <li className='bg-green-50 p-3'>
              <div className='flex justify-between border-b mb-2 pb-2'>
                <h4>跟单人：黄健</h4>
                <aside>跟单时间：2023-04-02</aside>
              </div>
              <p className='text-gray-600'>今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中今日邀约客户到华阳店查看店铺，客户很满意，也提出了一些要求，继续跟进中</p>
            </li>
          </ul>
      <WaterMark content='中储福森客户名单' zIndex={0} />
    </>
  )
}

export default show