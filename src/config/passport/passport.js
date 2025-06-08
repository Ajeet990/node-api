import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { prisma } from './connection/db.js';
// import { prisma } from '../config/connection/db.js';
import { prisma } from '../connection/db.js';
// import { JWT_SECRET } from './constants.js';
import { JWT_SECRET } from '../constants.js';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: jwtPayload.userId },
      select: { id: true, email: true } // Never return password
    });
    
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;