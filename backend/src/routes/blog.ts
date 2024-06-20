import { Hono } from "hono";
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createPostInput, updatePostInput } from '@soumrnjn/connectly-common/dist'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    }
}>();


blogRouter.use('/*', async (c, next) => {
    const jwt = await c.req.header('Authorization');
    try {
        if (!jwt) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        const token = jwt.split(' ')[1];
        const payload = await verify(token, c.env.JWT_SECRET);

        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        c.set('userId', payload.id as string);
        await next()
    } catch (error) {
        c.status(403);
        return c.json({ error: "unauthorized" });
    }
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    console.log(body);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" });
    }

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            published: new Date(),
            author_id: c.get('userId')
        }
    })
    return c.json({
        id: post.id
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" });
    }

    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        id: post.id,
        post: post,
        updated: true
    })
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                },
                published: true
            }
        })
        return c.json({ posts })
    } catch (error) {
        c.status(403)
        return c.json({
            msg: "Error while fetching posts"
        })
    }
})

blogRouter.get('/:id', async (c) => {
    const id = await c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findFirst({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                },
                published: true
            },
            where: {
                id: parseInt(id)
            }
        })
        return c.json({ post })
    } catch (error) {
        c.status(403)
        return c.json({
            msg: "Error while fetching post"
        })
    }
})