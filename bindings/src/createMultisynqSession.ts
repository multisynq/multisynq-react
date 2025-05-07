import { Session, MultisynqSessionParameters } from '@multisynq/client'
import { MultisynqReactView } from './MultisynqReactView'
import { ReactModel } from './ReactModel'

export interface MultisynqReactSessionParameters<M extends ReactModel, T = unknown>
  extends Omit<MultisynqSessionParameters<M, MultisynqReactView<M>, T>, 'view'> {}

/** When Multisynq is used in a component that is a part of a bigger application,
 * it is sometimes better to establish the Multisynq session instance outside,
 * and then pass it in to the Multisynq-powered part.

 * ```
 *  const [multisynqSession, setMultisynqSession] = useState(null)
 *  const [multisynqView, setMultisynqView] = useState(null)
 *  const calledOnce = useRef(false)
 *  useEffect(() => {
 *    if (!calledOnce.current) {
 *      calledOnce.current = true
 *      const sessionParams = {
 *        name: projectId,
 *        apiKey: import.meta.env.VITE_MULTISYNQ_API_KEY,
 *        tps: 0.5,
 *        appId: import.meta.env.VITE_MULTISYNQ_APP_ID,
 *        password: 'abc',
 *        model: MyMultisynqModel,
 *        eventRateLimit: import.meta.env.EVENT_RATE_LIMIT || 60,
 *      }
 *      createMultisynqSession(sessionParams as any).then((session) => {
 *        console.log(`session created`)
 *        setMultisynqSession(session)
 *        setMultisynqView(session.view)
 *        setSyncedCallback((flag) => {
 *           console.log(`synced`, flag)
 *           if (flag) {
 *              setMultisynqView((old) => session.view)
 *           }
 *           session.view.detachCallback = (e) => {
 *             console.log(`detached`)
 *             setMultisynqView(null)
 *           }
 *        })
 *      })
 *    }
 *  }, [])
 *  return (
 *    <MultisynqRoot multisynqView={multisynqView}>
 *      <MyMultisynqComponent/>
 *    </MultisynqRoot>
 *   )
```
*/
export async function createMultisynqSession<M extends ReactModel>(params: MultisynqReactSessionParameters<M>) {
  const sessionParams = { ...params, view: MultisynqReactView<M>, flags: [ 'react' ] }
  return Session.join(sessionParams)
}
