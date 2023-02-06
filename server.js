const app = require('./app');
const sequelize = require('./connectDatabase');


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch(e => {
        console.error('Unable to connect to the database:', e);
    });

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})