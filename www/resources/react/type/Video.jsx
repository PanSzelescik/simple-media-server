export default function Video({path = '', data}) {
    const {modified} = data;
    return <video className="view-item" controls autoPlay>
        <source src={`/file/${path}?m=${modified}`}/>
        Twoja przeglądarka nie wspiera odtwarzania filmów.
    </video>;
}
