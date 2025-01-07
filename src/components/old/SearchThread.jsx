import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSearchQuery, addToHistory } from '../../store/searchSlice';

import '../../styles/search/SearchThread.css';

const SearchThread = () => {
    const PRIMARY_COLOR = '#ED4331';
    const TEXT_COLOR = '#111';

    const dispatch = useDispatch();

    const selectedFile = useSelector(state => state.search.selectedFile);
    const searchQuery = useSelector(state => state.search.searchQuery);

    const history = useSelector(state => state.search.history);

    const handleAsk = () => {
        if (searchQuery.trim() === '') {
            alert('Please enter a valid query');
            return;
        }

        dispatch(addToHistory({ id: Date.now(), question: searchQuery, answer: 'sample answer' }));
        dispatch(setSearchQuery(''));
    }

    return (
        <div className="search-thread">
            <div className='history'>
                <div className="file-name">
                    <span style={{ fontWeight: 'bold', color: TEXT_COLOR }}>{selectedFile?.name}</span>
                </div>

                {history.map((item) => (
                    <div className='history-item'>
                        <div className='question-section'> <span> {item.question}</span></div>
                        <div className='answer-section'> <span>{item.answer}</span></div>
                    </div>
                ))}
            </div>

            <div className='input-section'>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAsk();
                        }
                    }}
                    placeholder="Want to know more?"
                    className='input-section-text'
                />

                <button className='input-section-button' onClick={() => { handleAsk(); }}> Ask</button>
            </div>
        </div>
    );
};

export default SearchThread;

