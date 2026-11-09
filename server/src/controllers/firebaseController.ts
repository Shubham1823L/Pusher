import { RequestHandler } from "express";
import { getMessaging } from "firebase-admin/messaging";
import { z } from 'zod'

const CreatePushNotificationSchema = z.object({
    fid: z.string(),
    title: z.string(),
    body: z.string()
})

export const createPushNotification: RequestHandler = async (req, res) => {
    const parsedData = CreatePushNotificationSchema.safeParse({
        ...req.query,
        ...req.body
    })
    console.log(req.body)
    if (!parsedData.success) return res.fail(400, "BAD_REQUEST", "Invalid body")

    const { fid, title, body } = parsedData.data

    const message = {
        data: {
            title,
            body
        },
        fid
    }
    try {
        const messageResponse = await getMessaging().send({
            ...message,
            android: {
                priority: 'high',
                notification: {
                    channelId: 'default',
                    title,
                    body
                }
            }
        })
        console.log("Message handed over to FCM successfully. FCM Response:", messageResponse)
        return res.success(200, `Message handed over to FCM successfully. FCM Response:", ${messageResponse}`)
    } catch (error) {
        console.log("ERROR: Could not send message to FCM, something went wrong:", error)
        throw error
    }
}