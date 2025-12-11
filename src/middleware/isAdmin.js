import { request, response } from "express";

/**
 * @param {request} req 
 * @param {response} res 
 * @param {Function} next 
 */
export const isAdmin = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "You are not admin" });
    }

    next();
}