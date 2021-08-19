import {memo} from 'react';

const Loader = memo(() => (
    <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Ładowanie...</span>
        </div>
    </div>
));

export default Loader;
