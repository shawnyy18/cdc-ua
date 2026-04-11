export type SeedOption = { text: string; rationale: string; isCorrect: boolean }
export type SeedQuestion = {
  questionNumber: number
  question: string
  answerOptions: SeedOption[]
  hint?: string
}

// Seed questions provided by the team. We'll distribute 5 questions per module.
export const SEED_QUIZZES: Record<string, SeedQuestion[]> = {
  'ewaste-facts': [
    {
      questionNumber: 1,
      question: "What is the general definition of 'e-waste'?",
      answerOptions: [
        { text: 'All discarded plastic products', rationale: "While electronics contain plastic, e-waste is specific to electronic products, not all plastic items.", isCorrect: false },
        { text: 'Discarded electrical and electronic devices', rationale: 'This is the correct, broad definition, covering everything from phones and laptops to refrigerators and toasters.', isCorrect: true },
        { text: 'Only batteries and power cords', rationale: "Batteries and cords are components of e-waste, but the term covers the entire device.", isCorrect: false },
        { text: 'Industrial manufacturing scraps', rationale: "Industrial scrap is a different waste stream. E-waste refers to end-of-life consumer and business electronics.", isCorrect: false }
      ],
      hint: "Think about the 'e' in e-waste. What does it stand for?"
    },
    {
      questionNumber: 2,
      question: "Which of these is a hazardous heavy metal commonly found in old CRT (cathode ray tube) monitors?",
      answerOptions: [
        { text: 'Aluminum', rationale: 'Aluminum is a common metal in electronics (like casings) but is not considered the primary hazardous component in CRTs.', isCorrect: false },
        { text: 'Copper', rationale: 'Copper is valuable and used in wiring, but the glass in CRTs contains a different, more toxic heavy metal.', isCorrect: false },
        { text: 'Lead', rationale: 'CRTs contain significant amounts of lead in the glass to protect users from radiation, making them very hazardous.', isCorrect: true },
        { text: 'Iron', rationale: 'Iron is a common metal but is not the specific hazardous material that makes CRT glass toxic.', isCorrect: false }
      ],
      hint: 'This toxic metal was also found in old paint and gasoline.'
    },
    {
      questionNumber: 3,
      question: "What is the primary environmental risk of dumping e-waste in landfills?",
      answerOptions: [
        { text: 'It takes up too much physical space.', rationale: 'While e-waste does take up space, this is not its most significant environmental risk.', isCorrect: false },
        { text: 'Leaching of toxic substances into soil and groundwater', rationale: 'Heavy metals and flame retardants can seep out of buried e-waste, contaminating water supplies and ecosystems.', isCorrect: true },
        { text: 'It can spontaneously catch on fire.', rationale: 'While lithium-ion batteries can be a fire risk, the main landfill risk is related to chemical contamination.', isCorrect: false },
        { text: 'It attracts pests and rodents.', rationale: 'This is a general landfill problem, but not the specific danger posed by the chemical makeup of e-waste.', isCorrect: false }
      ],
      hint: 'Think about what happens when rainwater flows through buried electronics.'
    },
    {
      questionNumber: 4,
      question: "What is 'informal recycling' of e-waste?",
      answerOptions: [
        { text: 'A government-certified and safe recycling program', rationale: "This would be 'formal' recycling, which follows safety and environmental regulations.", isCorrect: false },
        { text: "Donating your old phone to a friend", rationale: "This is a form of reuse, not recycling.", isCorrect: false },
        { text: 'A certified company that pays you for your devices', rationale: "Certified 'take-back' or 'buy-back' programs are part of the formal, regulated system.", isCorrect: false },
        { text: "Unregulated dismantling and burning, often in developing countries", rationale: "Informal recycling involves crude methods like burning cables to get copper, which releases highly toxic fumes.", isCorrect: true }
      ],
      hint: "The word 'informal' suggests it operates outside of official rules and safety standards."
    },
    {
      questionNumber: 5,
      question: "Recovering valuable materials like gold, copper, and palladium from e-waste is often called...",
      answerOptions: [
        { text: 'Urban mining', rationale: "This term correctly describes the process of 'mining' valuable raw materials from dense, man-made sources like e-waste.", isCorrect: true },
        { text: 'Landfill diving', rationale: "This refers to scavenging in a landfill, which is different from the industrial process of resource recovery.", isCorrect: false },
        { text: 'E-waste smelting', rationale: "Smelting is one step in the process, but 'urban mining' describes the entire concept of recovery.", isCorrect: false },
        { text: 'Device refurbishment', rationale: "Refurbishment is about repairing a whole device for reuse, not extracting its raw materials.", isCorrect: false }
      ],
      hint: "Think of it as 'mining' a city's discarded products instead of the earth."
    }
  ],

  'best-practices': [
    {
      questionNumber: 6,
      question: "What is the Basel Convention?",
      answerOptions: [
        { text: 'A treaty to control the transboundary movement of hazardous wastes', rationale: "Correct. It was designed to prevent the 'toxic trade,' where developed countries dump hazardous waste in developing ones.", isCorrect: true },
        { text: 'A manufacturing standard for new electronics', rationale: 'This is incorrect. The convention deals with waste, not the production of new goods.', isCorrect: false },
        { text: 'A global agreement to ban all e-waste', rationale: "It aims to control and manage hazardous waste, not ban e-waste itself.", isCorrect: false },
        { text: 'A set of guidelines for building recycling plants', rationale: 'While related, its main focus is on the movement (shipping) of waste between countries.', isCorrect: false }
      ],
      hint: "This international treaty is named after a city in Switzerland."
    },
    {
      questionNumber: 7,
      question: "Which of the following is NOT a good e-waste 'best practice'?",
      answerOptions: [
        { text: "Wiping your device's data before disposal", rationale: 'This is a critical best practice to protect your personal information.', isCorrect: false },
        { text: 'Donating or reselling functional devices', rationale: "Reuse (or 're-homing') is one of the best options, as it extends the device's life.", isCorrect: false },
        { text: 'Finding a certified e-waste recycler', rationale: 'Using a certified recycler ensures the hazardous materials are managed properly.', isCorrect: false },
        { text: "Hiding old phones in a kitchen 'junk drawer'", rationale: 'This is hoarding, not disposal. These devices contain valuable materials that are lost if not recycled.', isCorrect: true }
      ],
      hint: "The best practices are often summarized as 'Reduce, Reuse, Recycle.' Which option is none of these?"
    },
    {
      questionNumber: 8,
      question: "What is the 'digital divide' in the context of e-waste?",
      answerOptions: [
        { text: 'The gap in internet speed between urban and rural areas', rationale: "While this is part of the digital divide, it's not the part specifically linked to e-waste.", isCorrect: false },
        { text: "The gap between people who have devices and those who don't", rationale: "Correct. Refurbishing and donating used electronics is a key way to help bridge this gap.", isCorrect: true },
        { text: 'The physical space separating components on a circuit board', rationale: 'This is a technical hardware term, not a social or economic one.', isCorrect: false },
        { text: 'The difference in recycling laws between countries', rationale: "This is a legal or policy gap, not the 'digital divide'.", isCorrect: false }
      ],
      hint: 'This "divide" is about access to technology and information.'
    },
    {
      questionNumber: 9,
      question: "The European Union's directive on e-waste is known as...",
      answerOptions: [
        { text: 'WEEE (Waste from Electrical and Electronic Equipment)', rationale: "This is the correct name for the EU's comprehensive e-waste legislation.", isCorrect: true },
        { text: 'EPA (Environmental Protection Agency)', rationale: 'The EPA is a United States government agency, not an EU directive.', isCorrect: false },
        { text: 'RoHS (Restriction of Hazardous Substances)', rationale: "RoHS is a related EU directive, but it restricts use of substances in new products. WEEE deals with the waste.", isCorrect: false },
        { text: 'UNEP (United Nations Environment Programme)', rationale: 'UNEP is a global UN agency, not a specific directive from the European Union.', isCorrect: false }
      ],
      hint: "This directive's acronym sounds like a high-pitched exclamation."
    },
    {
      questionNumber: 10,
      question: "Why is data security a major concern with e-waste?",
      answerOptions: [
        { text: 'Recycling plants can get computer viruses.', rationale: 'This is not the primary concern. The risk is to the data of the original user.', isCorrect: false },
        { text: 'Data can be stolen from discarded hard drives and phones.', rationale: 'Devices often contain sensitive personal and financial data, which can be recovered if not properly erased.', isCorrect: true },
        { text: 'Hackers can use old devices to access the internet.', rationale: 'The main risk is not what the device does, but what information is on it.', isCorrect: false },
        { text: 'Data takes up space and makes recycling harder.', rationale: 'Data is stored magnetically or on flash memory; it has no physical impact on the recycling process.', isCorrect: false }
      ],
      hint: 'What personal information do you have on your old phone or computer?'
    }
  ],

  'positive-impact': [
    {
      questionNumber: 11,
      question: "What is 'extended producer responsibility' (EPR)?",
      answerOptions: [
        { text: 'A law making consumers responsible for recycling.', rationale: "EPR shifts the responsibility away from the consumer and onto the manufacturer.", isCorrect: false },
        { text: "A policy that makes manufacturers responsible for their products' end-of-life.", rationale: 'This is the correct definition. It encourages manufacturers to design for recyclability and fund take-back programs.', isCorrect: true },
        { text: 'A warranty that makes producers fix broken devices for free.', rationale: 'This is a product warranty, which is different from end-of-life waste management responsibility.', isCorrect: false },
        { text: 'A rule that producers must use 100% recycled materials.', rationale: "EPR encourages using recycled materials, but it doesn't typically mandate 100%, which is often not feasible.", isCorrect: false }
      ],
      hint: "This policy 'extends' the manufacturer's or 'producer's' duty beyond the point of sale."
    },
    {
      questionNumber: 12,
      question: "Besides lead, what other highly toxic substance is found in flat-screen (LCD) display backlights and circuit boards?",
      answerOptions: [
        { text: 'Sodium', rationale: 'Sodium is highly reactive but is not a primary toxic component in e-waste.', isCorrect: false },
        { text: 'Chlorine', rationale: 'Chlorine is used in PVC plastics (found on cables), but another element is a major concern for screens and boards.', isCorrect: false },
  { text: 'Mercury', rationale: "Correct. Older LCD screen backlights (CCFLs) contain mercury, and it's also found in switches and batteries.", isCorrect: true },
        { text: 'Argon', rationale: 'Argon is an inert gas and is not considered a toxic component of e-waste.', isCorrect: false }
      ],
      hint: 'This element is a liquid metal at room temperature and was famously used in old thermometers.'
    },
    {
      questionNumber: 13,
      question: "A 'circular economy' approach to electronics aims to...",
      answerOptions: [
        { text: 'Create devices that are 100% biodegradable', rationale: 'While a nice idea, this is not the primary goal or currently feasible for complex electronics.', isCorrect: false },
        { text: 'Make all electronics in a round shape', rationale: "The 'circular' part of the name is conceptual, not literal.", isCorrect: false },
        { text: 'Eliminate the concept of waste by reusing and recovering materials', rationale: "This is the core idea: a 'closed loop' where old products become resources for new ones, rather than waste.", isCorrect: true },
        { text: 'Ship all e-waste to one central location in the world', rationale: 'This is the opposite of a sustainable solution and would create a massive pollution problem.', isCorrect: false }
      ],
      hint: "Think of it as the opposite of the 'linear' model of 'take-make-dispose'."
    },
    {
      questionNumber: 14,
      question: "What is the primary health risk for informal recyclers who burn PVC-coated cables?",
      answerOptions: [
        { text: 'Inhaling toxic dioxins and furans', rationale: "Burning chlorinated plastics (PVC) releases some of the most carcinogenic chemicals known, leading to respiratory and neurological issues.", isCorrect: true },
        { text: 'Electric shock from the cables', rationale: 'The cables are waste and not connected to a power source, so electric shock is not the risk.', isCorrect: false },
        { text: 'Getting cut on sharp plastic edges', rationale: 'While minor cuts are possible, the main health risk comes from the toxic, invisible byproducts.', isCorrect: false },
        { text: 'Hearing loss from loud machinery', rationale: 'This process is often done by hand over open fires, not with loud machinery.', isCorrect: false }
      ],
      hint: "The danger comes from the fumes released when the plastic coating is burned off to get the copper inside."
    },
    {
      questionNumber: 15,
      question: "What does the 'R' in 'e-Stewards' or 'R2' certification for recyclers stand for?",
      answerOptions: [
        { text: 'Responsible', rationale: "Correct. Certifications like 'Responsible Recycling' (R2) and 'e-Stewards' ensure the recycler follows strict environmental and safety rules.", isCorrect: true },
        { text: 'Rapid', rationale: 'Speed is not the main goal; safety and environmental protection are.', isCorrect: false },
        { text: 'Revenue', rationale: "While recycling is a business, the 'R' in these certifications stands for their ethical approach.", isCorrect: false },
        { text: 'Regional', rationale: 'These are international or national standards, not just regional ones.', isCorrect: false }
      ],
      hint: "This word signifies that the recycler is ethical and accountable."
    }
  ]
}

export default SEED_QUIZZES
