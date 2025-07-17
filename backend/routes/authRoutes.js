import express from 'express';
import { registerUser, loginUser, getUserInfo } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
import upload from '../middleware/uploadMiddleware.js';
// Auth routes
router.post('/register', registerUser);  
router.post('/login', loginUser);
router.get('/getUser', protect,getUserInfo);
router.post('/upload-image', upload.single("image"),(req,res)=>{
if(!req.file){
    return res.status(400).json({message:"No file upoladed"});}
    const imageUrl =`${req.protocol}://${req.get("host")}/upload/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl});
});




export default router;
