import {
    ContactNameSpan,
    ContactNumberSpan,
    RemoveContact,
} from '../NameList/NameList.styled';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from '../../redux/contacts';

const ContactName = ({ id, name, number }) => {
    const [deleteContact] = useDeleteContactMutation();
    return (
        <>
            <ContactNameSpan>{name}</ContactNameSpan>
            <ContactNumberSpan>{number}</ContactNumberSpan>
            <RemoveContact type="button" onClick={() => deleteContact(id)}>
                Видалити
            </RemoveContact>
        </>
    );
};
ContactName.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};

export default ContactName;
