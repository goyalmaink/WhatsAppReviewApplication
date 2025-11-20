import express from "express";
import sql from "../lib/db.js"

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await sql`
            SELECT * FROM reviews ORDER BY created_at DESC
        `;

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

export default router;