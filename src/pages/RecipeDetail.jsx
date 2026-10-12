import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function RecipeDetail({
    favourites,
    toggleFavourite,
}) {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function fetchDetails() {
            setLoading(true);
            setError("");
            setRecipe(null);

            try {
                const response = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                );

                if (!cancelled) {
                    const meal = response.data.meals?.[0];

                    if (meal) {
                        setRecipe(meal);
                    } else {
                        setError("Recipe not found.");
                    }
                }
            } catch {
                if (!cancelled) {
                    setError("Unable to load recipe details. Please try again.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchDetails();

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return <p className="message">Loading recipe details...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!recipe) return null;

    const ingredients = Array.from({ length: 20 }, (_, index) => {
        const ingredient =
            recipe[`strIngredient${index + 1}`]?.trim();
        const measure = recipe[`strMeasure${index + 1}`]?.trim();

        return ingredient
            ? `${measure || ""} ${ingredient}`.trim()
            : null;
    }).filter(Boolean);

    const isFavourite = favourites.some(
        (item) => item.idMeal === recipe.idMeal
    );

    return (
        <main className="page detail-page">
            <Link to="/recipes" className="back-link">
                ← Back to Recipes
            </Link>

            <div className="detail-layout">
                <img
                    className="detail-image"
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                />

                <div className="detail-content">
                    <span className="eyebrow">
                        {recipe.strArea || "World Cuisine"}
                    </span>

                    <h1>{recipe.strMeal}</h1>

                    <p className="category">
                        Category: {recipe.strCategory || "General"}
                    </p>

                    <button
                        className={`primary-btn ${isFavourite ? "saved-detail" : ""
                            }`}
                        onClick={() => toggleFavourite(recipe)}
                    >
                        {isFavourite
                            ? "♥ Remove from Favourites"
                            : "♡ Save to Favourites"}
                    </button>

                    <h2>Ingredients</h2>
                    <ul className="ingredients">
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>

                    <h2>Instructions</h2>
                    <p className="instructions">
                        {recipe.strInstructions ||
                            "Instructions are not available."}
                    </p>

                    {recipe.strYoutube && (
                        <a
                            className="youtube-link"
                            href={recipe.strYoutube}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Watch Cooking Video ↗
                        </a>
                    )}
                </div>
            </div>
        </main>
    );
}