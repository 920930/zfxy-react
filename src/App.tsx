import { useSelector } from 'react-redux';
import { RootState } from './store/typings'
type Props = {}

const App = (props: Props) => {
  const token = useSelector((state: RootState) => state.userReducer.token)
  return (
    <div>{token}</div>
  )
}

export default App