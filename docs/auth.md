# Authorization

The `{{baseUrl}}/auth` URL contains endpoints related to authentication.

## Register

- **Endpoint:** `{{baseUrl}}/auth/register` (POST)

  Use this endpoint when you need to create a new user.

- **Payload:**
  ```json
  {
    "email": "ignacio1@bego.ai",
    "password": "Ignacio123"
  }
  ```
- **Error handling:**

  - It will throw an error if the email already exists, in the database or if it is invalid.
  - The password must have at least 6 characters.

## Login

- **Endpoint:** `{{baseUrl}}/auth/login` (POST)

  Call this endpoint to receive a [JWT][jwt] token in return.

- **Payload:**

  ```json
  {
    "email": "ignacio1@bego.ai",
    "password": "Ignacio123"
  }
  ```

- **Success response:**

  ```json
  {
    "error": null,
    "data": {
      "token": "<a token>"
    }
  }
  ```

- **Error response:**

  ```json
  {
    "error": "Password is wrong"
  }
  ```

[jwt]:https://jwt.io/introduction
