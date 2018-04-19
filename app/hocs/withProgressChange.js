// @flow
import React from 'react'
import { compose } from 'recompose'
import { omit, castArray } from 'lodash'

import withData from '../hocs/api/withData'
import withError from '../hocs/api/withError'
import withProgress from '../hocs/api/withProgressProp'
import { type Actions } from '../values/api'

const DATA_PROP: string = '__authData__'
const ERROR_PROP: string = '__authError__'
const PROGRESS_PROP: string = '__authProgress__'

type Props = {
  __authData__: Object,
  __authError__: string,
  __authProgress__: string
}

export default function withProgressChange (actions: Actions, progress: string, callback: Function) {
  const progresses = castArray(progress)

  const mapDataToProps = (data) => ({
    [DATA_PROP]: data
  })

  const mapErrorToProps = (error) => ({
    [ERROR_PROP]: error
  })

  return (Component: Class<React.Component<*>>) => {
    class WrappedComponent extends React.Component<Props> {
      componentWillReceiveProps (nextProps) {
        if (!progresses.includes(this.props[PROGRESS_PROP]) &&
            progresses.includes(nextProps[PROGRESS_PROP])) {
          callback(this.getCallbackState(nextProps), this.getCallbackProps(nextProps))
        }
      }

      render () {
        const passDownProps = omit(this.props, DATA_PROP, PROGRESS_PROP)
        return <Component {...passDownProps} />
      }

      getCallbackState = (props) => {
        return { data: props[DATA_PROP], error: props[ERROR_PROP] }
      }

      getCallbackProps = (props) => {
        return omit(props, DATA_PROP, ERROR_PROP, PROGRESS_PROP)
      }
    }

    return compose(
      withProgress(actions, { propName: PROGRESS_PROP }),
      withData(actions, mapDataToProps),
      withError(actions, mapErrorToProps)
    )(WrappedComponent)
  }
}
