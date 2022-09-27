import { renderBlock } from './lib.js'

export function renderUserBlock(favoriteItemsAmount: number, userIconUrl: string, userName: string) {
  const hasFavoriteItems = Boolean(favoriteItemsAmount);
  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${userIconUrl ? userIconUrl : '/img/avatar.png'} alt="Wade Warren" />
      <div class="info">
          <p class="name">${userName ? userName : 'Wade Warren'}</p>
          <p class="fav">
            <i class="heart-icon ${hasFavoriteItems ? 'active"></i>' + favoriteItemsAmount : '"></i> ничего нет'}
          </p>
      </div>
    </div>
    `
  )
}
