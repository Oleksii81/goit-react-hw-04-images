import { useState } from "react";
import { SearchStyles } from "./Searchbar.styled";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Searchbar = ({ getInputValue }) => {
    const [input, setInput] = useState('');

    const search = e => {
        e.preventDefault();
        if (input.trim() === '') {
            toast.error('Please enter a valid search query.');
            return;
        }
        getInputValue(input);
        setInput('');
    };

    const handleChange = e => {
        setInput(e.target.value);
    };

    return (
        <SearchStyles onSubmit={search}>
            <div className="form">
                <input
                    className="input"
                    name="input"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    value={input}
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>
            </div>
        </SearchStyles>
    );
};

export default Searchbar;
