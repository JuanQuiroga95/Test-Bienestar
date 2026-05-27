import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// Nombre de la base de datos y colección
const DB_NAME = "test-bienestar";
const COLLECTION_NAME = "respuestas";

async function getCollection() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION_NAME);
}

// GET /api/respuestas - Obtener todas las respuestas
export async function GET(request) {
  try {
    const collection = await getCollection();
    const { searchParams } = new URL(request.url);
    const anio = searchParams.get("anio");

    let filter = {};
    if (anio && anio !== "todos") {
      filter = { anio };
    }

    const data = await collection.find(filter).sort({ timestamp: -1 }).toArray();

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

    const collection = await getCollection();

    const newRespuesta = {
      anio,
      respuestas,
      puntajeTotal,
      timestamp: new Date().toISOString(),
    };

    await collection.insertOne(newRespuesta);

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
