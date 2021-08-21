const fs = require("fs/promises")
const path = require("path")

const contactsPath = path.join(__dirname, "db/contacts.json")

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    const contactsList = JSON.parse(data)
    return contactsList
  } catch (error) {
    throw error
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts()
    const selectContact = contactsList.find(
      (item) => item.id === Number(contactId)
    )

    if (!selectContact) {
      throw new Error(`Contact with id = ${contactId} not found`)
    }

    return selectContact
  } catch (error) {
    throw error
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts()
    const contactsIndex = contactsList.findIndex(
      (item) => item.id === Number(contactId)
    )

    if (contactsIndex === -1) {
      throw new Error(`Contact with id = ${contactId} not found`)
    }

    const removedContact = await contactsList.splice(contactsIndex, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contactsList))

    return removedContact
  } catch (error) {
    throw error
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = await listContacts()

    const checkId = (id) =>
      contactsList.some((item) => item.id === id) ? checkId(id + 1) : id

    const addNewContact = {
      id: checkId(contactsList.length),
      name,
      email,
      phone,
    }

    contactsList.push(addNewContact)

    await fs.writeFile(contactsPath, JSON.stringify(contactsList))

    return addNewContact
  } catch (error) {
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
