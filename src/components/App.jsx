import { useState, useEffect, useRef, useCallback } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    const contactsFromStorage = JSON.parse(localStorage.getItem('my-contacts'));
    if (contactsFromStorage?.length) {
      setContacts(contactsFromStorage);
    }
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    } else {
      firstRender.current = false;
    }
  }, [contacts]);

  function addContact({ name, number }) {
    if (contacts.some(el => el.name === name)) {
      return alert(`${name} is already in contacts.`);
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [contact, ...prevState]);
  }

  const removeContact = useCallback(id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  }, [setContacts]);

  const handleFilter = ({ target }) => setFilter(target.value);

  function getFilteredContact() {
    if (!filter) {
      return contacts;
    }
    const normalizeInput = filter.toLowerCase();
    const renderArr = contacts.filter(el =>
      el.name.toLowerCase().includes(normalizeInput)
    );
    return renderArr;
  }
  const filteredContact = getFilteredContact();

  return (
    <div>
      <h1 className="titleOne">Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className="titleTwo">Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList contacts={filteredContact} removeContact={removeContact} />
    </div>
  );
};

export default App;
