const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to mongodb server");
    }
    console.log("Connected to MongoDB server");

    const db = client.db("TodoApp");

    db.collection("Todos")
      .findOneAndUpdate(
        {
          _id: new ObjectID("5b4b7904695f37371003edc9")
        },
        {
          $set: {
            completed: true
          }
        },
        {
          returnOriginal: false
        }
      )
      .then(result => {
        console.log(result);
      });

    db.collection("Users")
      .findOneAndUpdate(
        {
          _id: new ObjectID("5b4b7c49708dbc49604c7f2d")
        },
        {
          $set: {
            name: "Luis David"
          },
          $inc: {
            age: 1
          }
        },
        {
          returnOriginal: false
        }
      )
      .then(result => {
        console.log(result);
      });
    client.close();
  }
);
