import React, { useState, useContext, useEffect } from "react";

const randomUrl =
  "https://api.spoonacular.com/recipes/random?apiKey=0d31116822b54414a5fe84f683d6d5d9&number=13";
const lowCaloriesUrl =
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=0d31116822b54414a5fe84f683d6d5d9&number=10&addRecipeInformation=true&&minCalories=0&maxCalories=25";
const noSugarUrl =
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=0d31116822b54414a5fe84f683d6d5d9&number=10&addRecipeInformation=true&minSugar=0&maxSugar=1";
const winesUrl =
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=0d31116822b54414a5fe84f683d6d5d9&number=10&addRecipeInformation=true&query=wine";

// const url =
//   "https://api.spoonacular.com/recipes/complexSearch?apiKey=0d31116822b54414a5fe84f683d6d5d9";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      //Fetch Random Recipes
      const dataRandomRecipes = await fetchData(randomUrl);
      //Fetch Low Calorie Recipes
      const dataLowCalorieRecipes = await fetchData(lowCaloriesUrl);
      //Fetch No Sugar Recipes
      const dataNoSugarRecipes = await fetchData(noSugarUrl);
      //Fetch No Alcohol Recipes
      const dataWinesRecipes = await fetchData(winesUrl);
      if (dataRandomRecipes.status === "failure") {
        console.log(dataRandomRecipes.status);
        setLoading(false);
      } else {
        const randomRecipes = dataRandomRecipes.recipes;
        const lowCalorieRecipes = dataLowCalorieRecipes.results;
        const noSugarRecipes = dataNoSugarRecipes.results;
        const winesRecipes = dataWinesRecipes.results;
        setRecipes((prevRecipes) => {
          return {
            ...prevRecipes,
            random: randomRecipes,
            lowCalories: lowCalorieRecipes,
            noSugar: noSugarRecipes,
            wines: winesRecipes,
          };
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
    // return () => setRecipes({});
  }, []);

  return (
    <AppContext.Provider value={{ recipes, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
