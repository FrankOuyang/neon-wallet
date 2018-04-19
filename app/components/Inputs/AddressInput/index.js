// @flow
import contactsActions from '../../../actions/contactsActions'
import withData from '../../../hocs/api/withData'

import AddressInput from './AddressInput'

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

export default withData(contactsActions, mapContactsDataToProps)(AddressInput)
