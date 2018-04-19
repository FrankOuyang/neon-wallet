// @flow
import { wallet } from 'neon-js'
import { has, isEmpty, keys, values, indexOf, zipObject, omit } from 'lodash'

import createRequestActions from '../util/api/createRequestActions'
import { getStorage, setStorage } from '../core/storage'

type Contacts = {
  [name: string]: string
}

const STORAGE_KEY = 'addressBook'

const getContacts = async (): Promise<Contacts> => {
  return getStorage(STORAGE_KEY)
}

const setContacts = async (contacts: Contacts): Promise<any> => {
  return setStorage(STORAGE_KEY, contacts)
}

const validateContact = (name: string, address: string) => {
  if (isEmpty(name)) {
    throw new Error('Name cannot be empty.')
  }

  if (!wallet.isAddress(address)) {
    throw new Error(`Invalid address ${address}.`)
  }
}

export const ID = 'CONTACTS'

export const addContactActions = createRequestActions(ID, (
  { name, address }: { name: string, address: string }
) => async (state: Object): Promise<Contacts> => {
  validateContact(name, address)

  const contacts = await getContacts()

  if (has(contacts, name)) {
    throw new Error(`Contact "${name}" already exists.`)
  }

  const newContacts = { ...contacts, [name]: address }
  await setContacts(newContacts)

  return newContacts
})

export const updateContactActions = createRequestActions(ID, (
  { oldName, newName, newAddress }: { oldName: string, newName: string, newAddress: string }
) => async (state: Object): Promise<Contacts> => {
  validateContact(newName, newAddress)

  const contacts = await getContacts()
  const names = keys(contacts)
  const addresses = values(contacts)
  const index = indexOf(names, oldName)

  if (index === -1) {
    throw new Error(`Contact "${oldName}" does not exist.`)
  }

  const newContacts = zipObject(
    [...names.slice(0, index), newName, ...names.slice(index + 1)],
    [...addresses.slice(0, index), newAddress, ...addresses.slice(index + 1)]
  )
  await setContacts(newContacts)

  return newContacts
})

export const deleteContactActions = createRequestActions(ID, (
  { name }: { name: string }
) => async (state: Object): Promise<Contacts> => {
  const contacts = await getContacts()

  if (!has(contacts, name)) {
    throw new Error(`Contact "${name}" does not exist.`)
  }

  const newContacts = omit(contacts, name)
  await setContacts(newContacts)

  return newContacts
})

export default createRequestActions(ID, () => async (state: Object): Promise<Contacts> => {
  return getContacts()
})
