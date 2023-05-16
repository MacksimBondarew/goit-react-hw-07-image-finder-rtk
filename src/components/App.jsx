import NameEditor from './NameEditor';
import NameList from './NameList';
import FilterName from './FilterName';
import { PhoneBook, TitleContacts, MainTitlePhoneBook } from './App.styled';

const App = () => {
    return (
        <PhoneBook>
            <MainTitlePhoneBook>Phonebook</MainTitlePhoneBook>
            <NameEditor />

            <TitleContacts>Contacts</TitleContacts>
            <FilterName />
            <NameList />
        </PhoneBook>
    );
};

export default App;
