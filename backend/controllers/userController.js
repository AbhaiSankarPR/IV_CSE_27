const { db } = require("../config/firebaseConfig");

async function getUser(email) {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", email).get();

  if (snapshot.empty) return null;

  let user = null;
  snapshot.forEach((doc) => {
    user = { id: doc.id, ...doc.data() };
  });
  return user;
}

async function createUser(name, email, passwordHash) {
  const newUser = {
    name,
    email,
    password: passwordHash,
    createdAt: new Date(),
  };
  const userRef = await db.collection("users").add(newUser);
  return { id: userRef.id, ...newUser };
}

module.exports = {
  getUser,
  createUser,
};
