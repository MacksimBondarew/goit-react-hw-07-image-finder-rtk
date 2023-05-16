import {
    FilterContainer,
    FilterNameLabel,
    FilterImput,
    FilterNameSpan,
    FilterImputIcon,
} from './FilterName.styled';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilterContact } from '../../redux/filter';
import { selectFilter } from '../../redux/selectors';

const FilterName = () => {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);
    const changeFilter = e => {
        dispatch(changeFilterContact(e.target.value));
    };
    return (
        <FilterContainer>
            <FilterNameLabel>
                <FilterNameSpan>Filter Name</FilterNameSpan>
                <FilterImput
                    type="text"
                    value={filter}
                    onChange={changeFilter}
                />
                <FilterImputIcon viewBox="0 0 24 24">
                    <path d="M21.71,20.29l-5.05-5a8,8,0,1,0-1.41,1.41l5,5a1,1,0,0,0,1.41-1.41Zm-13.12-6.44a6,6,0,1,1,6-6A6,6,0,0,1,8.59,13.85Z"></path>
                </FilterImputIcon>
            </FilterNameLabel>
        </FilterContainer>
    );
};

export default FilterName;
