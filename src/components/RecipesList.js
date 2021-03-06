import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineTimer } from "react-icons/md";
import Score from "./Score";

const RecipesList = ({ legend, recipes }) => {
  const link = legend.toLowerCase().replace(/ /g, "-");
  return (
    <section className="section-recipe-slider">
      <fieldset>
        <legend>
          <Link to={`/meal/${link}`}>{legend}</Link>
        </legend>
        <div className="slider">
          <div className="slides">
            {recipes &&
              recipes.map((recipe) => {
                const {
                  id,
                  title,
                  image,
                  dishTypes,
                  readyInMinutes,
                  spoonacularScore,
                } = recipe;
                return (
                  <div key={id} className="slide">
                    <Link to={`/recipe/${id}`}>
                      <img
                        className="img"
                        src={image}
                        alt={title}
                        style={{ width: "100%" }}
                      />
                      <div className="box-container">
                        <div className="box-wrapper">
                          <h3 className="title-dish">{title}</h3>
                        </div>
                        <div className="timer">
                          <span>
                            <MdOutlineTimer />
                            {readyInMinutes}mins
                          </span>
                          <Score score={spoonacularScore} />
                        </div>
                      </div>
                    </Link>
                    <div
                      className="dish-types-container"
                      style={{ top: "60%" }}
                    >
                      <div className="box-wrapper">
                        <div className="dish-types">
                          {dishTypes.length === 0 ? (
                            <Link to={`/meal/miscellaneous`}>
                              Miscellaneous
                            </Link>
                          ) : (
                            dishTypes.slice(0, 3).map((dish, index) => {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    display: "inline-block",
                                  }}
                                >
                                  {index ? ", " : ""}
                                  <Link to={`/meal/${dish}`}>{dish}</Link>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </fieldset>
    </section>
  );
};

export default RecipesList;
