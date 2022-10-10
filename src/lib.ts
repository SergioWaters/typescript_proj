export function renderBlock(elementId, html) {
  const element = document.getElementById(elementId);
  element.innerHTML = html;
}

export function renderToast(message, action) {
  let messageText = '';

  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }

  renderBlock(
    'toast-block',
    messageText
  )

  const button = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast(null, null)
    }
  }
}

export const getDataFromLS = (key: string) => {
  const storage: Storage = window.localStorage;
  const data: unknown = JSON.parse(storage.getItem(key));
  return data ? data : null;
}

export const setDataToLS = (key: string, val: unknown) => {
  const storage: Storage = window.localStorage;
  const data: string = JSON.stringify(val)
  storage.setItem(key, data);
}