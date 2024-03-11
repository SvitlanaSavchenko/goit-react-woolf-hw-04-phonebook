import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = ({ onAdd, onCheckUnique }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const { name, number } = formData;

    const isValidatedForm = validateForm();

    if (!isValidatedForm) return;

    onAdd({ id: uuid(), name, number });
    resetForm();
  };

  const validateForm = () => {
    const { name, number } = formData;

    if (!name || !number) {
      alert('Some field is empty');
      return false;
    }

    return onCheckUnique(name);
  };

  const resetForm = () => setFormData(INITIAL_STATE);

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Enter name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        value={formData.name}
        onChange={handleChangeForm}
      />
      <input
        className={styles.input}
        type="tel"
        name="number"
        placeholder="Enter phone number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        value={formData.number}
        onChange={handleChangeForm}
      />
      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
