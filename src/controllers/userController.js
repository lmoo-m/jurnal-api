import users from "../models/users.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jurnals from "../models/jurnal.js";

export const getUsers = async (req, res) => {
    try {
        const { check } = req.cookies;
        if (!check) return res.send({ msg: "anda belum login" });
        const user = await users.findOne({
            where: {
                id_users: check,
            },
            attributes: ["id_users", "username"],
            include: [jurnals],
        });
        res.send({
            check: check,
            msg: "success get data",
            data: user,
        });
    } catch (error) {
        res.send({ msg: "server error" });
    }
};

export const register = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        const checkUserName = await users.findOne({
            where: {
                username: username,
            },
        });
        if (checkUserName)
            return res.status(400).send({
                msg: "user sudah tersedia, silahkan gunakan nama user yang lain",
            });
        const id = nanoid(16);
        const salt = await bcrypt.genSalt(10);
        if (password === confirmPassword) {
            const hash = await bcrypt.hash(password, salt);
            await users.create({
                id_users: id,
                username: username,
                password: hash,
            });
            res.status(201).send({
                msg: "berhasil register",
                data: {
                    id: id,
                },
            });
        } else {
            res.status(400).send({ msg: "konfirmasi password salah" });
        }
    } catch (error) {
        res.send({ msg: "server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await users.findOne({
            where: {
                username: username,
            },
        });
        if (!user) return res.status(400).send({ msg: "user tidak ditemukan" });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send({ msg: "password salah" });
        res.cookie("check", user.id_users);
        res.send(user);
    } catch (error) {
        res.send({
            msg: "server error",
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("check");
        res.send({
            msg: "berhasil logout",
        });
    } catch (error) {
        res.send({
            msg: "server error",
        });
    }
};
