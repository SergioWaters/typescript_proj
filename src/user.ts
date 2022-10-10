import { renderBlock } from './lib.js'
import { isUser, defaultUser } from './types.js'

export function renderUserBlock(user: unknown | null, favoriteItemsAmount?: unknown | null) {
  console.log('from userblock - isUser? ' + isUser(user))
  const hasFavoriteItems = Boolean(favoriteItemsAmount);
  const userName = isUser(user) ? user?.userName : defaultUser.userName;
  const avatarUrl = isUser(user) ? user?.avatarUrl : defaultUser.avatarUrl;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatarUrl} alt="${userName}" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon ${hasFavoriteItems ? 'active"></i>' + favoriteItemsAmount : '"></i> ничего нет'}
          </p>
      </div>
    </div>
    `
  )
}
