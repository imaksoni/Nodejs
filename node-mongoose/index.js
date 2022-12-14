const mongoose = require('mongoose');

const Dishes = require('./model/dishes');

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected correctly to server");

    Dishes.create({
        name: "Roti",
        description: "Good"
    })
    .then((dish)=>{
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: "Updated Good"}
        }, {
            new: true
        }).exec();
    })
    .then((dish)=>{
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Ajeet Soni'
        });

        return dish.save();
    })
    .then((dish) =>{
        console.log(dish);

        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    });
});