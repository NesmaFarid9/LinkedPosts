import * as zod from 'zod'
export const changePasswordSchema = zod.object({
    oldPassword: zod.string().nonempty('Password is required')
                .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,'Password is inValid'),
    newPassword: zod.string().nonempty('Password is required')
                .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,'Password is inValid'),

});