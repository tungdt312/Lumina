{
  "openapi": "3.1.0",
  "info": {
    "title": "OpenAPI definition",
    "version": "v0"
  },
  "servers": [
    {
      "url": "https://se109-backend-ryrr.onrender.com",
      "description": "Generated server url"
    }
  ],
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    {
      "name": "User",
      "description": "Endpoints for managing users"
    },
    {
      "name": "Authentication",
      "description": "Endpoints for user authentication and registration"
    },
    {
      "name": "Property",
      "description": "Endpoints for managing properties"
    }
  ],
  "paths": {
    "/api/v1/users/{id}": {
      "get": {
        "tags": [
          "User"
        ],
        "operationId": "findUserById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseUserResponse"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "User"
        ],
        "operationId": "updateUser",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseUserResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "User"
        ],
        "operationId": "deleteUserById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseVoid"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/properties/{id}": {
      "get": {
        "tags": [
          "Property"
        ],
        "operationId": "findPropertyById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponsePropertyResponse"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Property"
        ],
        "operationId": "updateProperty",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PropertyRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponsePropertyResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Property"
        ],
        "operationId": "deletePropertyById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseVoid"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/users": {
      "get": {
        "tags": [
          "User"
        ],
        "operationId": "findAllUser",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Zero-based page index (0..N)",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 0,
              "minimum": 0
            }
          },
          {
            "name": "size",
            "in": "query",
            "description": "The size of the page to be returned",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 20,
              "minimum": 1
            }
          },
          {
            "name": "sort",
            "in": "query",
            "description": "Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "filter",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "all",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "default": false
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponsePageResponseUserSummary"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "User"
        ],
        "operationId": "createUser",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseUserResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "User"
        ],
        "operationId": "deleteBulkUser",
        "parameters": [
          {
            "name": "ids",
            "in": "query",
            "required": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "integer",
                "format": "int64"
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseVoid"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/properties": {
      "get": {
        "tags": [
          "Property"
        ],
        "operationId": "findAllProperty",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Zero-based page index (0..N)",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 0,
              "minimum": 0
            }
          },
          {
            "name": "size",
            "in": "query",
            "description": "The size of the page to be returned",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 20,
              "minimum": 1
            }
          },
          {
            "name": "sort",
            "in": "query",
            "description": "Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "filter",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "all",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "default": false
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponsePageResponsePropertySummary"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Property"
        ],
        "operationId": "createProperty",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PropertyRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponsePropertyResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Property"
        ],
        "operationId": "deleteBulkProperty",
        "parameters": [
          {
            "name": "ids",
            "in": "query",
            "required": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "integer",
                "format": "int64"
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseVoid"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/register": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "operationId": "register",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseUserResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/refresh": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "operationId": "refreshToken",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RefreshRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseLoginResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/logout": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "operationId": "logout",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RefreshRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseVoid"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/login": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "operationId": "login",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseLoginResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/change-password": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "operationId": "changePassword",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ChangePasswordRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseVoid"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/me": {
      "get": {
        "tags": [
          "Authentication"
        ],
        "operationId": "getCurrentUser",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiResponseUserResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "UserRequest": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "maxLength": 50,
            "minLength": 4
          },
          "password": {
            "type": "string",
            "maxLength": 2147483647,
            "minLength": 6
          },
          "email": {
            "type": "string",
            "format": "email",
            "minLength": 1
          },
          "fullName": {
            "type": "string"
          },
          "phoneNumber": {
            "type": "string",
            "pattern": "^\\d{10,11}$"
          }
        },
        "required": [
          "email",
          "password",
          "username"
        ]
      },
      "ApiResponseUserResponse": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "$ref": "#/components/schemas/UserResponse"
          },
          "errors": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          },
          "timestamp": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "UserResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "createdBy": {
            "type": "string"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedBy": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "fullName": {
            "type": "string"
          },
          "phoneNumber": {
            "type": "string"
          }
        }
      },
      "PropertyRequest": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "minLength": 1
          },
          "purpose": {
            "type": "string"
          },
          "type": {
            "type": "string"
          },
          "price": {
            "type": "number",
            "minimum": 0
          },
          "lineAddress": {
            "type": "string"
          },
          "wardId": {
            "type": "string"
          },
          "landArea": {
            "type": "number"
          },
          "floorArea": {
            "type": "number"
          },
          "floors": {
            "type": "integer",
            "format": "int32",
            "minimum": 0
          },
          "floorNumber": {
            "type": "integer",
            "format": "int32"
          },
          "bedrooms": {
            "type": "integer",
            "format": "int32"
          },
          "bathrooms": {
            "type": "integer",
            "format": "int32"
          },
          "entranceRoadWidth": {
            "type": "number",
            "format": "double"
          },
          "balconyDirection": {
            "type": "string"
          },
          "direction": {
            "type": "string"
          },
          "interior": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "AVAILABLE",
              "PENDING",
              "SOLD",
              "RENTED",
              "OFF_MARKET"
            ]
          }
        },
        "required": [
          "price",
          "status",
          "title"
        ]
      },
      "ApiResponsePropertyResponse": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "$ref": "#/components/schemas/PropertyResponse"
          },
          "errors": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          },
          "timestamp": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "PropertyResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "createdBy": {
            "type": "string"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedBy": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "purpose": {
            "type": "string"
          },
          "type": {
            "type": "string"
          },
          "price": {
            "type": "number"
          },
          "lineAddress": {
            "type": "string"
          },
          "landArea": {
            "type": "number"
          },
          "floorArea": {
            "type": "number"
          },
          "floors": {
            "type": "integer",
            "format": "int32"
          },
          "bedrooms": {
            "type": "integer",
            "format": "int32"
          },
          "bathrooms": {
            "type": "integer",
            "format": "int32"
          },
          "direction": {
            "type": "string"
          },
          "balconyDirection": {
            "type": "string"
          },
          "interior": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "status": {
            "type": "string"
          }
        }
      },
      "RegisterRequest": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "maxLength": 50,
            "minLength": 4
          },
          "password": {
            "type": "string",
            "maxLength": 2147483647,
            "minLength": 8
          },
          "email": {
            "type": "string",
            "format": "email",
            "minLength": 1
          },
          "fullName": {
            "type": "string",
            "minLength": 1
          },
          "phoneNumber": {
            "type": "string",
            "pattern": "^(0|\\+84)(\\d{9,10})$"
          }
        },
        "required": [
          "email",
          "fullName",
          "password",
          "username"
        ]
      },
      "RefreshRequest": {
        "type": "object",
        "properties": {
          "refreshToken": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": [
          "refreshToken"
        ]
      },
      "ApiResponseLoginResponse": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "$ref": "#/components/schemas/LoginResponse"
          },
          "errors": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          },
          "timestamp": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "LoginResponse": {
        "type": "object",
        "properties": {
          "accessToken": {
            "type": "string"
          },
          "refreshToken": {
            "type": "string"
          }
        }
      },
      "ApiResponseVoid": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "data": {

          },
          "errors": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          },
          "timestamp": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "LoginRequest": {
        "type": "object",
        "properties": {
          "credential": {
            "type": "string",
            "minLength": 1
          },
          "password": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": [
          "credential",
          "password"
        ]
      },
      "ChangePasswordRequest": {
        "type": "object",
        "properties": {
          "oldPassword": {
            "type": "string",
            "minLength": 1
          },
          "newPassword": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": [
          "newPassword",
          "oldPassword"
        ]
      },
      "ApiResponsePageResponseUserSummary": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "$ref": "#/components/schemas/PageResponseUserSummary"
          },
          "errors": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          },
          "timestamp": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "PageResponseUserSummary": {
        "type": "object",
        "properties": {
          "page": {
            "type": "integer",
            "format": "int32"
          },
          "size": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "numberOfElements": {
            "type": "integer",
            "format": "int32"
          },
          "content": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/UserSummary"
            }
          }
        }
      },
      "UserSummary": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "username": {
            "type": "string"
          },
          "fullName": {
            "type": "string"
          },
          "email": {
            "type": "string"
          }
        }
      },
      "ApiResponsePageResponsePropertySummary": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "$ref": "#/components/schemas/PageResponsePropertySummary"
          },
          "errors": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          },
          "timestamp": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "PageResponsePropertySummary": {
        "type": "object",
        "properties": {
          "page": {
            "type": "integer",
            "format": "int32"
          },
          "size": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "numberOfElements": {
            "type": "integer",
            "format": "int32"
          },
          "content": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PropertySummary"
            }
          }
        }
      },
      "PropertySummary": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "title": {
            "type": "string"
          },
          "price": {
            "type": "number"
          },
          "type": {
            "type": "string"
          },
          "lineAddress": {
            "type": "string"
          },
          "landArea": {
            "type": "number"
          },
          "bedrooms": {
            "type": "integer",
            "format": "int32"
          },
          "bathrooms": {
            "type": "integer",
            "format": "int32"
          },
          "status": {
            "type": "string"
          }
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
}