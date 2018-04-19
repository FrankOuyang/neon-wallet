// @flow
import contactsActions from '../../actions/contactsActions'
import withData from '../../hocs/api/withData'

import Contacts from './Contacts'

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

export default withData(contactsActions, mapContactsDataToProps)(Contacts)
