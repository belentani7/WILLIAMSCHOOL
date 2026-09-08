import { SubjectModule, FalseFriendItem, CulturalGuideItem, GameItem, EduTubeVideo } from '../types';

export const FALSE_FRIENDS: FalseFriendItem[] = [
  {
    pt: "Embaraçada",
    trap: "Embarazada",
    correctEs: "Avergonzada / Liada",
    ca: "Avergonyida / Embolicada",
    en: "Embarrassed",
    example: "Ela ficou embaraçada -> Estaba avergonzada por la equivocación.",
    trapMeaning: "En español, 'embarazada' significa 'pregnant' (esperando un bebé)."
  },
  {
    pt: "Esquisito",
    trap: "Exquisito",
    correctEs: "Raro / Extraño",
    ca: "Estrany / Rar",
    en: "Strange / Weird",
    example: "Um barulho esquisito -> Un ruido raro en el pasillo.",
    trapMeaning: "'Exquisito' en español significa delicioso, refinado o de altísima calidad."
  },
  {
    pt: "Oficina",
    trap: "Oficina",
    correctEs: "Taller mecánico / Laboratorio",
    ca: "Taller",
    en: "Workshop",
    example: "Levar o carro na oficina -> Llevar el coche al taller.",
    trapMeaning: "'Oficina' en español es el despacho de trabajo (escritório en portugués)."
  },
  {
    pt: "Sobrenome",
    trap: "Sobrenombre",
    correctEs: "Apellido",
    ca: "Cognom",
    en: "Surname / Last name",
    example: "Qual é o seu sobrenome? -> ¿Cuál es tu apellido?",
    trapMeaning: "'Sobrenombre' en español es un apodo o mote (apelido en portugués)."
  },
  {
    pt: "Apelido",
    trap: "Apellido",
    correctEs: "Mote / Apodo cariñoso",
    ca: "Malnom / Nom familiar",
    en: "Nickname",
    example: "O apelido dele é Dani -> Su mote es Dani.",
    trapMeaning: "En portugués apelido es el mote; en español apellido es el nombre de familia."
  },
  {
    pt: "Vassoura",
    trap: "Basura",
    correctEs: "Escoba",
    ca: "Escombra",
    en: "Broom",
    example: "Varrer com a vassoura -> Barrer con la escoba.",
    trapMeaning: "'Basura' en español son los residuos o desechos (lixo en portugués)."
  },
  {
    pt: "Polvo",
    trap: "Polvo",
    correctEs: "Pulpo (animal marino)",
    ca: "Pop (animal) / Pols (bruta)",
    en: "Octopus / Dust",
    example: "Comer polvo à galega -> Comer pulpo a la gallega.",
    trapMeaning: "En portugués polvo = pulpo del mar. En español polvo = tierra fina (pó)."
  },
  {
    pt: "Rato",
    trap: "Rato (momento)",
    correctEs: "Ratón (animal) / Rato (momento)",
    ca: "Ratolí (animal) / Estona (temps)",
    en: "Mouse / Short while",
    example: "Um rato na sala -> Un ratón en la sala. / Espera un rato.",
    trapMeaning: "En portugués rato es el animal. En español un rato es un momento breve."
  },
  {
    pt: "Propina",
    trap: "Propina (soborno)",
    correctEs: "Soborno (en PT) / Propina de camarero (en ES)",
    ca: "Suborn (en PT) / Propina (en ES)",
    en: "Bribe (PT) / Tip (ES)",
    example: "Deixar uma gorjeta -> Dejar una propina al camarero.",
    trapMeaning: "En Brasil propina es un soborno ilegal; en España propina es la propina normal."
  },
  {
    pt: "Pegar",
    trap: "Pegar (golpear)",
    correctEs: "Tomar / Coger (un autobús o cuaderno)",
    ca: "Agafar",
    en: "To take / Catch",
    example: "Pegar o ônibus -> Tomar o coger el autobús.",
    trapMeaning: "En español 'pegar' suele significar golpear o unir con pegamento."
  },
  {
    pt: "Copo",
    trap: "Copa (árbol o trofeo)",
    correctEs: "Vaso de agua",
    ca: "Got d'aigua",
    en: "Glass / Cup",
    example: "Um copo de água -> Un vaso de agua.",
    trapMeaning: "En español una 'copa' es una copa de cristal fino con pie o un trofeo deportivo."
  },
  {
    pt: "Largo",
    trap: "Largo (longitud)",
    correctEs: "Ancho (en PT) / Largo (en ES = comprido)",
    ca: "Ample (en PT) / Llarg (en ES)",
    en: "Wide (PT) / Long (ES)",
    example: "Uma rua larga -> Una calle ancha.",
    trapMeaning: "En portugués largo es ancho. En español largo es de mucha longitud (comprido)."
  }
];

export const CULTURAL_GUIDES: CulturalGuideItem[] = [
  {
    id: "cultura-horarios",
    category: "vida_diaria",
    title: "Los Horarios en España y la Rutina del Instituto",
    icon: "Clock",
    description: "La jornada escolar, los dos recreos ('pati') y las horas de comida y cena.",
    spainHabit: "Las clases empiezan a las 8:00 en punto. El recreo es sobre las 11:00 (se come un bocadillo). La comida familiar es a las 14:30 o 15:00, y la cena es tardía: de 21:00 a 22:00.",
    brazilComparison: "En Brasil se come habitualmente a las 12:00 y se cena a las 19:00. Aquí las tardes son mucho más largas y la vida social en la calle se alarga con la luz solar.",
    daniloTip: "Lleva siempre tu bocadillo ('entrepà' en catalán) en la mochila para el recreo. Es el momento perfecto para charlar con compañeros de clase.",
    audioPhrase: "El timbre suena a las ocho en punto y a las once salimos al patio a comer el bocadillo.",
    tags: ["Horarios", "Instituto", "Pati"]
  },
  {
    id: "cultura-socializacion",
    category: "socializacion",
    title: "El Trato en el Aula: Cercanía, Volumen y Respeto",
    icon: "Users",
    description: "Cómo dirigirse a los profesores y cómo hacer amigos en el recreo.",
    spainHabit: "En España y Cataluña es habitual tutear a los profesores por su nombre de pila en el instituto, manteniendo siempre un tono educado. Los estudiantes hablan con voz enérgica y gestos abiertos.",
    brazilComparison: "En Brasil a veces se usa 'Professor' o 'Senhor/Senhora'. En España el tuteo con respeto genera mucha confianza entre alumno y docente.",
    daniloTip: "Si alguien habla en voz alta o gesticula mucho, no está enfadado: es la expresividad mediterránea habitual. Un choque de manos o una sonrisa abre cualquier conversación.",
    audioPhrase: "En el instituto nos ayudamos todos en los trabajos en grupo.",
    tags: ["Profesores", "Compañeros", "Tuteo"]
  },
  {
    id: "cultura-catalunya",
    category: "fiestas_tradiciones",
    title: "Festividades de Cataluña: Sant Jordi, Castellers y Sant Joan",
    icon: "Sparkles",
    description: "Las grandes tradiciones que unen la lectura, el fuego y el trabajo en equipo.",
    spainHabit: "El 23 de abril es Sant Jordi: las calles se llenan de rosas rojas y libros. En verano se celebran los Castellers (torres humanas que simbolizan fuerza, equilibrio y confianza) y la noche de San Juan con hogueras.",
    brazilComparison: "Igual que las fiestas juninas en Brasil tienen música, fuego y comunidad, San Juan y las fiestas mayores catalanas tienen 'correfocs' y plazas llenas de música.",
    daniloTip: "Para Sant Jordi regalar un libro o una rosa es el gesto más bonito de aprecio entre amigos y compañeros.",
    audioPhrase: "Per Sant Jordi regalem llibres i roses, i a l'estiu veiem castellers a la plaça.",
    tags: ["Sant Jordi", "Castellers", "Tradició"]
  },
  {
    id: "cultura-musica",
    category: "musica_baile",
    title: "Música y Baile: Rumba Catalana, Flamenco y Sardana",
    icon: "Music",
    description: "El ritmo como puente universal entre la samba brasileña y la rumba de aquí.",
    spainHabit: "La rumba catalana (popularizada por Peret) se toca con la guitarra y el 'ventilador' rítmico con la mano, acompañado de palmas sincronizadas. La sardana es un baile circular donde todos se dan la mano.",
    brazilComparison: "La percusión corporal, el compás de las palmas y el amor por la guitarra unen directamente la música de Brasil con la rumba y el flamenco español.",
    daniloTip: "Como a Danilo le gusta cantar y la música, aprender el compás de las palmas flamencas y rumberas será su mejor carta de presentación musical.",
    audioPhrase: "El compás de la rumba catalana y el samba brasileño comparten el alma del ritmo y la alegría.",
    tags: ["Rumba", "Música", "Compás"]
  }
];

export const ACADEMIC_MODULES: SubjectModule[] = [
  // ==========================================
  // 1º DE LA ESO (12-13 años)
  // ==========================================
  {
    id: "mates-1eso",
    name: "Matemáticas 1º ESO",
    year: "1eso",
    yearLabel: "1º de ESO (12-13 años)",
    category: "ciencias",
    icon: "Calculator",
    color: "#2563eb",
    description: "Números enteros (+ y -), fracciones equivalentes, operaciones combinadas con paréntesis y proporcionalidad directa.",
    topics: [
      {
        id: "m1-enteros",
        title: "Números Enteros en la Recta Numérica",
        subtitle: "Sumar y restar números positivos y negativos",
        portugueseBridge: "Regra dos sinais: 'Menos com menos dá mais'. A reta numérica é universal!",
        catalanBridge: "En català: Nombres enters positius i negatius. El zero és el punt de referència.",
        summary: "Los números enteros incluyen los números positivos, el cero y los negativos (-3, -2, -1, 0, 1, 2, 3). Para sumar números del mismo signo se suman sus valores y se mantiene el signo. Si tienen distinto signo, se restan y se pone el signo del mayor en valor absoluto.",
        keyConcepts: [
          { term: "Entero", pt: "Número inteiro", es: "Número entero", ca: "Nombre enter", en: "Integer", explanation: "Cualquier número sin decimales (+ o -)." },
          { term: "Valor absoluto", pt: "Módulo / Valor absoluto", es: "Valor absoluto |x|", ca: "Valor absolut", en: "Absolute value", explanation: "La distancia al cero (siempre positiva: |-5| = 5)." }
        ],
        interactiveExample: {
          prompt: "Calcula: (-7) + (+4) y (-3) · (-5)",
          stepByStep: [
            "Paso 1: (-7) + 4 -> Signos contrarios: restamos 7 - 4 = 3. Como 7 es mayor y negativo, el resultado es -3.",
            "Paso 2: (-3) · (-5) -> Signos iguales en multiplicación: (-) · (-) = (+). 3 · 5 = +15."
          ],
          ruleBox: "Regla de signos: (+)·(+) = (+), (-)·(-) = (+), (+)·(-) = (-), (-)·(+) = (-)."
        }
      },
      {
        id: "m1-fracciones",
        title: "Fracciones y Mínimo Común Múltiplo (m.c.m.)",
        subtitle: "Suma y resta con distinto denominador",
        portugueseBridge: "MMC (Mínimo Múltiplo Comum) em espanhol chama-se m.c.m.",
        catalanBridge: "En català: Fraccions equivalents i mínim comú múltiple (m.c.m.).",
        summary: "Para sumar 1/4 + 2/3 necesitamos un denominador común. El m.c.m.(4, 3) = 12. Convertimos a 3/12 + 8/12 = 11/12.",
        keyConcepts: [
          { term: "Denominador", pt: "Denominador", es: "Denominador (abajo)", ca: "Denominador", en: "Denominator", explanation: "Indica en cuántas partes dividimos la unidad." },
          { term: "Numerador", pt: "Numerador", es: "Numerador (arriba)", ca: "Numerador", en: "Numerator", explanation: "Indica cuántas partes tomamos." }
        ],
        interactiveExample: {
          prompt: "Calcula: 2/5 + 1/10",
          stepByStep: [
            "Paso 1: El m.c.m. de 5 y 10 es 10.",
            "Paso 2: Multiplicamos 2/5 por 2 arriba y abajo -> 4/10.",
            "Paso 3: Sumamos 4/10 + 1/10 = 5/10 = 1/2 (simplificando)."
          ],
          ruleBox: "Recuerda simplificar siempre la fracción final dividiendo entre el m.c.d."
        }
      }
    ],
    exercises: [
      {
        id: "ex-m1-1",
        subject: "Matemáticas 1º ESO",
        question: "¿Cuál es el resultado de calcular: (-8) + (+15)?",
        options: ["+7", "-7", "+23", "-23"],
        correctIndex: 0,
        explanation: "Como tienen signo distinto, restamos 15 - 8 = 7, con el signo positivo del mayor.",
        difficulty: "fácil"
      }
    ],
    examReview: {
      title: "Control Trimestral de Matemáticas 1º ESO",
      objectives: ["Dominar operaciones con números negativos", "Calcular m.c.m. y simplificar fracciones"],
      formulaSheet: ["m.c.m. = factores comunes y no comunes al mayor exponente", "Jerarquía: 1º Paréntesis, 2º Multiplicación/División, 3º Suma/Resta"],
      mockQuestions: [{ q: "¿Qué da (-2) · (-4) · (-1)?", a: "Da -8, porque tres signos negativos dan negativo." }]
    }
  },

  {
    id: "lengua-1eso",
    name: "Lengua Castellana 1º ESO",
    year: "1eso",
    yearLabel: "1º de ESO (12-13 años)",
    category: "letras",
    icon: "BookOpen",
    color: "#059669",
    description: "Sustantivos, adjetivos, verbos, reglas de B y V, uso de la H y tipos de textos narrativos.",
    topics: [
      {
        id: "l1-categorias",
        title: "Las Clases de Palabras: Sustantivos y Verbos",
        subtitle: "Identificar la función de cada elemento de la oración",
        portugueseBridge: "Substantivo, adjetivo, pronome, verbo: classes gramaticais idênticas ao português!",
        catalanBridge: "En català: Classes de paraules. Substantius, adjectius i verbs.",
        summary: "El sustantivo nombra personas, animales, cosas o ideas. El adjetivo describe cómo son o están los sustantivos, y el verbo indica acciones o estados en pasado, presente o futuro.",
        keyConcepts: [
          { term: "Sustantivo", pt: "Substantivo", es: "Sustantivo / Nombre", ca: "Substantiu", en: "Noun", explanation: "Palabra que nombra realidades (chico, instituto, música)." },
          { term: "Verbo", pt: "Verbo", es: "Verbo (acción)", ca: "Verb", en: "Verb", explanation: "Acción conjugada en persona, número y tiempo." }
        ],
        interactiveExample: {
          prompt: "Identifica el sustantivo y el verbo en: 'Danilo toca la guitarra.'",
          stepByStep: [
            "1. 'Danilo' y 'guitarra' son sustantivos (personas y objetos).",
            "2. 'Toca' es el verbo (acción en presente de tocar)."
          ],
          ruleBox: "El verbo siempre concuerda en número (singular/plural) con el sujeto."
        }
      }
    ],
    exercises: [
      {
        id: "ex-l1-1",
        subject: "Lengua 1º ESO",
        question: "En la frase 'El profesor amable explica la lección', ¿qué palabra es el adjetivo?",
        options: ["amable", "profesor", "explica", "lección"],
        correctIndex: 0,
        explanation: "'Amable' describe una cualidad del profesor, por lo que es un adjetivo calificativo.",
        difficulty: "fácil"
      }
    ],
    examReview: {
      title: "Control de Morfología 1º ESO",
      objectives: ["Distinguir tipos de palabras", "Escribir sin faltas de B y V"],
      formulaSheet: ["Se escribe con B antes de consonante (bra, bla) y terminaciones en -aba.", "Se escribe con V después de d, b y n (adverbio, invitar)."],
      mockQuestions: [{ q: "¿Por qué 'cantaba' se escribe con B?", a: "Porque es un pretérito imperfecto de la primera conjugación." }]
    }
  },

  // ==========================================
  // 2º DE LA ESO (13-14 años)
  // ==========================================
  {
    id: "mates-2eso",
    name: "Matemáticas 2º ESO",
    year: "2eso",
    yearLabel: "2º de ESO (13-14 años)",
    category: "ciencias",
    icon: "SquareCode",
    color: "#7c3aed",
    description: "Ecuaciones de 1er grado con denominadores, proporcionalidad, porcentajes y Teorema de Tales.",
    topics: [
      {
        id: "m2-ecuaciones-denominador",
        title: "Ecuaciones de 1er Grado con Denominadores",
        subtitle: "Multiplicar por el m.c.m. para eliminar fracciones",
        portugueseBridge: "Multiplicar todos os termos pelo MMC para sumir com as frações: método idêntico!",
        catalanBridge: "En català: Equacions de 1r grau amb denominadors. Multipliquem pel m.c.m.",
        summary: "Para resolver (x/2) + (x/3) = 5, hallamos el m.c.m.(2, 3) = 6. Multiplicamos todos los términos por 6: 3x + 2x = 30 -> 5x = 30 -> x = 6.",
        keyConcepts: [
          { term: "Ecuación", pt: "Equação", es: "Ecuación lineal", ca: "Equació lineal", en: "Linear equation", explanation: "Igualdad algebraica de grado 1." },
          { term: "Despejar", pt: "Isolar a incógnita", es: "Despejar x", ca: "Aïllar la x", en: "Solve for x", explanation: "Dejar la incógnita sola." }
        ],
        interactiveExample: {
          prompt: "Resuelve: (x - 1) / 4 = 3",
          stepByStep: [
            "Paso 1: El 4 que está dividiendo a todo el miembro pasa multiplicando: x - 1 = 3 · 4 = 12.",
            "Paso 2: El -1 pasa al otro lado sumando: x = 12 + 1 = 13."
          ],
          ruleBox: "Si un número divide a TODO un miembro, pasa directamente multiplicando al otro."
        }
      }
    ],
    exercises: [
      {
        id: "ex-m2-1",
        subject: "Matemáticas 2º ESO",
        question: "Resuelve: 3x - 5 = 16. ¿Cuál es el valor de x?",
        options: ["x = 7", "x = 5", "x = 21", "x = 6"],
        correctIndex: 0,
        explanation: "3x = 16 + 5 = 21. x = 21 / 3 = 7.",
        difficulty: "fácil"
      }
    ],
    examReview: {
      title: "Control de Álgebra 2º ESO",
      objectives: ["Resolver ecuaciones con paréntesis y denominadores", "Plantear problemas con ecuaciones"],
      formulaSheet: ["Proporcionalidad directa: a/b = c/d -> a·d = b·c"],
      mockQuestions: [{ q: "¿Cómo se comprueba una ecuación?", a: "Sustituyendo el valor obtenido de x en la igualdad inicial." }]
    }
  },

  {
    id: "catalan-2eso",
    name: "Llengua Catalana 2º ESO",
    year: "2eso",
    yearLabel: "2º de ESO (13-14 años)",
    category: "idiomas",
    icon: "GraduationCap",
    color: "#d97706",
    description: "El passat perifràstic ('vaig cantar'), pronoms febles bàsics (en, hi) i comunicació a l'institut.",
    topics: [
      {
        id: "c2-passat-perifrastic",
        title: "El Passat Perifràstic Català: 'Vaig fer'",
        subtitle: "La forma més comuna de parlar del passat en català",
        portugueseBridge: "Cuidado com o falso amigo: 'Eu vou fazer' em português é futuro. Em catalão 'Vaig fer' é PASSADO!",
        catalanBridge: "En català: El passat perifràstic es forma amb el verb 'anar' en present + infinitiu.",
        summary: "El catalán usa una estructura especial para el pasado: el verbo anar en present (vaig, vas, va, vam, vau, van) + infinitiu del verb principal. 'Ahir vaig estudiar' significa 'Ayer estudié'.",
        keyConcepts: [
          { term: "Vaig menjar", pt: "Eu comi (passado)", es: "Comí / He comido", ca: "Vaig menjar", en: "I ate", explanation: "Acció acabada en el passat." },
          { term: "Va anar", pt: "Ele/Ela foi", es: "Fue / Ha ido", ca: "Va anar", en: "He/She went", explanation: "Tercera persona del singular." }
        ],
        interactiveExample: {
          prompt: "¿Cómo se dice en catalán 'Ayer hablé con el profesor'?",
          stepByStep: [
            "1. 'Ayer' en catalán es 'Ahir'.",
            "2. 'Hablé' se forma con 'vaig' + infinitivo 'parlar' -> 'vaig parlar'.",
            "3. Frase completa: 'Ahir vaig parlar amb el professor'."
          ],
          ruleBox: "Conjugación del auxiliar: jo vaig, tu vas, ell/ella va, nosaltres vam, vosaltres vau, ells/elles van."
        }
      }
    ],
    exercises: [
      {
        id: "ex-c2-1",
        subject: "Llengua Catalana 2º ESO",
        question: "Quina frase significa 'Nosotros aprobamos el examen de matemáticas'?",
        options: ["Vam aprovar l'examen de matemàtiques", "Anem aprovar l'examen", "Aprovem ahir l'examen", "Van aprovar l'examen"],
        correctIndex: 0,
        explanation: "'Nosaltres vam aprovar' és el passat perifràstic correcte de la 1a persona del plural.",
        difficulty: "medio"
      }
    ],
    examReview: {
      title: "Pla de Llengua Catalana 2º ESO",
      objectives: ["Dominar el passat perifràstic", "Usar el vocabulari bàsic de convivència"],
      formulaSheet: ["Vaig / Vas / Va / Vam / Vau / Van + Infinitiu", "Pronoms febles: 'en' substitueix de+cosa, 'hi' substitueix lloc o manera."],
      mockQuestions: [{ q: "Què vol dir 'Ahir vam anar al pati'?", a: "Ayer fuimos al patio del instituto." }]
    }
  },

  // ==========================================
  // 3º DE LA ESO (14 años - AÑO ACTUAL DE DANILO)
  // ==========================================
  {
    id: "mates-3eso",
    name: "Matemáticas 3º ESO",
    year: "3eso",
    yearLabel: "3º de ESO (14 años - Curso de Danilo)",
    category: "ciencias",
    icon: "Calculator",
    color: "#ff2d55",
    description: "Ecuaciones de 2º grado (fórmula general), sistemas de ecuaciones lineales 2x2, Teorema de Pitágoras y estadística descriptiva.",
    topics: [
      {
        id: "m3-segundo-grado",
        title: "Ecuaciones de Segundo Grado: ax² + bx + c = 0",
        subtitle: "La fórmula resolvente de Bhaskara y el discriminante",
        portugueseBridge: "No Brasil é muito famosa como 'Fórmula de Bhaskara': x = (-b ± √(b² - 4ac)) / (2a). Na Espanha é exatamente a mesma!",
        catalanBridge: "En català: Fórmula de l'equació de segon grau completa i nombre de solucions segons el discriminant.",
        summary: "Una ecuación de segundo grado ax² + bx + c = 0 puede tener 2 soluciones, 1 solución doble o ninguna solución real dependiendo de si el discriminante Δ = b² - 4ac es positivo, cero o negativo.",
        keyConcepts: [
          { term: "Discriminante", pt: "Discriminante (Delta Δ)", es: "Discriminante (b² - 4ac)", ca: "Discriminant", en: "Discriminant", explanation: "Indica cuántas soluciones tiene la raíz." },
          { term: "Coeficiente", pt: "Coeficiente a, b, c", es: "Coeficientes numéricos", ca: "Coeficient", en: "Coefficient", explanation: "Los números que multiplican a las incógnitas." }
        ],
        interactiveExample: {
          prompt: "Resuelve x² - 5x + 6 = 0",
          stepByStep: [
            "Paso 1: Identificamos coeficientes: a = 1, b = -5, c = 6.",
            "Paso 2: Discriminante: (-5)² - 4·1·6 = 25 - 24 = 1. Como 1 > 0, tiene dos soluciones.",
            "Paso 3: x = ( -(-5) ± √1 ) / (2·1) = (5 ± 1) / 2.",
            "Paso 4: Solución 1: (5 + 1) / 2 = 3. Solución 2: (5 - 1) / 2 = 2."
          ],
          ruleBox: "Comprobación: 3² - 5·3 + 6 = 9 - 15 + 6 = 0. ¡Solución correcta!"
        }
      },
      {
        id: "m3-sistemas-lineales",
        title: "Sistemas de Ecuaciones 2x2",
        subtitle: "Métodos de Sustitución, Igualación y Reducción",
        portugueseBridge: "Sistemas lineares 2x2 com métodos de substituição e adição: idênticos ao 9º ano brasileiro.",
        catalanBridge: "En català: Sistemes d'equacions lineals amb dues incògnites. Resolució per substitució i reducció.",
        summary: "Un sistema busca el valor simultáneo de x e y que satisface dos ecuaciones a la vez. En el método de sustitución, despejamos una incógnita en una ecuación y la introducimos en la otra.",
        keyConcepts: [
          { term: "Sustitución", pt: "Substituição", es: "Método de sustitución", ca: "Substitució", en: "Substitution method", explanation: "Despejar una letra y reemplazarla en la otra." },
          { term: "Reducción", pt: "Adição / Redução", es: "Método de reducción", ca: "Reducció", en: "Elimination method", explanation: "Sumar o restar ecuaciones para anular una incógnita." }
        ],
        interactiveExample: {
          prompt: "Resuelve por sustitución: { x + y = 10 ; 2x - y = 5 }",
          stepByStep: [
            "Paso 1: Despejamos y en la 1ª ecuación: y = 10 - x.",
            "Paso 2: Sustituimos en la 2ª ecuación: 2x - (10 - x) = 5 -> 2x - 10 + x = 5 -> 3x = 15 -> x = 5.",
            "Paso 3: Calculamos y: y = 10 - 5 = 5. La solución es (x=5, y=5)."
          ],
          ruleBox: "En el método de reducción, si sumamos directamente: (x+y) + (2x-y) = 3x = 15 -> x = 5."
        }
      }
    ],
    exercises: [
      {
        id: "ex-m3-1",
        subject: "Matemáticas 3º ESO",
        question: "¿Cuántas soluciones reales tiene la ecuación 2x² + 4x + 10 = 0?",
        options: ["Ninguna solución real (discriminante negativo)", "Dos soluciones distintas", "Una solución doble", "Infinitas soluciones"],
        correctIndex: 0,
        explanation: "Δ = b² - 4ac = 4² - 4·2·10 = 16 - 80 = -64. Como es negativo, no tiene raíces reales.",
        difficulty: "medio"
      }
    ],
    examReview: {
      title: "Control de Álgebra y Ecuaciones 3º ESO",
      objectives: ["Aplicar la fórmula general de segundo grado", "Resolver sistemas por reducción y sustitución"],
      formulaSheet: [
        "Fórmula cuadrática: x = (-b ± √(b² - 4ac)) / (2a)",
        "Pitágoras: c² = a² + b²",
        "Media aritmética: x̄ = Σ(xi · fi) / N"
      ],
      mockQuestions: [{ q: "¿Qué ocurre cuando b = 0 en ax² + c = 0?", a: "Es incompleta: se despeja x² = -c/a y se hace la raíz cuadrada directa." }]
    }
  },

  {
    id: "espanol-3eso",
    name: "Lengua Española 3º ESO",
    year: "3eso",
    yearLabel: "3º de ESO (14 años - Curso de Danilo)",
    category: "letras",
    icon: "BookOpen",
    color: "#ff6b8b",
    description: "Reglas de acentuación (agudas, llanas, esdrújulas, hiatos), oraciones compuestas coordinadas y falsos cognados.",
    topics: [
      {
        id: "l3-acentuacion",
        title: "Acentuación Completa: Diptongos, Triptongos e Hiatos",
        subtitle: "Dominar la tilde española sin confusiones con el portugués",
        portugueseBridge: "No espanhol NÃO existe til nasal (~), crase (`) nem acento circunflexo (^). SÓ existe o acento agudo (´)!",
        catalanBridge: "En català hi ha accent obert (`) i tancat (´). En castellà només hi ha accent agut (´).",
        summary: "Una palabra aguda lleva tilde si termina en vocal, -n o -s. Una palabra llana lleva tilde si NO termina en vocal, -n o -s. Las esdrújulas y sobresdrújulas se acentúan siempre. Un hiato de vocal abierta + vocal cerrada tónica SIEMPRE lleva tilde (pa-ís, Ma-rí-a).",
        keyConcepts: [
          { term: "Aguda", pt: "Oxítona", es: "Aguda (fuerza al final)", ca: "Aguda", en: "Oxytone", explanation: "Fuerza en la última sílaba: canción, compás, rubí." },
          { term: "Llana", pt: "Paroxítona", es: "Llana (fuerza penúltima)", ca: "Plana", en: "Paroxytone", explanation: "Fuerza en la penúltima: árbol, césped, móvil." },
          { term: "Hiato", pt: "Hiato", es: "Hiato con tilde en la débil", ca: "Hiatus", en: "Hiatus", explanation: "Rompe el diptongo: baúl, río, sonreír." }
        ],
        interactiveExample: {
          prompt: "¿Por qué 'árbol' lleva tilde pero 'reloj' no?",
          stepByStep: [
            "1. 'Ár-bol' es llana y termina en 'L' (consonante distinta de N o S) -> Lleva tilde.",
            "2. 'Re-loj' es aguda y termina en 'J' (no termina en vocal, N ni S) -> No lleva tilde."
          ],
          ruleBox: "Las palabras monosílabas nunca llevan tilde, salvo la tilde diacrítica (él/el, tú/tu, té/te, sí/si)."
        }
      }
    ],
    exercises: [
      {
        id: "ex-l3-1",
        subject: "Lengua Española 3º ESO",
        question: "¿Cuál de las siguientes palabras lleva tilde porque tiene un hiato acentual?",
        options: ["País", "Canción", "Examen", "Amistad"],
        correctIndex: 0,
        explanation: "'Pa-ís' separa la 'a' abierta de la 'i' cerrada tónica, rompiendo el diptongo con tilde obligatoria.",
        difficulty: "medio"
      }
    ],
    examReview: {
      title: "Control de Ortografía y Sintaxis 3º ESO",
      objectives: ["Escribir con tildes precisas", "Evitar mezclar grafías portuguesas (ç, nh, lh) con el español"],
      formulaSheet: [
        "En español nunca se usan: ç (usa z/c), nh (usa ñ), lh (usa ll).",
        "Tilde diacrítica: él (pronombre) vs el (artículo), más (cantidad) vs mas (pero)."
      ],
      mockQuestions: [{ q: "¿Cómo se escribe 'caminho' y 'filho' en español?", a: "Se escriben 'camino' (con n) e 'hijo' (con j)." }]
    }
  },

  {
    id: "catalan-3eso",
    name: "Llengua Catalana 3º ESO",
    year: "3eso",
    yearLabel: "3º de ESO (14 años - Curso de Danilo)",
    category: "idiomas",
    icon: "GraduationCap",
    color: "#ff8fa3",
    description: "Inmersión y andamiaje PT-CA, ela geminada (l·l), pronoms febles i competència comunicativa a l'institut.",
    topics: [
      {
        id: "c3-pont-fonetic",
        title: "El Gran Avantatge Fonètic de William Danilo en Català",
        subtitle: "Sons brasilers idèntics que el català té i el castellà no té",
        portugueseBridge: "A sua língua materna tem a letra 'ç', o som de 'sh/ch' do X, e as vogais abertas (è, ò) que são IGUAIS ao catalão!",
        catalanBridge: "En català: La c trencada (ç), l'ela geminada (l·l) i els sons de les vocals obertes.",
        summary: "Danilo té una oïda privilegiada: el portuguès del Brasil i el català comparteixen la rica distinció vocàlica que no existeix en castellà. Paraules com 'plaça', 'lliçó', 'sortir', 'menjar' o 'deures' s'assimilen de manera molt natural.",
        keyConcepts: [
          { term: "Ela geminada (l·l)", pt: "L longo / duplo", es: "No existe (usa L o LL)", ca: "l·l (novel·la, col·legi)", en: "Geminate L", explanation: "Dues erres de so separat amb punt volat al mig." },
          { term: "Deures", pt: "Tarefas escolares", es: "Deberes", ca: "Deures", en: "Homework", explanation: "Exercicis per fer a casa." }
        ],
        interactiveExample: {
          prompt: "Com es diu 'Obrigado, até amanhã e bom final de semana' en català?",
          stepByStep: [
            "1. 'Obrigado' -> 'Gràcies' o 'Moltes gràcies' (o 'Merci' col·loquial).",
            "2. 'Até amanhã' -> 'Fins demà'.",
            "3. 'Bom final de semana' -> 'Bon cap de setmana'."
          ],
          ruleBox: "A l'aula sempre pots demanar ajuda dient: 'Em pots ajudar, si us plau?'"
        }
      }
    ],
    exercises: [
      {
        id: "ex-c3-1",
        subject: "Llengua Catalana 3º ESO",
        question: "Quina paraula s'escriu correctament amb ela geminada (l·l) en català?",
        options: ["Col·legi", "Caleji", "Colegio", "Col-legio"],
        correctIndex: 0,
        explanation: "'Col·legi' porta ela geminada amb punt volat segons la normativa de l'Institut d'Estudis Catalans.",
        difficulty: "fácil"
      }
    ],
    examReview: {
      title: "Pla d'Integració i Èxit en Català 3º ESO",
      objectives: ["Expressar-se amb seguretat a l'institut", "Comprendre textos escolars en català"],
      formulaSheet: [
        "Apostrofació de l'article: 'el' i 'la' s'apostrofen davant vocal (l'institut, l'escola).",
        "Connectors útils: A més a més (además), tanmateix (sin embargo), per tant (por lo tanto)."
      ],
      mockQuestions: [{ q: "Com es diu 'recreo' en català?", a: "Es diu 'pati' o 'esbarjo'." }]
    }
  },

  {
    id: "ingles-3eso",
    name: "English 3º ESO (B1 Level)",
    year: "3eso",
    yearLabel: "3º de ESO (14 años - Curso de Danilo)",
    category: "idiomas",
    icon: "Globe2",
    color: "#38bdf8",
    description: "Present Perfect with 'for' and 'since', First and Second Conditionals, STEM vocabulary and listening fluency.",
    topics: [
      {
        id: "en3-present-perfect",
        title: "Present Perfect vs Past Simple",
        subtitle: "Actions finished in the past vs life experiences connected to now",
        portugueseBridge: "Compare: 'Eu estudei ontem' (Past Simple) vs 'Eu tenho estudado muito ultimamente' (Present Perfect).",
        catalanBridge: "En català: Perfet perifràstic (ahir vaig anar) vs compost (avui he anat).",
        summary: "Use Past Simple with specific past time indicators (yesterday, last week, in 2023, two months ago). Use Present Perfect (have/has + past participle) with 'for' (duration) and 'since' (starting point).",
        keyConcepts: [
          { term: "Since", pt: "Desde (ponto de partida)", es: "Desde (punto en el tiempo)", ca: "Des de", en: "Since (e.g. since 2024)", explanation: "Identifies the starting moment." },
          { term: "For", pt: "Por / Durante (duração)", es: "Durante (periodo de tiempo)", ca: "Durant", en: "For (e.g. for 6 months)", explanation: "Identifies the total duration." }
        ],
        interactiveExample: {
          prompt: "Complete: 'William has studied at this school _______ three months.'",
          stepByStep: [
            "1. 'Three months' is a period of duration, not a single calendar point.",
            "2. For duration, the correct preposition is 'for'.",
            "3. Answer: 'William has studied at this school for three months'."
          ],
          ruleBox: "Formula: Subject + have / has + Past Participle (3rd column / -ed)."
        }
      }
    ],
    exercises: [
      {
        id: "ex-en3-1",
        subject: "English 3º ESO",
        question: "Choose the correct sentence in English:",
        options: [
          "If I study hard, I will pass all my ESO exams.",
          "If I will study hard, I pass all exams.",
          "If I study hard, I passed exams.",
          "If I studied hard, I will pass exams."
        ],
        correctIndex: 0,
        explanation: "The First Conditional structure is: If + Present Simple, will + base form of the verb.",
        difficulty: "medio"
      }
    ],
    examReview: {
      title: "English B1 School Assessment",
      objectives: ["Master Present Perfect & Conditionals", "Write 100-word essays about school life"],
      formulaSheet: [
        "1st Conditional: If + Present Simple, will + verb.",
        "2nd Conditional: If + Past Simple, would + verb.",
        "Signal words: already, yet, just, ever, never, since, for."
      ],
      mockQuestions: [{ q: "What is the past participle of 'go' and 'write'?", a: "'Gone' and 'written'." }]
    }
  },

  {
    id: "ciencias-3eso",
    name: "Biología y Geología 3º ESO",
    year: "3eso",
    yearLabel: "3º de ESO (14 años - Curso de Danilo)",
    category: "ciencias",
    icon: "Atom",
    color: "#4ade80",
    description: "La célula eucariota, orgánulos, los 4 aparatos de la nutrición humana y el sistema nervioso.",
    topics: [
      {
        id: "bio3-nutricion",
        title: "Los Cuatro Aparatos de la Nutrición Humana",
        subtitle: "Cómo cooperan digestivo, respiratorio, circulatorio y excretor",
        portugueseBridge: "Digestório, respiratório, circulatório e excretor: 98% dos nomes são iguais em português e espanhol!",
        catalanBridge: "En català: Aparells de la nutrició humana: digestiu, respiratori, circulatori i excretor.",
        summary: "La nutrición no es solo comer: el aparato digestivo extrae nutrientes, el respiratorio aporta oxígeno y expulsa CO2, el circulatorio transporta nutrientes a todas las células por la sangre, y el excretor expulsa los desechos celulares (orina y sudor).",
        keyConcepts: [
          { term: "Digestivo", pt: "Aparelho digestório", es: "Aparato digestivo", ca: "Aparell digestiu", en: "Digestive system", explanation: "Descompone alimentos en nutrientes simples." },
          { term: "Circulatorio", pt: "Sistema circulatório", es: "Aparato circulatorio", ca: "Aparell circulatori", en: "Circulatory system", explanation: "Transporta la sangre oxigenada mediante el corazón." }
        ],
        interactiveExample: {
          prompt: "¿Cuál es la misión de las mitocondrias dentro de nuestras células?",
          stepByStep: [
            "1. Las mitocondrias reciben glucosa (del digestivo) y oxígeno (del respiratorio).",
            "2. Realizan la respiración celular generando moléculas de energía (ATP).",
            "3. Producen agua y dióxido de carbono como residuo."
          ],
          ruleBox: "La mitocondria es el motor energético de todas las células animales."
        }
      }
    ],
    exercises: [
      {
        id: "ex-bio3-1",
        subject: "Biología 3º ESO",
        question: "¿Qué vaso sanguíneo transporta la sangre oxigenada desde el corazón hacia todo el cuerpo?",
        options: ["La arteria aorta", "La vena cava", "La vena pulmonar", "El uréter"],
        correctIndex: 0,
        explanation: "La arteria aorta sale del ventrículo izquierdo con sangre rica en oxígeno hacia todos los órganos.",
        difficulty: "medio"
      }
    ],
    examReview: {
      title: "Control de Biología Humana 3º ESO",
      objectives: ["Explicar el circuito de la sangre", "Relacionar órganos con sus funciones vitales"],
      formulaSheet: [
        "Respiración celular: C6H12O6 (Glucosa) + 6 O2 -> 6 CO2 + 6 H2O + ATP (Energía)",
        "Niveles: Célula -> Tejido -> Órgano -> Sistema -> Organismo"
      ],
      mockQuestions: [{ q: "¿Dónde se realiza el intercambio de gases?", a: "En los alvéolos pulmonares." }]
    }
  },

  // ==========================================
  // 4º DE LA ESO (15-16 años - TÍTULO GRADUADO)
  // ==========================================
  {
    id: "mates-4eso",
    name: "Matemáticas Académicas 4º ESO",
    year: "4eso",
    yearLabel: "4º de ESO (15-16 años - Título ESO)",
    category: "ciencias",
    icon: "Layers",
    color: "#eab308",
    description: "Inecuaciones lineales y cuadráticas, trigonometría plana (seno, coseno, tangente) y probabilidad compuesta.",
    topics: [
      {
        id: "m4-trigonometria",
        title: "Trigonometría Básica en el Triángulo Rectángulo",
        subtitle: "Seno, Coseno y Tangente de un ángulo agudo",
        portugueseBridge: "Seno, cosseno e tangente: a fórmula fundamental sen²(x) + cos²(x) = 1 é a mesma no mundo todo!",
        catalanBridge: "En català: Raons trigonomètriques d'un angle agut: sinus, cosinus i tangent.",
        summary: "En un triángulo rectángulo: Seno = Cateto Opuesto / Hipotenusa; Coseno = Cateto Contiguo / Hipotenusa; Tangente = Cateto Opuesto / Cateto Contiguo. La relación fundamental es sen²(α) + cos²(α) = 1.",
        keyConcepts: [
          { term: "Seno", pt: "Seno (sen)", es: "Seno (sen)", ca: "Sinus (sin)", en: "Sine", explanation: "Cateto opuesto dividido entre la hipotenusa." },
          { term: "Coseno", pt: "Cosseno (cos)", es: "Coseno (cos)", ca: "Cosinus (cos)", en: "Cosine", explanation: "Cateto contiguo dividido entre la hipotenusa." }
        ],
        interactiveExample: {
          prompt: "Si sen(α) = 0.6 en un ángulo agudo, ¿cuánto vale cos(α)?",
          stepByStep: [
            "Paso 1: Aplicamos sen²(α) + cos²(α) = 1.",
            "Paso 2: (0.6)² + cos²(α) = 1 -> 0.36 + cos²(α) = 1.",
            "Paso 3: cos²(α) = 1 - 0.36 = 0.64.",
            "Paso 4: cos(α) = √0.64 = 0.8."
          ],
          ruleBox: "La tangente también se calcula como tan(α) = sen(α) / cos(α) = 0.6 / 0.8 = 0.75."
        }
      }
    ],
    exercises: [
      {
        id: "ex-m4-1",
        subject: "Matemáticas 4º ESO",
        question: "Resuelve la inecuación: 2x - 4 < 10. ¿Cuál es el intervalo solución?",
        options: ["x < 7  ( -∞, 7 )", "x > 7  ( 7, +∞ )", "x < 3", "x > 3"],
        correctIndex: 0,
        explanation: "2x < 14 -> x < 7. En notación de intervalos es (-∞, 7).",
        difficulty: "medio"
      }
    ],
    examReview: {
      title: "Examen Final para el Título de Graduado en ESO",
      objectives: ["Resolver triángulos con trigonometría", "Interpretar gráficas y probabilidad de sucesos"],
      formulaSheet: [
        "Fórmula fundamental: sen²(α) + cos²(α) = 1",
        "tan(α) = sen(α) / cos(α)",
        "Probabilidad de Laplace: P(A) = Casos Favorables / Casos Posibles"
      ],
      mockQuestions: [{ q: "¿Qué sucede al multiplicar una inecuación por un número negativo?", a: "El signo de la desigualdad cambia de sentido (de < a >)." }]
    }
  },

  {
    id: "historia-4eso",
    name: "Geografía e Historia 4º ESO",
    year: "4eso",
    yearLabel: "4º de ESO (15-16 años)",
    category: "humanidades",
    icon: "Compass",
    color: "#ec4899",
    description: "Revoluciones contemporáneas, la España del siglo XX, la Guerra Civil, la Transición democrática y la UE.",
    topics: [
      {
        id: "h4-transicion",
        title: "La Transición Española y la Constitución de 1978",
        subtitle: "El paso pacífico de la dictadura a la democracia parlamentaria",
        portugueseBridge: "A redemocratização na Espanha (1975-1978) aconteceu em período similar à abertura democrática no Brasil nos anos 80.",
        catalanBridge: "En català: La Transició democràtica, l'Estat de les Autonomies i l'Estatut d'Autonomia de Catalunya.",
        summary: "Tras la muerte de Franco en 1975, España inició una transición ejemplar hacia la democracia. En 1977 se celebraron las primeras elecciones democráticas y en 1978 el pueblo español aprobó por referéndum la Constitución, estableciendo un Estado social y democrático de derecho con monarquía parlamentaria y Comunidades Autónomas.",
        keyConcepts: [
          { term: "Constitución 1978", pt: "Constituição democrática", es: "Constitución de 1978", ca: "Constitució de 1978", en: "1978 Constitution", explanation: "Norma suprema del ordenamiento jurídico español." },
          { term: "Comunidades Autónomas", pt: "Estados autônomos", es: "17 Comunidades Autónomas", ca: "Comunitats Autònomes", en: "Autonomous Communities", explanation: "Organización territorial descentralizada de España." }
        ],
        interactiveExample: {
          prompt: "¿Qué derechos fundamentales garantiza la Constitución de 1978?",
          stepByStep: [
            "1. La igualdad de todos los ciudadanos ante la ley (artículo 14).",
            "2. El derecho a la educación pública gratuita obligatoria (artículo 27).",
            "3. La libertad de expresión, religión y residencia."
          ],
          ruleBox: "La Constitución reconoce la riqueza de las diferentes lenguas españolas como patrimonio cultural."
        }
      }
    ],
    exercises: [
      {
        id: "ex-h4-1",
        subject: "Historia 4º ESO",
        question: "¿En qué año se ratificó por referéndum la actual Constitución Española?",
        options: ["1978", "1975", "1982", "1992"],
        correctIndex: 0,
        explanation: "El 6 de diciembre de 1978 los españoles votaron sí en referéndum a la Constitución.",
        difficulty: "fácil"
      }
    ],
    examReview: {
      title: "Control de Historia Contemporánea 4º ESO",
      objectives: ["Comprender la organización territorial de España", "Identificar los hitos de la democracia"],
      formulaSheet: ["Estructura del Estado: Poder Legislativo (Cortes), Ejecutivo (Gobierno) y Judicial (Jueces)."],
      mockQuestions: [{ q: "¿Cuáles son las dos cámaras de las Cortes Generales?", a: "El Congreso de los Diputados y el Senado." }]
    }
  },

  // ==========================================
  // 1º DE BACHILLERATO (16-17 años)
  // ==========================================
  {
    id: "mates-1bach",
    name: "Matemáticas I (1º Bachillerato)",
    year: "1bach",
    yearLabel: "1º de Bachillerato (16-17 años)",
    category: "ciencias",
    icon: "TrendingUp",
    color: "#0284c7",
    description: "Límites de funciones, continuidad, geometría analítica de vectores en el plano y primera introducción a las derivadas.",
    topics: [
      {
        id: "m1b-limites",
        title: "Límites de Funciones e Indeterminaciones",
        subtitle: "Qué ocurre cuando x se acerca a un valor o al infinito",
        portugueseBridge: "Cálculo de limites e indeterminações 0/0 e ∞/∞: matéria essencial do Ensino Médio avançado e faculdade.",
        catalanBridge: "En català: Límits de funcions reals, continuïtat i resolució d'indeterminacions algebraiques.",
        summary: "El límite de una función f(x) cuando x tiende a 'a' es el valor al que se aproximan sus imágenes. Si al sustituir obtenemos 0/0, factorizamos numerador y denominador para simplificar el factor común que anula la fracción.",
        keyConcepts: [
          { term: "Límite", pt: "Limite de uma função", es: "Límite lim(x->a)", ca: "Límit d'una funció", en: "Limit", explanation: "Comportamiento local de la función." },
          { term: "Indeterminación", pt: "Indeterminação", es: "Indeterminación 0/0", ca: "Indeterminació", en: "Indeterminate form", explanation: "Caso que requiere simplificar algebraicamente." }
        ],
        interactiveExample: {
          prompt: "Calcula el límite: lim(x->2) [ (x² - 4) / (x - 2) ]",
          stepByStep: [
            "Paso 1: Si sustituimos x=2 directamente: (4-4)/(2-2) = 0/0 (indeterminación).",
            "Paso 2: Factorizamos el numerador: x² - 4 = (x - 2)(x + 2).",
            "Paso 3: Simplificamos (x - 2): queda (x + 2).",
            "Paso 4: Calculamos el límite de (x + 2) cuando x->2: 2 + 2 = 4."
          ],
          ruleBox: "El valor del límite es 4, aunque en x=2 la función original no esté definida."
        }
      }
    ],
    exercises: [
      {
        id: "ex-m1b-1",
        subject: "Matemáticas I",
        question: "¿Cuál es el valor de lim(x->3) (x + 5)?",
        options: ["8", "3", "5", "15"],
        correctIndex: 0,
        explanation: "Como la función polinómica es continua, sustituimos directamente: 3 + 5 = 8.",
        difficulty: "fácil"
      }
    ],
    examReview: {
      title: "Control de Análisis Matemático 1º Bachillerato",
      objectives: ["Resolver indeterminaciones 0/0 e ∞/∞", "Calcular asíntotas verticales y horizontales"],
      formulaSheet: [
        "Asíntota vertical en x=c si lim(x->c) f(x) = ±∞",
        "Asíntota horizontal en y=k si lim(x->∞) f(x) = k"
      ],
      mockQuestions: [{ q: "¿Cuándo es continua una función en x=a?", a: "Cuando existe f(a), existe el límite cuando x->a, y ambos valores coinciden." }]
    }
  },

  {
    id: "filosofia-1bach",
    name: "Filosofía 1º Bachillerato",
    year: "1bach",
    yearLabel: "1º de Bachillerato (16-17 años)",
    category: "humanidades",
    icon: "Sparkles",
    color: "#8b5cf6",
    description: "El paso del mito al logos, racionalismo frente a empirismo, ética moral y pensamiento crítico.",
    topics: [
      {
        id: "fil-logos",
        title: "Del Mito al Logos: El Nacimiento de la Ciencia",
        subtitle: "Sustituir explicaciones sobrenaturales por la razón lógica",
        portugueseBridge: "O nascimento da filosofia na Grécia Antiga: matéria comum de Filosofia no Brasil e Espanha.",
        catalanBridge: "En català: El pas del mite al logos, presocràtics, Sòcrates i la recerca de la veritat universal.",
        summary: "En la Grecia del siglo VI a.C., los primeros filósofos dejaron de atribuir los fenómenos naturales (truenos, estaciones) a los caprichos de los dioses y comenzaron a buscar el 'logos': explicaciones racionales basadas en la observación y leyes naturales.",
        keyConcepts: [
          { term: "Logos", pt: "Logos / Razão", es: "Logos (razón y palabra)", ca: "Logos", en: "Logos / Reason", explanation: "Explicación racional del cosmos." },
          { term: "Arjé", pt: "Princípio originário", es: "Arjé (principio de las cosas)", ca: "Arkhé", en: "Arche", explanation: "Elemento primordial que compone la naturaleza." }
        ],
        interactiveExample: {
          prompt: "¿Por qué el método socrático se llamaba 'Mayéutica'?",
          stepByStep: [
            "1. La madre de Sócrates era partera (ayudaba a dar a luz bebés).",
            "2. Sócrates decía que su método ayudaba a las mentes a 'dar a luz' la verdad.",
            "3. Hacía preguntas encadenadas para que el interlocutor descubriera la respuesta por sí mismo."
          ],
          ruleBox: "La frase célebre de Sócrates: 'Solo sé que no sé nada' es el punto de partida de la sabiduría."
        }
      }
    ],
    exercises: [
      {
        id: "ex-fil-1",
        subject: "Filosofía 1º Bachillerato",
        question: "¿Qué filósofo es considerado el padre del Racionalismo moderno con su célebre 'Pienso, luego existo'?",
        options: ["René Descartes", "John Locke", "Immanuel Kant", "Aristóteles"],
        correctIndex: 0,
        explanation: "Descartes planteó la duda metódica y concluyó: 'Cogito ergo sum' (Pienso, luego existo).",
        difficulty: "fácil"
      }
    ],
    examReview: {
      title: "Control de Epistemología y Ética",
      objectives: ["Diferenciar conocimiento empírico y racional", "Redactar disertaciones filosóficas"],
      formulaSheet: ["Racionalismo: la fuente del conocimiento es la razón.", "Empirismo: la fuente es la experiencia sensorial."],
      mockQuestions: [{ q: "¿En qué consiste el imperativo categórico de Kant?", a: "Actúa de tal modo que la máxima de tu acción pueda convertirse en ley universal." }]
    }
  },

  // ==========================================
  // 2º DE BACHILLERATO / PREPARACIÓN PAU (17-18 años)
  // ==========================================
  {
    id: "mates-2bach",
    name: "Matemáticas II (Preparación PAU / Selectividad)",
    year: "2bach",
    yearLabel: "2º de Bachillerato (17-18 años - Acceso Universidad)",
    category: "ciencias",
    icon: "Trophy",
    color: "#b91c1c",
    description: "Matrices, determinantes, Regla de Cramer, derivadas avanzadas, integrales definidas (Regla de Barrow) y geometría espacial 3D.",
    topics: [
      {
        id: "m2b-matrices-cramer",
        title: "Matrices, Rouché-Frobenius y Regla de Cramer",
        subtitle: "Clasificar y resolver sistemas lineales de 3 ecuaciones con 3 incógnitas",
        portugueseBridge: "Matrizes, determinantes e Regra de Cramer: questão garantida no ENEM brasileiro e na PAU espanhola!",
        catalanBridge: "En català: Teorema de Rouché-Frobenius, càlcul de determinants d'ordre 3 per la Regla de Sarrus i resolució per Cramer.",
        summary: "El Teorema de Rouché-Frobenius determina si un sistema tiene solución: Si Rango(A) = Rango(A|B) = número de incógnitas, el sistema es Compatible Determinado (solución única). Si son iguales pero menores, es Indeterminado (infinitas soluciones). Si Rango(A) < Rango(A|B), es Incompatible.",
        keyConcepts: [
          { term: "Determinante", pt: "Determinante det(A)", es: "Determinante |A|", ca: "Determinant", en: "Determinant", explanation: "Número asociado a una matriz cuadrada." },
          { term: "Regla de Cramer", pt: "Regra de Cramer", es: "Regla de Cramer", ca: "Regla de Cramer", en: "Cramer's rule", explanation: "xi = det(Ai) / det(A)." }
        ],
        interactiveExample: {
          prompt: "Calcula el determinante 2x2: | 3   2 | sobre | 1   4 |",
          stepByStep: [
            "Paso 1: Multiplicamos la diagonal principal: 3 · 4 = 12.",
            "Paso 2: Multiplicamos la diagonal secundaria: 2 · 1 = 2.",
            "Paso 3: Restamos principal menos secundaria: 12 - 2 = 10."
          ],
          ruleBox: "Para matrices 3x3 se aplica la Regla de Sarrus sumando las 3 diagonales positivas y restando las 3 negativas."
        }
      },
      {
        id: "m2b-integrales-barrow",
        title: "Cálculo Integral y Regla de Barrow",
        subtitle: "Calcular el área encerrada bajo una curva entre dos puntos",
        portugueseBridge: "Cálculo fundamental da Integral Definida de Newton-Leibniz / Barrow: Área = F(b) - F(a).",
        catalanBridge: "En català: Integral definida, primitives immediates i càlcul d'àrees planes entre funcions.",
        summary: "La Regla de Barrow establece que la integral definida de f(x) entre 'a' y 'b' es igual a F(b) - F(a), donde F(x) es una primitiva de f(x). Esto permite calcular áreas exactas bajo parábolas o funciones trigonométricas.",
        keyConcepts: [
          { term: "Primitiva", pt: "Primitiva / Antiderivada", es: "Función primitiva F(x)", ca: "Primitiva", en: "Antiderivative", explanation: "Función cuya derivada es la función dada." },
          { term: "Regla de Barrow", pt: "Teorema de Barrow", es: "Regla de Barrow ∫[a,b] f = F(b) - F(a)", ca: "Regla de Barrow", en: "Barrow's rule", explanation: "Calcula el valor numérico del área." }
        ],
        interactiveExample: {
          prompt: "Calcula la integral definida de f(x) = 2x entre x=1 y x=3",
          stepByStep: [
            "Paso 1: Buscamos la primitiva de 2x -> F(x) = x² (porque la derivada de x² es 2x).",
            "Paso 2: Evaluamos en el extremo superior b=3: F(3) = 3² = 9.",
            "Paso 3: Evaluamos en el extremo inferior a=1: F(1) = 1² = 1.",
            "Paso 4: Aplicamos Barrow: F(3) - F(1) = 9 - 1 = 8 unidades cuadradas."
          ],
          ruleBox: "El área exacta encerrada por la recta y=2x entre 1 y 3 sobre el eje X es 8."
        }
      }
    ],
    exercises: [
      {
        id: "ex-m2b-1",
        subject: "Matemáticas II (PAU)",
        question: "¿Cuál es la derivada de la función f(x) = x³ + 4x - 7?",
        options: ["3x² + 4", "3x² + 4x", "x² + 4", "3x³ + 4"],
        correctIndex: 0,
        explanation: "La derivada de x³ es 3x², la de 4x es 4, y la de la constante -7 es 0. Total: 3x² + 4.",
        difficulty: "medio"
      }
    ],
    examReview: {
      title: "Simulacro Oficial PAU / Selectividad Matemáticas II",
      objectives: ["Obtener calificación de excelencia para entrar a la carrera universitaria elegida", "Redactar justificaciones completas"],
      formulaSheet: [
        "Derivadas básicas: (x^n)' = n·x^(n-1), (e^x)' = e^x, (ln x)' = 1/x",
        "Barrow: ∫[a,b] f(x) dx = [F(x)][a,b] = F(b) - F(a)",
        "Distancia punto a plano: d(P, π) = |Ax0 + By0 + Cz0 + D| / √(A² + B² + C²)"
      ],
      mockQuestions: [{ q: "¿Qué representa geométricamente la derivada f'(a)?", a: "La pendiente de la recta tangente a la curva en el punto x = a." }]
    }
  }
];

export const EDUTUBE_VIDEOS: EduTubeVideo[] = [
  {
    id: "vid-mates-2grado",
    title: "Cómo Resolver Ecuaciones de 2º Grado Completas",
    duration: "6:45",
    subject: "Matemáticas 3º ESO",
    course: "3º ESO",
    badge: "Álgebra Clave",
    description: "Aprende el método paso a paso para identificar a, b y c, calcular el discriminante y obtener las dos soluciones sin errores de signos.",
    keyTakeaway: "Recuerda que si el discriminante es negativo, la ecuación no tiene soluciones reales."
  },
  {
    id: "vid-falsos-amigos",
    title: "Top 10 Falsos Amigos Portugués - Español para Alumnos",
    duration: "5:20",
    subject: "Lengua Española & Acogida",
    course: "ESO",
    badge: "Puente Lingüístico",
    description: "Danilo y Belentani repasan las palabras trampa más habituales: embaraçada, esquisito, oficina, propina, vassoura y apelido.",
    keyTakeaway: "Aprovecha el 85% de similitudes, pero ten en alerta roja las 15 palabras trampa críticas."
  },
  {
    id: "vid-catalan-institut",
    title: "Frases Clau en Català per Triomfar a l'Institut",
    duration: "7:10",
    subject: "Llengua Catalana",
    course: "1º a 4º ESO",
    badge: "Convivència",
    description: "Com saludar els professors, com demanar deures, com fer amics al pati i l'ús correcte de l'ela geminada i la c trencada.",
    keyTakeaway: "La teva oïda brasilera distingeix perfectament la e i o obertes: utilitza aquest superpoder."
  },
  {
    id: "vid-celula-humana",
    title: "Viaje al Interior de la Célula y la Nutrición Humana",
    duration: "8:30",
    subject: "Biología y Geología",
    course: "3º ESO",
    badge: "Ciencias STEM",
    description: "Animación explicativa sobre las mitocondrias, el núcleo celular con ADN y la cooperación de los 4 aparatos de la nutrición.",
    keyTakeaway: "La mitocondria produce energía ATP utilizando glucosa y oxígeno procedentes de la digestión y la respiración."
  },
  {
    id: "vid-orientacion-pau",
    title: "De la ESO a la Universidad: Itinerarios y Opciones de Futuro",
    duration: "9:15",
    subject: "Orientación Académica",
    course: "4º ESO y Bachillerato",
    badge: "Futuro Brillante",
    description: "Explicación clara de las dos grandes vías tras la ESO: Bachillerato hacia la PAU (Selectividad) o Ciclos Formativos (FP de Grado Medio y Superior).",
    keyTakeaway: "Ambos caminos permiten acceder a estudios universitarios y a profesiones tecnológicas de altísima demanda."
  }
];

export const GAMES_CATALOG: GameItem[] = [
  {
    id: "ritmo-belentani",
    title: "Ritmo y Canto de Belentani",
    genre: "Ritmo Musical Líquido",
    icon: "Music",
    tag: "Voz y Oído",
    subjectFocus: "Inglés, Catalán y Español",
    description: "Toca las notas con D-F-J-K o en pantalla al ritmo del compás de Belentani y escucha la pronunciación humana.",
    badgeColor: "#ff2d55",
    componentKey: "rhythm",
    difficulty: "Dinámica"
  },
  {
    id: "combate-matematico",
    title: "Combate Matemático Carmesí",
    genre: "RPG por Turnos",
    icon: "Sword",
    tag: "Álgebra ESO",
    subjectFocus: "Matemáticas 3º ESO",
    description: "Resuelve ecuaciones de primer y segundo grado para que Belentani lance cortes de energía carmesí contra los jefes.",
    badgeColor: "#c8102e",
    componentKey: "combat",
    difficulty: "3 Jefes"
  },
  {
    id: "syntax-runner",
    title: "Syntax Runner 3D",
    genre: "Endless Runner 3 Carriles",
    icon: "FastForward",
    tag: "Falsos Amigos",
    subjectFocus: "Portugués -> Español",
    description: "Corre por los carriles esquivando falsos amigos y recolectando la traducción correcta a toda velocidad.",
    badgeColor: "#ff4b6e",
    componentKey: "runner",
    difficulty: "Progresiva"
  },
  {
    id: "caza-falsos-amigos",
    title: "Caza-Falsos Amigos",
    genre: "Duelo de Reacción Rápida",
    icon: "ShieldAlert",
    tag: "Vocabulario Crítico",
    subjectFocus: "Portugués, Español y Catalán",
    description: "Identifica las trampas lingüísticas como 'embaraçada', 'esquisito' o 'vassoura' antes de que acabe el tiempo.",
    badgeColor: "#e11d48",
    componentKey: "falseFriends",
    difficulty: "Intermedia"
  },
  {
    id: "2048-mates",
    title: "2048 Mates Belentani",
    genre: "Puzzle Matemático",
    icon: "Grid",
    tag: "Cálculo Mental",
    subjectFocus: "Aritmética y Álgebra",
    description: "Fusiona fichas idénticas con las flechas hasta resolver la ecuación objetivo de Belentani.",
    badgeColor: "#be123c",
    componentKey: "game2048",
    difficulty: "Estratégica"
  },
  {
    id: "torre-palabras",
    title: "Torre de Palabras (Tower Defense)",
    genre: "Defensa Estratégica",
    icon: "Castle",
    tag: "Protección de Castillo",
    subjectFocus: "Vocabulario del Instituto",
    description: "Dispara rayos de luz líquida seleccionando la palabra correcta antes de que los monstruos toquen el castillo.",
    badgeColor: "#9f1239",
    componentKey: "towerDefense",
    difficulty: "12 Oleadas"
  },
  {
    id: "karaoke-dojo",
    title: "Karaoke y Fonética Belentani",
    genre: "Entrenamiento Vocal",
    icon: "Mic",
    tag: "Speaking y Fonética",
    subjectFocus: "Pronunciación en 3 Idiomas",
    description: "Escucha a Belentani y practica pronunciar versos en español, catalán e inglés con retroalimentación instantánea.",
    badgeColor: "#f43f5e",
    componentKey: "karaoke",
    difficulty: "Interactiva"
  },
  {
    id: "laberinto-instituto",
    title: "Laberinto del Instituto",
    genre: "Aventura y Exploración",
    icon: "Compass",
    tag: "Orientación Escolar",
    subjectFocus: "Convivencia Escolar",
    description: "Explora el instituto, recoge tus deberes y llaves de vocabulario y llega a tiempo a tu clase.",
    badgeColor: "#fb7185",
    componentKey: "maze",
    difficulty: "Laberinto Dinámico"
  },
  {
    id: "enlaces-trilingues",
    title: "Enlaces Trilingües Láser",
    genre: "Speed Matching",
    icon: "Zap",
    tag: "Traducción Cruzada",
    subjectFocus: "PT -> ES / CA / EN",
    description: "Conecta palabras del portugués con sus pares en español, catalán e inglés en una red de luz láser.",
    badgeColor: "#e11d48",
    componentKey: "links",
    difficulty: "Contrarreloj"
  },
  {
    id: "super-quiz-arena",
    title: "Super Quiz Arena ESO",
    genre: "Batalla Final de Preguntas",
    icon: "Trophy",
    tag: "Examen Completo",
    subjectFocus: "Todas las Asignaturas",
    description: "15 preguntas cronometradas de matemáticas, ciencias, geografía, catalán, inglés y cultura popular.",
    badgeColor: "#ff2d55",
    componentKey: "superQuiz",
    difficulty: "Jefe Supremo"
  }
];
