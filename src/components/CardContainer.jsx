export default function CardContainer({ cards }) {
    return (
        <div>
            {cards.map((pokemon) => (
                <div key={pokemon.name}>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p>{pokemon.name}</p>
                </div>
            ))}
        </div>
    )
}