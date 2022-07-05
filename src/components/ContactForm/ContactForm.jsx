import PropTypes from 'prop-types';
import { useState, memo } from 'react';
import s from './contactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });
  const { name, number } = state;

  function handleChange({ target }) {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...state });
    setState({
      name: '',
      number: '',
    });
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label} htmlFor="">
        Name
        <input
          value={name}
          type="text"
          name="name"
          onChange={handleChange}
          className={s.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={s.label} htmlFor="">
        Number
        <input
          value={number}
          type="tel"
          name="number"
          onChange={handleChange}
          className={s.input}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={s.btn}>
        Add contact
      </button>
    </form>
  );
};

export default memo(ContactForm);

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
