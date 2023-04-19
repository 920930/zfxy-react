import NoteItem from '../../components/item/note1'
import { useEffect, useState } from 'react'
import { size } from '../../utils/state'
import http from '../../utils/http'
import { INote } from '../../typings'
import { InfiniteScroll } from 'antd-mobile'
import { useSearchParams } from 'react-router-dom'

type Props = {}

const list = (props: Props) => {
  const [query] = useSearchParams()
  const adminerId = query.get('adminerId')

  const [notes, setNotes] = useState<{count: number; rows: INote[]}>({
    count: 0,
    rows: []
  })
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const loadMore = async () => getData()
  useEffect(() => getData(), [])

  const getData = () => {
    let url = `/note?page=${page}&size=${size}`;
    adminerId && (url += `&adminerId=${adminerId}`)
    http.get<{count: number; rows: INote[]}>(url).then(ret => {
      setHasMore(ret.rows.length >= size ? true : false)
      ret.rows.length >= size && setPage(page + 1)
      setNotes(({count, rows}) => {
        ret.rows.length && (rows = [...rows, ...ret.rows]);
        return {
          count,
          rows
        }
      })
    })
  }

  return (
    <>
      <ul className='my-3 px-3 text-base'>
        { notes.rows.map(note => <NoteItem note={note} key={note.id} /> )}
      </ul>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={20} />
    </>
  )
}

export default list