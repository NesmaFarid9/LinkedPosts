import * as zod from 'zod'
export const schema = zod.object({
    email: zod.string().nonempty('Email is required')
                .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/,'Email is invalid'),
    password: zod.string().nonempty('Password is required')
                .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,'Password is inValid'),

});