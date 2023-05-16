import { useState } from 'react';
import {
    ContactForm,
    NameInput,
    NumberInput,
    AddContactButton,
    LabelName,
    LabelPhone,
} from './NameEditor.styled';
import PropTypes from 'prop-types';
import { useAddContactMutation } from '../../redux/contacts';
import { nanoid } from '@reduxjs/toolkit';

const NameEditor = ({ onSubmit, people }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [addContact] = useAddContactMutation();

    async function handleChange(e) {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                break;
        }
    }

    function removeNonDigits(str) {
        return str.replace(/\D/g, '');
    }

    const handleSubmit = e => {
        e.preventDefault();

        const nameFound = people.find(
            people =>
                people.name.toLowerCase() === name.toLowerCase() ||
                removeNonDigits(people.number) === removeNonDigits(number)
        );

        if (nameFound) {
            alert(`${name} and phone number ${number} is already in contacts`);
            return;
        }
        onSubmit(name, number);
        const contact = {
            id: nanoid(),
            name,
            number,
        };

        addContact(contact);
        setName('');
        setNumber('');
    };

    return (
        <ContactForm onSubmit={handleSubmit}>
            <LabelName htmlFor="name">Name:</LabelName>
            <NameInput
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
            <LabelPhone htmlFor="number">Phone Number:</LabelPhone>
            <NumberInput
                type="tel"
                name="number"
                value={number}
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />
            <AddContactButton type="submit">add Contact</AddContactButton>
        </ContactForm>
    );
};

NameEditor.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    people: PropTypes.array.isRequired,
};

export default NameEditor;
