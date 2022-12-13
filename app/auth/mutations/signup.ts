import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ firstName, lastName, email, password, companyName }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase().trim(),
        hashedPassword,
        role: "USER",
      },
      select: { id: true, firstName: true, lastName: true, email: true, role: true },
    })
    const company = await db.company.create({
      data: {
        name: companyName,
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    await db.user.update({
      where: { id: user.id },
      data: { OwnedCompany: { connect: { id: company.id } } },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
