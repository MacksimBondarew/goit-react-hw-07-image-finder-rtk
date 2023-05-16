import { ContactsList, ContactItem, Error } from './NameList.styled';
import ContactName from '../ContactName/ContactName';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/selectors';
import { useGetContactsQuery } from '../../redux/contacts';
import { DotLoader } from 'react-spinners';

const NameList = () => {
    const { data, isError, isLoading } = useGetContactsQuery();

    const filter = useSelector(selectFilter);

    const getVisibleName = () => {
        const normalizedName = filter.trim().toLowerCase();
        const filterContacts = data.filter(contact =>
            contact.name.toLowerCase().includes(normalizedName)
        );
        return [...filterContacts].sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name)
        );
    };

    return (
        <>
            {isLoading && (
                <>
                    <DotLoader
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            zIndex: '999',
                        }}
                        color="#3682d6"
                        cssOverride={{}}
                        loading
                        size={50}
                    />
                </>
            )}
            {isError ? (
                <>
                    <Error>
                        Sorry, an error occurred while loading this page. Please
                        try again later.
                    </Error>
                </>
            ) : (
                <>
                    {data && (
                        <ContactsList>
                            {getVisibleName().map(({ id, name, number }) => (
                                <ContactItem key={id}>
                                    <ContactName
                                        id={id}
                                        name={name}
                                        number={number}
                                    />
                                </ContactItem>
                            ))}
                        </ContactsList>
                    )}
                </>
            )}
        </>
    );
};

export default NameList;
