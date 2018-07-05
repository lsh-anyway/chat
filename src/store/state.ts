export interface User {
  _id: String;
  nickname: String;
  avatar: String;
}

interface Message {
  _id: String;
  from: User;
  content: String;
  meta: {
    createAt: Date;
    status: {
      receive: String[];
      read: String[];
    };
  };
}

interface Dialog {
  _id: String;
  members: User[];
  messages: Message[];
  num: Number;
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
    _id: "",
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
