import {useSwipeable} from 'react-swipeable';

export default function Swipeable({className, children, onSwipedLeft, onSwipedRight}) {
    const handlers = useSwipeable({
        onSwipedLeft,
        onSwipedRight
    });
    return <div className={className} {...handlers}>{children}</div>;
}
