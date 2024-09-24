import { Options } from "swagger-jsdoc"
import swaggerAutogen from 'swagger-autogen';



const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Coincrusade API",
            version: "1.0",
            description: "API for Coincrusade runner game app."
        },
        servers: [{ url: "http://localhost:8080/" }]
    },
}

swaggerAutogen()("./swagger-output.json", ["./main.ts"], options)
