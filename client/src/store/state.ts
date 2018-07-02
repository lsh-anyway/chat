export interface User {
  id: String;
  nickname: String;
  avatar: String;
}

interface Message {
  id: String;
  from: User;
  content: String;
  created: Date;
}

interface Dialog {
  id: String;
  member: User[];
  messages: Message[];
}

interface Content {
  isActive: Boolean;
  activeType: String;
  activeContent: any;
}

interface Verification {
  from: User;
  content: String;
}

export interface State {
  isLogin: Boolean;
  user: User;
  friends: User[];
  dialogs: Dialog[];
  content: Content;
  verifications: Verification[];
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
  content: {
    isActive: false,
    activeType: "",
    activeContent: null
  },
  verifications: []
};

export default state;
