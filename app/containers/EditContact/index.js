// @flow
import { compose, withProps } from 'recompose'
import { withRouter } from 'react-router-dom'

import EditContact from './EditContact'
import contactsActions from '../../actions/contactsActions'
import withData from '../../hocs/api/withData'

const mapNameToProps = (props) => ({
  name: decodeURIComponent(props.match.params.name)
})

const mapContactsDataToProps = (contacts: Object, ownProps: Object) => ({
  address: contacts[ownProps.name]
})

export default compose(
  withRouter,
  withProps(mapNameToProps),
  withData(contactsActions, mapContactsDataToProps)
)(EditContact)
