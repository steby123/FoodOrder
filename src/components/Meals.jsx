import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const requestConfig = {}

const Meals = () => {
    const {
        data:loadMeals, 
        isLoading, 
        error
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if(isLoading){
        return <p className="center">Fetching Meals...</p>
    }

    if(error){
        return <Error title="Failed to fetch meals" message={error}/>
    }

    return(
        <ul id="meals">
            {loadMeals.map((meal) =>
                <li key={meal.id}>
                    <MealItem key ={meal.id} meal={meal} />
                </li>
            )}
        </ul>
    )
}

export default Meals;