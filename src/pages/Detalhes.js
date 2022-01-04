import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import UseRecipe from '../hooks/UseRecipe';
import CardRecomendacao from '../components/CardRecomendacao';

function Detalhes({ match: { url, params: { id } } }) {
  let [, comesOuBebes] = url.split('/');

  if (comesOuBebes === 'comidas') comesOuBebes = 'comes';
  if (comesOuBebes === 'bebidas') comesOuBebes = 'bebes';

  const MAX_LENGTH = 6;
  const { fetchRecipes, fetchRecipeById } = UseRecipe(MAX_LENGTH);
  const [refeicao, setRefeicao] = useState({});
  const [recomendadas, setRecomendadas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newRefeicao = await fetchRecipeById(comesOuBebes, id);
      const newRecomendadas = await fetchRecipes(
        comesOuBebes === 'comes' ? 'bebes' : 'comes',
      );
      setRefeicao(newRefeicao);
      setRecomendadas(newRecomendadas);
    };
    fetchData();
  }, []);

  const renderIngredients = () => {
    const MAX_INGREDIENT = 20;

    const listOfIngredients = [];
    for (let index = 1; index <= MAX_INGREDIENT; index += 1) {
      const ingredient = refeicao[`strIngredient${index}`];
      const measure = refeicao[`strMeasure${index}`];

      if (ingredient) {
        const li = (
          <li
            data-testid={ `${index - 1}-ingredient-name-and-measure` }
            key={ ingredient }
          >
            { ingredient }
            { ' - ' }
            { measure }
          </li>
        );
        listOfIngredients.push(li);
      }
    }
    return (
      <ul>
        { listOfIngredients.map((el) => el) }
      </ul>
    );
  };

  const renderCome = () => {
    if (Object.keys(refeicao).length === 0) return null;
    const {
      strMeal,
      strMealThumb,
      strCategory,
      strInstructions,
      strYoutube,
    } = refeicao;

    const strYoutubeArray = strYoutube.split('=');
    const newStrYoutube = `https://www.youtube.com/embed/${strYoutubeArray[1]}`;
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt="Recipe"
          className="img-details"
        />
        <p data-testid="recipe-title">{ strMeal }</p>
        <p data-testid="recipe-category">{ strCategory }</p>
        <button data-testid="share-btn" type="button">
          <img src={ shareIcon } alt="share" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src={ whiteHeartIcon } alt="share" />
        </button>
        <h2>Ingredients</h2>
        { renderIngredients() }
        <h2>Instructions</h2>
        <p data-testid="instructions" className="instructions">{ strInstructions }</p>
        <h2>Video</h2>
        <iframe
          data-testid="video"
          width="200"
          height="300"
          src={ newStrYoutube }
          title={ strMeal }
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <h2>Recomendadas</h2>
        <div className="carrossel">
          { recomendadas
            .map(({ strDrinkThumb, strDrink, idDrink }, index) => (
              <CardRecomendacao
                key={ strDrink }
                thumb={ strDrinkThumb }
                name={ strDrink }
                index={ index }
                id={ idDrink }
                url="bebidas"
              />
            )) }
        </div>
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          type="button"
        >
          Iniciar Receita
        </button>
      </>
    );
  };

  const renderBebe = () => {
    if (Object.keys(refeicao).length === 0) return null;
    const {
      strDrink,
      strDrinkThumb,
      strCategory,
      strInstructions,
      strAlcoholic,
    } = refeicao;

    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt="Recipe"
        />
        <p data-testid="recipe-title">{ strDrink }</p>
        <p data-testid="recipe-category">{ `${strCategory} ${strAlcoholic}` }</p>
        <button data-testid="share-btn" type="button">
          <img src={ shareIcon } alt="share" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src={ whiteHeartIcon } alt="share" />
        </button>
        <h2>Ingredients</h2>
        { renderIngredients() }
        <h2>Instructions</h2>
        <p data-testid="instructions">{ strInstructions }</p>
        <h2>Recomendadas</h2>
        <div className="carrossel">
          { recomendadas
            .map(({ strMealThumb, strMeal, idMeal }, index) => (
              <CardRecomendacao
                key={ strMeal }
                thumb={ strMealThumb }
                name={ strMeal }
                index={ index }
                id={ idMeal }
                url="bebidas"
              />
            )) }
        </div>
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          type="button"
        >
          Iniciar Receita
        </button>
      </>
    );
  };

  return (
    <div>
      { comesOuBebes === 'comes' ? renderCome() : renderBebe() }
    </div>
  );
}

Detalhes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Detalhes;
