const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../auth');
const { Trainer } = require('../db/models');
const router = express.Router();



router.post(
    '/',
    async (req, res, next) => {
        const { name, password } = req.body;

        const user = await Trainer.findOne({
            where: {
                name
            }
        });

        if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = { credential: 'The provided credentials were invalid.' };
            return next(err);
        }

        const safeUser = {
            id: user.id,
            name: user.name,
        };

        setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

router.get(
    '/',
    (req, res) => {
        const { user } = req;
        if (user) {
            const safeUser = {
                id: user.id,
                name: user.name
            };
            return res.json({
                user: safeUser
            });
        } else return res.json({ user: null });
    }
);


module.exports = router;