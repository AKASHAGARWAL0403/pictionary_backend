import { Connect, getSequelize, syncDatabase } from "./db/ConnectDatabase";
import { initRoom } from './models/Room';
import { initUser } from './models/User';
import { initRoomUser } from './models/RoomUser';
import { initWord } from './models/Word';

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

})();
