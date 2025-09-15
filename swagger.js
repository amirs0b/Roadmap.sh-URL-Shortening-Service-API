import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "URL Shortener API",
            version: "1.0.0",
            description: "A simple and efficient URL shortening service API built with Node.js, Express, and MongoDB. This API allows users to create, manage, and track short URLs.",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your JWT token in the format: Bearer {token}"
                },
            },
            schemas: {
                Url: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "60d21b4667d0d8992e610c8b"
                        },
                        originalUrl: {
                            type: "string",
                            example: "https://www.google.com/very/long/path/to/resource"
                        },
                        shortCode: {
                            type: "string",
                            example: "a1b2c3"
                        },
                        clicks: {
                            type: "integer",
                            example: 42
                        },
                        user: {
                            type: "string",
                            description: "ID of the user who created the URL.",
                            example: "60d0fe4f5311236168a109ca"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },
                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "60d0fe4f5311236168a109ca"
                        },
                        username: {
                            type: "string",
                            example: "testuser"
                        },
                        role: {
                            type: "string",
                            enum: ["user", "admin"],
                            example: "user"
                        },
                    }
                }
            }
        },
        paths: {
            // Auth Paths
            "/api/auth/register": {
                post: {
                    summary: "Register a new user",
                    tags: ["Auth"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: { type: "string", example: "newuser" },
                                        password: { type: "string", example: "Password123" }
                                    },
                                    required: ["username", "password"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": { description: "User registered successfully" },
                        "400": { description: "Bad Request (e.g., missing fields, weak password)" }
                    }
                }
            },
            "/api/auth": {
                post: {
                    summary: "Log in a user",
                    tags: ["Auth"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: { type: "string", example: "testuser" },
                                        password: { type: "string", example: "Password123" }
                                    },
                                    required: ["username", "password"]
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Login successful, returns token and user info",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: { type: "boolean", example: true },
                                            message: { type: "string", example: "Login successful" },
                                            data: {
                                                type: "object",
                                                properties: {
                                                    token: { type: "string" },
                                                    user: { "$ref": "#/components/schemas/User" }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "401": { description: "Invalid username or password" }
                    }
                }
            },
            // URL Paths
            "/{shortCode}": {
                get: {
                    summary: "Redirect to Original URL",
                    tags: ["URL"],
                    description: "This is the primary public endpoint. It finds the original URL by its short code, increments the click count, and performs a 302 redirect.",
                    parameters: [
                        { name: "shortCode", in: "path", required: true, schema: { type: "string" }, example: "a1b2c3" }
                    ],
                    responses: {
                        "302": { description: "Redirecting to the original URL." },
                        "404": { description: "Short URL not found." }
                    }
                }
            },
            "/api/url": {
                post: {
                    summary: "Create a new Short URL",
                    tags: ["URL"],
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        originalUrl: { type: "string", example: "https://www.example.com/a-very-long-url-to-be-shortened" }
                                    },
                                    required: ["originalUrl"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "Short URL created successfully.",
                            content: { "application/json": { schema: { "$ref": "#/components/schemas/Url" } } }
                        },
                        "400": { description: "Bad Request (e.g., missing originalUrl)" },
                        "401": { description: "Unauthorized" }
                    }
                },
                get: {
                    summary: "Get All URLs for User",
                    tags: ["URL"],
                    security: [{ bearerAuth: [] }],
                    responses: {
                        "200": {
                            description: "A list of the user's shortened URLs.",
                            content: { "application/json": { schema: { type: "array", items: { "$ref": "#/components/schemas/Url" } } } }
                        },
                        "401": { description: "Unauthorized" }
                    }
                }
            },
            "/api/url/{shortCode}/stats": {
                get: {
                    summary: "Get URL Statistics",
                    tags: ["URL"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: "shortCode", in: "path", required: true, schema: { type: "string" }, example: "a1b2c3" }
                    ],
                    responses: {
                        "200": {
                            description: "Statistics for the short URL.",
                            content: { "application/json": { schema: { "$ref": "#/components/schemas/Url" } } }
                        },
                        "401": { description: "Unauthorized" },
                        "404": { description: "Short URL not found" }
                    }
                }
            },
            "/api/url/{shortCode}/manage": {
                patch: {
                    summary: "Update a Short URL",
                    tags: ["URL"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: "shortCode", in: "path", required: true, schema: { type: "string" }, example: "a1b2c3" }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        originalUrl: { type: "string", example: "https://www.new-updated-link.com" }
                                    },
                                    required: ["originalUrl"]
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "URL updated successfully.",
                            content: { "application/json": { schema: { "$ref": "#/components/schemas/Url" } } }
                        },
                        "401": { description: "Unauthorized" },
                        "403": { description: "Forbidden (user does not own this URL)" },
                        "404": { description: "Short URL not found" }
                    }
                },
                delete: {
                    summary: "Delete a Short URL",
                    tags: ["URL"],
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: "shortCode", in: "path", required: true, schema: { type: "string" }, example: "a1b2c3" }
                    ],
                    responses: {
                        "200": { description: "URL deleted successfully." },
                        "401": { description: "Unauthorized" },
                        "403": { description: "Forbidden (user does not own this URL)" },
                        "404": { description: "Short URL not found" }
                    }
                }
            }
        }
    },
    apis: ["./Routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(options);
export default swaggerDocs;
