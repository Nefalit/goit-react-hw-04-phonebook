import PropTypes from 'prop-types';
import ContactItem from './ContactItem/ContactItem';
import s from './contactList.module.css';

const ContactList = ({ contacts, removeContact }) => {
  const renderArr = contacts.map(({ id, name, number }) => (
    <ContactItem
      key={id}
      id={id}
      name={name}
      number={number}
      onClick={() => removeContact(id)}
    />
  ));
  return (
    <div className={s.wrapper}>
      <ul className={s.list}>{renderArr}</ul>
    </div>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeContact: PropTypes.func.isRequired,
};
