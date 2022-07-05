import { memo } from 'react';
import PropTypes from 'prop-types';
import s from './contactItem.module.css';

const ContactItem = ({ name, number, onClick }) => {
  return (
    <li className={s.items}>
      <p>
        {name} : <span className={s.span}>{number}</span>
      </p>
      <button type="button" className={s.btn} onClick={onClick}>
        Delete
      </button>
    </li>
  );
};

export default memo(ContactItem);

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
