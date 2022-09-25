const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelper");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  //NO LONGER NEEDED WITH MONGOOSE 6
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

//Used to return a random element from an array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  //   const c = new Campground({ title: "Purple Field" });
  //   await c.save();
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      image: "https://random.imagecdn.app/600/600",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni alias quo illo. Doloribus vero rem, animi rerum consectetur hic sequi quia nobis, iure laborum odit. Maxime aliquid cupiditate asperiores laudantium.",
      price: Math.floor(Math.random() * 20) + 10,
    });
    await camp.save();
  }
};
seedDb().then(() => mongoose.connection.close());
