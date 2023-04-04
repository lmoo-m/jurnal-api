import jurnals from "../models/jurnal.js";
import { nanoid } from "nanoid";

const times = new Date();
const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

const days = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];

export const createJurnal = async (req, res) => {
    try {
        const id = nanoid();
        const { title, time, id_users } = req.body;
        const date = `${days[times.getDay()]}, ${times.getDate()} ${
            months[times.getMonth()]
        } ${times.getFullYear()}`;
        if (!title || !time || !id_users)
            return res.send({ msg: "pastikan semua terisi dengan benar" });
        await jurnals.create({
            id_jurnal: id,
            title: title,
            time: time,
            date: date,
            id_users: id_users,
        });
        res.status(201).send({
            msg: "succes",
            data: {
                id: id,
            },
        });
    } catch (error) {
        res.send({ msg: "server error" });
    }
};

export const getJurnalById = async (req, res) => {
    try {
        const id = req.params.id;
        const jurnal = await jurnals.findOne({
            where: {
                id_jurnal: id,
            },
        });
        if (!jurnal) return res.send({ msg: "jurnal tidak ditemukan" });
        res.send({
            msg: "succes",
            data: jurnal,
        });
    } catch (error) {
        res.send({ msg: "server error" });
    }
};

export const editJurnal = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, time } = req.body;
        const jurnal = await jurnals.findOne({
            where: {
                id_jurnal: id,
            },
        });
        if (!jurnal) return res.send({ msg: "jurnal tidak ditemukan" });
        await jurnal.update({
            title: title,
            time: time,
        });
        res.send({
            msg: "updated",
            data: jurnal,
        });
    } catch (error) {
        res.send({ msg: "server error" });
    }
};

export const deleteJurnal = async (req, res) => {
    try {
        const id = req.params.id;
        const jurnal = await jurnals.findOne({
            where: {
                id_jurnal: id,
            },
        });
        if (!jurnal) return res.send({ msg: "jurnal tidak ditemukan" });
        await jurnal.destroy();
        res.send({
            msg: "deleted",
            data: jurnal,
        });
    } catch (error) {
        res.send({ msg: "server error" });
    }
};
