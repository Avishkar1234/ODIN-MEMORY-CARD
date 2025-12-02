export default function Card( { name, image, onClick }) {
    return (
        <div className="card" onClick={onClick} >
            <img src={image} alt={name} />
            <p>{name}</p>
        </div>
    )
}