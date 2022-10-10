/* eslint-disable indent */
import { Place } from './types.js'
import { getDataFromLS, setDataToLS, renderBlock } from './lib.js'
import { renderUserBlock } from './user.js';

const isFav = (id: string): boolean => {
  const favsObj = getDataFromLS('favoritesAmount');
  return (favsObj?.[id] instanceof Object) ? true : false;
}

const favHandler = (event: Event) => {
  event.stopPropagation();
  let favsObj = getDataFromLS('favoritesAmount') || {};

  if (event.target instanceof HTMLElement && favsObj instanceof Object) {
    const fav: HTMLElement = event.target;

    if (fav.id in favsObj) {
      delete favsObj[fav.id]
      fav.classList.remove('active')
    } else {
      favsObj = {
        ...favsObj,
        [fav.id]: {
          id: fav.id,
          photo: fav.dataset.photo,
          title: fav.dataset.title
        }
      }
      fav.classList.add('active')
    }
    renderUserBlock(getDataFromLS('user'), favsObj)
    setDataToLS('favoritesAmount', favsObj)
  }
}

export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResult(place: Place, isFav: boolean) {
  return `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites ${isFav ? 'active' : ''}" 
              id="${place.id}" 
              data-photo="${place.photos[0]}" 
              data-title="${place.title}">
            </div>
            <img class="result-img" 
              src="${place.photos[0] || './img/result-1.png'}" 
              alt="${place.title}"
            >
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${place.title || 'no title'}</p>
              <p class="price">${place.totalPrice}&#8381</p>
            </div>
            <div class="result-info--map">${place.coordinates}<i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">${place.details}</div>
            <div class="result-info--footer">
              <div>
                <button
                  class="button"
                  id="${place.id}"
                >Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`
}

export function renderSearchResultsBlock(resultsArr: Place[] | unknown) {

  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">      
  ${resultsArr instanceof Array<Place> ?
      resultsArr.map(p => renderSearchResult(p, isFav(p.id))).join('') :
      '<h1>Something is wrong with recieved data</h1>'
    }
    </ul>
    `
  )
  document.querySelectorAll('.favorites').forEach(heart => heart.addEventListener('click', (e: Event) => favHandler(e)))
}
