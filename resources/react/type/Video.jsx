import modifiedTimestamp from '../utils/modifiedTimestamp.js';

export default function Video({path = '', stats = {}}) {
    return <video className="view-item" controls autoPlay>
        <source src={`/file/${path}?m=${modifiedTimestamp(stats.modified)}`}/>
        Twoja przeglądarka nie wspiera odtwarzania filmów.
    </video>
}
