import PouchDB from "pouchdb-browser";

const friendsDB = new PouchDB("friends");
const dialogsDB = new PouchDB("dialogs");
const verificationsDB = new PouchDB("verifications");

async function getInfo() {
  const friendsDoc = await friendsDB.allDocs({
    include_docs: true
  });
  const dialogsDoc = await dialogsDB.allDocs({
    include_docs: true
  });
  const verificationsDoc = await verificationsDB.allDocs({
    include_docs: true
  });

  let friends = friendsDoc.rows.map((item: any) => {
    return item.doc;
  });

  let dialogs = dialogsDoc.rows.map((item: any) => {
    return item.doc;
  });

  let verifications = verificationsDoc.rows.map((item: any) => {
    return item.doc;
  });

  let user = {
    _id: localStorage.getItem("_id"),
    avatar: localStorage.getItem("avatar"),
    nickname: localStorage.getItem("nickname")
  };

  return { user, friends, dialogs, verifications };
}

async function updateDB(data: any) {
  let { _id, avatar, nickname, friends, dialogs, verifications } = data;
  localStorage.setItem("_id", _id);
  localStorage.setItem("avatar", avatar);
  localStorage.setItem("nickname", nickname);
  dialogs.forEach((dialog: any) => {
    dialog.num = dialog.messages.length;
  });
  await friendsDB.bulkDocs(friends);
  await dialogsDB.bulkDocs(dialogs);
  await verificationsDB.bulkDocs(verifications);

  return getInfo();
}

function clearDB() {
  friendsDB.destroy();
  dialogsDB.destroy();
  verificationsDB.destroy();
}

export { updateDB, getInfo, clearDB };
