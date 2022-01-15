import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import RecipesContext from '../context/RecipesContext';
import PerfilCss from '../style/Perfil.module.css';

function Perfil() {
  const { startLocalStorage } = useContext(RecipesContext);
  startLocalStorage();
  const userEmail = JSON.parse(localStorage.getItem('user'));
  const { email } = userEmail;
  const history = useHistory();
  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Perfil" />
      <div className = { PerfilCss.containerPerfil }>
        <h4 data-testid="profile-email">
          Email:
          {' '}
          { email }
        </h4>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }

        >
          {' '}
          Receitas Feitas
          {' '}

        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          {' '}
          Receitas Favoritas
          {' '}

        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
          className={ PerfilCss.btnSair }

        >
          {' '}
          Sair
          {' '}

        </button>
      </div>
      <MenuInferior />
    </>
  );
}

export default Perfil;
