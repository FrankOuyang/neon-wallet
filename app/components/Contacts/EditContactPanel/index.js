// @flow
import { compose, withProps } from 'recompose'
import { trim } from 'lodash'

import EditContactPanel from './EditContactPanel'
import { updateContactActions } from '../../../actions/contactsActions'
import withActions from '../../../hocs/api/withActions'
import withProgressChange from '../../../hocs/withProgressChange'
import { LOADED } from '../../../values/state'

const mapContactActionsToProps = (actions, props) => ({
  onSave: (name, address) => {
    return actions.request({ oldName: props.oldName, newName: trim(name), newAddress: trim(address) })
  }
})

export default compose(
  withProps(({ name }) => ({ oldName: name })),
  withProgressChange(updateContactActions, LOADED, (props) => props.onSave && props.onSave()),
  withActions(updateContactActions, mapContactActionsToProps)
)(EditContactPanel)
