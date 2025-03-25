import { FC } from "react";
import { SearchBarProps } from "../../interfaces/SearchBarProps";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { plpAction } from "../../store/plp/slice";
import styles from './searchBar.module.css';

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.plp.query);

    const onSubmitHandler = () => {
        onSearch();
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onSearch();
        }
    }

    const onChangeQueryHandler = (queryString: string) => {
        dispatch(plpAction.setQuery(queryString));
    };

    return (
        <>
            <div className={styles.searchBar}>
                <input
                    className={styles.input}
                    type="text"
                    value={query}
                    placeholder="Search products..."
                    onChange={e => onChangeQueryHandler(e.target.value)}
                    onKeyDown={e => onKeyDownHandler(e)}
                />
                <button className={styles.button} onClick={onSubmitHandler}>Search</button>
            </div>
        </>
    );
}

export default SearchBar;