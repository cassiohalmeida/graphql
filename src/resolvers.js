var fs = require('fs');

const resolvers = {
  Query: {
    user: (parent, { id }, context, info) => {
      var obj = fs.readFileSync(__dirname + '/db.json', 'utf8');
      let obj2 = JSON.parse(obj);
      return obj2.users.find(user => user.id == id);
    },
    users: (parent, args, context, info) => {
      var obj = fs.readFileSync(__dirname + '/db.json', 'utf8');
      let obj2 = JSON.parse(obj);
      return obj2.users;
    }
  },
  Mutation: {
    createUser: (parent, { id, name, email, age }, context, info) => {
      const newUser = { id, name, email, age };
      fs.readFile(__dirname + '/db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          let obj = JSON.parse(data); //now it an object
          obj.users.push(newUser); //add some data
          let json = JSON.stringify(obj); //convert it back to json
          fs.writeFile(__dirname + '/db.json', json, 'utf8', () => {}); // write it back 
        }
      });
      return newUser;
    },
    updateUser: (parent, { id, name, email, age }, context, info) => {
      let returnable = {id, name, email, age};
      fs.readFile(__dirname + '/db.json', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let obj = JSON.parse(data); //now it an object
          let newUser = obj.users.find(user => user.id === id);
          newUser.name = name;
          newUser.email = email;
          newUser.age = age;
          let json = JSON.stringify(obj); //convert it back to json
          fs.writeFile(__dirname + '/db.json', json, 'utf8', () => {}); // write it back 
        }
      });
      return returnable;
    },
    deleteUser: (parent, { id }, context, info) => {
      const userIndex = users.findIndex(user => user.id === id);

      if (userIndex === -1) throw new Error("User not found.");

      const deletedUsers = users.splice(userIndex, 1);

      return deletedUsers[0];
    }
  }
};

export default resolvers;