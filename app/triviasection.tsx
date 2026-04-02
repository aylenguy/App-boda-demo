"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const preguntas = [
  {
    pregunta: "¿Dónde nos conocimos?",
    opciones: [
      "En el colegio",
      "En la casa de Cami",
      "En una fiesta de egresados",
    ],
    correcta: "En la casa de Cami",
  },
  {
    pregunta: "¿Quién dijo te amo primero?",
    opciones: ["Sofía", "Mateo", "Los dos"],
    correcta: "Mateo",
  },
  {
    pregunta: "¿Cuál fue nuestro primer viaje?",
    opciones: ["Bariloche", "Mendoza", "Mar del Plata"],
    correcta: "Mendoza",
  },
];

export default function TriviaSection() {
  const [step, setStep] = useState<number | null>(null);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [score, setScore] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const actual = step !== null ? preguntas[step] : null;

  const handleSelect = (op: string) => {
    if (mostrarResultado || !actual) return;

    setSeleccion(op);
    setMostrarResultado(true);

    if (op === actual.correcta) {
      setScore((prev) => prev + 1);
    }
  };

  const next = () => {
    if (step === null) return;

    if (step === preguntas.length - 1) {
      setFinalizado(true);
      return;
    }

    setStep(step + 1);
    setSeleccion(null);
    setMostrarResultado(false);
  };

  const reiniciarTrivia = () => {
    setStep(null);
    setSeleccion(null);
    setMostrarResultado(false);
    setScore(0);
    setFinalizado(false);
  };

  const porcentaje = Math.round((score / preguntas.length) * 100);

const mensajeFinal =
  porcentaje === 100
    ? "Ok… esto ya es sospechoso 😂 nos conocés demasiado bien"
    : porcentaje >= 67
    ? "Muy bien 👏 se nota que estuviste prestando atención"
    : porcentaje >= 34
    ? "Nada mal 🤭 pero hay cosas que te estamos guardando"
    : "Mmm… tenemos que contarte mejor nuestra historia 😅";

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white px-5 py-20 text-center md:py-24"
    >
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full border border-[#cfd6d1] bg-[#f4f8f6] p-5">
            <Sparkles className="text-[#6e7c72]" size={24} />
          </div>
        </div>

        {step === null && !finalizado ? (
          <>
            <h2 className="text-2xl font-light tracking-[0.1em] text-[#4f5c54] md:text-3xl">
              ¿Cuánto nos conocés?
            </h2>

            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-[#8f9a93]">
              Juguemos un poco
            </p>

            <button
              onClick={() => setStep(0)}
              className="mt-10 w-full rounded-full bg-[#4f5c54] py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#3f4b44]"
            >
              Iniciar trivia
            </button>
          </>
        ) : finalizado ? (
          <>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8f9a93]">
              Resultado final
            </p>

            <h3 className="mt-4 text-2xl font-light text-[#4f5c54] md:text-3xl">
              Nos conocés {porcentaje}% 😏
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#6e7c72] md:text-base">
              {mensajeFinal}
            </p>

            <div className="mt-8 h-[8px] w-full overflow-hidden rounded-full bg-[#e5ebe7]">
              <div
                className="h-full rounded-full bg-[#4f5c54] transition-all duration-700"
                style={{ width: `${porcentaje}%` }}
              />
            </div>

            <p className="mt-4 text-sm text-[#8f9a93]">
              Respuestas correctas: {score} de {preguntas.length}
            </p>

            <button
              onClick={reiniciarTrivia}
              className="mt-10 w-full rounded-full bg-[#4f5c54] py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#3f4b44]"
            >
              Volver a jugar
            </button>
          </>
        ) : (
          <>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8f9a93]">
              Pregunta {step! + 1} de {preguntas.length}
            </p>

            <div className="mt-6 h-[6px] w-full overflow-hidden rounded-full bg-[#e5ebe7]">
              <div
                className="h-full bg-[#4f5c54] transition-all duration-500"
                style={{
                  width: `${(((step ?? 0) + 1) / preguntas.length) * 100}%`,
                }}
              />
            </div>

            <h3 className="mt-6 text-xl font-light text-[#4f5c54] md:text-2xl">
              {actual?.pregunta}
            </h3>

            <div className="mt-8 space-y-3">
              {actual?.opciones.map((op) => {
                const isSelected = seleccion === op;
                const isCorrect = op === actual.correcta;

                let style =
                  "border-[#d9e1dc] bg-white text-[#4f5c54] hover:bg-[#f4f8f6]";

                if (mostrarResultado && isSelected) {
                  style = isCorrect
                    ? "border-[#6e7c72] bg-[#e9f1ed] text-[#4f5c54]"
                    : "border-[#e0c9c9] bg-[#f8eaea] text-[#a94442]";
                }

                if (mostrarResultado && !isSelected && isCorrect) {
                  style = "border-[#cfd6d1] bg-[#f4f8f6] text-[#4f5c54]";
                }

                return (
                  <button
                    key={op}
                    onClick={() => handleSelect(op)}
                    className={`w-full rounded-2xl border px-5 py-4 text-left text-sm transition ${style}`}
                  >
                    {op}
                  </button>
                );
              })}
            </div>

            {mostrarResultado && seleccion && (
              <p className="mt-6 text-sm text-[#6e7c72]">
                {seleccion === actual?.correcta
                  ? "✨ Correcto"
                  : `Incorrecto. Era: ${actual?.correcta}`}
              </p>
            )}

            {mostrarResultado && (
              <button
                onClick={next}
                className="mt-8 w-full rounded-full bg-[#4f5c54] py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#3f4b44]"
              >
                {step === preguntas.length - 1 ? "Finalizar" : "Siguiente"}
              </button>
            )}
          </>
        )}
      </div>
    </motion.section>
  );
}