// use the path of your model
const User = require("../modules/userModel");
const mongoose = require("mongoose");
// use the new name of the database
const url = "mongodb://localhost:27017/patients_database";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("Product Schema test anything", () => {
  //the code below is for insert testing
   /*it("Add Product testing anything", () => {
     const user = {
      pname: "decold",
      pprice: 100,
     };
    return User.create(user).then((pro_ret) => {
       expect(pro_ret.pname).toEqual("decold");
     });
   });*/
  //the code below is for delete testing
  it("to test the delete Product is working or not", async () => {
    await User.deleteOne({ _id: Object("62162ab5fd7429e66c40acc9") });
  });
// for updating 
    /*it("to test the update", async () => {
      return User.findOneAndUpdate(
      { _id: Object("62162ab5fd7429e66c40acc9") },
         { $set: { pname: "mesoral" } }
       ).then(() => {});
     });*/
});