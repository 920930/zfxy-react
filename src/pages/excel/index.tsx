import { useParams, useSearchParams } from "react-router-dom"
import { Toast, Input, Button } from "antd-mobile";
import http from "../../utils/http";
import { ReactNode, useEffect, useRef, useState } from "react";

const Index = () => {
  const { code } = useParams<{code: string}>();
  const [searchParams, setSearchParams] = useSearchParams();
  const count = searchParams.get('count');
  const pageCount = Math.ceil(Number.parseInt(count || '0') / 1000);

  const [wechat, setWechat] = useState(false);
  const [blob, setBlob] = useState('');
  useEffect(() => {
    const ua = navigator.userAgent.toLocaleLowerCase();
    if(/Micromessenger/i.test(ua)){
      setWechat(true)
    }else{
      setWechat(false)
    }
    return () => removeUrl()
  }, []);

  const downExcel = (page: string) => {
    http.get<Blob>('/excel/' + code + `?page=${page}`, null, {responseType: 'blob'})
    .then(ret => {
      console.log(ret)
      const url = URL.createObjectURL(ret)
      setBlob(url)
      Toast.show('正在下载')
    })
    .then(() => setTimeout(() => aNode.current?.click(), 900))
  }

  const removeUrl = () => {
    setTimeout(() => URL.revokeObjectURL(blob), 2000)
  }

  let [num, setNum] = useState(60)
  useEffect(() => {
    let n = 60
    const timer = setInterval(() => {
      if(n <= 0) clearInterval(timer)
      setNum(n--)
      return () => clearInterval(timer)
    }, 1000)
  }, [])

  const [page, setPage] = useState('1');
  const downExcelFn = () => downExcel(page);

  const aNode = useRef<HTMLAnchorElement | null>()
  return (
    <>
    {wechat
      ? <div className="p-3">{num >= 1 ? num +'s内过期，请在其他浏览器中打开下载' : '已过期'}</div>
      : <div className="container mx-auto p-3">
        <h3 className="text-3xl mb-2">您正在下载中储福森集团数据，请勿外传</h3>
        <span className="text-xl">总页码{pageCount} - 数据总数为{count}条</span>
        <div className=" my-3">
          <span></span>
          <Input type="number" max={pageCount} value={page} onChange={i => setPage(i)} className="border" />
        </div>
        <Button onClick={downExcelFn}>下载</Button>
        <a href={blob} download='中储福森.xlsx' ref={(e) => aNode.current = e}></a>
      </div>
    }
    </>
  )
}

export default Index