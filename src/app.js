const mongodb = require('mongodb')

const mongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'

const dbname = "user"

mongoClient.connect(connectionUrl, (error, res1) => {
    if (error) {
        return console.log('cannot connect to database')
    }
    console.log('connect to database')

    const db = res1.db(dbname)

    db.collection('user').insertOne({
        name: 'user1',
        age: 26
    }, (error, data) => {
        if (error) {
            console.log('Unable to insertone Data')
        }
        console.log("inserted one doc successfuly")
    })

    db.collection('user').insertOne({
        name: 'user2',
        age: 26
    }, (error, data) => {
        if (error) {
            console.log('Unable to insertone Data')
        }
        console.log("inserted one doc successfuly")
    })

    db.collection('user').insertMany(
        [{
            name: 'user3',
            age: 27
        },
        {
            name: 'user4',
            age: 27
        },
        {
            name: 'user5',
            age: 27
        },
        {
            name: 'user6',
            age: 27
        },
        {
            name: 'user7',
            age: 27
        },
        {
            name: 'user8',
            age: 24
        },
        {
            name: 'user9',
            age: 24
        },
        {
            name: 'user10',
            age: 24
        },
        {
            name: 'user11',
            age: 25
        },
        {
            name: 'user12',
            age: 25
        },], (error, data) => {
            if (error) {
                console.log('Unable to insert data')
            }
            console.log(`insert ${data.insertedCount} docs`)
        }
    )

    db.collection('user').find({ age: 27 }).toArray((error, users) => {
        if (error) {
            return console.log('error has occured')
        }
        console.log(users)
    })
    db.collection('user').find({ age: 27 }).limit(3).toArray((error, users) => {
        if (error) {
            return console.log('error has occured')
        }
        console.log(users)
    })
    //update with limit 
    db.collection('user').find({ age: 27 }).limit(4).toArray()
        .then((data) => {
            data.forEach((doc) => {
                db.collection('user').updateOne(
                    { _id: doc._id },
                    {
                        $set: { name: "updatedname" },
                        $inc: { age: 4 }
                    }
                ).then((data1) => console.log("updated one successfuly"))
                    .catch((data1) => console.log("error"))
            });
        }).catch((err) => console.log(err))

    db.collection('user').updateMany({}, { $inc: { age: 10 } })
        .then((data) => console.log(data.modifiedCount))
        .catch((err) => console.log("cannot update"))



    db.collection('user').deleteMany({ age: 41 })
        .then((data1) => { console.log(`you delete ${data1.deletedCount} docs`) })
        .catch((error) => { console.log(error) })
})




