import { CreateContactInput } from 'src/contact/dto/create-contact.input';
import { UpdateContactInput } from 'src/contact/dto/update-contact.input';
import { Contact } from 'src/contact/entities/contact.entity';

export class ContactRepositoryStub {
  findOne(where: { where: Contact }) {
    const contacts: Contact[] = [
      {
        id: 1,
        nickname: 'test',
        email: 'existing@email.com',
        phone: '(00) 00000-0000',
      },
    ];

    const contact = contacts.find(
      (contact) => contact.email === where.where.email,
    );
    return contact || null;
  }

  findOneBy(query: Contact) {
    const contacts: Contact[] = [
      {
        id: 1,
        nickname: 'test',
        email: 'existing@email.com',
        phone: '(00) 00000-0000',
      },
    ];

    const contact = contacts.find((contact) => {
      return Object.entries(query).every(([fieldName, fieldValue]) => {
        return contact[fieldName] === fieldValue;
      });
    });

    return contact || null;
  }

  save(createContactInput: CreateContactInput) {
    const contacts = [];

    contacts.push(createContactInput);

    return contacts[0];
  }

  update(id: number, updateContactInput: UpdateContactInput) {
    return {
      id: id,
      ...updateContactInput,
    };
  }

  find() {
    const contacts: Contact[] = [
      {
        id: 1,
        nickname: 'test',
        email: 'existing@email.com',
        phone: '(00) 00000-0000',
      },
      {
        id: 2,
        nickname: 'test',
        email: 'existin2g@email.com',
        phone: '(00) 00000-0000',
      },
    ];

    return contacts;
  }

  remove(contact: Contact) {
    let removeContact = contact;
    removeContact = null;
    return removeContact;
  }
}
