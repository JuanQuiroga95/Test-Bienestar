import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Por favor definí la variable de entorno MONGODB_URI en .env.local o en Vercel"
  );
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // En desarrollo, usamos una variable global para preservar la conexión
  // entre recargas de HMR (Hot Module Replacement)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, no usamos variable global
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
