import {
  renderSearchStubBlock,
  renderEmptyOrErrorSearchBlock,
  renderSearchResultsBlock
} from './search-results.js'
import { renderSearchFormBlock } from './search-form.js'
import { renderUserBlock } from './user.js'
import { FlatRentSdk } from './api.js'
import { renderToast, getDataFromLS } from './lib.js'
import { SearchFormData } from './types.js'

const api = new FlatRentSdk();

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(
    getDataFromLS('user'),
    getDataFromLS('favoritesAmount'),
  );
  renderSearchFormBlock(null, null);
  renderSearchStubBlock();

  const form: HTMLFormElement = document.querySelector('.form');
  const listenBookButtonsArr = (): void => {
    document.querySelectorAll('.button')
      .forEach(b => b.addEventListener('click', dispatchBook))
  }
  const getFormattedData = (): SearchFormData => {
    return {
      checkInDate: new Date(form.checkInDate.value),
      checkOutDate: new Date(form.checkOutDate.value),
      priceLimit: +form.priceLimit.valueAsNumber,
      city: form.city.value
    }
  };

  let refreshTimer = 0;
  const startRefreshTimeout = () => {
    refreshTimer = setTimeout(() => renderToast(
      {
        text: '5 minutes past. Refresh your search data',
        type: 'refreshTimer'
      },
      {
        name: 'Ok, refresh it for me',
        handler: () => {
          dispatchSearch();
          clearTimeout(refreshTimer)
        }
      }
    ), (1000 * 60 * 5))
  }

  const dispatchSearch = async (e?: Event) => {
    if (e) e.preventDefault();
    try {
      await api.search(getFormattedData())
        .then(r => renderSearchResultsBlock(r));
      listenBookButtonsArr();
      startRefreshTimeout()
    } catch (e) {
      renderEmptyOrErrorSearchBlock(e.message)
    }
  };

  const dispatchBook = async (e: Event) => {
    e.stopPropagation();
    if (e.target instanceof HTMLButtonElement)
      try {
        await api.book(
          e.target.id,
          getFormattedData().checkInDate,
          getFormattedData().checkOutDate
        ).then(r => {
          clearInterval(refreshTimer)
          renderToast(
            {
              text: `You've successfully booked \n transaction number is ${r}`, type: 'success'
            },
            {
              name: 'Great',
              handler: () => { console.log('book success toast closed') }
            }
          )
        })
      } catch (e) {
        renderToast(
          {
            text: `${e.message}`,
            type: 'error'
          },
          {
            name: 'I\'ll try again',
            handler: () => { console.log('book error toast closed') }
          }
        )
      }
  };

  form.addEventListener('submit', dispatchSearch);
})