export interface User {
  userName: string,
  avatarUrl: string,
}

export const isUser = (user: User | unknown): user is User => (<User>user).userName !== undefined;

export const defaultUser: User = {
  avatarUrl: 'https://sun9-50.userapi.com/impf/73QEYamxaMe5prXb3LoC2-MDGIdf8A6ecE0L2Q/q_Si_lrspqQ.jpg?size=130x130&quality=96&sign=208915f9d0cd44fd33c237ae0b40f7d1&c_uniq_tag=3jDVX7lOnvmTKgmauOnu6HM7r51g96YynxP_Stf_MxM&type=album',
  userName: 'Sergio Waters'
}

export interface SearchFormData {
  checkin: string,
  checkout: string,
  maxprice: string,
  city: string,
}

export interface Place { '' }