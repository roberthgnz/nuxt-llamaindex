export default defineEventHandler(async (event) => {
    try {
        const { model } = await readBody(event)

        const session = await useSession(event, {
            password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
        });

        await session.update({
            model
        });

        return {
            statusCode: 200,
            body: {
                success: true,
            },
        }
    } catch (error) {
        throw createError(
            {
                statusCode: 500,
                message: (error as Error).message,
            },
        );
    }
})