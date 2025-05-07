import { useContext } from 'react'
import { MultisynqContext, IMultisynqContext } from '../components/MultisynqContext'
import { ReactModel } from '../ReactModel'

export function useMultisynqContext<M extends ReactModel>(): IMultisynqContext<M> {
  const contextValue = useContext(MultisynqContext as React.Context<IMultisynqContext<M> | undefined>)
  if (!contextValue) throw new Error('Not inside Multisynq context')
  return contextValue
}
