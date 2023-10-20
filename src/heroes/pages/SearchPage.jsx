
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useFrom";
import { HeroCard } from "../components";
import { getHeroByName } from "../helpers";
import  queryString  from "query-string";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const heroes = getHeroByName(q);

  const { searchText, onInputChange} = useForm({
    searchText: q,
  });

  const onSearchSubmit = ( event ) =>{
    event.preventDefault();
    // if(searchText.trim().length <= 1) return;

    navigate(`?q=${ searchText }`);
  }

  return (
    <>
      <h1>Search </h1>
      <hr />
      <div className='row'>

        <div className="col 4">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={ onSearchSubmit } aria-label="form">
            <input 
              type="text" 
              placeholder='Search a hero'
              className='form-control'
              name="searchText" 
              autoComplete='off'
              onChange={ onInputChange }
              value={ searchText }
            />
            <button className='btn btn-outline-primary mt-3'>
              search
            </button>
          </form>
        </div>

        <div className="col-8">
          <h4>Results</h4>
          <hr />
          { (q === '')
            ? <div className='alert alert-primary animate__animated animate__fadeIn'>
                Search a Hero
              </div>
            
            :( heroes.length === 0)
              
            ?<div
              aria-label="alert-danger"
              className='alert alert-danger animate__animated animate__fadeIn'>
              No Hero with  <b>{ q }</b>
            </div>
              
              :heroes.map( hero => (
                <HeroCard key={hero.id} { ...hero }/> 
              ))      
          }
          
        </div>
       
      </div>
    </>
  )
}
