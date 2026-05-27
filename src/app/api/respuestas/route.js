import { NextResponse } from "next/server";

// ============================================================
// ALMACENAMIENTO EN MEMORIA (para desarrollo rápido)
// TODO: Reemplazar con conexión a base de datos real
// Opciones recomendadas: MongoDB, PostgreSQL, Supabase, Firebase
// ============================================================

// Seed data para demostración
let respuestas = [
  { anio: "1", respuestas: [1, 2, 1, 2, 1, 1, 2, 1, 1, 2], puntajeTotal: 14, timestamp: "2026-05-20T10:00:00Z" },
  { anio: "1", respuestas: [2, 2, 2, 2, 2, 2, 2, 2, 1, 2], puntajeTotal: 19, timestamp: "2026-05-20T10:05:00Z" },
  { anio: "1", respuestas: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], puntajeTotal: 10, timestamp: "2026-05-20T10:10:00Z" },
  { anio: "2", respuestas: [2, 3, 2, 3, 2, 2, 2, 2, 2, 2], puntajeTotal: 22, timestamp: "2026-05-20T11:00:00Z" },
  { anio: "2", respuestas: [3, 3, 3, 2, 2, 3, 2, 2, 3, 3], puntajeTotal: 26, timestamp: "2026-05-20T11:05:00Z" },
  { anio: "2", respuestas: [1, 2, 2, 1, 1, 2, 1, 2, 1, 2], puntajeTotal: 15, timestamp: "2026-05-20T11:10:00Z" },
  { anio: "3", respuestas: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], puntajeTotal: 20, timestamp: "2026-05-21T09:00:00Z" },
  { anio: "3", respuestas: [1, 1, 2, 1, 1, 1, 1, 1, 1, 1], puntajeTotal: 11, timestamp: "2026-05-21T09:05:00Z" },
  { anio: "3", respuestas: [3, 3, 3, 3, 2, 3, 3, 2, 3, 3], puntajeTotal: 28, timestamp: "2026-05-21T09:10:00Z" },
  { anio: "3", respuestas: [2, 2, 1, 2, 2, 2, 2, 2, 2, 1], puntajeTotal: 18, timestamp: "2026-05-21T09:15:00Z" },
  { anio: "4", respuestas: [2, 3, 2, 3, 1, 2, 3, 2, 2, 3], puntajeTotal: 23, timestamp: "2026-05-22T14:00:00Z" },
  { anio: "4", respuestas: [1, 1, 1, 2, 1, 1, 2, 1, 1, 1], puntajeTotal: 12, timestamp: "2026-05-22T14:05:00Z" },
  { anio: "4", respuestas: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], puntajeTotal: 30, timestamp: "2026-05-22T14:10:00Z" },
  { anio: "5", respuestas: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], puntajeTotal: 20, timestamp: "2026-05-23T08:00:00Z" },
  { anio: "5", respuestas: [1, 2, 1, 1, 1, 2, 1, 2, 2, 1], puntajeTotal: 14, timestamp: "2026-05-23T08:05:00Z" },
  { anio: "5", respuestas: [2, 3, 3, 2, 2, 2, 3, 2, 3, 2], puntajeTotal: 24, timestamp: "2026-05-23T08:10:00Z" },
  { anio: "5", respuestas: [1, 1, 2, 2, 1, 1, 1, 2, 1, 2], puntajeTotal: 14, timestamp: "2026-05-23T08:15:00Z" },
  { anio: "5", respuestas: [3, 2, 3, 3, 3, 2, 2, 3, 3, 2], puntajeTotal: 26, timestamp: "2026-05-23T08:20:00Z" },
];

// GET /api/respuestas - Obtener todas las respuestas
export async function GET(request) {
  // TODO: Reemplazar con query a la base de datos
  // Ejemplo con MongoDB:
  //   const data = await collection.find({}).toArray();
  //   return NextResponse.json({ data });

  const { searchParams } = new URL(request.url);
  const anio = searchParams.get("anio");

  let data = respuestas;
  if (anio && anio !== "todos") {
    data = respuestas.filter((r) => r.anio === anio);
  }

  return NextResponse.json({
    data,
    total: data.length,
  });
}

// POST /api/respuestas - Guardar una nueva respuesta
export async function POST(request) {
  try {
    const body = await request.json();
    const { anio, respuestas: answers, puntajeTotal } = body;

    // Validaciones básicas
    if (!anio || !answers || !puntajeTotal) {
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

    if (!Array.isArray(answers) || answers.length !== 10) {
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

    const newRespuesta = {
      anio,
      respuestas: answers,
      puntajeTotal,
      timestamp: new Date().toISOString(),
    };

    // TODO: Reemplazar con insert a la base de datos
    // Ejemplo con MongoDB:
    //   await collection.insertOne(newRespuesta);

    respuestas.push(newRespuesta);

    return NextResponse.json(
      { success: true, message: "Respuesta guardada correctamente" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
