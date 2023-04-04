import db from "../config/database.js";
import { DataTypes } from "sequelize";

const jurnals = db.define(
    "jurnals",
    {
        id_jurnal: DataTypes.STRING,
        title: DataTypes.STRING,
        time: DataTypes.STRING,
        date: DataTypes.STRING,
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);

export default jurnals;
