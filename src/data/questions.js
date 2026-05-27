// ============================================================
// TEST DE BIENESTAR DIGITAL - Datos de preguntas y resultados
// Escuela N° 4-012 "Ing. Ricardo Videla"
// ============================================================

export const questions = [
  {
    id: 1,
    text: "¿En qué año estás?",
    subtitle: "(No suma puntaje, es solo para identificar tu curso)",
    type: "curso",
    options: [
      { label: "A", text: "1° año", value: "1" },
      { label: "B", text: "2° año", value: "2" },
      { label: "C", text: "3° año", value: "3" },
      { label: "D", text: "4° año", value: "4" },
      { label: "E", text: "5° año", value: "5" },
    ],
  },
  {
    id: 2,
    text: "¿Cuántas horas usás el celular por día (fuera del horario escolar)?",
    type: "puntuable",
    options: [
      { label: "A", text: "Menos de 2 horas", value: 1 },
      { label: "B", text: "Entre 2 y 5 horas", value: 2 },
      { label: "C", text: "Más de 5 horas", value: 3 },
    ],
  },
  {
    id: 3,
    text: "¿Usás el celular antes de dormir?",
    type: "puntuable",
    options: [
      { label: "A", text: "No, lo dejo apagado o lejos", value: 1 },
      { label: "B", text: "A veces, un rato corto", value: 2 },
      { label: "C", text: "Sí, hasta que me quedo dormido/a", value: 3 },
    ],
  },
  {
    id: 4,
    text: "¿Qué hacés más con el celular?",
    type: "puntuable",
    options: [
      { label: "A", text: "Buscar información, estudiar o crear contenido", value: 1 },
      { label: "B", text: "Una mezcla: a veces me entretiene y a veces busco algo puntual", value: 2 },
      { label: "C", text: "Ver videos, scrollear redes o chatear sin un objetivo claro", value: 3 },
    ],
  },
  {
    id: 5,
    text: "Cuando el docente no lo pide, ¿usás el celular durante la clase?",
    type: "puntuable",
    options: [
      { label: "A", text: "No, lo guardo", value: 1 },
      { label: "B", text: "A veces lo miro de reojo", value: 2 },
      { label: "C", text: "Sí, casi siempre lo tengo en uso", value: 3 },
    ],
  },
  {
    id: 6,
    text: "¿Alguna vez el celular te ayudó a entender algo en clase o a hacer una tarea?",
    type: "puntuable",
    options: [
      { label: "A", text: "Sí, lo uso seguido con ese fin", value: 1 },
      { label: "B", text: "A veces, cuando el docente lo propone", value: 2 },
      { label: "C", text: "Casi nunca lo uso para eso", value: 3 },
    ],
  },
  {
    id: 7,
    text: "¿Sabés evaluar si una información que encontrás en internet es confiable?",
    type: "puntuable",
    options: [
      { label: "A", text: "Sí, contrasto fuentes antes de quedarme con algo", value: 1 },
      { label: "B", text: "A veces, pero no siempre sé cómo hacerlo", value: 2 },
      { label: "C", text: "Generalmente tomo la primera información que aparece", value: 3 },
    ],
  },
  {
    id: 8,
    text: "¿Alguna vez algo publicado en redes sociales generó un problema real con alguien (compañero/a, docente, familia)?",
    type: "puntuable",
    options: [
      { label: "A", text: "No, nunca", value: 1 },
      { label: "B", text: "Una o dos veces", value: 2 },
      { label: "C", text: "Sí, varias veces", value: 3 },
    ],
  },
  {
    id: 9,
    text: "¿Sentís que lo que mostrás en redes es igual a como sos en la vida real?",
    type: "puntuable",
    options: [
      { label: "A", text: "Sí, muestro lo que soy", value: 1 },
      { label: "B", text: "Más o menos, elijo qué mostrar", value: 2 },
      { label: "C", text: "No, en redes soy bastante diferente", value: 3 },
    ],
  },
  {
    id: 10,
    text: "¿Alguna vez te preguntaste por qué el celular te muestra siempre el mismo tipo de contenido?",
    type: "puntuable",
    options: [
      { label: "A", text: "Sí, entiendo que hay algoritmos que deciden lo que veo", value: 1 },
      { label: "B", text: "Lo noté pero no pensé mucho en eso", value: 2 },
      { label: "C", text: "No, nunca lo había pensado", value: 3 },
    ],
  },
  {
    id: 11,
    text: "¿Podés dejar el celular de lado cuando querés concentrarte en algo importante?",
    type: "puntuable",
    options: [
      { label: "A", text: "Sí, no me cuesta", value: 1 },
      { label: "B", text: "A veces me cuesta, pero puedo", value: 2 },
      { label: "C", text: "No, me genera ansiedad no tenerlo cerca", value: 3 },
    ],
  },
];

export const resultRanges = [
  {
    min: 10,
    max: 16,
    title: "Uso saludable",
    emoji: "🌿",
    description:
      "Tenés una buena relación con el celular. Usás la tecnología con consciencia y equilibrio.",
    color: "emerald",
    gradient: "from-emerald-400 to-teal-500",
    bgClass: "bg-emerald-50",
    borderClass: "border-emerald-300",
    textClass: "text-emerald-700",
  },
  {
    min: 17,
    max: 23,
    title: "Uso a revisar",
    emoji: "🔍",
    description:
      "Hay hábitos que vale la pena analizar. Esta semana es una buena oportunidad para pensarlos.",
    color: "amber",
    gradient: "from-amber-400 to-orange-500",
    bgClass: "bg-amber-50",
    borderClass: "border-amber-300",
    textClass: "text-amber-700",
  },
  {
    min: 24,
    max: 30,
    title: "Uso que puede afectar tu bienestar",
    emoji: "⚠️",
    description:
      "El celular puede estar ocupando un lugar que te complica. No pasa nada: el primer paso es darse cuenta.",
    color: "rose",
    gradient: "from-rose-400 to-red-500",
    bgClass: "bg-rose-50",
    borderClass: "border-rose-300",
    textClass: "text-rose-700",
  },
];

export const FINAL_QUOTE =
  "\"No se trata de dejar el celular, sino de entender qué hace con nosotros.\"";

export function getResultForScore(score) {
  return resultRanges.find((r) => score >= r.min && score <= r.max);
}
