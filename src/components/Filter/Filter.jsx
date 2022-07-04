import PropTypes from 'prop-types';
import s from './filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div className={s.wrapper}>
      <label className={s.label}>
        Find contacts by name
        <input
          value={value}
          type="text"
          onChange={onChange}
          className={s.input}
        />
      </label>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
