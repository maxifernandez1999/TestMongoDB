const express = require("express");
require('dotenv').config()
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/user");
const PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
const mongoose = require('mongoose');
//PARA SUBIR A HEROKU HAY QUE AGREGAR LAS ENV EN EL REMOTO
const URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ce12s.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
main().then(res => console.log("BD connect")).catch(err => console.log(err));
// 'mongodb://localhost:27017/test'
async function main() {
  await mongoose.connect(URI);
}
app.listen(process.env.PORT || PORT, () => {
  console.log(`The server started on port ${PORT} !!!!!!`);
});

app.get("/users",async (req, res) => {
  try {
    const arrayUsers = await User.find();
    res.send(
      `${arrayUsers}`
    );
  } catch (error) {
    console.log(error);
  }
  
});
app.post("/add",async (req, res) => {
  try {
    const user = new User({
      email: "miriam@gmail.com",
      password: "123456"
    })
    await user.save();
    res.send(
      `User saved`
    );
  } catch (error) {
    console.log(error);
  }
  
});
