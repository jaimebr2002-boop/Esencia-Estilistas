import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronLeft, ChevronRight, Star, MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

const servicios = [
  { num: '01', title: 'MECHAS & BALAYAGE', desc: 'La especialidad que nos define. Mechas ultrafinas, balayage y técnicas avanzadas de color para conseguir el rubio más natural y luminoso que hayas tenido. Lucía lleva años perfeccionando este arte.' },
  { num: '02', title: 'COLORIMETRÍA', desc: 'Análisis personalizado de tu color ideal. Tintes, matizadores y correcciones de color con productos de alta calidad que cuidan y respetan tu cabello mientras transforman tu look.' },
  { num: '03', title: 'CORTE & ESTILO', desc: 'Desde el corte más atrevido hasta el más clásico. Escuchamos lo que quieres, estudiamos tu tipo de pelo y te damos exactamente el resultado que buscas — o mejor.' },
  { num: '04', title: 'TRATAMIENTOS CAPILARES', desc: 'Botox capilar, alisados orgánicos, hidrataciones profundas e hidrataciones intensivas. Usamos productos de primera calidad — incluyendo secado con Dyson — para que tu pelo salga sano, brillante y transformado.' },
  { num: '05', title: 'PEINADOS & RECOGIDOS', desc: 'Para bodas, eventos, comuniones o simplemente porque te apetece. Peinados a medida que duran todo el día y te hacen sentir espectacular desde que te miras al espejo.' },
  { num: '06', title: 'MAQUILLAJE PROFESIONAL', desc: 'Bet, nuestra maquilladora, crea looks que realzan tu belleza natural. Desde el maquillaje más nude hasta el más sofisticado — siempre adaptado a ti, a tu rostro y a tu momento.' },
  { num: '07', title: 'NOVIAS', desc: 'El día más importante merece el mejor equipo. Lucía y Bet se encargan de que llegues perfecta al altar: peluquería, peinado y maquillaje coordinados, con prueba previa y acompañamiento total.' },
  { num: '08', title: 'UÑAS & ESTÉTICA', desc: 'Manicura, pedicura y diseño de uñas de la mano de Bet. Desde lo más clásico hasta la locura más creativa — siempre con acabado impecable y productos de calidad.' }
];

const resultados = [
  { text: 'Mechas rubias ultrafinas', span: false },
  { text: 'Balayage natural luminoso', span: true },
  { text: 'Rubio ceniza perfecto', span: false },
  { text: 'Corrección de color', span: false },
  { text: 'Maquillaje de novia', span: true },
  { text: 'Recogido nupcial', span: false },
  { text: 'Alisado orgánico', span: false },
  { text: 'Corte y estilo', span: true },
  { text: 'Mechas finitas con canas integradas', span: false },
  { text: 'Look completo novia', span: false }
];

const resenas = [
  { name: 'Sonia Alvarez Rivas', text: 'No puedo estar más feliz con el resultado de mis mechas con Lu. Tiene un talento increíble para trabajar los tonos y lograr un acabado natural y brillante. Se nota que domina la técnica y, además, te asesora con honestidad y cariño. ¡Sin duda, volveré! 100% recomendada.', date: 'Hace 2 meses' },
  { name: 'Andra Pirvulescu', text: 'Llevo haciéndome mechas aquí casi 3 años… y cada vez salgo más contenta. Lucía es una artista y el trato es inmejorable, de parte de todas las grandísimas profesionales que allí trabajan. Sin duda la mejor peluquería de Asturias.', date: 'Hace 5 meses' },
  { name: 'Sofia N.S', text: 'Después de estar desesperada con un rubio naranja que pensaba que era imposible de corregir, salí con el rubio perfecto. Ni yo misma me podía creer el resultado. Las chicas que trabajan en el salón son encantadoras.', date: 'Hace 1 año' },
  { name: 'Paula Rodríguez', text: 'Llevaba el pelo hecho un verdadero desastre, tanto de color como de quemado y castigado. No sé cómo Luci lo hizo pero me hizo magia. Salí con el pelo que llevaba años queriendo.', date: 'Hace 6 meses' },
  { name: 'Carmen Rodríguez', text: 'Si buscáis LA PELUQUERÍA, así, con mayúsculas y además con un fabuloso servicio de estética, este es vuestro sitio. He conseguido el rubio que llevaba años buscando. El equipo es excelente. Un 20 de 10.', date: 'Hace 3 meses' },
  { name: 'Alba Viejo', text: 'Las mejores tanto profesional como personalmente. Nunca tuve el pelo tan largo y bonito hasta que empecé a venir con ellas, aunque lo mejor sin duda es el trato, es como estar en casa.', date: 'Hace 8 meses' },
  { name: 'Diana Fernanda', text: 'Contar con Lucía y con Bet para mi boda fue la mejor elección que pude hacer. Desde el primer momento entendieron lo que quería y me aconsejaron en todo. El día B me tranquilizaron muchísimo e hicieron del momento de los preparativos algo mágico.', date: 'Hace 1 año' },
  { name: 'Clau_zeta Claudia', text: 'Es mi peluquería de referencia. Vivo en Madrid y solamente me pongo en sus manos cada vez que voy a Asturias. Servicio impecable, con productos de calidad, nunca he tenido el pelo tan bien. Además son encantadoras.', date: 'Hace 4 meses' }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % resenas.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + resenas.length) % resenas.length);
  };

  // Touch handlers for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextReview();
    }
    if (isRightSwipe) {
      prevReview();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-esencia-primary text-esencia-dark font-sans selection:bg-esencia-gold selection:text-esencia-light">
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-500 h-[70px] flex items-center border-b border-esencia-gold/20 ${isScrolled ? 'bg-esencia-primary/95 backdrop-blur-md' : 'bg-esencia-primary/95'}`}>
        <div className="w-full px-6 md:px-[50px] flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-serif text-[22px] tracking-[0.3em] uppercase leading-none">Esencia</span>
            <span className="font-serif italic text-[10px] tracking-[0.1em] opacity-80 mt-[2px]">Hair & Beauty</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-[25px] items-center">
            {['Nosotras', 'Servicios', 'Resultados', 'Reseñas', 'Visítanos'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] tracking-[0.1em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-300">
                {item}
              </a>
            ))}
            <a href="#reservar" className="text-[11px] tracking-[0.1em] uppercase font-semibold hover:text-esencia-gold transition-colors duration-300">
              Reservar
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-esencia-dark" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-esencia-primary border-t border-esencia-gold/20 py-8 px-6 flex flex-col gap-6 shadow-lg"
          >
            {['Nosotras', 'Servicios', 'Resultados', 'Reseñas', 'Visítanos'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] tracking-[0.1em] uppercase opacity-70" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <a href="#reservar" className="text-[11px] tracking-[0.1em] uppercase font-semibold mt-2" onClick={() => setMobileMenuOpen(false)}>
              Reservar
            </a>
          </motion.div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[420px] md:h-screen flex flex-col justify-center items-center text-center px-6 md:px-[50px] pt-[100px] pb-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center z-10"
        >
          <h1 className="font-serif text-[clamp(32px,5vw,48px)] leading-[1.1] tracking-[0.15em] uppercase mb-[20px] mt-[80px] md:mt-0">
            <span className="block">El pelo que siempre</span>
            <span className="block text-esencia-gold">quisiste tener</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-[15px] mt-[30px]">
            <a href="#reservar" className="bg-esencia-dark text-esencia-light px-[30px] py-[12px] text-[11px] tracking-[0.2em] uppercase border-none hover:bg-esencia-gold transition-colors duration-300">
              Reserva tu cita
            </a>
            <a href="#servicios" className="bg-transparent border border-esencia-gold text-esencia-dark px-[30px] py-[12px] text-[11px] tracking-[0.2em] uppercase hover:bg-esencia-gold hover:text-esencia-light transition-colors duration-300">
              Ver servicios
            </a>
          </div>

          <div className="mt-[30px] flex flex-wrap justify-center items-center gap-[10px] md:gap-[20px] text-[12px] opacity-80">
            <span>⭐ 4,9 en Google</span>
            <span className="hidden sm:inline">•</span>
            <span>+164 reseñas</span>
            <span className="hidden sm:inline">•</span>
            <span>Especialistas en novias</span>
          </div>
        </motion.div>

        {/* Vertical Text */}
        <div className="hidden lg:block absolute bottom-[40px] right-[20px] origin-bottom-right -rotate-90 font-serif italic text-[10px] tracking-[0.2em] opacity-60">
          Oviedo, Asturias
        </div>
      </section>

      {/* Bottom Decorative Line */}
      <div className="h-[1px] w-full bg-esencia-gold/30"></div>

      {/* SOBRE NOSOTRAS SECTION */}
      <section id="nosotras" className="py-[160px] px-6 md:px-[50px] bg-esencia-secondary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="text-esencia-gold font-serif text-[12px] uppercase tracking-[0.15em] mb-[15px]">Nuestra Historia</div>
            <h2 className="font-serif text-[clamp(28px,4vw,36px)] leading-[1.2] uppercase tracking-[0.15em] mb-[25px]">
              Pasión por el cabello,<br/>arte en cada mecha
            </h2>
            
            <div className="text-[15px] leading-[1.7] font-light mb-[30px] opacity-80">
              <p className="mb-4">
                Somos Esencia Estilistas, un equipo de profesionales apasionadas por la belleza y el cuidado del cabello, con sede en el corazón de Oviedo. Nos especializamos en colorimetría avanzada, mechas y rubios, y en hacer realidad el pelo que llevas años imaginando.
              </p>
              <p className="mb-4">
                Lucía, nuestra estilista principal, es reconocida en toda Asturias por su dominio del rubio natural y las mechas ultrafinas. Con ella, el color no es solo un servicio — es una firma.
              </p>
              <p>
                Nuestro equipo también incluye a Bet, especialista en maquillaje y uñas, y a Natalia, experta en corte y color. Juntas formamos un espacio donde te sientes escuchada, cuidada y, sobre todo, espectacular.
              </p>
            </div>

            <div className="flex flex-wrap gap-[20px] md:gap-[40px] mt-[15px]">
              <div className="flex items-center gap-[10px] text-[12px] tracking-[0.05em] font-medium uppercase">
                <span className="text-esencia-gold">✦</span> +5 AÑOS
              </div>
              <div className="flex items-center gap-[10px] text-[12px] tracking-[0.05em] font-medium uppercase">
                <span className="text-esencia-gold">✦</span> +164 RESEÑAS
              </div>
              <div className="flex items-center gap-[10px] text-[12px] tracking-[0.05em] font-medium uppercase">
                <span className="text-esencia-gold">✦</span> NOVIAS
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full h-[300px] md:h-full md:min-h-[450px] rounded-[2px] overflow-hidden border border-esencia-gold/10"
          >
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/q_auto/f_auto/v1776180183/469324352_18114944137424432_4203127832438100170_n._dhob2k.jpg" 
              alt="Interior del salón Esencia Estilistas" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS SECTION */}
      <section id="servicios" className="py-[100px] px-6 md:px-[50px] bg-esencia-primary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-[60px]"
          >
            <div className="text-esencia-gold font-serif text-[10px] uppercase tracking-[0.15em] mb-[15px]">Lo que hacemos</div>
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] leading-[1.2] uppercase tracking-[0.15em] mb-[20px]">
              Servicios pensados para ti
            </h2>
            <p className="font-serif italic text-[clamp(16px,2vw,20px)] opacity-80 max-w-2xl mx-auto">
              "Desde una mecha hasta el look completo de tu boda — lo hacemos con la misma dedicación y mimo."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {servicios.map((servicio, index) => (
              <motion.div
                key={servicio.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-esencia-secondary p-[40px] overflow-hidden group hover:shadow-[0_4px_30px_rgba(0,0,0,0.06)] transition-shadow duration-500"
              >
                <div className="absolute top-[20px] right-[20px] font-serif text-[60px] text-esencia-gold opacity-10 leading-none select-none transition-opacity duration-500 group-hover:opacity-20">
                  {servicio.num}
                </div>
                <h3 className="font-serif text-[16px] tracking-[0.15em] uppercase mb-[15px] relative z-10">
                  {servicio.title}
                </h3>
                <div className="h-[1px] w-[30px] bg-esencia-gold/40 mb-[20px] relative z-10"></div>
                <p className="text-[13px] font-light leading-[1.6] opacity-80 relative z-10">
                  {servicio.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-[80px] text-center flex flex-col items-center"
          >
            <p className="text-[14px] font-light mb-[20px] opacity-90">¿No encuentras lo que buscas? Llámanos y lo hablamos.</p>
            <a href="tel:985055910" className="bg-esencia-dark text-esencia-light px-[30px] py-[12px] text-[11px] tracking-[0.2em] uppercase border-none hover:bg-esencia-gold transition-colors duration-300 inline-block">
              Llámanos ahora
            </a>
          </motion.div>
        </div>
      </section>

      {/* RESULTADOS SECTION */}
      <section id="resultados" className="py-[100px] px-6 md:px-[50px] bg-esencia-dark text-esencia-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-[60px]"
          >
            <div className="text-esencia-gold font-serif text-[10px] uppercase tracking-[0.15em] mb-[15px]">Nuestro trabajo</div>
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] leading-[1.2] uppercase tracking-[0.15em] mb-[20px] text-esencia-light">
              Los resultados hablan por sí solos
            </h2>
            <p className="font-serif italic text-[clamp(16px,2vw,20px)] text-esencia-gold max-w-2xl mx-auto">
              "Cada foto es una clienta real. Cada resultado, una historia de confianza."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] auto-rows-[300px]">
            {[
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/q_auto/f_auto/v1776180183/662013932_18164311729424432_5957893487262699201_n._dlqllq.jpg",
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/q_auto/f_auto/v1776180183/597807460_18152326249424432_394586474369690481_n._iidfjz.jpg",
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/q_auto/f_auto/v1776180183/581985010_18149652364424432_862315187431685637_n._bzuudv.jpg",
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/q_auto/f_auto/v1776180183/599129531_18152326237424432_1863871876869918946_n._wtilp4.jpg",
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/q_auto/f_auto/v1776180183/560786737_18145486609424432_7534978127636648142_n._bb5bdc.jpg",
              "https://res.cloudinary.com/dfbsqy5ul/image/upload/q_auto/f_auto/v1776180183/643521100_18160101631424432_1803461196723600498_n._xnjgcs.jpg"
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="overflow-hidden rounded-[2px] border border-esencia-gold/10"
              >
                <img 
                  src={src} 
                  alt={`Resultado ${index + 1}`} 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-[80px] text-center flex flex-col items-center"
          >
            <p className="text-[14px] font-light mb-[20px] opacity-90">Síguenos en Instagram para ver más trabajos</p>
            <a href="https://www.instagram.com/calzonhair/?hl=es" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-esencia-gold text-esencia-gold px-[30px] py-[12px] text-[11px] tracking-[0.2em] uppercase hover:bg-esencia-gold hover:text-esencia-dark transition-colors duration-300 inline-block">
              @calzonhair
            </a>
          </motion.div>
        </div>
      </section>

      {/* RESEÑAS SECTION */}
      <section id="reseñas" className="py-[100px] px-6 md:px-[50px] bg-esencia-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-[50px]"
          >
            <div className="text-esencia-gold font-serif text-[10px] uppercase tracking-[0.15em] mb-[15px]">Lo que dicen ellas</div>
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] leading-[1.2] uppercase tracking-[0.15em] mb-[20px]">
              Más de 164 clientas no pueden equivocarse
            </h2>
            <p className="font-serif italic text-[clamp(16px,2vw,20px)] opacity-80 max-w-2xl mx-auto mb-[40px]">
              "Reseñas reales de Google. Sin filtros, sin edición."
            </p>

            <div className="inline-flex flex-col items-center justify-center p-[20px] border border-esencia-gold/20 bg-esencia-primary/50">
              <div className="flex items-center gap-[10px] mb-[5px]">
                <Star className="text-esencia-gold fill-esencia-gold" size={24} />
                <span className="font-serif text-[32px] leading-none">4,9 / 5</span>
              </div>
              <span className="text-[11px] tracking-[0.05em] uppercase opacity-70">164 reseñas verificadas en Google</span>
            </div>
          </motion.div>

          {/* Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div 
              className="overflow-hidden px-4 py-8"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <motion.div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {resenas.map((resena, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-esencia-light p-[40px] md:p-[60px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex flex-col items-center text-center h-full">
                      <div className="flex gap-[5px] text-esencia-gold mb-[20px]">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                      </div>
                      <p className="font-serif italic text-[18px] md:text-[22px] leading-[1.6] opacity-90 mb-[30px] flex-grow">
                        "{resena.text}"
                      </p>
                      <h4 className="font-serif font-bold text-[16px] tracking-[0.05em] uppercase mb-[5px]">{resena.name}</h4>
                      <span className="text-[11px] opacity-50">{resena.date}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows (Desktop) */}
            <button onClick={prevReview} className="hidden md:flex absolute top-1/2 -left-[60px] -translate-y-1/2 w-[40px] h-[40px] items-center justify-center border border-esencia-gold/30 text-esencia-dark hover:bg-esencia-gold hover:text-esencia-light transition-colors duration-300">
              <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <button onClick={nextReview} className="hidden md:flex absolute top-1/2 -right-[60px] -translate-y-1/2 w-[40px] h-[40px] items-center justify-center border border-esencia-gold/30 text-esencia-dark hover:bg-esencia-gold hover:text-esencia-light transition-colors duration-300">
              <ChevronRight size={20} strokeWidth={1} />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-[8px] mt-[20px]">
              {resenas.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${currentReview === index ? 'bg-esencia-gold w-[20px]' : 'bg-esencia-gold/30'}`}
                  aria-label={`Ir a reseña ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-[60px] text-center"
          >
            <a href="https://www.google.es/maps/place/Esencia+Estilistas/@43.3609848,-5.8573884,16z/data=!3m1!5s0xd368ce2f6e7c683:0x7d0d8527f6d0fceb!4m18!1m9!3m8!1s0xd368dd93eb8dbf1:0xd8b72e76f00802f1!2sEsencia+Estilistas!8m2!3d43.3609809!4d-5.8548135!9m1!1b1!16s%2Fg%2F11h3wpq7ml!3m7!1s0xd368dd93eb8dbf1:0xd8b72e76f00802f1!8m2!3d43.3609809!4d-5.8548135!9m1!1b1!16s%2Fg%2F11h3wpq7ml?hl=es&entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-esencia-dark text-esencia-dark px-[30px] py-[12px] text-[11px] tracking-[0.2em] uppercase hover:bg-esencia-dark hover:text-esencia-light transition-colors duration-300 inline-block">
              Déjanos tu reseña en Google
            </a>
          </motion.div>
        </div>
      </section>

      {/* VISÍTANOS SECTION */}
      <section id="visítanos" className="py-[100px] px-6 md:px-[50px] bg-esencia-primary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-[60px]"
          >
            <div className="text-esencia-gold font-serif text-[10px] uppercase tracking-[0.15em] mb-[15px]">Encuéntranos</div>
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] leading-[1.2] uppercase tracking-[0.15em]">
              Ven a vernos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-[40px] lg:gap-[80px] items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-[30px]"
            >
              <div className="pb-[20px] border-b border-esencia-gold/20">
                <div className="flex items-center gap-[15px] mb-[10px]">
                  <MapPin className="text-esencia-gold" size={20} strokeWidth={1.5} />
                  <h3 className="font-serif text-[14px] tracking-[0.1em] uppercase">Dirección</h3>
                </div>
                <p className="text-[13px] font-light opacity-80 pl-[35px]">
                  C/ Charles Darwin, 8<br/>
                  33005 Oviedo, Asturias
                </p>
              </div>

              <div className="pb-[20px] border-b border-esencia-gold/20">
                <div className="flex items-center gap-[15px] mb-[10px]">
                  <Phone className="text-esencia-gold" size={20} strokeWidth={1.5} />
                  <h3 className="font-serif text-[14px] tracking-[0.1em] uppercase">Teléfono</h3>
                </div>
                <p className="text-[13px] font-light opacity-80 pl-[35px]">
                  <a href="tel:985055910" className="hover:text-esencia-gold transition-colors">985 05 59 10</a>
                </p>
              </div>

              <div className="pb-[20px] border-b border-esencia-gold/20">
                <div className="flex items-center gap-[15px] mb-[10px]">
                  <Clock className="text-esencia-gold" size={20} strokeWidth={1.5} />
                  <h3 className="font-serif text-[14px] tracking-[0.1em] uppercase">Horario</h3>
                </div>
                <ul className="text-[13px] font-light opacity-80 pl-[35px] space-y-[5px]">
                  <li>Martes a Jueves: 9:30 – 19:00</li>
                  <li>Viernes: 9:00 – 19:00</li>
                  <li>Sábado: 9:00 – 13:00</li>
                  <li>Lunes y Domingo: Cerrado</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-[15px] mb-[15px]">
                  <h3 className="font-serif text-[14px] tracking-[0.1em] uppercase">Síguenos</h3>
                </div>
                <div className="flex gap-[20px] pl-[35px]">
                  <a href="https://www.instagram.com/calzonhair/?hl=es" target="_blank" rel="noopener noreferrer" className="text-esencia-dark hover:text-esencia-gold transition-colors">
                    <Instagram size={20} strokeWidth={1.5} />
                  </a>
                  <a href="https://www.facebook.com/p/Calz%C3%B3n-Hair-100063582036608/" target="_blank" rel="noopener noreferrer" className="text-esencia-dark hover:text-esencia-gold transition-colors">
                    <Facebook size={20} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full h-[400px] bg-esencia-secondary"
            >
              <iframe 
                src="https://www.google.com/maps?q=Esencia+Estilistas,+C/+Charles+Darwin+8,+Oviedo&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '2px' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación Esencia Estilistas"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESERVA SECTION */}
      <section id="reservar" className="py-[120px] px-6 md:px-[50px] bg-[#1a1a1a] text-esencia-light text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="text-esencia-gold font-serif text-[10px] uppercase tracking-[0.2em] mb-[30px]">¿Lista para el cambio?</div>
            
            <div className="w-[80px] h-[1px] bg-esencia-gold/40 mb-[40px]"></div>

            <h2 className="font-serif text-[clamp(36px,6vw,56px)] leading-[1.1] tracking-[0.1em] uppercase mb-[30px]">
              <span className="block">Tu mejor versión</span>
              <span className="block text-esencia-gold italic mt-[10px]">te está esperando</span>
            </h2>

            <p className="text-[15px] font-light tracking-wide max-w-[500px] leading-[1.6] mb-[50px] opacity-80">
              Reserva tu cita por teléfono o WhatsApp. Sin complicaciones — solo tú, nosotras y el resultado que siempre quisiste.
            </p>

            <div className="flex flex-col sm:flex-row gap-[20px] w-full sm:w-auto justify-center mb-[40px]">
              <a href="tel:985055910" className="bg-esencia-gold text-esencia-dark px-[40px] py-[16px] text-[12px] font-semibold tracking-[0.2em] uppercase hover:bg-esencia-light transition-colors duration-300 w-full sm:w-auto">
                📞 Llamar ahora
              </a>
              <a href="https://wa.me/34985055910" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-esencia-light/30 text-esencia-light px-[40px] py-[16px] text-[12px] font-semibold tracking-[0.2em] uppercase hover:border-esencia-light hover:bg-esencia-light/10 transition-colors duration-300 w-full sm:w-auto">
                💬 WhatsApp
              </a>
            </div>

            <p className="text-[11px] font-light tracking-[0.1em] opacity-50">
              Cita previa obligatoria · Martes a Sábado · Oviedo, Asturias
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0f0f] text-esencia-light pt-[80px] pb-[30px] px-6 md:px-[50px]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[60px] md:gap-[40px] mb-[60px] text-center md:text-left">
            
            {/* Col 1 */}
            <div className="flex flex-col items-center md:items-start">
              <span className="font-serif text-[20px] tracking-[0.3em] uppercase leading-none mb-[5px]">Esencia</span>
              <span className="font-serif italic text-[11px] text-esencia-gold tracking-[0.1em] mb-[20px]">Hair & Beauty</span>
              <p className="text-[12px] font-light opacity-60 max-w-[250px] leading-[1.6]">
                El mejor salón de Oviedo, según nuestras clientas.
              </p>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-esencia-gold text-[10px] tracking-[0.2em] uppercase mb-[25px]">Menú</h4>
              <ul className="flex flex-col gap-[15px] text-[12px] tracking-[0.1em] uppercase opacity-70">
                {['Nosotras', 'Servicios', 'Resultados', 'Reseñas', 'Visítanos', 'Reservar'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-esencia-gold hover:opacity-100 transition-all">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-esencia-gold text-[10px] tracking-[0.2em] uppercase mb-[25px]">Contacto & Legal</h4>
              <ul className="flex flex-col gap-[10px] text-[12px] font-light opacity-70 items-center md:items-start">
                <li>C/ Charles Darwin, 8, Oviedo</li>
                <li><a href="tel:985055910" className="hover:text-esencia-gold transition-colors">985 05 59 10</a></li>
                <li className="mt-[5px]"><a href="#" className="hover:text-esencia-gold transition-colors">Aviso Legal</a></li>
                <li><a href="#" className="hover:text-esencia-gold transition-colors">Política de Privacidad</a></li>
                <li className="flex gap-[15px] mt-[10px]">
                  <a href="https://www.instagram.com/calzonhair/?hl=es" target="_blank" rel="noopener noreferrer" className="hover:text-esencia-gold transition-colors">
                    <Instagram size={18} strokeWidth={1.5} />
                  </a>
                  <a href="https://www.facebook.com/p/Calz%C3%B3n-Hair-100063582036608/" target="_blank" rel="noopener noreferrer" className="hover:text-esencia-gold transition-colors">
                    <Facebook size={18} strokeWidth={1.5} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-esencia-gold text-[10px] tracking-[0.2em] uppercase mb-[25px]">Horario</h4>
              <ul className="flex flex-col gap-[10px] text-[12px] font-light opacity-70 items-center md:items-start">
                <li>Mar - Jue: 9:30 – 19:00</li>
                <li>Vie: 9:00 – 19:00</li>
                <li>Sáb: 9:00 – 13:00</li>
                <li>Lun y Dom: Cerrado</li>
              </ul>
            </div>

          </div>

          <div className="h-[1px] w-full bg-esencia-gold/20 mb-[30px]"></div>

          <div className="text-center text-[10px] tracking-[0.1em] opacity-40 font-light">
            © 2025 Esencia Estilistas — Hair & Beauty · Oviedo, Asturias · Todos los derechos reservados
          </div>
        </div>
      </footer>

    </div>
  );
}

