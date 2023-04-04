import db from "../config/database.js";
import { DataTypes } from "sequelize";
import jurnals from "./jurnal.js";

const users = db.define(
    "users",
    {
        id_users: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    },
    {
        freezeTableName: true,
    }
);

users.hasMany(jurnals, { foreignKey: "id_users" });
jurnals.belongsTo(users, { foreignKey: "id_users" });

export default users;
