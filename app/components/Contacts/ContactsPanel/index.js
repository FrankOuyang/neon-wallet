// @flow
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import ContactsPanel from './ContactsPanel'
import { deleteContactActions } from '../../../actions/contactsActions'
import withActions from '../../../hocs/api/withActions'

const mapContactActionsToProps = (actions) => ({
  deleteContact: (name) => actions.request({ name })
})

export default compose(
  withRouter,
  withActions(deleteContactActions, mapContactActionsToProps)
)(ContactsPanel)
