import { Link } from "react-router-dom";

export default function Favourites({
    favourites,
    toggleFavourite,
}) {
    return (
        <main className="page">
            <div className="page-heading">
                <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
                <h1>My Favourites ♥</h1>
                <p>Your saved recipes, all in one place.</p>
            </div>

            {favourites.length === 0 ? (
                <div className="empty-state">
                    <h2>No favourites yet!</h2>
                    <p>Explore recipes and save the ones you love.</p>
                    <Link to="/recipes" className="primary-btn">
                        Browse Recipes
                    </Link>
                </div>
            ) : (
                <div className="recipe-grid">
                    {favourites.map((recipe) => (
                        <article className="recipe-card" key={recipe.idMeal}>
                            <Link
                                to={`/recipes/${recipe.idMeal}`}
                                className="card-link"
                            >
                                <img
                                    src={recipe.strMealThumb}
                                    alt={recipe.strMeal}
                                />
                                <div className="card-content">
                                    <h3>{recipe.strMeal}</h3>
                                    <p>{recipe.strArea || "World Cuisine"}</p>
                                    <span className="detail-link">
                                        View Recipe →
                                    </span>
                                </div>
                            </Link>

                            <button
                                className="favourite-btn saved"
                                onClick={() => toggleFavourite(recipe)}
                            >
                                ♥ Remove from Favourites
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}