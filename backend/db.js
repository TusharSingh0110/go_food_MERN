const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/gofoodmern', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const fetchedFoodItems = await foodItemsCollection.find({}).toArray();

        const foodCategoryCollection = mongoose.connection.db.collection("food_category");
        const fetchedFoodCategory = await foodCategoryCollection.find({}).toArray();

        global.food_items = fetchedFoodItems;
        global.food_category = fetchedFoodCategory;

        console.log("Global food items:", global.food_items);
        console.log("Global food category:", global.food_category);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Rethrow the error to propagate it upwards
    }
};

module.exports = mongoDB;
