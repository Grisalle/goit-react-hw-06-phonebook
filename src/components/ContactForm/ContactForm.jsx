import { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = ({ createUser, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = name => event => {
    const { value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in your contacts`);
      return;
    }

    if (number && name) {
      createUser({ name, number });
      setName('');
      setNumber('');
    }
  };

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <label>
        <p>Name:</p>
        <input
          className={css.inputName}
          type="text"
          value={name}
          onChange={handleChange('name')}
          name="name"
          maxLength="16"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <p>Number:</p>
        <input
          className={css.inputNumber}
          type="tel"
          value={number}
          onChange={handleChange('number')}
          name="number"
          maxLength="13"
          pattern="\+?\d{1,4}?[.\-\s]?\(?\d{1,3}?\)?[.\-\s]?\d{1,4}[.\-\s]?\d{1,4}[.\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.addBtn}>
        Add contact
      </button>
    </form>
  );
};
