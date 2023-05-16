import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Input,
    FormFormik,
    AddContactButton,
    LabelName,
    LabelPhone,
    Error,
    ErroText,
    ErrorIcon,
} from './NameEditor.styled';
import {
    useAddContactMutation,
    useGetContactsQuery,
} from '../../redux/contacts';
import { nanoid } from '@reduxjs/toolkit';

const schema = object({
    name: string()
        .matches(
            /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
            "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        )
        .required(),
    number: string()
        .matches(
            /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
            'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +, 5 min numbers'
        )
        .required(),
}).required();

const NameEditorHookForm = () => {
    const [addContact] = useAddContactMutation();
    const { data: contacts } = useGetContactsQuery();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            number: '',
        },
        resolver: yupResolver(schema),
    });

    function removeNonDigits(str) {
        return str.replace(/\D/g, '');
    }

    const deliveryData = data => {
        const { name, number } = data;
        const nameFound = contacts.find(
            person =>
                person.name.toLowerCase() === name.toLowerCase() ||
                removeNonDigits(person.number) === removeNonDigits(number)
        );

        if (nameFound) {
            alert(`${name} and phone number ${number} is already in contacts`);
            return;
        }
        const contact = {
            id: nanoid(),
            name,
            number,
        };

        addContact(contact);
        // addName(name, number);
        reset();
    };

    return (
        <FormFormik onSubmit={handleSubmit(deliveryData)}>
            <LabelName htmlFor="name">Name:</LabelName>
            <Input
                type="text"
                name="name"
                {...register('name')}
                aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
                <Error>
                    <ErrorIcon>⚠️</ErrorIcon>
                    <ErroText>{errors.name.message}</ErroText>
                </Error>
            )}
            <LabelPhone htmlFor="number">Phone Number:</LabelPhone>
            <Input
                type="tel"
                name="number"
                {...register('number')}
                aria-invalid={errors.number ? 'true' : 'false'}
            />
            {errors.number && (
                <Error>
                    <ErrorIcon>⚠️</ErrorIcon>
                    <ErroText>{errors.number.message}</ErroText>
                </Error>
            )}

            <AddContactButton type="submit">add Contact</AddContactButton>
        </FormFormik>
    );
};

export default NameEditorHookForm;
