const userList = [
  {
    _id: 1,
    name: "Wendel"
  }
];

const users = async (parent, args, context, info) => {
  return userList;
};

export { users };
