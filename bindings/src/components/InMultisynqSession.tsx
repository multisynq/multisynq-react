import { useEffect, useState, createElement } from 'react'
import { Session, MultisynqSession } from '@multisynq/client'
import { MultisynqReactView } from '../MultisynqReactView'
import { MultisynqContext } from './MultisynqContext'
import { MultisynqReactSessionParameters } from '../createMultisynqSession'
import { ReactModel } from '../ReactModel'

// InMultisynqSession parameter is almost the same but omits `view`,
// which is defaulted to MultisynqReactView, but adds children
interface InMultisynqSessionProps<M extends ReactModel> extends Omit<MultisynqReactSessionParameters<M>, 'name' | 'password'> {
  name: string
  password: string
  children: React.ReactNode | React.ReactNode[]
}

/** Main wrapper component that starts and manages a Multisynq session, enabling child elements to use the
 * {@link usePublish}, {@link useSubscribe}, {@link useObservable}, {@link useViewId} and {@link useModelRoot} hooks.
 *
 * Takes the same parameters as {@link Session.join} except that it doesn't need a root View class,
 * since multisynq-react provides a suitable View class behind the scenes.
 *
 * ```
 * function MyApp() {
 *    return (
 *      <InMultisynqSession
 *        apiKey='1_123abc',
 *        appId='com.example.myapp'
 *        name='mySession'
 *        password='secret'
 *        model={MyRootModel}
 *        ...
 *      >
 *        // child elements that use hooks go here...
 *      </InMultisynqSession>
 *    )
 * }
 * ```
 */
export function InMultisynqSession<M extends ReactModel>(params: InMultisynqSessionProps<M>): JSX.Element | null {
  const children = params.children
  const [multisynqSession, setMultisynqSession] = useState<MultisynqSession<MultisynqReactView<M>> | undefined>(undefined)
  const [joining, setJoining] = useState<boolean>(false)
  useEffect(() => {
    console.log('InMultisynqSession effect')
    setJoining((old) => {
      if (old) return old
      const sessionParams = { ...params, view: MultisynqReactView<M>, flags: [ 'react' ]}
      delete sessionParams.children
      console.log('calling Session.join()')
      Session.join({ ...sessionParams }).then(setMultisynqSession)
      return true
    })
    return () => {
      // we don't have to reset the session object or such.
      // The same Multisynq session should be kept during the life time of the page
      // unless it is explicitly destroyed.
      // console.log('unmount')
    }
  }, [joining, params])

  if (multisynqSession) {
    const contextValue = {
      session: multisynqSession,
      view: multisynqSession.view,
      model: multisynqSession.view.model,
      setSession: () => {},
      leaveSession: () => {},
      sessionParams: params,
    }
    return createElement(MultisynqContext.Provider, { value: contextValue }, children)
  }
  return null
}
