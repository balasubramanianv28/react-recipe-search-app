import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="hero">
            <span className="eyebrow">FIND YOUR NEXT FAVOURITE</span>

            <h1>Discover Recipes.<br />Cook Something Amazing.</h1>

            <p>
                Explore delicious meals from around the world.
                Find your favourite recipes and save them for later.
            </p>

            <Link to="/recipes" className="primary-btn">
                Explore Recipes →
            </Link>
        </main>
    );
}