var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";
export const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isUsed = yield pool.query("SELECT * FROM user_schema.users WHERE email = $1", [email]);
        if (email.length < 1 || password.length < 1) {
            return res.json({
                message: "Enter email or password",
            });
        }
        if (isUsed.rows.length > 0) {
            return res.json({
                message: "Email is busy",
            });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield pool.query("INSERT INTO user_schema.users (password, email) VALUES ($1, $2) RETURNING id, email", [hashedPassword, email]);
        const userId = newUser.rows[0].id;
        const accessToken = jwt.sign({ id: userId }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN,
        });
        const refreshToken = jwt.sign({ id: userId }, process.env.TOKEN_SECRET);
        yield pool.query("UPDATE user_schema.users SET refresh_token = $1 WHERE id = $2", [refreshToken, userId]);
        return res.json({
            userId,
            accessToken,
            refreshToken,
            message: "Registration completed successfully",
        });
    }
    catch (error) {
        return res.json({
            message: "Error creating user",
        });
    }
});
export const signIn = (req, res) => {
    // try {
    //   console.log("signIn");
    // } catch (error) {
    //   console.log(error);
    // }
};
