const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("Unable to connect to mongodb server");
  }
  console.log("Connected to MongoDB server");

  const db = client.db("TodoApp");

  //deleteMany
  db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
      console.log(result);
  });

  //deleteOne
  db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
      console.log(result);
  })

  //findOneandDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
      console.log(result);
  })

  db
    .collection("Users")
    .deleteMany({ name: "Luis Osta" })
    .then(result => {
      console.log(result);
    });

  db
    .collection("Users")
    .deleteMany({
      _id: new ObjectID("5a8cb94f5d567a23b004720b")
    })
    .then(result => {
      console.log(result);
    });

  // client.close();
});
