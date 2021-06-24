//mongoDB 
const MongoClient = require('mongodb').MongoClient;




module.exports = {
//mongodb 함수
connectDB:() => {
    let database
    const databaseURL = "mongodb://localhost:27017";
    MongoClient.connect(databaseURL, {useUnifiedTopology : true}, (err , db) => {
            if(err){
                console.log(err)
            }else{
                const temp = db.db('frontend');
                database = temp;
                console.log('mongodb 데이터베이스 연결 성공!');
            }
    })
    return database;
    }

    
}