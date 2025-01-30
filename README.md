# Web Software Development
2025 Spring - self-study course


The project is containerised using ***Docker***. 

The front-end is based on ***Svelte*** and the back-end ***Deno***. The database system used is ***PostgreSQL***.

# Running the applications
The dev environment requires the file ".env.development" (ignored by git by default) in the "client" folder with the following content:
> PUBLIC_API_URL=http://localhost:8000

Run both applications using
> docker compose up --build

The front-end runs at
> http://localhost:5173

and the back-end at
> http://localhost:8000
