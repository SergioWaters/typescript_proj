import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
// import { renderToast } from './lib.js'


window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(
    7,
    'https://sun9-50.userapi.com/impf/73QEYamxaMe5prXb3LoC2-MDGIdf8A6ecE0L2Q/q_Si_lrspqQ.jpg?size=130x130&quality=96&sign=208915f9d0cd44fd33c237ae0b40f7d1&c_uniq_tag=3jDVX7lOnvmTKgmauOnu6HM7r51g96YynxP_Stf_MxM&type=album',
    'Sergio Waters');
  renderSearchFormBlock(null, null);
  renderSearchStubBlock();
  // renderToast(
  //   { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
  //   { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  // )
})
