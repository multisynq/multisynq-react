import { createContext } from 'react'
import { ReactModel } from '../ReactModel'
import { MultisynqSession } from '@multisynq/client'
import { MultisynqReactView } from '../MultisynqReactView'
import { ReactSessionParameters } from './MultisynqRoot'

export interface IMultisynqContext<M extends ReactModel> {
  sessionParams: ReactSessionParameters<M>
  session: MultisynqSession<MultisynqReactView<M>> | null
  view: MultisynqReactView<M> | null
  model: M | null
  setSession: (newParams: Partial<Omit<ReactSessionParameters<M>, 'model'>>) => void
  leaveSession: () => void
}

// A React context that stores the Multisynq session, view, and model
export const MultisynqContext = createContext<IMultisynqContext<ReactModel> | undefined>(undefined)
