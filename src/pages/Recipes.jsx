import { useState } from "react";
import { Link } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";

export default function Recipes({
    favourites,
    toggleFavourite,
}) {
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");

    const { data, loading, error } = useRecipes(query);

    function handleSubmit(event) {
        event.preventDefault();
        setQuery(input.trim());
    }

    function isFavourite(recipe) {
        return favourites.some(
            (item) => item.idMeal === recipe.idMeal
        );
    }

    return (
        <main className="page">
            <div className="page-heading">
                <span className="eyebrow">RECIPE COLLECTION</span>
                <h1>Find Your Recipe</h1>
                <p>Search by meal name, such as chicken, pasta or curry.</p>
            </div>

            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Search recipes..."
                    aria-label="Search recipes"
                    required
                />
                <button type="submit" className="primary-btn">
                    Search
                </button>
            </form>

            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Finding delicious recipes...</p>
                </div>
            )}

            {error && <p className="error">{error}</p>}

            {!loading && !error && query && data.length === 0 && (
                <p className="message">No recipes found. Try another name.</p>
            )}

            {!loading && !error && !query && (
                <p className="message">Enter a meal name to discover recipes.</p>
            )}

            <div className="recipe-grid">
                {data.map((recipe) => (
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
                                <span className="detail-link">View Recipe →</span>
                            </div>
                        </Link>

                        <button
                            className={`favourite-btn ${isFavourite(recipe) ? "saved" : ""
                                }`}
                            onClick={() => toggleFavourite(recipe)}
                        >
                            {isFavourite(recipe)
                                ? "♥ Saved"
                                : "♡ Save to Favourites"}
                        </button>
                    </article>
                ))}
            </div>
        </main>
    );
}