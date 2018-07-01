export interface User {
  id: String;
  nickname: String;
  avatar: String;
}

interface Message {
  from: User;
  content: String;
  created: Date;
}

export interface State {
  isLogin: Boolean;
  user: User;
  friends: User[];
  dialogs: String[];
  messages: Message[];
}

const state: State = {
  isLogin: false,
  user: {
    id: "",
    nickname: "",
    avatar: ""
  },
  friends: [],
  dialogs: [],
  messages: []
};

export default state;
