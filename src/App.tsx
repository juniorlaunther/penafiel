/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Award, 
  Layers, 
  Compass, 
  Clock, 
  ChevronRight, 
  Menu, 
  X,
  Hammer,
  Palette,
  Home,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BRAND_RED = "#fe1826";

const CLIENTS = [
  { 
    name: "Luciana Santos", 
    role: "Arquiteta", 
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjnMjjcdsyL0jPGM-QZD8pPhiSUrFB94sp_ePbAAqhCIgMBgreRcjd2bdZwLBolAC0BefFJS8jpTnHLKkKsFGGemGeP_qt2zzvGfHvp7tpKQ9XX6bsWKPDstcUz85x93SPen9IZT6683txx7WOtbauRbd4rmi2FsyLNIplWxezwkRstjx1OuPb7riloQ4/w200-h193/luciana.png",
    text: "Trabalho com a Penafiel há anos. A execução dos meus projetos é impecável, eles entendem cada detalhe técnico e a entrega é sempre pontual." 
  },
  { 
    name: "Ricardo Mendes", 
    role: "Empresário", 
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimIcM1t5PX7pGOY31-1BfX9Coq4gAxbYxNTL7TDhc33mDlavP5gbXgUnUWzqgBptcvqW0Ubd70RhhXTV1oFm4XSBzZVmjNRZWd7K4zVBCj-EB8R7SC9FBlR3AKsBftCljjuGbw361nI1GozEBHRDpl49r-plbyXoY4itF46CxOZ62KpnhuG-Y1LNE05qQ/w184-h200/ricardo.png",
    text: "Fizemos toda a mobília do nosso escritório em Sorocaba. O acabamento surpreendeu a todos. Ficou sofisticado e muito funcional." 
  },
  { 
    name: "Mariana Costa", 
    role: "Proprietária", 
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgL0Yjhesp2zNXAQJONmmvM9M346HmEKlF8X754i1QyYf0ppvZMeus6ZP02uBviu31xGm368SZPL3PcC_A0rZbknJn0S0pv0OaBdJFPnZMSXkiT1Drfqi9nW2Wh1GspcjxF8gsvGonFzkTQgtz6rP_JTaqQ0ybWE8-Ba_WjCqsCXto48uDU1qYx-xbuMfY/w200-h200/mariana.png",
    text: "Minha cozinha ficou exatamente como eu sonhei. O Peterson foi muito paciente e sugeriu soluções que economizaram espaço." 
  },
];

const HERO_IMAGES = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKoPz151Jy8PuqycmHMMpKHOThAe6n1cgpIon-joHSW2qAM32dGjaxIP_rvnFXdK6NoOPMANhnh60B-Yswn2izQT4SYN5r7ZnKJaSP7IJWECr-kPrzLjtudTSPqen6KT0tvCXXrrDKpVuXFx6LpmB85bj-5VSdU8aahhvL6yKI2GeayiqIm8eu9BRC1k8/s16000/cozinha%202.png",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzH1lOO2SIiR7-nRZrk76bOzsDCF_5I3Qx3THzW5HxiYPzMGvWwjVW7xvZ1D16RmMbCfZiGwnazO0q5eM-SNDnMv1jmW3rSkUXmLkMqmj71kWRZJakOfkvCmWzw2-O3yll1T3t5pWes8fn-8dXkGQICiKquDzLSs7QSccFaG2R-VQEu7u8X22Gi8Y8e10/s16000/quarto.png",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbAJrDhAYT8ia4FH-FHoaupMvPFC25lU29RX0SHEX-AkZD_ij6w7ZInM5_4knAut4JCln4L-csyqITkPDeyZszkfPC44xxfcgNcBi4PXUwHIzRXo9L9yufpG0wLUIx-poWtEFaJTxRIS3XGN2zM72vJskP5vlbhYQZaLPcyE3lD3ncUq9wYVV5sghDUe0/s16000/cozinha%20hero.png"
];

const HERO_POSITIONS = [
  "object-[15%_50%] md:object-center", // Slide 1: 15% para a esquerda
  "object-center",                     // Slide 2: Ótimo
  "object-[75%_50%] md:object-center"  // Slide 3: 25% para a direita (75% da esquerda)
];

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation - Failsafe and cleaning props
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          clearProps: "all"
        });
      }

      // Hero Animations
      const heroTl = gsap.timeline();
      heroTl.from(".hero-title", { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        delay: 0.5,
        ease: "power3.out" 
      })
      .from(".hero-text", { 
        y: 30, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.6")
      .from(".hero-cta", { 
        scale: 0.9, 
        opacity: 0, 
        duration: 0.8, 
        ease: "back.out(1.7)" 
      }, "-=0.4");

      // Scroll Animations
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((elem) => {
        gsap.from(elem, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });

      // Bento Grid staggered entrance
      gsap.from(".bento-item", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bento-container",
          start: "top 80%"
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-white font-sans text-stone-900 overflow-x-hidden">
      {/* HEADER */}
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgQbWvxp9U_Vxq-PrYhNMsqRpBEwj3UJssflNgwbfkwylWdD1ntK164D4LRW-bqJ_tDk1ucyF2ob6q3fKZWWawU7Ehj053yb-dHRUxmHhp_hyTBa8ZV4qnGqeh3PGNc8X99nw_YlzK9DSNq3Erhk7-7RqTjEWcwbu-vPcREI6RSgQFBGlHGwIb2L2TYJO4/s320/logo%20pena%20fiel.png" 
              alt="Penafiel Marcenaria" 
              className="h-12 md:h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <nav className="hidden lg:flex items-center space-x-8 lg:space-x-12">
            {['Início', 'Serviços', 'Diferenciais', 'Sobre', 'Portfólio'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-wider text-stone-600 hover:text-brand transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a 
              href="https://wa.me/5515997160896" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex bg-brand text-white px-5 py-2.5 rounded-md text-sm font-semibold uppercase tracking-wide hover:bg-stone-900 transition-all hover:shadow-lg items-center space-x-2"
            >
              <MessageCircle size={18} />
              <span>Orçamento</span>
            </a>
            <button 
              className="lg:hidden text-stone-900 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-stone-100 overflow-hidden"
            >
              <nav className="flex flex-col p-6 space-y-4">
                {['Início', 'Serviços', 'Diferenciais', 'Sobre', 'Portfólio'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    className="text-lg font-medium text-stone-600 hover:text-brand transition-colors border-b border-stone-50 pb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <a 
                  href="https://wa.me/5515997160896" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand text-white px-6 py-4 rounded-md font-bold uppercase tracking-widest text-sm flex items-center justify-center space-x-3 shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle size={20} />
                  <span>Solicitar Orçamento</span>
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="início" className="relative h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentSlide}
              src={HERO_IMAGES[currentSlide]} 
              alt="Ambiente Penafiel" 
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${HERO_POSITIONS[currentSlide]}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-stone-900/60 gradient-to-r from-stone-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-7xl font-display text-white leading-[1.1] mb-6 drop-shadow-sm">
              Tradição em criar <br />
              <span className="text-brand">ambientes exclusivos</span>
            </h1>
            <p className="hero-text text-lg md:text-xl text-stone-200 mb-10 max-w-2xl leading-relaxed">
              Desde 1991, transformamos espaços com móveis planejados que unem design arrojado, funcionalidade e a nobreza da marcenaria sob medida.
            </p>
            <div className="hero-cta flex flex-wrap gap-4">
              <a 
                href="https://wa.me/5515997160896" 
                className="bg-brand text-white px-8 py-4 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand transition-all duration-300"
              >
                Solicitar Visita Técnica
              </a>
              <a 
                href="https://www.instagram.com/marcenariapenafiel" 
                target="_blank"
                className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
              >
                <Instagram size={18} />
                <span>Ver Projetos</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-1 h-12 rounded-full bg-white/20 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* AUTHORITY SECTION */}
      <section className="py-10 md:py-12 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center">
            {[
              { label: "Anos de História", val: "30+" },
              { label: "Projetos Entregues", val: "2.5k+" },
              { label: "Cidades Atendidas", val: "10+" },
              { label: "Satisfação", val: "100%" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-display text-stone-900 mb-1">{stat.val}</div>
                <div className="text-xs md:text-sm text-stone-500 uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="serviços" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-sm font-bold tracking-[0.3em] text-brand uppercase mb-4">Portfólio de Soluções</h2>
            <h3 className="text-3xl md:text-4xl font-display text-stone-900">Soluções Completas sob Medida</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Home, title: "Residencial", desc: "Cozinhas, dormitórios, closets e livings planejados para o seu conforto máximo." },
              { icon: Briefcase, title: "Corporativo", desc: "Escritórios, lojas e recepções projetados para transmitir credibilidade e organização." },
              { icon: Palette, title: "Design Exclusivo", desc: "Móveis autorais desenvolvidos para atender necessidades específicas de cada espaço." },
              { icon: Hammer, title: "Acabamento Premium", desc: "Ferragens de alta performance e materiais de procedência garantida." },
              { icon: Layers, title: "Multimateriais", desc: "Harmonia perfeita entre madeira, MDF, vidros, metais e iluminação em LED." },
              { icon: MessageCircle, title: "Consultoria", desc: "Acompanhamento desde a concepção do projeto até a montagem final." }
            ].map((service, i) => {
              const isDark = i % 2 === 0;
              return (
                <div 
                  key={i} 
                  className={`group p-8 rounded-lg transition-all duration-500 reveal border-0 ${
                    isDark ? 'bg-stone-900 text-white shadow-xl' : 'bg-brand text-white shadow-xl shadow-brand/20'
                  }`}
                >
                  <div className={`w-14 h-14 shadow-sm rounded-md flex items-center justify-center mb-6 transition-all duration-300 ${
                    isDark ? 'bg-white text-brand' : 'bg-white text-stone-900'
                  }`}>
                    <service.icon size={28} />
                  </div>
                  <h4 className="text-xl font-display mb-4">{service.title}</h4>
                  <p className={`leading-relaxed transition-colors ${
                    isDark ? 'text-stone-400' : 'text-white/80'
                  }`}>
                    {service.desc}
                  </p>
                  <a 
                    href="https://wa.me/5515997160896" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center space-x-2 text-xs uppercase tracking-widest font-bold group-hover:translate-x-2"
                  >
                    <span>Solicitar Orçamento</span>
                    <ChevronRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIFFERENTIALS (BENTO GRID) */}
      <section id="diferenciais" className="py-12 md:py-20 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-sm font-bold tracking-[0.3em] text-stone-400 uppercase mb-4">Por que nos escolher?</h2>
            <h3 className="text-3xl md:text-4xl font-display text-stone-900">O Diferencial de quem faz com Paixão</h3>
          </div>

          <div className="bento-container grid grid-cols-1 md:grid-cols-6 grid-rows-none md:grid-rows-2 gap-4 md:h-[600px]">
            <div className="bento-item md:col-span-3 md:row-span-2 bg-stone-900 rounded-lg p-8 md:p-12 text-white flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbAJrDhAYT8ia4FH-FHoaupMvPFC25lU29RX0SHEX-AkZD_ij6w7ZInM5_4knAut4JCln4L-csyqITkPDeyZszkfPC44xxfcgNcBi4PXUwHIzRXo9L9yufpG0wLUIx-poWtEFaJTxRIS3XGN2zM72vJskP5vlbhYQZaLPcyE3lD3ncUq9wYVV5sghDUe0/s16000/cozinha%20hero.png" 
                  alt="Qualidade Marcenaria" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10">
                <Award className="text-brand mb-6" size={48} />
                <h4 className="text-3xl font-display mb-4">Qualidade e Procedência</h4>
                <p className="text-stone-300 leading-relaxed max-w-md">
                  Utilizamos apenas matérias-primas certificadas e acessórios de marcas líderes mundiais, garantindo longevidade ao seu investimento.
                </p>
              </div>
            </div>

            <div className="bento-item md:col-span-3 md:row-span-1 bg-white rounded-lg p-8 border border-stone-100 flex flex-col justify-center">
              <div className="flex items-start space-x-6">
                <Compass className="text-brand flex-shrink-0" size={32} />
                <div>
                  <h4 className="text-xl font-display text-stone-900 mb-2">Design Arrojado e Exclusivo</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Cada projeto é único. Fugimos do óbvio para criar peças que são verdadeiras declarações de estilo e personalidade.
                  </p>
                </div>
              </div>
            </div>

            <div className="bento-item md:col-span-3 md:row-span-1 bg-brand rounded-lg p-8 text-white flex items-center">
              <div className="flex items-center space-x-6">
                <Clock className="text-white flex-shrink-0" size={40} />
                <div>
                  <h4 className="text-xl font-display mb-2">Pontualidade e Tradição</h4>
                  <p className="text-stone-100 text-sm leading-relaxed">
                    Honramos cada prazo. Nosso nome é construído sobre a confiança de quem entrega o que promete desde 1991.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="sobre" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 reveal">
              <div className="relative inline-block">
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEij4LBiDDA9Y7y8zXmWx4WlzOcQjwfQ78ErJDxzjECJwcpnx_bDRpcOaMCOR82pK2znlrn6xR3a3YPX-snt3EHweIEatnueW1ZLroWybkZtPUFRGsiuPBpM5I3E1boKF1owcC16WihsZ_GmFXyT_K0vRReAMjq2-VB0lIOXX5jlHhn_LbJdncGUrCTrdRE/w640-h640/sobre.png" 
                  alt="Peterson e equipe Penafiel" 
                  className="rounded-lg shadow-2xl relative z-10 w-full h-auto object-cover max-h-[600px]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 w-48 h-48 md:w-64 md:h-64 bg-stone-50 rounded-lg -z-0 border border-stone-100"></div>
                <div className="absolute -top-4 -left-4 w-12 h-12 md:w-20 md:h-20 bg-brand/10 rounded-full -z-0"></div>
              </div>
            </div>
            
            <div className="lg:w-1/2 reveal">
              <h2 className="text-sm font-bold tracking-[0.3em] text-brand uppercase mb-4">Nossa Essência</h2>
              <h3 className="text-3xl md:text-4xl font-display text-stone-900 mb-8">Criando Móveis Planejados desde 1991</h3>
              <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
                <p>
                  A <span className="font-bold text-stone-900">Penafiel Marcenaria</span> nasceu com o propósito de elevar o padrão da marcenaria em Sorocaba e região. Sob a liderança de Peterson Penafiel, unimos a técnica tradicional herdada de gerações com as mais modernas tecnologias de design e fabricação.
                </p>
                <p>
                  Para nós, um móvel não é apenas um objeto de decoração. É um facilitador de rotinas, um cenário de memórias e uma extensão da alma de quem habita o espaço. Por isso, cada detalhe — do encaixe milimétrico à escolha da textura — é tratado com o máximo rigor artístico.
                </p>
                <p>
                  Atuamos com transparência total, oferecendo consultoria técnica para garantir que o seu sonho de ter um ambiente planejado seja executado com a perfeição que você merece.
                </p>
              </div>
              
              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-4">
                  {CLIENTS.map((client, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-stone-200 flex items-center justify-center overflow-hidden">
                      <img src={client.image} alt={client.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-stone-900">Mais de 5.000 pessoas</p>
                  <p className="text-stone-500">vivendo em ambientes Penafiel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 md:py-20 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-sm font-bold tracking-[0.3em] text-stone-500 uppercase mb-4">Experiências Reais</h2>
            <h3 className="text-3xl md:text-4xl font-display">O que nossos clientes dizem</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CLIENTS.map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 reveal">
                <div className="flex text-brand mb-6">
                  {Array(5).fill(0).map((_, i) => <Award key={i} size={16} className="fill-current" />)}
                </div>
                <p className="text-stone-300 italic mb-8 leading-relaxed">
                  "{item.text}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-stone-700 overflow-hidden">
                    <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-sm tracking-wide">{item.name}</p>
                    <p className="text-xs text-stone-500 uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA FINAL */}
      <section id="contato" className="py-12 md:py-20 relative overflow-hidden bg-brand">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-white/5 -rotate-12"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-5xl font-display text-white mb-6">
                Pronto para transformar seu <br className="hidden md:block" /> ambiente em algo extraordinário?
              </h2>
              <p className="text-white/80 text-lg md:text-xl font-light mb-0">
                Fale diretamente com o Peterson e agende sua consultoria exclusiva agora mesmo em Sorocaba.
              </p>
            </div>
            <div className="lg:w-1/3 flex flex-col items-center lg:items-end">
              <a 
                href="https://wa.me/5515997160896" 
                className="bg-white text-brand px-10 py-6 rounded-md font-bold uppercase tracking-widest text-lg md:text-xl hover:bg-stone-900 hover:text-white transition-all duration-500 shadow-2xl flex items-center space-x-4 group"
              >
                <MessageCircle size={32} className="group-hover:scale-110 transition-transform" />
                <span>Conversar no WhatsApp</span>
              </a>
              <p className="mt-4 text-white/60 text-xs uppercase tracking-widest font-bold">
                Retorno imediato em horário comercial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-50 pt-12 pb-8 md:pt-20 md:pb-10 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgQbWvxp9U_Vxq-PrYhNMsqRpBEwj3UJssflNgwbfkwylWdD1ntK164D4LRW-bqJ_tDk1ucyF2ob6q3fKZWWawU7Ehj053yb-dHRUxmHhp_hyTBa8ZV4qnGqeh3PGNc8X99nw_YlzK9DSNq3Erhk7-7RqTjEWcwbu-vPcREI6RSgQFBGlHGwIb2L2TYJO4/s320/logo%20pena%20fiel.png" 
                alt="Penafiel Marcenaria" 
                className="h-10 w-auto mb-8 grayscale hover:grayscale-0 transition-all cursor-pointer"
                referrerPolicy="no-referrer"
              />
              <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-sm">
                Referência em móveis planejados e design de interiores em Sorocaba - SP. Criando ambientes que inspiram vidas desde 1991.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/marcenariapenafiel" className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 hover:bg-brand hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <h5 className="font-bold uppercase tracking-widest text-xs text-stone-900 mb-8">Navegação</h5>
              <ul className="space-y-4 text-stone-500 text-sm">
                {['Início', 'Serviços', 'Diferenciais', 'Sobre', 'Contato'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-brand transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block">
              <h5 className="font-bold uppercase tracking-widest text-xs text-stone-900 mb-8">Nossos Serviços</h5>
              <ul className="space-y-4 text-stone-500 text-sm">
                <li>Planejados Residenciais</li>
                <li>Móveis Corporativos</li>
                <li>Design de Cozinhas</li>
                <li>Closets e Suítes</li>
                <li>Painéis e Home Theater</li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h5 className="font-bold uppercase tracking-widest text-xs text-stone-900 mb-8">Atendimento</h5>
              <ul className="space-y-6 text-stone-500 text-sm flex flex-col items-center md:items-start">
                <li className="flex items-center md:items-start space-x-3">
                  <MapPin size={18} className="text-brand flex-shrink-0" />
                  <span>Sorocaba - SP</span>
                </li>
                <li className="flex items-center md:items-start space-x-3">
                  <Phone size={18} className="text-brand flex-shrink-0" />
                  <span>(15) 99716-0896</span>
                </li>
                <li className="flex items-center md:items-start space-x-3">
                  <MessageCircle size={18} className="text-brand flex-shrink-0" />
                  <span>Peterson Penafiel</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-stone-400 text-xs uppercase tracking-widest font-semibold">
              Copyright 2026 - Penafiel Marcenaria
            </p>
            <p className="text-stone-300 text-[10px] uppercase tracking-widest">
              Design Premium & Estratégia Digital
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
