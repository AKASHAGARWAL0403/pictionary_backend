import { Connect, getSequelize, syncDatabase } from "./db/ConnectDatabase";
import { initRoom } from './models/Room';
import { initUser } from './models/User';
import { initRoomUser } from './models/RoomUser';
import { initWord } from './models/Word';
import express from 'express';
import bodyParser from 'body-parser';
import UserRouter  from './api/User/router';
import RoomRouter from './api/Room/router';

import { addRelation } from './models/Relation';
(async () => {

  await Connect(() => {
    console.log("Connection Has been establshed");
  });

  const sequelize = getSequelize();

  await initUser(sequelize);
  await initRoom(sequelize);
  await initRoomUser(sequelize);
  await initWord(sequelize);

  addRelation();

  await syncDatabase();

  const app = express();

  app.use(bodyParser.json({ extended: false }));

  app.use('/user' , UserRouter);
  app.use('/room' , RoomRouter);
  
  app.listen(5000 , () => {
      console.log("Listening to port 5000");
  })

})();
