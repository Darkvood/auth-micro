// Mock data
const userList = [
  { id: 1, username: "admin", password: "12345678" },
  { id: 2, username: "test", password: "12345679" }
];

async function findUser({ username, password }) {
  const user = userList.find(user => {
    return user.username === username && user.password === password;
  });

  return user ? user : false;
}

module.exports = findUser;
