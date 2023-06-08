const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../auth');
const { Trainer } = require('../db/models');

const router = express.Router();

router.post(
    '/',
    async (req, res) => {
        const { name, age, gender, gymLeader, numBadges, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = await Trainer.create({ name, age, gender, gymLeader, numBadges, hashedPassword });

        const safeUser = {
            id: user.id,
            name: user.name,
        };
        console.log(hashedPassword)
        setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

module.exports = router;