import { useMultisynqContext } from './useMultisynqContext'
import { MultisynqReactView } from '../MultisynqReactView'
import { ReactModel } from '../ReactModel'

export function useView<M extends ReactModel>(): MultisynqReactView<M> | null {
  const { view } = useMultisynqContext<M>()
  return view
}
