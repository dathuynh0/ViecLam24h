import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/User.js';
import Candidate from '../models/Candidate.js';
import { downloadImage } from '../utils/downLoadImage.js'

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;

                let user = await User.findOne({
                    where: { googleId: profile.id }
                });
                if (!user) {
                    user = await User.findOne({ where: { email } });

                    if (user) {
                        user.googleId = profile.id;
                        await user.save();
                    } else {
                        user = await User.create({
                            googleId: profile.id,
                            email,
                            status: 'active'
                        });

                        let avatarUrl = "public/uploads/avatars/default-candidate.jpg";
                        const googlePhotoUrl = profile.photos?.[0]?.value;

                        if (googlePhotoUrl) {
                            try {
                                const filename = `${Date.now()}-${user.id}.jpg`;
                                const downloaded  = await downloadImage(googlePhotoUrl, filename);
                                if (downloaded) avatarUrl = downloaded;
                            } catch (error) {
                                console.error('Lỗi tải avatar từ Google:', error.message);
                            }
                        }
                        
                        const candidate = await Candidate.create({
                            userId: user.id,
                            fullName: profile.displayName,
                            avatarUrl
                        })
                    }
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
)

export default passport;