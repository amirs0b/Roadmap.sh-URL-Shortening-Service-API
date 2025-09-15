import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "URL Shortener API",
            version: "1.0.0",
            description: "A simple and efficient URL shortening service built with Node.js and Express.",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server"
            },
        ],
        paths: {
            // AUTHENTICATION PATHS
            "/api/auth/register": {
                post: {
                    summary: "Register a new user",
                    description: "Creates a new user account with a username and password.",
                    tags: ["Auth"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: { type: "string", example: "testuser" },
                                        password: { type: "string", example: "Password123!" },
                                    },
                                    required: ["username", "password"],
                                },
                            },
                        },
                    },
                    responses: {
                        "201": { description: "User registered successfully" },
                        "400": { description: "Bad Request - Missing fields or invalid password format" },
                    },
                },
            },
            "/api/auth/": {
                post: {
                    summary: "User login",
                    description: "Authenticates a user and returns a JWT token.",
                    tags: ["Auth"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: { type: "string", example: "testuser" },
                                        password: { type: "string", example: "Password123!" },
                                    },
                                    required: ["username", "password"],
                                },
                            },
                        },
                    },
                    responses: {
                        "200": { description: "Login successful" },
                        "400": { description: "Bad Request - User not found or password incorrect" },
                    },
                },
            },

            // URL PATHS
            "/api/url/": {
                post: {
                    summary: "Create a new short URL",
                    description: "Creates a new short URL for the authenticated user.",
                    tags: ["URL"],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        originalUrl: { type: "string", example: "https://www.google.com/very/long/path/to/resource" },
                                    },
                                    required: ["originalUrl"],
                                },
                            },
                        },
                    },
                    responses: {
                        "201": { description: "Short URL created successfully" },
                        "400": { description: "Bad Request - Original URL is required" },
                        "401": { description: "Unauthorized - Invalid or missing token" },
                    },
                },
                get: {
                    summary: "Get all URLs for the current user",
                    description: "Retrieves a list of all short URLs created by the authenticated user.",
                    tags: ["URL"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        "200": { description: "A list of the user's URLs" },
                        "401": { description: "Unauthorized - Invalid or missing token" },
                    },
                }
            },
            "/api/url/{shortUrl}": {
                get: {
                    summary: "Redirect to original URL",
                    description: "Redirects the user to the original long URL associated with the short URL and increments the click count. This endpoint is public.",
                    tags: ["URL"],
                    parameters: [
                        { name: "shortUrl", in: "path", required: true, schema: { type: "string", example: "a1b2c3" } },
                    ],
                    responses: {
                        "302": { description: "Redirecting to the original URL" },
                        "404": { description: "URL not found" },
                    },
                }
            },
            "/api/url/{shortUrl}/stats": {
                get: {
                    summary: "Get URL statistics",
                    description: "Retrieves statistics for a specific short URL, including click count.",
                    tags: ["URL"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: "shortUrl", in: "path", required: true, schema: { type: "string", example: "a1b2c3" } },
                    ],
                    responses: {
                        "200": { description: "Statistics for the URL" },
                        "401": { description: "Unauthorized - Invalid or missing token" },
                        "404": { description: "URL not found" },
                    },
                }
            },
            "/api/url/{shortUrl}/manage": {
                patch: {
                    summary: "Update a short URL",
                    description: "Updates the original URL that a short URL points to. Can be done by the owner or an admin.",
                    tags: ["URL"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: "shortUrl", in: "path", required: true, schema: { type: "string", example: "a1b2c3" } },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        originalUrl: { type: "string", example: "https://www.an-updated-url.com" },
                                    },
                                    required: ["originalUrl"],
                                },
                            },
                        },
                    },
                    responses: {
                        "200": { description: "URL updated successfully" },
                        "400": { description: "Bad Request - New original URL is required" },
                        "401": { description: "Unauthorized - Invalid or missing token" },
                        "403": { description: "Forbidden - User is not authorized" },
                        "404": { description: "URL not found" },
                    },
                },
                delete: {
                    summary: "Delete a short URL",
                    description: "Deletes a short URL. Can be done by the owner or an admin.",
                    tags: ["URL"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: "shortUrl", in: "path", required: true, schema: { type: "string", example: "a1b2c3" } },
                    ],
                    responses: {
                        "200": { description: "URL deleted successfully" },
                        "401": { description: "Unauthorized - Invalid or missing token" },
                        "403": { description: "Forbidden - User is not authorized" },
                        "404": { description: "URL not found" },
                    },
                }
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./Routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(options);
export default swaggerDocs;

