import { useState, useEffect, useRef } from 'react';
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

  function removeContact(id) {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  }

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

// export class App extends Component {
//   state = {
//     contacts: [{ id: nanoid(), name: 'dArtagnan', number: '132-14-88' }],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('my-contacts'));
//     if (contacts) {
//       this.setState({
//         contacts,
//       });
//     }
//   }
//   componentDidUpdate(prPrs, { contacts }) {
//     if (contacts !== this.state.contacts) {
//       localStorage.setItem('my-contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;
//     if (contacts.some(el => el.name === name)) {
//       return alert(`${name} is already in contacts.`);
//     }
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts],
//     }));
//   };

//   removeContact = id => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   handleFilter = ({ target }) => {
//     this.setState({
//       filter: target.value,
//     });
//   };

//   getFilteredContact = () => {
//     const { contacts, filter } = this.state;
//     if (!filter) {
//       return contacts;
//     }
//     const normalizeInput = filter.toLowerCase();
//     const renderArr = contacts.filter(el =>
//       el.name.toLowerCase().includes(normalizeInput)
//     );
//     return renderArr;
//   };

//   render() {
//     const { addContact, handleFilter, removeContact } = this;
//     const { filter } = this.state;
//     const contacts = this.getFilteredContact();
//     return (
//       <div>
//         <h1 className="titleOne">Phonebook</h1>
//         <ContactForm onSubmit={addContact} />
//         <h2 className="titleTwo">Contacts</h2>
//         <Filter value={filter} onChange={handleFilter} />
//         <ContactList contacts={contacts} removeContact={removeContact} />
//       </div>
//     );
//   }
// }
