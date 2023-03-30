import React from 'react'

type Props = {}

const Home = (props: Props) => {
  console.log('home')
  return (
    <>
      <div>Home</div>
    </>
  )
}

export default React.memo(Home)