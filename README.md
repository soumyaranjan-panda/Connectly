# Connectly

```
  Client (User A)                               Server                           Client (User B)
     |                                           |                                     |
     | User Logs In (Enter Credentials)          |                                     |
     |------------------------------------------>|                                     |
     |                                           |                                     |
     | Server Verifies Credentials               |                                     |
     | and Returns User Data (Token)             |                                     |
     |<------------------------------------------|                                     |
     |                                           |                                     |
     | Client Stores Token (User Authenticated)  |                                     |
     |                                           |                                     |
     | Client Makes Request for Blog Posts       |                                     |
     | (GET /api/blogs)                          |                                     |
     |------------------------------------------>|                                     |
     |                                           |                                     |
     | Server Fetches Blog Posts from DB         |                                     |
     | and Returns Data                          |                                     |
     |<------------------------------------------|                                     |
     |                                           |                                     |
     | Client Displays Blog Posts                |                                     |
     |                                           |                                     |
     | User Creates New Blog Post                |                                     |
     | (Fills Form and Submits)                  |                                     |
     |------------------------------------------>|                                     |
     |                                           |                                     |
     | Server Saves New Blog Post to DB          |                                     |
     | and Returns Success Message               |                                     |
     |<------------------------------------------|                                     |
     |                                           |                                     |
     | Client Displays Confirmation              |                                     |
     | (New Blog Post Created)                   |                                     |
     |                                           |                                     |
     | User Makes Request to Edit Blog Post      |                                     |
     | (GET /api/blogs/:id)                      |                                     |
     |------------------------------------------>|                                     |
     |                                           |                                     |
     | Server Retrieves Specific Blog Post       |                                     |
     | from DB                                   |                                     |
     |<------------------------------------------|                                     |
     |                                           |                                     |
     | Client Displays Blog Post for Editing     |                                     |
     |                                           |                                     |
     | User Edits Blog Post and Submits          |                                     |
     |------------------------------------------>|                                     |
     |                                           |                                     |
     | Server Updates Blog Post in DB            |                                     |
     | and Returns Success Message               |                                     |
     |<------------------------------------------|                                     |
     |                                           |                                     |
     | Client Displays Confirmation              |                                     |
     | (Blog Post Updated)                       |                                     |
     |                                           |                                     |
     | User Logs Out                             |                                     |
     |------------------------------------------>|                                     |
     |                                           |                                     |
     | Server Invalidates User Session           |                                     |
     | and Returns Logout Success                |                                     |
     |<------------------------------------------|                                     |
     |                                           |                                     |
     | Client Redirects to Login Page            |                                     |
     |                                           |                                     |

```

### Key Events:

1. **User Logs In**: Client sends login credentials to the server.
2. **Server Verifies**: The server verifies the credentials and returns a token if successful.
3. **Fetch Blog Posts**: Client sends a request to the server to fetch all blog posts.
4. **Create New Blog Post**: User creates a new blog post which the client sends to the server to store in the database.
5. **Edit Blog Post**: User edits an existing blog post. The client fetches it from the server and submits the changes.
6. **User Logs Out**: Client sends a logout request, and the server invalidates the session.

This flow outlines basic user interactions such as login, viewing blog posts, creating new posts, editing posts, and logging out.

**A monorepo** (short for *monolithic repository*) is a single repository that holds multiple modules or projects, often for large applications with several interrelated components, like frontends, backends, and shared libraries. 

In the common folder, I used Zod for defining data types in the backend, which are then inferred for use in the frontend.
It enhances type safety, ensures consistency, and improves developer experience.

In a **monorepo**, developers can focus solely on the parts they need without getting bogged down by other sections of the codebase. For example:

- **Frontend Developer**: They can concentrate on the frontend directory, ignoring backend modules. Most monorepo setups allow fine-grained permissions or configurations so that each team member sees or works only on relevant parts.
- **Backend Developer**: Similarly, backend developers can focus on backend-specific modules, libraries, or APIs without needing to dive into frontend code.

In short, a monorepo can still be segmented logically to keep developers focused on what’s relevant to their expertise, reducing complexity and improving productivity.

```html
export const x = z.object({
    username: z.string(),
    password: z.string()
})
export type xParams = z.infer<typeof x>
```

```tsx
npm login
npm publish --access=public
npm pack
you can change the package version and publish any update
make declaration=true in tsconfig.json file
```

# Stack

### Stack

1. React in the frontend
2. Cloudflare workers in the backend
3. zod as the validation library, type inference for the frontend types
4. Typescript as the language
5. Prisma as the ORM, with connection pooling
6. Postgres as the database
7. jwt for authentication

### **Step-1:** Initialize a `hono` based cloudflare worker app

- Hono
    
    Hono - ***[炎] means flame🔥 in Japanese*** - is a small, simple, and ultrafast web framework for the Edges. It works on any JavaScript runtime: Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, Netlify, AWS Lambda, Lambda@Edge, and Node.js.
    
    ```jsx
    npm create hono@latest
    ```
    
- Details
    
    Target directory › `backend`
    
    Which template do you want to use? - `cloudflare-workers`
    
    Do you want to install project dependencies? … yes
    Which package manager do you want to use? › npm (or yarn or bun, doesnt matter)
    

### Step-2: Initialize handlers

- Routes
    1. POST /api/v1/user/signup
    2. POST /api/v1/user/signin
    3. POST /api/v1/blog
    4. PUT /api/v1/blog
    5. GET /api/v1/blog/:id
    6. GET /api/v1/blog/bulk
- Website
    
    [https://hono.dev/api/routing](https://hono.dev/api/routing)
    
- Code
    
    ```jsx
    import { Hono } from 'hono';
    
    // Create the main Hono app
    const app = new Hono();
    
    app.post('/api/v1/signup', (c) => {
    	return c.text('signup route')
    })
    
    app.post('/api/v1/signin', (c) => {
    	return c.text('signin route')
    })
    
    app.get('/api/v1/blog/:id', (c) => {
    	const id = c.req.param('id')
    	console.log(id);
    	return c.text('get blog route')
    })
    
    app.post('/api/v1/blog', (c) => {
    
    	return c.text('signin route')
    })
    
    app.put('/api/v1/blog', (c) => {
    	return c.text('signin route')
    })
    
    export default app;
    ```
    

### Step-3: **Initialize DB (prisma)**

- Procedure
    
    ### **1. Get your connection url from neon.db or aieven.tech**
    
    ```jsx
    postgresql://connectly_owner:8gLyzpJbHQ0n@ep-morning-rain-a5yzt80g.us-east-2.aws.neon.tech/connectly?sslmode=require
    ```
    
    ### **2. Get connection pool URL from Prisma accelerate**
    
    - Details
        
        When there are a number of workers then they start hitting the database simultaneously so we cannot connect to the database directly we need a middle man which is called connection pool.
        
        we cannot have multiple connections to the database but we can have multiple connection with the pool
        
    
    ```jsx
    DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTZjZWU5OTktOTdmYi00MWVkLTlmZWItMGI2MDQ4OGEyNTY4IiwidGVuYW50X2lkIjoiYzkwZWZmOTczNzdjODkxNmRhMGFkYTdlODcxNGZlMTZmMGU2NGIzOWE2NWYwZmYyZDY3MjI2MjlkZjI3MDc4MyIsImludGVybmFsX3NlY3JldCI6IjRjNDBiYzc5LWI2NjctNDVhMi04NjcxLWI2YTM5NzExNmIyZCJ9.j_wVPPugHzXygSPunxnMeWlgl4TFHCr5TeWvu9Ddlgk"
    ```
    
    ### **3. Initialize prisma in your project**
    
    - Procedure
        
        Make sure you are in the `backend` folder
        
        ```jsx
        npm i prisma
        npx prisma init
        ```
        
        Replace `DATABASE_URL` in `.env` (Original database url)
        
        ```jsx
        DATABASE_URL="postgres://avnadmin:password@host/db"
        ```
        
        Add `DATABASE_URL` as the `connection pool` url in `wrangler.toml` (accelarate one)
        
        ```jsx
        name = "backend"
        compatibility_date = "2023-12-01"
        
        [vars]
        DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTZjZWU5OTktOTdmYi00MWVkLTlmZWItMGI2MDQ4OGEyNTY4IiwidGVuYW50X2lkIjoiYzkwZWZmOTczNzdjODkxNmRhMGFkYTdlODcxNGZlMTZmMGU2NGIzOWE2NWYwZmYyZDY3MjI2MjlkZjI3MDc4MyIsImludGVybmFsX3NlY3JldCI6IjRjNDBiYzc5LWI2NjctNDVhMi04NjcxLWI2YTM5NzExNmIyZCJ9.j_wVPPugHzXygSPunxnMeWlgl4TFHCr5TeWvu9Ddlgk"
        ```
        
        You should not have your prod URL committed either in .env or in wrangler.toml to github
        wranger.toml should have a dev/local DB url
        .env should be in .gitignore
        
    
    ### **4. Initialize the schema**
    
    ```jsx
    generator client {
      provider = "prisma-client-js"
    }
    
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }
    
    model User {
      id       String   @id @default(uuid())
      email    String   @unique
      name     String?
      password String
      posts    Post[]
    }
    
    model Post {
      id        String   @id @default(uuid())
      title     String
      content   String
      published Boolean  @default(false)
      author    User     @relation(fields: [authorId], references: [id])
      authorId  String
    }
    ```
    
    ### **5. Migrate your database**
    
    ```jsx
    npx prisma migrate dev --name init_schema
    ```
    
    ### **6. Generate the prisma client**
    
    ```jsx
    npx prisma generate --no-enginenpx prisma generate --no-engine
    ```
    
    ### **7. Add the accelerate extension**
    
    ```jsx
    npm install @prisma/extension-accelerate
    ```
    
    ### **8. Initialize the prisma client**
    
    ```jsx
    import { PrismaClient } from '@prisma/client/edge'
    import { withAccelerate } from '@prisma/extension-accelerate'
    
    const prisma = new PrismaClient({
        datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate())
    ```
    

### **Step 4 - Create non auth routes**

- Procedure
    
    ### **1. Simple Signup & Signin route**
    
    ```jsx
    import { PrismaClient } from '@prisma/client/edge'
    import { withAccelerate } from '@prisma/extension-accelerate'
    import { Hono } from 'hono';
    import { sign } from 'hono/jwt'
    
    // Create the main Hono app
    const app = new Hono<{
    	Bindings: {
    		DATABASE_URL: string,
    		JWT_SECRET: string,
    	}
    }>();
    
    app.post('/api/v1/signup', async (c) => {
    	const prisma = new PrismaClient({
    		datasourceUrl: c.env?.DATABASE_URL	,
    	}).$extends(withAccelerate());
    
    	const body = await c.req.json();
    	try {
    		const user = await prisma.user.create({
    			data: {
    				email: body.email,
    				password: body.password
    			}
    		});
    		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    		return c.json({ jwt });
    	} catch(e) {
    		c.status(403);
    		return c.json({ error: "error while signing up" });
    	}
    })
    app.post('/api/v1/signin', async (c) => {
    	const prisma = new PrismaClient({
    		datasourceUrl: c.env?.DATABASE_URL	,
    	}).$extends(withAccelerate());
    
    	const body = await c.req.json();
    	const user = await prisma.user.findUnique({
    		where: {
    			email: body.email
    		}
    	});
    
    	if (!user) {
    		c.status(403);
    		return c.json({ error: "user not found" });
    	}
    
    	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    	return c.json({ jwt });
    })
    ```
    

### **Step 5 - Middlewares**

- Procedure
    
    ### **1. Limiting the middleware**
    
    To restrict a middleware to certain routes, you can use the following -
    
    ```jsx
    app.use('/message/*', async (c, next) => {
      await next()
    })
    ```
    
    In our case, the following routes need to be protected -
    
    ```jsx
    
    app.get('/api/v1/blog/:id', (c) => {})
    
    app.post('/api/v1/blog', (c) => {})
    
    app.put('/api/v1/blog', (c) => {})
    ```
    
    So we can add a top level middleware
    
    ```jsx
    app.use('/api/v1/blog/*', async (c, next) => {
      await next()
    })
    ```
    
    ### **2. Writing the middleware**
    
    Write the logic that extracts the user id and passes it over to the main route.
    
    ```jsx
    app.use('/api/v1/blog/*', async (c, next) => {
      const header = c.req.header("authorization")
      if (header) {
        const token = header.split(" ")[1]
        const response = await verify(token, c.env.JWT_SECRET)
        if (response.id) {
          next()
        } else {
          c.status(403)
          return c.json({ error: "Unauthorized" })
        }
      } else {
        console.log("Undefined");
      }
      await next()
    })
    ```
    
    whenever any request pass through /api/v1/blog/(anything) then it has to app through this middle ware first. header takes out the authorization part from the req and splits it takes the token. the token is verified and the id is pulled out from it. if there is an id then next() else return status 403 not found and unauthorized.
    
    whenever we are using cloudflare workers, it creates a bunch of serverless workers/ instances of that application and it is a bad idea to connect all of them to the database. so whenever we have multiple servers/ or multiple minimachine we should not connect them directly to the database. so we rather connect all of them to connection pool which is connected to the database.
    
    .env: this has information which cli will use. i.e when we migrate, generate client, prisma studio.
    
    .wrangler.toml: holds all the neccessary links which our backend application will use.
    

### **Step 7 - Blog routes and better routing**

- index.js
    
    ```jsx
    import { Hono } from 'hono';
    import { userRouter } from './routes/user';
    import { blogRouter } from './routes/blog';
    
    const app = new Hono();
    
    app.route('/api/v1/user', userRouter)
    app.route('/api/v1/blog', blogRouter)
    
    export default app
    ```
    
- routes/user.js
    
    ```jsx
    import { Hono } from "hono";
    import { PrismaClient } from '@prisma/client/edge'
    import { withAccelerate } from '@prisma/extension-accelerate'
    import { sign, verify } from 'hono/jwt'
    
    export const userRouter = new Hono<{
        Bindings: {
            DATABASE_URL: string,
            JWT_SECRET: string,
        }
    }>();
    
    userRouter.post('/signup', async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
        try {
            const user = await prisma.user.create({
                data: {
                    email: body.email,
                    password: body.password
                }
            });
            const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
            const s = await verify(jwt, c.env.JWT_SECRET)
            console.log(s);
            return c.json({ jwt });
        } catch (e) {
            c.status(403);
            console.log(e);
            return c.json({
                error: "error while signing up",
                eror: e
            });
        }
    })
    
    userRouter.post('/signin', async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
    
        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }
    
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    
        return c.json({ jwt });
    })
    ```
    
- routes/blog.js
    
    ```jsx
    import { Hono } from "hono";
    import { sign, verify } from 'hono/jwt'
    import { PrismaClient } from '@prisma/client/edge'
    import { withAccelerate } from '@prisma/extension-accelerate'
    
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
    })
    
    blogRouter.post('/', async (c) => {
        const body = await c.req.json()
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: true,
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
            const posts = await prisma.post.findMany()
            return c.json({ posts })
        } catch (error) {
            c.status(403)
            return c.json({
                msg: "Error while fetching posts"
            })
        }
    })
    
    blogRouter.get('/:id', async(c) => {
        const id = await c.req.param('id')
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
        try {
            const post = await prisma.post.findFirst({
                where:{
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
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzMTk3NjRmLWUwOTgtNGJlMS04MjM1LTc0ZTBlYzI4YjA4YSJ9.OsFUAkxOg4uQvGZkd4UZt-FFD_5o17VjFDYOe59OckA
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0ZTRmOWQ3LWZlNTctNDM5OS04MTMxLTVlMDlmYmRmMWY0MyJ9.fM2Fb2HIlumIO36nbs-l3WhFOzqcoMaxBq0k-ipPRKI
    ```
    

### **Step 8 - Deploy you application**

- Procedure
    
    ```jsx
    npx wrangler login
    npx wrangler whoami
    npm run deploy
    ```
    

### **Step 9 - Zod validation**

- Procedure
    
    ```jsx
    mkdir common
    cd common
    npm init -y
    npx tsc --init
    ```
    
    ```jsx
    "rootDir": "./src",
    "outDir": "./dist",
    "declaration": true,
    ```
    
    src/index.js
    
    ```jsx
    import z from "zod";
    
    export const signupInput = z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string().optional(),
    });
    
    export type SignupType = z.infer<typeof signupInput>;
    
    export const signinInput = z.object({
        email: z.string().email(),
        password: z.string(),
    });
    
    export type SigninType = z.infer<typeof signinInput>;
    
    export const createPostInput = z.object({
        title: z.string(),
        content: z.string(),
    });
    
    export type CreatePostType = z.infer<typeof createPostInput>;
    
    export const updatePostInput = z.object({
        title: z.string().optional(),
        content: z.string().optional(),
    });
    
    export type UpdatePostType = z.infer<typeof updatePostInput>;
    ```
    
    ```jsx
    tsc -b
    npm publish --access public
    ```
    
    ```jsx
    cd backend
    **npm i your_package_name**
    import { PrismaClient } from '@prisma/client/edge'
    import { withAccelerate } from '@prisma/extension-accelerate'
    import { Hono } from 'hono';
    import { sign, verify } from 'hono/jwt'
    import { signinInput, signupInput, createPostInput, updatePostInput } from "@100xdevs/common-app"
    
    // Create the main Hono app
    const app = new Hono<{
    	Bindings: {
    		DATABASE_URL: string,
    		JWT_SECRET: string,
    	},
    	Variables : {
    		userId: string
    	}
    }>();
    
    app.use('/api/v1/blog/*', async (c, next) => {
    	const jwt = c.req.header('Authorization');
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
    	c.set('userId', payload.id);
    	await next()
    })
    
    app.post('/api/v1/signup', async (c) => {
    	const prisma = new PrismaClient({
    		datasourceUrl: c.env?.DATABASE_URL	,
    	}).$extends(withAccelerate());
    
    	const body = await c.req.json();
    	const { success } = signupInput.safeParse(body);
    	if (!success) {
    		c.status(400);
    		return c.json({ error: "invalid input" });
    	}
    	try {
    		const user = await prisma.user.create({
    			data: {
    				email: body.email,
    				password: body.password
    			}
    		});
    		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    		return c.json({ jwt });
    	} catch(e) {
    		c.status(403);
    		return c.json({ error: "error while signing up" });
    	}
    })
    
    app.post('/api/v1/signin', async (c) => {
    	const prisma = new PrismaClient({
    		datasourceUrl: c.env?.DATABASE_URL	,
    	}).$extends(withAccelerate());
    
    	const body = await c.req.json();
    	const { success } = signinInput.safeParse(body);
    	if (!success) {
    		c.status(400);
    		return c.json({ error: "invalid input" });
    	}
    	const user = await prisma.user.findUnique({
    		where: {
    			email: body.email
    		}
    	});
    
    	if (!user) {
    		c.status(403);
    		return c.json({ error: "user not found" });
    	}
    
    	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    	return c.json({ jwt });
    })
    
    app.get('/api/v1/blog/:id', async (c) => {
    	const id = c.req.param('id');
    	const prisma = new PrismaClient({
    		datasourceUrl: c.env?.DATABASE_URL	,
    	}).$extends(withAccelerate());
    	
    	const post = await prisma.post.findUnique({
    		where: {
    			id
    		}
    	});
    
    	return c.json(post);
    })
    
    app.post('/api/v1/blog', async (c) => {
    	const userId = c.get('userId');
    	const prisma = new PrismaClient({
    		datasourceUrl: c.env?.DATABASE_URL	,
    	}).$extends(withAccelerate());
    
    	const body = await c.req.json();
    	const { success } = createPostInput.safeParse(body);
    	if (!success) {
    		c.status(400);
    		return c.json({ error: "invalid input" });
    	}
    
    	const post = await prisma.post.create({
    		data: {
    			title: body.title,
    			content: body.content,
    			authorId: userId
    		}
    	});
    	return c.json({
    		id: post.id
    	});
    })
    
    app.put('/api/v1/blog', async (c) => {
    	const userId = c.get('userId');
    	const prisma = new PrismaClient({
    		datasourceUrl: c.env?.DATABASE_URL	,
    	}).$extends(withAccelerate());
    
    	const body = await c.req.json();
    	const { success } = updatePostInput.safeParse(body);
    	if (!success) {
    		c.status(400);
    		return c.json({ error: "invalid input" });
    	}
    
    	prisma.post.update({
    		where: {
    			id: body.id,
    			authorId: userId
    		},
    		data: {
    			title: body.title,
    			content: body.content
    		}
    	});
    
    	return c.text('updated post');
    });
    
    export default app;
    
    ```
    

### **Step 10 - Init the FE project**

- Procedure
    
    ```jsx
    npm create vite@latest
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    
    tailwind.config
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    
    index.css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    npm i @soumrnjn/connectly-common
    npm run dev
    ```
    

### **Step 14 - Add react-router-dom**

- Procedure
    
    npm i react-router-dom
    
    ```jsx
    import { BrowserRouter, Route, Routes } from 'react-router-dom'
    import { Signup } from './pages/Signup'
    import { Signin } from './pages/Signin'
    import { Blog } from './pages/Blog'
    
    function App() {
    
      return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/blog/:id" element={<Blog />} />
            </Routes>
          </BrowserRouter>
        </>
      )
    }
    
    export default App
    ```
    

to reset prisma npx prisma migrate reset
