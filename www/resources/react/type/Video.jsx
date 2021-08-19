import modifiedTimestamp from '../utils/modifiedTimestamp.js';

export default function Video({path = '', headers}) {
    return <video className="view-item" controls autoPlay>
        <source src={`/file/${path}?m=${modifiedTimestamp(headers.get('last-modified'))}`}/>
        Twoja przeglądarka nie wspiera odtwarzania filmów.
    </video>;
}
