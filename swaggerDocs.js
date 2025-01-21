module.exports = {
    paths: {
      // Toy Routes
      "/toys": {
        get: {
          summary: "Retrieve a list of toys with pagination",
          tags: ["Toys"],
          parameters: [
            {
              in: "query",
              name: "skip",
              schema: {
                type: "integer",
              },
              description: "The number of items to skip for pagination",
            },
          ],
          responses: {
            200: {
              description: "A list of toys",
            },
            400: {
              description: "Server error",
            },
          },
        },
        post: {
          summary: "Create a new toy",
          tags: ["Toys"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Toy",
                },
              },
            },
          },
          responses: {
            201: {
              description: "The created toy",
            },
            400: {
              description: "Validation error or server error",
            },
          },
        },
      },
      "/toys/search": {
        get: {
          summary: "Search for toys by name or info",
          tags: ["Toys"],
          parameters: [
            {
              in: "query",
              name: "s",
              schema: {
                type: "string",
              },
              description: "The search string",
            },
            {
              in: "query",
              name: "skip",
              schema: {
                type: "integer",
              },
              description: "The number of items to skip for pagination",
            },
          ],
          responses: {
            200: {
              description: "A list of toys matching the search criteria",
            },
            400: {
              description: "Server error",
            },
          },
        },
      },
      "/toys/category/{catname}": {
        get: {
          summary: "Retrieve toys by category with pagination",
          tags: ["Toys"],
          parameters: [
            {
              in: "path",
              name: "catname",
              required: true,
              schema: {
                type: "string",
              },
              description: "The category name",
            },
            {
              in: "query",
              name: "skip",
              schema: {
                type: "integer",
              },
              description: "The number of items to skip for pagination",
            },
          ],
          responses: {
            200: {
              description: "A list of toys in the specified category",
            },
            400: {
              description: "Server error",
            },
          },
        },
      },
      "/toys/prices": {
        get: {
          summary: "Retrieve toys filtered by price range",
          tags: ["Toys"],
          parameters: [
            {
              in: "query",
              name: "min",
              schema: {
                type: "number",
              },
              description: "The minimum price",
            },
            {
              in: "query",
              name: "max",
              schema: {
                type: "number",
              },
              description: "The maximum price",
            },
            {
              in: "query",
              name: "skip",
              schema: {
                type: "integer",
              },
              description: "The number of items to skip for pagination",
            },
          ],
          responses: {
            200: {
              description: "A list of toys within the specified price range",
            },
            400: {
              description: "Server error",
            },
          },
        },
      },
      "/toys/single/{id}": {
        get: {
          summary: "Retrieve a single toy by ID",
          tags: ["Toys"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
              description: "The toy ID",
            },
          ],
          responses: {
            200: {
              description: "The requested toy",
            },
            400: {
              description: "Server error",
            },
          },
        },
      },
      "/toys/{id}": {
        put: {
          summary: "Update a toy by ID",
          tags: ["Toys"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
              description: "The toy ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Toy",
                },
              },
            },
          },
          responses: {
            200: {
              description: "The updated toy",
            },
            404: {
              description: "Toy not found",
            },
          },
        },
        delete: {
          summary: "Delete a toy by ID",
          tags: ["Toys"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: {
                type: "string",
              },
              description: "The toy ID",
            },
          ],
          responses: {
            200: {
              description: "Deletion confirmation",
            },
            400: {
              description: "Server error",
            },
          },
        },
      },
  
      // User Routes
      "/users": {
        post: {
          summary: "Register a new user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterUser",
                },
              },
            },
          },
          responses: {
            201: {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            400: {
              description: "Validation error or email already in use",
            },
            502: {
              description: "Server error",
            },
          },
        },
      },
      "/users/login": {
        post: {
          summary: "Log in an existing user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginUser",
                },
              },
            },
          },
          responses: {
            200: {
              description: "User logged in successfully, with token returned",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                        description: "The JWT token for authentication",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Invalid email or password",
            },
            502: {
              description: "Server error",
            },
          },
        },
      },
    },
    components: {
      schemas: {
        // Toy Schema
        Toy: {
          type: "object",
          required: ["name", "info", "price", "category"],
          properties: {
            name: {
              type: "string",
              description: "The name of the toy",
              example: "Lego Set",
            },
            info: {
              type: "string",
              description: "Detailed information about the toy",
              example: "A set of 500 Lego bricks.",
            },
            price: {
              type: "number",
              description: "The price of the toy",
              example: 29.99,
            },
            category: {
              type: "string",
              description: "The category of the toy",
              example: "Building Blocks",
            },
          },
        },
  
        // User Schemas
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the user",
              example: "John Doe",
            },
            email: {
              type: "string",
              description: "The email of the user",
              example: "johndoe@example.com",
            },
            password: {
              type: "string",
              description: "The user's password (hashed when stored)",
              example: "myStrongPassword123",
            },
            role: {
              type: "string",
              description: "The role of the user (e.g., 'admin', 'user')",
              example: "user",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The creation timestamp of the user",
              example: "2023-01-21T10:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The last update timestamp of the user",
              example: "2023-01-22T15:45:00Z",
            },
          },
        },
        RegisterUser: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              description: "The name of the user",
              example: "Jane Doe",
            },
            email: {
              type: "string",
              description: "The email address of the user",
              example: "janedoe@example.com",
            },
            password: {
              type: "string",
              description: "The password of the user",
              example: "securePassword456",
            },
          },
        },
        LoginUser: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              description: "The email address of the user",
              example: "johndoe@example.com",
            },
            password: {
              type: "string",
              description: "The password of the user",
              example: "myPassword123",
            },
          },
        },
      },
    },
  };