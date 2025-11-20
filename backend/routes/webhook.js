import express from "express";
import sql from "../lib/db.js"
import { twimlMessage } from "../lib/twilio.js"

const router = express.Router();

/*
Conversation Flow:
step 0 -> Ask product name
step 1 -> Ask user name
step 2 -> Ask review
step 3 -> Save review, reset
*/

router.post("/", async (req, res) => {
    try {
        const from = req.body.From || "";
        const body = (req.body.Body || "").trim();
        const contact_number = from.replace("whatsapp:", "");

        const sessionResult = await sql`
            SELECT * FROM sessions WHERE contact_number = ${contact_number}
        `;
        let session = sessionResult[0];

        if (!session) {
            await sql`
                INSERT INTO sessions (contact_number, step) VALUES (${contact_number}, 0)
            `;
            return res.type("text/xml").send(
                twimlMessage("Which product is this review for?")
            );
        }

        if (session.step === 0) {
            await sql`
                UPDATE sessions SET product_name = ${body}, step = 1 WHERE contact_number = ${contact_number}
            `;
            return res.type("text/xml").send(
                twimlMessage("What's your name?")
            );
        }

        if (session.step === 1) {
            await sql`
                UPDATE sessions SET user_name = ${body}, step = 2 WHERE contact_number = ${contact_number}
            `;

            const updated = await sql`
                SELECT product_name FROM sessions WHERE contact_number = ${contact_number}
            `;

            const productName = updated[0].product_name; 
            return res.type("text/xml").send(
                twimlMessage(`Please send your review for ${productName}.`)
            );
        }

        if (session.step === 2) {
            const updated = await sql`
                SELECT * FROM sessions WHERE contact_number = ${contact_number}
            `;

            const s = updated[0]; 

            await sql`
                INSERT INTO reviews (contact_number, user_name, product_name, product_review)
                VALUES (${contact_number}, ${s.user_name}, ${s.product_name}, ${body})
            `;

            await sql`
                DELETE FROM sessions WHERE contact_number = ${contact_number}
            `;

            return res.type("text/xml").send(
                twimlMessage(`Thanks ${s.user_name}! Your review for ${s.product_name} has been recorded.`)
            );
        }

        res.type("text/xml").send(
            twimlMessage("Let's start over. Which product is this review for?")
        );
    } catch (err) {
        console.error(err);
        res
            .type("text/xml")
            .send(twimlMessage("An error occurred. Please try again."));
    }
});

export default router;