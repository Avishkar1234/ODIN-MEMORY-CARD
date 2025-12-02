import Card from "./Card"

export default function CardContainer({ cards, handleCardClick }) {
    return (
        <div className="card-container">
            {cards.map((pokemon) => (
                <Card 
                    key={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.front_default}
                    onClick={() => handleCardClick(pokemon.id)}
                />
            ))}
        </div>
    )
}