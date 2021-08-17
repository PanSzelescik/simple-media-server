import {memo} from 'react';

const RightNav = memo(({disabled, onClick}) => (
    <button type="button" className="view-icon view-icon-right" disabled={disabled} onClick={onClick} aria-label="Następny plik">
        <img src="/resources/icons/right.svg" alt="Strzałka w prawo"/>
    </button>
));

export default RightNav;
