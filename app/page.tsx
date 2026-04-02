"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Heart,
  Gift,
  Camera,
  Sparkles,
  Gem,
  Music2,
  Pause,
} from "lucide-react";
import localFont from "next/font/local";

const miFuente = localFont({
  src: "../public/fonts/fuente.ttf",
  variable: "--font-boda",
});

export default function Home() {
  const weddingDate = new Date("2027-11-20T18:30:00");

  const [open, setOpen] = useState(false);
  const [openCBU, setOpenCBU] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(weddingDate));

  const [quizAnswers, setQuizAnswers] = useState<{
  q1: string | null;
  q2: string | null;
  q3: string | null;
}>({
  q1: null,
  q2: null,
  q3: null,
});

const days = ["L", "M", "M", "J", "V", "S", "D"];

const calendarDays = [
  "", "", "", "", "", "", "", // espacios si el mes no empieza lunes
  1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 17, 18,
  19, // 👈 día especial
  20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31
];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    const tryPlay = async () => {
      if (!audioRef.current) return;

      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // El navegador puede bloquear autoplay hasta interacción del usuario.
      }
    };

    tryPlay();
  }, []);

  const countdownItems = [
    { key: "days", label: "días" },
    { key: "hours", label: "hs" },
    { key: "minutes", label: "min" },
    { key: "seconds", label: "seg" },
  ] as const;

  const handleCopyAlias = async () => {
    try {
      await navigator.clipboard.writeText("valenytomi.lunademiel");
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (error) {
      console.error("No se pudo copiar el alias", error);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("No se pudo reproducir el audio", error);
    }
  };


  
  return (
    <main className="min-h-screen bg-white text-[#2a2a2a]">
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-20 text-center">
        <motion.img
          src="/image/hero.png"
          alt="Sofía y Mateo"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-white/25"
        />

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.2,
              },
            },
          }}
          className="relative z-10 mx-auto flex max-w-2xl flex-col items-center"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 text-[11px] uppercase tracking-[0.45em] text-[#8a847d] md:text-sm"
          >
            Nuestra boda
          </motion.p>

          <h1 className="text-center">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`${miFuente.className} block text-5xl font-light leading-tight text-[#6f6a64] md:text-7xl xl:text-[6rem]`}
            >
              Sofía
            </motion.span>

            <motion.span
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="block text-xl italic text-[#9a948d] md:text-2xl"
            >
              &
            </motion.span>

            <motion.span
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`${miFuente.className} block text-5xl font-light leading-tight text-[#6f6a64] md:text-7xl xl:text-[6rem]`}
            >
              Mateo
            </motion.span>
          </h1>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-10 flex items-center gap-4 md:mt-12"
          >
            <div className="h-px w-10 bg-[#d1ccc4] md:w-16" />
            <p className="text-sm uppercase tracking-[0.35em] text-[#8a847d] md:text-base">
              4 · 02 · 2027
            </p>
            <div className="h-px w-10 bg-[#d1ccc4] md:w-16" />
          </motion.div>
        </motion.div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-[#e9f1ed] px-6 py-20 text-center md:py-24">
        <p className="text-[10px] uppercase tracking-[0.45em] text-[#6e7c72] md:text-[11px]">
          Falta para nuestro gran día
        </p>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          {countdownItems.map((item) => (
            <div key={item.key} className="flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d6d0c8] bg-white shadow-sm md:h-24 md:w-24">
                <p className="text-3xl font-light text-[#5f5a55] md:text-4xl">
                  {timeLeft ? timeLeft[item.key] : "0"}
                </p>
              </div>

              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#8a847d] md:text-[11px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ITINERARIO */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-white px-6 py-20 md:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-[10px] uppercase tracking-[0.45em] text-[#6e7c72] md:text-[11px]">
            Itinerario
          </p>

          <h2 className="mt-4 text-center text-[2rem] font-light tracking-[0.06em] text-[#4f5c54] md:text-[2.7rem]">
            Cómo será el día
          </h2>
{/* CALENDARIO */}
<div className="mt-14 flex justify-center">
  <div className="w-full max-w-md rounded-[30px] border border-[#cfd6d1] bg-white p-6 shadow-sm">

    <h3 className="text-center text-sm uppercase tracking-[0.3em] text-[#8f9a93] mb-4">
      Febrero 2027
    </h3>

    {/* DÍAS */}
    <div className="grid grid-cols-7 text-xs text-[#8f9a93] mb-2">
      {days.map((d, i) => (
        <div key={i} className="text-center">{d}</div>
      ))}
    </div>

    {/* NÚMEROS */}
    <div className="grid grid-cols-7 gap-y-2 text-[#4f5c54]">
      {calendarDays.map((day, i) => (
        <div key={i} className="flex justify-center items-center h-10">
          {day === 4 ? ( // 👈 tu fecha real
            <div className="relative flex items-center justify-center">
             <div className="relative flex items-center justify-center">
  <Heart
    className="absolute text-[#4f5c54]"
    size={44}
    fill="#4f5c54"
  />
  <span className="relative text-white text-sm font-medium">
    {day}
  </span>
</div>

             
            </div>
          ) : (
            <span className="text-sm">{day}</span>
          )}
        </div>
      ))}
    </div>
  </div>
</div>


          <div className="mx-auto mt-6 h-px w-16 bg-[#cfd6d1]" />

          <div className="mt-14 space-y-6 md:mt-16 md:space-y-8">
            <div className="rounded-[30px] border border-[#cfd6d1] bg-white/90 p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
                <div className="border-b border-[#cfd6d1] pb-4 text-left md:w-[180px] md:border-b-0 md:border-r md:pb-0 md:pr-8">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#6e7c72] md:text-[11px]">
                    Ceremonia
                  </p>
                  <h3 className="mt-3 text-4xl font-light leading-none text-[#4f5c54] md:text-5xl">
                    18:30
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-[#8f9a93]">
                    Horas
                  </p>
                </div>

                <div className="text-left">
                  <p className="text-xl font-light text-[#4f5c54]">
                    Capilla San Gabriel
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#6e7c72]">
                    Rosario, Santa Fe
                  </p>

                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block border-b border-[#4f5c54] text-xs uppercase tracking-[0.22em] text-[#4f5c54] transition hover:opacity-70"
                  >
                    Ver ubicación
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-[#cfd6d1] bg-white/90 p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
                <div className="border-b border-[#cfd6d1] pb-4 text-left md:w-[180px] md:border-b-0 md:border-r md:pb-0 md:pr-8">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#6e7c72] md:text-[11px]">
                    Celebración
                  </p>
                  <h3 className="mt-3 text-4xl font-light leading-none text-[#4f5c54] md:text-5xl">
                    21:00
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-[#8f9a93]">
                    Horas
                  </p>
                </div>

                <div className="text-left">
                  <p className="text-xl font-light text-[#4f5c54]">
                    Salón Magnolia
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#6e7c72]">
                    Funes, Santa Fe
                  </p>

                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block border-b border-[#4f5c54] text-xs uppercase tracking-[0.22em] text-[#4f5c54] transition hover:opacity-70"
                  >
                    Ver ubicación
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FRASE */}
      <section className="bg-[#e9f1ed] px-6 py-20 text-center md:py-24">
        <div className="mb-6 flex justify-center">
          <Heart className="text-[#8c857d]" size={28} strokeWidth={1.5} />
        </div>

        <h2 className="mx-auto max-w-3xl text-2xl font-light tracking-[0.08em] md:text-3xl">
          “Elegimos encontrarnos en este mundo,
          <span className="mt-2 block text-[#8c857d]">
            y ahora elegimos caminarlo juntos.”
          </span>
        </h2>

        <div className="mt-8 flex justify-center">
          <div className="h-px w-16 bg-[#ddd5cb]" />
        </div>
      </section>

      {/* RSVP + CALENDARIO */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-white px-6 py-20 md:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-[11px] uppercase tracking-[0.45em] text-[#6e7c72]">
            Acompañanos
          </p>

          <h2 className="mt-4 text-center text-[2rem] font-light tracking-[0.06em] text-[#4f5c54] md:text-[2.7rem]">
            Confirmación & Agenda
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#cfd6d1]" />

          <div className="mt-14 space-y-6 md:mt-16">
            <div className="rounded-[30px] border border-[#cfd6d1] bg-white/90 p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#cfd6d1] bg-[#f7faf8]">
                    <Sparkles className="text-[#6e7c72]" size={22} />
                  </div>

                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f9a93] md:text-[11px]">
                      RSVP
                    </p>
                    <h3 className="mt-2 text-2xl font-light text-[#4f5c54]">
                      Confirmar asistencia
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-[#6e7c72] md:text-base">
                      Esta demo incluye un modal visual para mostrar cómo se
                      vería la confirmación de asistencia para los invitados.
                    </p>
                  </div>
                </div>

                <div className="md:shrink-0">
                  <button
                    onClick={() => setOpen(true)}
                    className="w-full rounded-full bg-[#4f5c54] px-8 py-3 text-sm uppercase tracking-[0.16em] text-white transition hover:bg-[#3f4b44] md:w-auto"
                  >
                    Ver demo
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-[#cfd6d1] bg-white/90 p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#cfd6d1] bg-[#f7faf8]">
                    <CalendarDays className="text-[#6e7c72]" size={22} />
                  </div>

                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f9a93] md:text-[11px]">
                      Agenda
                    </p>
                    <h3 className="mt-2 text-2xl font-light text-[#4f5c54]">
                      Guardar la fecha
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-[#6e7c72] md:text-base">
                      Sumá este momento a tu calendario y acompañanos en un día
                      que vamos a recordar para siempre.
                    </p>
                  </div>
                </div>

                <div className="md:shrink-0">
                  <button
                    onClick={handleAddToCalendar}
                    className="w-full rounded-full border border-[#cfd6d1] px-8 py-3 text-sm uppercase tracking-[0.16em] text-[#4f5c54] transition hover:bg-[#4f5c54] hover:text-white md:w-auto"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* GALERÍA */}
      <section className="bg-[#e9f1ed] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-[11px] uppercase tracking-[0.45em] text-[#6e7c72]">
            Galería
          </p>

          <h2 className="mt-4 text-center text-[2rem] font-light tracking-[0.06em] text-[#4f5c54] md:text-[2.7rem]">
            Nuestros momentos
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#cfd6d1]" />

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-[#6e7c72] md:text-base">
            Un recorrido por algunos recuerdos que nos trajeron hasta este
            momento tan especial.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {[
              "/image/galeria-1.jpg",
              "/image/galeria-2.avif",
              "/image/galeria-3.avif",
              "/image/galeria-4.avif",
              "/image/galeria-5.avif",
              "/image/galeria-6.avif",
              "/image/galeria-7.jpg",
              "/image/galeria-8.jpg",
            ].map((src, index) => (
              <div
                key={src}
                className="overflow-hidden rounded-[24px] border border-[#cfd6d1] bg-[#f8f7f4] shadow-sm"
              >
                <img
                  src={src}
                  alt={`Sofía y Mateo ${index + 1}`}
                  className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* REGALOS */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative bg-white px-6 py-20 text-center md:py-28"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full border border-[#cfd6d1] bg-[#f4f8f6] p-5">
              <Gift className="text-[#8c857d]" size={26} strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="text-2xl font-light uppercase tracking-[0.35em] text-[#2a2a2a] md:text-3xl">
            Regalos
          </h2>

          <p className="mx-auto mt-6 max-w-[620px] text-sm leading-7 text-[#4a4a4a] md:text-base">
            Tu presencia será siempre nuestro mejor regalo. Pero si querés
            acompañarnos también con un obsequio, podés colaborar con nuestra
            luna de miel.
          </p>

          <button
            onClick={() => setOpenCBU(true)}
            className="mt-10 inline-block rounded-full bg-[#4f5c54] px-10 py-4 text-sm uppercase tracking-[0.25em] text-white shadow-sm transition hover:bg-[#3f4b44]"
          >
            Hacer un regalo
          </button>

          <div className="mx-auto mt-10 h-px w-20 bg-[#ddd5cb]" />

          <p className="mt-6 text-sm leading-7 text-[#6f6962] md:text-base">
            Gracias por ser parte de este momento tan importante para nosotros.
          </p>
        </div>
      </motion.section>

      {/* DRESS CODE */}
      <section className="relative flex items-center justify-center overflow-hidden bg-[#e9f1ed] px-6 py-20 md:py-28">
        <div className="relative w-full max-w-2xl rounded-[32px] border border-[#cfd6d1] bg-white/90 px-8 py-12 text-center shadow-sm backdrop-blur-sm md:px-12 md:py-16">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full border border-[#cfd6d1] bg-[#f4f8f6] p-5">
              <Gem className="text-[#8c857d]" size={28} strokeWidth={1.2} />
            </div>
          </div>

          <h2 className="text-2xl font-light uppercase tracking-[0.35em] text-[#4f5c54] md:text-3xl">
            Dress Code
          </h2>

          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-[#6e7c72]">
            Formal elegante
          </p>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#6e7c72] md:text-base">
            Sugerimos una estética sobria y elegante para acompañar la
            celebración.
          </p>

          <div className="mx-auto mt-8 h-px w-24 bg-[#cfd6d1]" />
        </div>
      </section>



      {/* TRIVIA 
<motion.section
  initial={{ opacity: 0, y: 18 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true }}
  className="bg-white px-6 py-20 md:py-24"
>
  <div className="mx-auto max-w-4xl">
    <p className="text-center text-[11px] uppercase tracking-[0.45em] text-[#6e7c72]">
      Un pequeño juego
    </p>

    <h2 className="mt-4 text-center text-[2rem] font-light tracking-[0.06em] text-[#4f5c54] md:text-[2.7rem]">
      ¿Cuánto nos conocés?
    </h2>

    <div className="mx-auto mt-6 h-px w-16 bg-[#cfd6d1]" />

    <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-[#6e7c72] md:text-base">
      Antes del gran día, te invitamos a descubrir cuánto sabés sobre nuestra historia.
    </p>

    <div className="mt-12 space-y-6">
      {/* PREGUNTA 1 *
      <div className="rounded-[30px] border border-[#cfd6d1] bg-[#f7faf8] p-6 shadow-sm md:p-8">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f9a93] md:text-[11px]">
          Pregunta 1
        </p>

        <h3 className="mt-2 text-xl font-light text-[#4f5c54] md:text-2xl">
          ¿Dónde nos conocimos?
        </h3>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {["En una fiesta", "En la facultad", "En un viaje"].map((option) => {
            const selected = quizAnswers.q1 === option;
            const correct = option === "En la facultad";

            return (
              <button
                key={option}
                onClick={() =>
                  setQuizAnswers((prev) => ({ ...prev, q1: option }))
                }
                className={`rounded-full border px-5 py-3 text-sm transition ${
                  selected
                    ? correct
                      ? "border-[#6e7c72] bg-[#e9f1ed] text-[#4f5c54]"
                      : "border-[#d8cfc7] bg-[#f7f3ef] text-[#7a746c]"
                    : "border-[#cfd6d1] bg-white text-[#4f5c54] hover:bg-[#f4f8f6]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {quizAnswers.q1 && (
          <p className="mt-4 text-sm text-[#6e7c72]">
            {quizAnswers.q1 === "En la facultad"
              ? "✨ Correcto"
              : "Casi... la respuesta correcta es: En la facultad"}
          </p>
        )}
      </div>

      {/* PREGUNTA 2 *
      <div className="rounded-[30px] border border-[#cfd6d1] bg-[#f7faf8] p-6 shadow-sm md:p-8">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f9a93] md:text-[11px]">
          Pregunta 2
        </p>

        <h3 className="mt-2 text-xl font-light text-[#4f5c54] md:text-2xl">
          ¿Quién dijo “te amo” primero?
        </h3>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {["Sofía", "Mateo", "Los dos al mismo tiempo"].map((option) => {
            const selected = quizAnswers.q2 === option;
            const correct = option === "Mateo";

            return (
              <button
                key={option}
                onClick={() =>
                  setQuizAnswers((prev) => ({ ...prev, q2: option }))
                }
                className={`rounded-full border px-5 py-3 text-sm transition ${
                  selected
                    ? correct
                      ? "border-[#6e7c72] bg-[#e9f1ed] text-[#4f5c54]"
                      : "border-[#d8cfc7] bg-[#f7f3ef] text-[#7a746c]"
                    : "border-[#cfd6d1] bg-white text-[#4f5c54] hover:bg-[#f4f8f6]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {quizAnswers.q2 && (
          <p className="mt-4 text-sm text-[#6e7c72]">
            {quizAnswers.q2 === "Mateo"
              ? "✨ Correcto"
              : "Casi... la respuesta correcta es: Mateo"}
          </p>
        )}
      </div>

      {/* PREGUNTA 3 *
      <div className="rounded-[30px] border border-[#cfd6d1] bg-[#f7faf8] p-6 shadow-sm md:p-8">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f9a93] md:text-[11px]">
          Pregunta 3
        </p>

        <h3 className="mt-2 text-xl font-light text-[#4f5c54] md:text-2xl">
          ¿Cuál fue nuestro primer viaje juntos?
        </h3>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {["Bariloche", "Mendoza", "Mar del Plata"].map((option) => {
            const selected = quizAnswers.q3 === option;
            const correct = option === "Mendoza";

            return (
              <button
                key={option}
                onClick={() =>
                  setQuizAnswers((prev) => ({ ...prev, q3: option }))
                }
                className={`rounded-full border px-5 py-3 text-sm transition ${
                  selected
                    ? correct
                      ? "border-[#6e7c72] bg-[#e9f1ed] text-[#4f5c54]"
                      : "border-[#d8cfc7] bg-[#f7f3ef] text-[#7a746c]"
                    : "border-[#cfd6d1] bg-white text-[#4f5c54] hover:bg-[#f4f8f6]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {quizAnswers.q3 && (
          <p className="mt-4 text-sm text-[#6e7c72]">
            {quizAnswers.q3 === "Mendoza"
              ? "✨ Correcto"
              : "Casi... la respuesta correcta es: Mendoza"}
          </p>
        )}
      </div>
    </div>
  </div>
</motion.section>

{/* MÚSICA */}
<motion.section
  initial={{ opacity: 0, y: 18 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true }}
  className="relative bg-[#f4f8f6] px-4 py-16 text-center md:px-6 md:py-24"
>
  <div className="relative mx-auto max-w-3xl">
    <div className="mb-6 flex justify-center">
      <div className="rounded-full border border-[#cfd6d1] bg-[#f4f8f6] p-5">
        <Music2 className="text-[#8c857d]" size={26} strokeWidth={1.5} />
      </div>
    </div>

    <h2 className="text-2xl font-light uppercase tracking-[0.35em] text-[#2a2a2a] md:text-3xl">
      ¿Qué música no puede faltar?
    </h2>

    <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#4a4a4a] md:text-base">
      Queremos que la fiesta también tenga tu canción favorita. Dejanos esa música
      que sí o sí tiene que sonar en nuestro gran día.
    </p>

    <a
      href="https://forms.gle/"
      target="_blank"
      rel="noreferrer"
      className="mt-10 inline-block rounded-full bg-[#4f5c54] px-10 py-4 text-sm uppercase tracking-[0.25em] text-white shadow-sm transition hover:bg-[#3f4b44]"
    >
      Sugerir canción
    </a>
  </div>
</motion.section>

      {/* FOTOS */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative bg-white px-4 py-16 text-center md:px-6 md:py-24"
      >
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full border border-[#cfd6d1] bg-[#f4f8f6] p-5">
              <Camera className="text-[#8c857d]" size={26} strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="text-2xl font-light uppercase tracking-[0.35em] text-[#2a2a2a] md:text-3xl">
            Compartí tus fotos
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#4a4a4a] md:text-base">
            Nos encantará revivir cada instante a través de tu mirada. Podés
            subir las fotos del gran día a nuestro álbum compartido.
          </p>

          <a
            href="https://drive.google.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full bg-[#4f5c54] px-10 py-4 text-sm uppercase tracking-[0.25em] text-white shadow-sm transition hover:bg-[#3f4b44]"
          >
            Ir al álbum
          </a>
        </div>
      </motion.section>

      {/* CIERRE */}
      <section className="bg-[#cfd6d1] py-16 text-center">
        <p className="text-lg font-light text-[#2a2a2a]">
          Gracias por acompañarnos en este momento tan importante
        </p>
      </section>

      {/* MODAL RSVP DEMO */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-[32px] bg-white p-6 text-center shadow-2xl md:p-8">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-4 text-xl text-gray-400 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-xl font-medium uppercase tracking-[0.2em] text-[#2a2a2a]">
              Confirmá tu asistencia
            </h2>

            <p className="mt-3 text-sm text-[#6f6962]">
              Esta es una versión demo del modal RSVP.
            </p>

            <div className="mt-8 space-y-5 text-sm">
              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#8c857d]">
                  Nombre y apellido
                </label>
                <input
                  type="text"
                  placeholder="Ingresá tu nombre"
                  className="mt-3 w-full rounded-full border border-[#ddd5cb] px-4 py-3 text-center outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#8c857d]">
                  Asistencia
                </label>

                <div className="mt-3 flex flex-col items-center gap-3">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="asistencia-demo" defaultChecked />
                    Voy a asistir
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="asistencia-demo" />
                    No podré asistir
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#8c857d]">
                  Menú
                </label>

                <select className="mt-3 w-full rounded-full border border-[#ddd5cb] px-4 py-3 text-center outline-none">
                  <option>Seleccioná una opción</option>
                  <option>Menú común</option>
                  <option>Menú vegetariano</option>
                  <option>Menú vegano</option>
                  <option>Menú celíaco</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#8c857d]">
                  Restricción alimentaria
                </label>
                <input
                  type="text"
                  placeholder="Ej: frutos secos, lactosa"
                  className="mt-3 w-full rounded-full border border-[#ddd5cb] px-4 py-3 text-center outline-none"
                />
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-4 w-full rounded-full bg-[#3a3a3a] py-3 uppercase tracking-[0.2em] text-white transition hover:bg-black"
              >
                Cerrar demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL REGALO */}
      {openCBU && (
        <div
          onClick={() => setOpenCBU(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-[32px] bg-white p-6 text-center shadow-2xl md:p-8"
          >
            <button
              onClick={() => setOpenCBU(false)}
              className="absolute right-5 top-4 text-xl text-gray-400 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-lg font-medium uppercase tracking-[0.25em] text-[#2a2a2a]">
              Datos bancarios
            </h2>

            <p className="mt-2 text-sm text-[#6f6962]">
              Si querés hacernos un regalo, podés hacerlo a esta cuenta:
            </p>

            <div className="mt-6 space-y-4 text-sm text-[#4a4a4a]">
              <div>
                <p className="text-xs uppercase text-[#8c857d]">Titular</p>
                <p className="font-medium text-[#2a2a2a]">Valentina</p>
              </div>

              <div>
                <p className="text-xs uppercase text-[#8c857d]">Banco</p>
                <p className="font-medium text-[#2a2a2a]">Banco xxxxxx</p>
              </div>

              <div>
                <p className="text-xs uppercase text-[#8c857d]">Alias</p>
                <p className="font-medium text-[#2a2a2a]">xxxxxxxxxxxxxx</p>
              </div>
            </div>

            <button
              onClick={handleCopyAlias}
              className="mt-6 rounded-full bg-[#4f5c54] px-8 py-3 text-xs uppercase tracking-[0.2em] text-white"
            >
              {copiado ? "Copiado ✔" : "Copiar alias"}
            </button>
          </div>
        </div>
      )}

      {/* AUDIO */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/boda.mp3" type="audio/mpeg" />
      </audio>

      {/* BOTÓN MÚSICA */}
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#cfd6d1] bg-white/90 shadow-lg backdrop-blur-md transition hover:scale-110"
      >
        {isPlaying ? (
          <Pause className="text-[#4f5c54]" size={22} />
        ) : (
          <Music2 className="text-[#4f5c54]" size={22} />
        )}
      </button>
    </main>
  );
}

function handleAddToCalendar() {
  const url = new URL("https://calendar.google.com/calendar/render");

  url.searchParams.append("action", "TEMPLATE");
  url.searchParams.append("text", "Casamiento de Valentina y Tomás");
  url.searchParams.append("dates", "20271120T183000/20271121T040000");
  url.searchParams.append(
    "details",
    "Ceremonia 18:30 hs en Capilla San Gabriel. Celebración desde las 21:00 hs en Salón Magnolia."
  );
  url.searchParams.append("location", "Rosario, Santa Fe, Argentina");

  window.open(url.toString(), "_blank");
}

function calculateTimeLeft(weddingDate: Date) {
  const difference = weddingDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}