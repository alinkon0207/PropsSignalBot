
import Router from 'express';


export const router = Router();


router.post('/', async (req, resp) => {
    const query = req.body;
    console.log('alert-hook query:', query);
    resp.status(200).json({ success: true });
});
