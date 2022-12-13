import { passportAuth } from "blitz"
import db from "db"
import { Strategy as TwitterStrategy } from "passport-twitter"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    {
      strategy: new GoogleStrategy(
        {
          // Standard OAuth2 options
          clientID: "113028163080-8901rhel4atr8o2vsb1ro9r69t2cd8n1.apps.googleusercontent.com",
          clientSecret: "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",
          callbackURL: "http://localhost:3000/api/auth/google/callback",
          scope: ["user.read"],

          // Microsoft specific options

          // [Optional] The tenant for the application. Defaults to 'common'.
          // Used to construct the authorizationURL and tokenURL
          tenant: "common",

          // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
          authorizationURL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",

          // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
          tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
        },
        async function (_token, _tokenSecret, profile, done) {
          console.log(_token, _tokenSecret, profile)
          /* const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Twitter OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              firstName: profile.displayName,
              lastName: "",
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "twitter",
          } */
          done(undefined, "hello" /* { publicData } */)
        }
      ),
    },
  ],
})
