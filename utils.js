const { getRepository } = require("typeorm");
const { User } = require("./build/entities/User");

const addUsers = async () => {
  const userRepository = getRepository(User);
  if (!(await userRepository.find()).length) {
    const users = [
      { userId: 1, email: "Database@mail.ru", password: "password" },
      { userId: 2, email: "Kazanc3v@mail.ru", password: "password1" },
    ];
    getRepository(User).save(users);
  }
};

module.exports = addUsers;
