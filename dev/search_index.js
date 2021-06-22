var documenterSearchIndex = {"docs":
[{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"EditURL = \"https://github.com/cadojo/ControlTheoryNotes.jl/blob/master/src/Chapter 1: Dynamics.jl\"","category":"page"},{"location":"generated/Chapter 1: Dynamics/#Dynamics-and-Equations-of-Motion","page":"Chapter 1: Dynamics","title":"Dynamics and Equations of Motion","text":"","category":"section"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"How stuff moves!","category":"page"},{"location":"generated/Chapter 1: Dynamics/#Overview","page":"Chapter 1: Dynamics","title":"Overview","text":"","category":"section"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"Our end goal as controls engineers is to affect a system in some desired way. To do this, we'll need a mathematical description of our system. This mathematical description is known as a model. There's a famous quote about mathematical models: \"all models are wrong, but some are useful\".","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"This is really important. We are always approximating our system by describing it with a model. The question we need to ask is \"is our approximate description of our system (our model) good enough?\"","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"note: Definitions\nModel - a mathematical description of a system","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"But what does this model look like? To answer this question, let's first discuss system dynamics, and equations of motion.","category":"page"},{"location":"generated/Chapter 1: Dynamics/#Dynamics","page":"Chapter 1: Dynamics","title":"Dynamics","text":"","category":"section"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"If we want to affect a system, then by definition, the system should be affect-able (is that a word?) by external forces. These \"forces\" don't necessarily need to be physical forces: consider the affect of introducing new predators in an ecosystem with the goal of affecting predator-prey populations.","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"So we have a mathematical description, and we know we'll need some changing parameter to affect the mathematical description. Sounds like we need equations! The equations that govern our system are often called equations of motion. Any system that changes due to some external \"force\" is known as a dynamical system by definition.","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"The first step to any controls problem is identifying the dynamics; this usually means defining the equations of motion for our system. A set of equations of motion which describe our dynamical system is our model.","category":"page"},{"location":"generated/Chapter 1: Dynamics/#Model-Example","page":"Chapter 1: Dynamics","title":"Model Example","text":"","category":"section"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"A really common system in engineering is known as the spring-mass-damper. We can roughly describe this system as a block on a table, which is connected to a spring. We can force (a.k.a. affect) this system by pulling on the block to extend or compress the spring.","category":"page"},{"location":"generated/Chapter 1: Dynamics/#Model-Construction","page":"Chapter 1: Dynamics","title":"Model Construction","text":"","category":"section"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"Let's figure out our equations of motion. The following question is usually a useful starting point: \"what are the forces on our system?\" We know we'll have one external force: us pulling or pushing on the block! Let's call this external force f_e. We'll also have a force due to the spring, and a force due to the friction between the block and the table. The force due to the spring will be proportional to the position of the block with respect to the spring's neutral position: let's call the spring constant k. The force due to friction will be proportional to the velocity of the block (let's forget about static friction for now): let's call the coefficient of friction d.","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"With all of the forces identified, we can start constructing the eqautions of motion for this system. If we call our block's position x, then the acceleration ddotx will be equal to the sum of our external force f_e, the spring force k x, and the force due to friction d dotx. Summing these forces produces the following (common) spring-mass-damper equation, where m is the mass of the block.","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"beginequation f_e = m ddotx + d dotx + k x endequation","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"We have our model! This is a second-order differential equation. It helps to divide all variables into two groups: parameters, and states. States describe the system at some point in time. In this case, state variables answer the following questions: \"where is the block, what is the velocity of the block, and what is the acceleration of the block?\" One set of valid state variables for this system is x and dotx; we don't need to include ddotx in our list of state variables because we can calculate ddotx from x and dotx.","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"note: Note\nWe say \"one set of state variables\" because there may (and nearly always are) other valid state representations that could completely describe this system! State variables are not unique.","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"If we leave states as symbolic, and then look to the equation(s) of motion of a system, the parameters describe a specific instance of a system. Put another way, no matter what values f_e, d, and k take, this equation of motion is identifiable as a spring-mass-damper. For this reason, we can specify f_e, d, and k as parameters. We can assume a unit mass for the block for now.","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"note: Note\nThe parameter f_e is our control parameter in this example, because we can change f_e to affect our system. For now, let's not differentiate between control parameters and non-control parameters.","category":"page"},{"location":"generated/Chapter 1: Dynamics/#Coding-our-Model","page":"Chapter 1: Dynamics","title":"Coding our Model","text":"","category":"section"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"We can simulate these dynamics with Julia's DifferentialEquations package. If you're familiar with MATLAB, DifferentialEquations provides numerical integration solvers that are similar to MATLAB's ode45 (and similar) solvers. We can use the ModelingToolkit package to conveniently put our model to code, and interface with DifferentialEquations for simulation.","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"using ModelingToolkit\n\n@parameters t fₑ d k\n@variables x(t) ẋ(t)\nδ = Differential(t)\n\neqs = [\n    δ(x) ~ ẋ,\n    δ(ẋ)~ - d*ẋ - k*x + fₑ\n]\n\nmodel = ODESystem(eqs, t, [x, ẋ], [fₑ, d, k]; name = \"HarmonicOscillator\")","category":"page"},{"location":"generated/Chapter 1: Dynamics/#Simulating-our-Model","page":"Chapter 1: Dynamics","title":"Simulating our Model","text":"","category":"section"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"With model defined above, we can use DifferentialEquations to simulate our system. Of course, to do this we'll need to specify numerical values for our parameters, and initial conditions (the simulation starting point) for our state variables. The code below specifies some arbitrary initial conditions and constant parameter values, and simulates the resulting dynamics.","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"using Plots\nusing DifferentialEquations\n\nproblem = let x₀ = 0.1, ẋ₀ = 0.0, dₙ = 0.5, kₙ = 0.9, fₙ = 1.0, Δt = 30.0\n    ODEProblem(\n        model,\n        [x => x₀, ẋ => ẋ₀],\n        (0.0, Δt),\n        [d => dₙ, k => kₙ, fₑ => fₙ]\n    )\nend\n\nsolutions = solve(problem, Tsit5(); reltol = 1e-12, abstol = 1e-12)\nplot(solutions; title = \"Spring Mass Damper Simulation\")","category":"page"},{"location":"generated/Chapter 1: Dynamics/#What's-Next?","page":"Chapter 1: Dynamics","title":"What's Next?","text":"","category":"section"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"Okay, we just showed some applied modeling and simulation for spring-mass-damper dynamics. What about the primary system we're analyzing throughout these notes, NASA's Generic Transport Model (GTM)? The polynomial-approximated equations we'll be using are super long. Still want to see them? Be afraid! Continue on to Chapter 2!","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"","category":"page"},{"location":"generated/Chapter 1: Dynamics/","page":"Chapter 1: Dynamics","title":"Chapter 1: Dynamics","text":"This page was generated using Literate.jl.","category":"page"},{"location":"#Control-Theory-Notes","page":"Introduction","title":"🎢 Control Theory Notes","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Fundamental control theory concepts, and applications with a (rough) approximation of an aircraft model!","category":"page"},{"location":"#Overview","page":"Introduction","title":"Overview","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Control theory is hard! Lots of analysis is nuanced, and it's pretty easy to fall into incorrect assumptions and incomplete understanding. That's where this refresher comes in. We'll cover basic definitions through multi-input multi-output linear analysis, and everything in between. These notes are available as a  website, and (soon) via  PDF.  If you have any questions, suggestions, or corrections, always feel free to email the author (Joe Carpinelli) at jdcarpinelli@gmail.com.","category":"page"},{"location":"#What-is-Control-Theory?","page":"Introduction","title":"What is Control Theory?","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Our world is filled with human-made, and natural systems. We can model each system with equations of motion. These equations describe how each system's state changes! A quick definition for state is described below. We often want to control the state in some way. Think about the populations of predators and prey in an ecosystem, inflation rates in an economy, the orientation of a rocket, the speed of a car, etc.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"note: Definitions\nState – a set of values that completely describe a system!","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"Over the years, smart people have developed a field known as controls. Control theory is a broad term which includes...","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"the math used to describe systems you'd like to control\nthe analysis tools you use to see how well your system behaves\nthe strategies for developing controllers\nmore stuff like this!","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"We'll need a few more definitions before we really get started. ","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"note: Definitions\nPlant – the system you'd like to control (a car, a rocket, etc.)\nInput - parameter values in your equations which you can change to influence your system's state (often a force or a device which produces a force for physical systems)\nModel - the equations you've been given, or you've chosen which represent your system (model is synonymous with equations of motion)\nDynamics - math (equations) which descibe how a system's state changes due to external forces\nControl Law - an equation which describes how you change your input values (this is set by you, the controls engineer!)\nPerformance – how well your controller controls your system (how fast does the system move towards your desired state values, is your controller robust to perturbations and noise, etc.)","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"We'll walk through common control theory concepts and strategies in this note-set. It helps to have a concrete example for a system to control, so let's use one! NASA has developed a model aircraft for research, and university researchers produced an approximated model to describe this aircraft. We will use this model throughout these notes. By working through these notes, you'll be learning to control (a very rough model of) an airplane!","category":"page"},{"location":"#What-System-are-we-Using?","page":"Introduction","title":"What System are we Using?","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"NASA has developed a sub-scale model aircraft (think RC model plane) for flight controls research. This model is called the Generic Transport Model: GTM for short! You can learn more about this in an overview page, or by checking out the following video. ","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"University researchers (Chakraborty et al) used curve-fitting strategies to approximate the equations which describe airplane flight as low-order polynomials. Polynomial approximations for systems are valuable because computers can compute polynomials quickly! ","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"This approximate (read, ROUGH) model for GTM flight dynamics has been ported to Julia as the PolynomialGTM package. PolynomialGTM only exports one variable: GTM, a ModelingToolkit.ODESystem instance which includes the polynomial-approximated equations of motion for NASA's GTM. ","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"<iframe width=\"560\" src=\"https://www.youtube.com/embed/_3JSRvaTRIQ\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>","category":"page"},{"location":"#What's-Next?","page":"Introduction","title":"What's Next?","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Next, we'll look at nonlinear dynamics, and what these models look like.","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"EditURL = \"https://github.com/cadojo/ControlTheoryNotes.jl/blob/master/src/Chapter 2: GTM Dynamics.jl\"","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/#GTM-Flight-Dynamics","page":"Chapter 2: GTM Dynamics","title":"GTM Flight Dynamics","text":"","category":"section"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"How planes move!","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/#Overview","page":"Chapter 2: GTM Dynamics","title":"Overview","text":"","category":"section"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"We'll be analysing a polynomial approximation of GTM dynamics throughout these notes, so it's worth spending some time covering aircraft dynamics generically.","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/#Generic-Flight-Dynamics","page":"Chapter 2: GTM Dynamics","title":"Generic Flight Dynamics","text":"","category":"section"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"There are many dynamical modes that affect airplanes throughout flight. You can think of modes as oscillations in-time for some subset of a system's state space. Aircraft have dynamical modes which produce aircraft oscillations above and below the aircraft's longitudinal axis (the line pointing forward from the nose) – these are known as longitudinal modes. Lateral modes (modes which rotate the aircraft about its longitudinally and vertically oriented axes) also affect flight dynamics. General information about dynamical modes common to flight dynamics is available on Wikipedia.","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"Only analyzing one set of dynamical modes (only some self-contained equations of motion) is common practice in early controls analysis. For simplicity, we'll do the same here and throughout these notes! Just note that, at the end of the day, you of course need to test your system's performance relative to all modeled dynamics.","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"The equations of motion for the longitudinal flight dynamics associated with any generic aircraft are shown below. These are common equations, which are taught in many undergraduate aerospace engineering programs.","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"beginequation\n    x = beginbmatrix V  alpha  q  theta endbmatrix \n    u = beginbmatrix delta_elev  delta_th endbmatrix\nendequation","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"beginequation\nf(x) triangleq dotx = beginbmatrix\n    dotV  dotalpha  dotq  dottheta\nendbmatrix = beginbmatrix\n    frac1mleft(-D - m g sin(theta - alpha) + T_x cosalpha + T_z sinalpha right) \n    frac1m Vleft(-L + m g cos(theta - alpha) - T_x sinalpha + T_z cosalpharight) + q \n    fracM + T_mIyy \n    q\nendbmatrixendequation","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/#Approximated-GTM-Dynamics","page":"Chapter 2: GTM Dynamics","title":"Approximated GTM Dynamics","text":"","category":"section"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"NASA's Generic Transport Model (GTM) is a radio-controlled model plane, which is a scaled-down version of a generic passenger plane (think, one of the big jets you may fly on when you travel). This model is used for flight controls research. According to Chakraborty et al, aerodynamic coefficients are used by NASA to describe atmospheric lift, drag, and aerodynamic moments. These tables are not publicly available. Still, Chakraborty et al published publicly available polynomial approximations of longitudinal GTM flight dynamics near select trim conditions. We'll cover trim conditions (also known as equilibrium points) in future chapters. For now, its enough to understand that the polynomial approximation they made is only accurate near select flight conditions. Of course, even near these select flight conditions, the approximation introduces error. Chakraborty et al tracked the magnitude of these errors, but we'll just (falsely) treat this polynomial approximation as fact throughout these notes.","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"If you're interested in reading more about the methodology behind these polynomial approximations, read Chakraborty et al's paper, and check out a Python implementation and associated paper which was completed as part of a University of Maryland aerospace engineering course project. The polynomial approximations, as derived and published by Chakraborty et al, are shown below. I told you to be afraid!","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"note: Note\nThese polynomial approximations were also implemented with Julia as part of the PolynomialGTM.jl package!","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"Special thanks to Michael Livecchi, a good (and patient) friend who read all of these equations out over the phone to make sure they were typed correctly!","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"beginequation\nbeginalign*\nf_1(xu) approx  1233times10^-8x_1^4x_3^2 + 4853times10^-9x_2^3u_2^3 \n+ 3705times10^-5x_1^3x_2 x_3\n- 2184times10^-6x_1^3x_3^2 \n+ 2203times10^-2x_1^2x_2^3 - 2836times10^-6x_2^3u_2^2 \n + 3885times10^-7x_2^2u_2^3 - 1069times10^-6x_1^3x_3 \n - 4517times10^-2x_1^2x_2^2\n- 2140times10^-3x_1^2x_2u_1 \n- 3282times10^-3x_1^2x_2 x_3 - 8901times10^-4x_1^2u_1^2 \n + 9677times10^-5x_1^2x_3^2 - 2037times10^-4x_2^3u_2 \n- 2270times10^-4x_2^2u_2^2\n- 2912times10^-8x_2u_2^3 \n+ 1591times10^-3x_1^2x_2 - 4077times10^-4x_1^2u_1 \n + 9475times10^-5x_1^2x_3 - 1637x_2^3 \n- 1631times10^-2x_2^2u_2 + 4903x_2^2x_4 \n -4903x_2x_4^2 + 1702times10^-5x_2u_2^2 \n- 7771times10^-7u_2^3 + 1634x_4^3  \n- 4319times10^-4x_1^2 - 2142times10^-1x_2^2 \n+ 1222times10^-3x_2u_2\n+ 4541times10^-4u_2^2 \n+ 9823x_2 + 3261times10^-2u_2 \n- 9807x_4 + 4282times10^-1\nendalign*\nendequation","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"beginequation\nbeginalign*\nf_2(xu) approx  -3709times10^-11x_1^5x_3^2 + 6869times10^-11x_1x_2^3u_2^3 \n+ 7957times10^-10x_1^4x_2 x_3\n+ 9860times10^-9x_1^4x_3^2 \n+ 1694times10^-5x_1^3x_2^3 - 4015times10^-8x_1x_2^3u_2^2 \n - 7722times10^-12x_1x_2^2u_2^3 - 6086times10^-9x_2^3u_2^3 \n- 2013times10^-8x_1^4x_3\n- 5180times10^-5x_1^3x_2^2 \n- 2720times10^-6x_1^3x_2u_1\n- 1410times10^-7x_1^3x_2 x_3 \n + 7352times10^-7x_1^3u_1^2 - 8736times10^-7x_1^3x_3^2 \n- 1501times10^-3x_1^2x_2^3\n- 2883times10^-6x_1x_2^3u_2 \n+ 4513times10^-9x_1x_2^2u_2^2 - 4121times10^-10x_1x_2u_2^3 \n + 3557times10^-6x_2^3u_2^2 + 6841times10^-10x_2^2u_2^3 \n+ 4151times10^-5x_1^3x_2 + 3648times10^-6x_1^3u_1 \n+ 3566times10^-6x_1^3x_3 + 6246times10^-6x_1^2x_2 x_3 \n + 4589times10^-3x_1^2x_2^2 + 2410times10^-74x_1^2x_2u_1 \n- 6514times10^-5x_1^2u_1^2\n+ 2580times10^-5x_1^2x_3^2 \n- 3787times10^-5x_1x_2^3 + 3241times10^-7x_1x_2^2u_2 \n + 2409times10^-7x_1x_2u_2^2 + 1544times10^-11x_1u_2^3 \n+ 2554times10^-4x_2^3u_2\n- 3998times10^-7x_2^2u_2^2 \n+ 3651times10^-8x_2u_2^3 + 4716times10^-7x_1^3 \n - 3677times10^-3x_1^2x_2 - 3231times10^-4x_1^2u_1 \n- 1579times10^-4x_1^2x_3 + 2605times10^-3x_1x_2^2 \n+ 1730times10^-5x_1x_2u_2 - 5201times10^-3x_1x_2x_4 \n- 9026times10^-9x_1u_2^2 + 2601times10^-3x_1x_4^2 \n+ 3355times10^-3x_2^3 - 2872times10^-5x_2^2u_2 \n- 2134times10^-5x_2u_2^2 - 1368times10^-9u_2^3 \n- 4178times10^-5x_1^2 + 2272times10^-4x_1x_2 \n- 6483times10^-7x_1u_2 - 2308times10^-1x_2^2 \n- 1532times10^-3x_2u_2 + 4608times10^-1x_2x_4 \n- 2304times10^-1x_4^2 + 7997times10^-7u_2^2 \n- 5210times10^-3x_1  - 2013times10^-2x_2 \n+ 5744times10^-5u_2 + x_3 + 4616times10^-1\nendalign*\nendequation","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"beginequation\nbeginalign*\nf_3(xu) approx  - 6573times10^-9x_1^5x_3^3 + 1747times10^-6x_1^4x_3^3 \n- 1548times10^-4x_1^3x_3^3 - 3569times10^-3x_1^2x_2^3 \n+ 4571times10^-3x_1^2x_3^3 + 4953times10^-5x_1^3x_3 \n + 9596times10^-3x_1^2x_2^2 + 2049times10^-2x_1^2x_2u_1 \n- 2431times10^-2x_1^2x_2 - 3063times10^-2x_1^2u_1 \n- 4388times10^-3x_1^2x_3 - 2594times10^-7u_2^3 \n + 2461times10^-3x_1^2 + 1516times10^-4u_2^2 \n+ 1089times10^-2u_2 + 1430times10^-1\nendalign*\nendequation","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"beginequation\nf_4(xu) approx x_3\nendequation","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/#Example","page":"Chapter 2: GTM Dynamics","title":"Example","text":"","category":"section"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"We can use DifferentialEquations and PolynomialGTM to simulate this system!","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"using PolynomialGTM\nusing DifferentialEquations\n\nproblem   = ODEProblem(GTM, [], (0.0, 100.0), []) # there is a default flight condition stored in `GTM`\nsolutions = solve(problem, Tsit5(); reltol = 1e-12, abstol = 1e-12)\n\nplot(solutions; title = \"GTM Simulation\")","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/#What's-Next?","page":"Chapter 2: GTM Dynamics","title":"What's Next?","text":"","category":"section"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"Now that we've covered our approximated GTM dynamics specifically, let's describe how these (simplified and approximated) dynamics are still really hard to analyze! We'll find we need linear analysis techniques to help us characterize the stability and performance of our system. Future chapters will explain why! 😁","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"","category":"page"},{"location":"generated/Chapter 2: GTM Dynamics/","page":"Chapter 2: GTM Dynamics","title":"Chapter 2: GTM Dynamics","text":"This page was generated using Literate.jl.","category":"page"}]
}
