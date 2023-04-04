import { Sequelize } from "sequelize";

const db = new Sequelize("sita_jurnal", "sita_lmoo", "mIgggD4wCzK-8939", {
    dialect: "mysql",
    host: "localhost",
});

export default db;
