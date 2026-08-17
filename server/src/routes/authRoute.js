import express from 'express'
import { 
    signUp, 
    signIn, 
    signOut, 
    refreshToken,
    googleCallback,
    verifyEmail
} from '../controllers/authController.js';
import passport from 'passport';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.post('/refresh', refreshToken);

router.post('/verify', verifyEmail)

// google auth
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'], 
    session: false
}))

router.get('/google/callback', passport.authenticate('google', {
    session: false
}), googleCallback)


export default router;