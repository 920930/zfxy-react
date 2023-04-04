import NoteItem from '@/components/item/note'

type Props = {}

const list = (props: Props) => {
  return (
    <ul className='my-3 px-3 text-base'>
      {
        Array.from({length: 15}).map((item, i) => <NoteItem key={i} />)
      }
    </ul>
  )
}

export default list