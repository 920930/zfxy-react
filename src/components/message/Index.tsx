import { useEffect } from "react";
import ReactDOM from 'react-dom/client'

const View = (props: any) => {
  console.log(props)
  return (
    <div>{props.title}</div>
  )
}

const Message = (props: any) => {
  const root = ReactDOM.createRoot(document.getElementById('message'))
  root.render(<View {...props}/>)
  setTimeout(() => root.unmount(), 3000)
}

Message.success = (text: string) => {
  Message({type: 'success', text})
}

export default Message;