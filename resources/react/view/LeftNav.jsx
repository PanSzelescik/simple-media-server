import {memo} from 'react';

const LeftNav = memo(({disabled, onClick}) => (
    <button type="button" className="view-icon view-icon-left" disabled={disabled} onClick={onClick}
            aria-label="Poprzedni plik">
        <img src="/resources/icons/left.svg" alt="Strzałka w lewo"/>
    </button>
));

export default LeftNav;
