const jwt = require("jsonwebtoken");
const { InvalidToken } = require("../models/models");

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" });
        }

        // Проверяем, не находится ли токен в списке недействительных
        const invalidToken = await InvalidToken.findOne({ where: { token } });
        if (invalidToken) {
            return res.status(401).json({ message: "Токен недействителен" });
        }

        // Проверяем срок действия токена
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const tokenExpiration = decoded.exp * 1000; // конвертируем в миллисекунды
        const currentTime = Date.now();

        if (currentTime > tokenExpiration) {
            return res.status(401).json({ message: "Срок действия токена истек" });
        }

        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Не авторизован" });
    }
};