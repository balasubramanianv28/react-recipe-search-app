import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export default function useRecipes(query) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query.trim()) {
            return;
        }

        let cancelled = false;

        async function fetchRecipes() {
            setLoading(true);
            setError("");

            try {
                const response = await axios.get(
                    `${API_URL}/search.php?s=${encodeURIComponent(query)}`
                );

                if (!cancelled) {
                    setData(response.data.meals || []);
                }
            } catch {
                if (!cancelled) {
                    setError("Unable to fetch recipes. Please try again.");
                    setData([]);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchRecipes();

        return () => {
            cancelled = true;
        };
    }, [query]);

    return { data, loading, error };
}