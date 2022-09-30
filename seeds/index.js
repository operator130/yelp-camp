const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            //YOUR USER ID
            author: '632bfe4fbcdb274fa96c7e26',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus voluptatibus impedit repellendus nam earum reprehenderit laboriosam voluptates vel, dolor mollitia similique. Incidunt numquam hic distinctio ratione quibusdam libero deleniti.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                    {
                        url: 'https://res.cloudinary.com/djazhuize/image/upload/v1664198518/YelpCamp/u3wzslydqso83f6xrycc.jpg',
                        filename: 'YelpCamp/u3wzslydqso83f6xrycc',
                    },
                    {
                        url: 'https://res.cloudinary.com/djazhuize/image/upload/v1664212730/YelpCamp/kevin-schmid-AvEY5UPoJZM-unsplash_kbabce.jpg',
                        filename: 'YelpCamp/ret3yx0nmqhcv9heu3g0',
                    },
                    {
                        url: 'https://res.cloudinary.com/djazhuize/image/upload/v1664198519/YelpCamp/wtfvhsaa1jlawtopo5b9.jpg',
                        filename: 'YelpCamp/wtfvhsaa1jlawtopo5b9',
                    }
                ]

        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})