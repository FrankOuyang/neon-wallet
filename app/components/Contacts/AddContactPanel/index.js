// @flow
import { compose, withProps } from 'recompose'
import { trim } from 'lodash'

import AddContactPanel from './AddContactPanel'
import { addContactActions } from '../../../actions/contactsActions'
import withProgressChange from '../../../hocs/withProgressChange'
import withActions from '../../../hocs/api/withActions'
import { LOADED } from '../../../values/state'

const mapContactActionsToProps = (actions, props) => ({
  onSave: (name, address) => actions.request({ name: trim(name), address: trim(address) })
})

export default compose(
  withProps(({ name }) => ({ oldName: name })),
  withProgressChange(addContactActions, LOADED, (props) => props.onSave && props.onSave()),
  withActions(addContactActions, mapContactActionsToProps)
)(AddContactPanel)
