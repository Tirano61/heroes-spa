
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from "../helpers";
import { useMemo } from 'react';

export const HeroPage = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const hero = useMemo( () =>  getHeroById(id), [id]);

  if( !hero ){
    return <Navigate to="/marvel"/>
  }
  const onNavigateBack = ()=> {
    const route = (hero.publisher === 'DC Comics') ? '/dc' : '/marvel';
    
    navigate( route,{
      replace: true
    });
  } 

  return (
    <div className='row mt-5'>
      <div className="col-4 animate__animated animate__flip">
        <img 
        // Esta ruta tambien cambia para probar en github pages debe ser /heroes-spa/heroes/${ id }.jpg
          src={ `/heroes/${id}.jpg` } 
          className='img-thumbnail' 
          alt={hero.superhero} 
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'><b>Alter ego:</b> {hero.alter_ego} </li>
          <li className='list-group-item'><b>Publisher:</b> {hero.publisher} </li>
          <li className='list-group-item'><b>First Appearance:</b> {hero.first_appearance} </li>
        </ul>

        <h5 className='mt-3'>Characters</h5>
        <p>{ hero.characters }</p>

        <button 
          className='btn btn-outline-primary'
          onClick={ onNavigateBack }
        > 
          Regresar
        </button>
      </div>

      
    </div>
  )
}
