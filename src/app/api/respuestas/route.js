import { NextResponse } from "next/server";
import sql, { ensureTable } from "@/lib/db";

// GET /api/respuestas - Obtener todas las respuestas
export async function GET(request) {
  try {
    await ensureTable();

    const { searchParams } = new URL(request.url);
    const anio = searchParams.get("anio");

    let data;
    if (anio && anio !== "todos") {
      data = await sql`
        SELECT anio, respuestas, puntaje_total as "puntajeTotal", timestamp
        FROM respuestas
        WHERE anio = ${anio}
        ORDER BY timestamp DESC
      `;
    } else {
      data = await sql`
        SELECT anio, respuestas, puntaje_total as "puntajeTotal", timestamp
        FROM respuestas
        ORDER BY timestamp DESC
      `;
    }

    return NextResponse.json({
      data,
      total: data.length,
    });
  } catch (error) {
    console.error("Error al obtener respuestas:", error);
    return NextResponse.json(
      { error: "Error al obtener las respuestas" },
      { status: 500 }
    );
  }
}

// POST /api/respuestas - Guardar una nueva respuesta
export async function POST(request) {
  try {
    const body = await request.json();
    const { anio, respuestas, puntajeTotal } = body;

    // Validaciones básicas
    if (!anio || !respuestas || !puntajeTotal) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: anio, respuestas, puntajeTotal" },
        { status: 400 }
      );
    }

    if (!["1", "2", "3", "4", "5"].includes(anio)) {
      return NextResponse.json(
        { error: "Año inválido. Debe ser entre 1 y 5." },
        { status: 400 }
      );
    }

    if (!Array.isArray(respuestas) || respuestas.length !== 10) {
      return NextResponse.json(
        { error: "Las respuestas deben ser un array de 10 elementos." },
        { status: 400 }
      );
    }

    if (puntajeTotal < 10 || puntajeTotal > 30) {
      return NextResponse.json(
        { error: "El puntaje total debe estar entre 10 y 30." },
        { status: 400 }
      );
    }

    await ensureTable();

    await sql`
      INSERT INTO respuestas (anio, respuestas, puntaje_total)
      VALUES (${anio}, ${respuestas}, ${puntajeTotal})
    `;

    return NextResponse.json(
      { success: true, message: "Respuesta guardada correctamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al guardar respuesta:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
