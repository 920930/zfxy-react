import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { Toast, Button } from "antd-mobile";
import http from "../../utils/http";
import { debounce } from "../../utils/state";

const Index = () => {
  const { code } = useParams<{code: string}>();

  const [pageCount, setPageCount] = useState(1)
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

  const removeUrl = () => {
    setTimeout(() => URL.revokeObjectURL(blob), 2000)
  }

  const [page, setPage] = useState('1');
  const [count, setCount] = useState(0);
  const downExcelFn = debounce((page: string) => {
    http.get<Blob>('/excel/' + code + `?page=${page}`, null, {responseType: 'blob'}, (num: any) => {setCount(num)})
    .then(ret => {
      const url = URL.createObjectURL(ret)
      setBlob(url)
      Toast.show('正在下载')
    })
    .then(() => setTimeout(() => aNode.current?.click(), 900))
  }, 800)
  const aNode = useRef<HTMLAnchorElement | null>()
  return (
    <>
    {wechat
      ? <div className="p-3">60s内过期，请在其他浏览器中打开下载</div>
      : <div className="container mx-auto p-3">
        <h3 className="text-3xl mb-2">您正在下载中储福森集团数据，请勿外传</h3>
        <span className="text-xl">数据总数为{count}条 - 共{pageCount}页</span>
        <br />
        <select defaultValue={page} onChange={e => setPage(e.target.value)} className="my-3 border px-4 py-1 outline-none">
          {Array.from({length: pageCount}).map((item, i) => <option key={i} value={`${i+1}`}>第{i + 1}页</option>)}
        </select>
        <br />
        <Button onClick={() => downExcelFn(page) }>加载</Button>
        <a href={blob} download={`中储福森${code}.xlsx`} ref={(e) => aNode.current = e}></a>
      </div>
    }
    </>
  )
}

export default Index