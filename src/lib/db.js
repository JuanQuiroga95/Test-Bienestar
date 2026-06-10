import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Por favor definí la variable de entorno DATABASE_URL en .env.local o en Vercel"
  );
}

const sql = neon(process.env.DATABASE_URL);

// Crear la tabla si no existe
export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS respuestas (
      id SERIAL PRIMARY KEY,
      anio VARCHAR(1) NOT NULL,
      respuestas INTEGER[] NOT NULL,
      puntaje_total INTEGER NOT NULL,
      timestamp TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  try {
    await sql`ALTER TABLE respuestas ADD COLUMN IF NOT EXISTS porcentaje NUMERIC`;
    await sql`ALTER TABLE respuestas ADD COLUMN IF NOT EXISTS respuestas_texto JSONB`;
    await sql`ALTER TABLE respuestas ADD COLUMN IF NOT EXISTS contexto JSONB`;
  } catch (error) {
    console.error("Error al actualizar la tabla de respuestas:", error);
  }
}

export default sql;
