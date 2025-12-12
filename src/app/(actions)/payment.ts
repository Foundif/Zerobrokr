'use server';

import Razorpay from 'razorpay';
import { z } from 'zod';

const paymentSchema = z.object({
    amount: z.number().positive(),
});

export async function createOrder(values: z.infer<typeof paymentSchema>) {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        const options = {
            amount: values.amount * 100, // amount in smallest currency unit
            currency: 'INR',
            receipt: `receipt_order_${new Date().getTime()}`,
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return { success: false, message: 'Failed to create order.' };
        }

        return { success: true, order };
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return { success: false, message: 'An error occurred while creating the order.' };
    }
}
