import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
// import { renderToast } from './lib.js'
import { defaultUser } from './types.js'

window.localStorage.setItem('user', JSON.stringify(defaultUser));

const getDataFromLS = (key: string) => {
  const storage: Storage = window.localStorage;
  const data: unknown = JSON.parse(storage.getItem(key));
  return data ? data : null;
}

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(
    getDataFromLS('user'),
    getDataFromLS('favoritesAmount'),
  );
  renderSearchFormBlock(null, null);
  renderSearchStubBlock();
  // renderToast(
  //   { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
  //   { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  // )
})