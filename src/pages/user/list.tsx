import { useState } from 'react'
import UserItem from '../../components/item/user'
import { InfiniteScroll } from 'antd-mobile'

export default () => {
  const [count, setCount] = useState(10)
  const [hasMore, setHasMore] = useState(true)
  const loadMore = async () => {
    setTimeout(() => {
      setCount(count+5)
      count > 20 ? setHasMore(false) : setHasMore(true)
    }, 2000)
  }
  return (
    <>
      <ul className='my-3 px-3 text-base'>
        {
          Array.from({length: count}).map((item, i) => <UserItem key={i} />)
        }
      </ul>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  )
}