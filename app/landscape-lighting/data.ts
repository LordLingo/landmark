import type { Metadata } from 'next';
import { absoluteUrl } from '../site-url';

export type LightingPageData = {
  slug: string; label: string; title: string; metaTitle?: string; description: string; intro: string;
  image: string; alt: string; city?: string; keyword: string;
  sections: { title: string; copy: string; points?: string[] }[];
  faqs: { question: string; answer: string }[];
  related: string[];
};
const house = { image: '/images/lighting-warm-home.webp', alt: 'Warm architectural and landscape lighting at a North Texas home from the Landmark project gallery' };
const garden = { image: '/images/lighting-landscape-bed.webp', alt: 'Illuminated raised planting bed and backyard tree from the Landmark project gallery' };
export const lightingPages: LightingPageData[] = [
  {
    slug: '', label: 'Outdoor lighting', keyword: 'landscape lighting installation North Texas',
    title: 'Outdoor landscape lighting, designed and installed for everyday evenings.',
    metaTitle: 'Landscape Lighting Installation | North Texas',
    description: 'Landscape lighting design and installation in Prosper, Celina, Frisco, McKinney and The Colony. Plan house, path and garden lighting. Request an estimate.',
    intro: 'Keep the best parts of your home visible after sunset. Landmark designs and installs landscape lighting around the architecture, paths, trees and planting you already enjoy, with one connected plan for the evening view.', ...house,
    sections: [
      { title: 'Start with the view you want to change.', copy: 'An entrance that disappears at dusk needs a different approach from a patio surrounded by dark planting. We look at where you arrive, walk, sit and look out through the windows. That gives every fixture a purpose before a quantity is discussed.', points: ['Reveal stone, brick and columns with architectural uplighting.', 'Define walkway edges and changes in level with controlled path lighting.', 'Give selected trees and garden beds depth rather than lighting every plant.', 'Connect the patio to the surrounding landscape with lower, quieter accents.'] },
      { title: 'Permanent landscape lighting, separate from Christmas lights.', copy: 'These pages cover installed landscape lighting intended for everyday use throughout the year. Seasonal roofline displays, wreaths and Christmas tree wrapping belong to Landmark’s separate Christmas lighting service. App-controlled color-changing roofline products are a different category; no specific product or dealer relationship is promised here.' },
      { title: 'Visibility without turning the yard into a floodlit stage.', copy: 'Landscape accents can help you see an entry, route or side-yard transition. More brightness is not automatically a better result: beam direction, shielding and the view from neighboring windows matter. Discuss dark areas during your estimate. Dedicated security floodlights, cameras, motion sensors and new electrical circuits need their own confirmed scope; landscape lighting does not guarantee crime prevention.' },
      { title: 'A practical estimate starts with the property.', copy: 'Send the city, two or three photos and the areas that matter most. Tell us whether this is a new installation or an addition to existing lights, and whether planting or pathways are changing. Fixture selection, cable routes, controls, access, project timing and any electrical needs are reviewed in the proposal. No fixture package, price or turnaround is assumed before that review.' },
      { title: 'Already have a system that needs attention?', copy: 'Describe the symptoms: one dark fixture, a whole zone that is out, lights aimed into foliage or a schedule that no longer fits your routine. Include the fixture or transformer brand if known. Ask Landmark to confirm whether maintenance, repair or an addition to your particular system is available before booking; standalone repairs and ongoing maintenance should be confirmed directly.' },
    ],
    faqs: [
      { question: 'Can you install lighting without replacing the landscape?', answer: 'Yes. Landmark’s existing landscape-lighting service evaluates established architecture, beds, trees and paths. The plan can focus on lighting while considering access and the plants that should remain.' },
      { question: 'Do you serve all five cities?', answer: 'Landmark serves Prosper, Celina, Frisco, McKinney and The Colony from its Prosper base. Share the property city and address so project scope and availability can be confirmed.' },
      { question: 'Is low-voltage lighting the same as solar lighting?', answer: 'No. A low-voltage system uses a transformer and cable to supply fixtures; solar fixtures use individual solar charging. Landmark’s existing service describes low-voltage lighting. Exact fixtures, controls and power requirements are confirmed in the proposal.' },
      { question: 'How much does a landscape-lighting project cost?', answer: 'The layout, fixture choice, cable routes, access and controls all affect the price. Share your priorities and ask for a written scope; the cost guide explains the decisions to compare without inventing a standard package price.' },
    ], related: ['architectural-uplighting', 'pathway-lighting', 'tree-garden-lighting', 'patio-backyard-lighting', 'cost'],
  },
  {
    slug: 'architectural-uplighting', label: 'Architectural uplighting', keyword: 'house uplighting installation',
    title: 'Let the architecture catch the light.',
    description: 'House uplighting for brick, stone, columns and entryways across Prosper and North Texas. Plan a restrained architectural lighting installation with Landmark.',
    intro: 'A few well-chosen beams can reveal the depth of stone, the rhythm of columns and the entrance you want guests to notice. Landmark plans house uplighting as part of the complete front elevation.', ...house,
    sections: [
      { title: 'Choose the focal points before choosing the fixtures.', copy: 'Start from the street, driveway and front door. A wall that looks important in daylight may not be the best evening focal point, while a recessed entry can disappear without its own layer of light. Identify the surfaces worth revealing, then keep enough shadow for the home to retain its shape.', points: ['Brick and textured stone: consider placement that reveals texture without severe hot spots.', 'Columns and vertical details: coordinate beam width with the proportions of the feature.', 'Entries: balance the arrival with existing porch lights rather than competing with them.'] },
      { title: 'Avoid bright windows and disconnected pools of light.', copy: 'Fixture position affects both the surface being lit and the people looking out from inside. Aiming should consider bedroom windows, the approach from the driveway and neighboring properties. Equal spacing alone is not a design: different wall heights and finishes can call for different placement and emphasis.' },
      { title: 'Keep planting and irrigation in the plan.', copy: 'A fixture placed neatly today can be hidden as shrubs grow. We consider bed edges, future plant size and access for landscape care when planning the installation. If planting or stone borders are changing, coordinate the lighting layout before those improvements close off useful routes.' },
      { title: 'What to send for an uplighting estimate.', copy: 'Include a full front-elevation photo, a closer view of the entry and a photo after dusk showing existing porch and garage lights. Note any rooms where light intrusion is a concern and the view you care about most. The written scope should clarify fixtures, power, controls, installation access and the features being emphasized.' },
    ], faqs: [
      { question: 'Is uplighting the same as permanent roofline lighting?', answer: 'No. Uplighting directs light toward walls, columns or other vertical features, usually from the landscape. Permanent roofline products are installed along eaves or trim and can serve a different visual purpose. Landmark’s uplighting page does not promise a roofline product system.' },
      { question: 'Should every column and wall be lit?', answer: 'Not necessarily. Selective emphasis can make the entrance and architectural details easier to read. Lighting every surface equally can flatten the elevation and increase glare.' },
      { question: 'Can this be paired with path lights?', answer: 'Yes. Landmark considers architecture, walkways and planting together so one layer does not overpower another. A single coordinated scope can also identify priorities for a later phase.' },
    ], related: ['pathway-lighting', 'tree-garden-lighting', 'cost'],
  },
  {
    slug: 'pathway-lighting', label: 'Pathway lighting', keyword: 'pathway lighting installation',
    title: 'A clearer way from the driveway to the door.',
    description: 'Walkway and pathway lighting installation for North Texas homes. Reveal edges, turns and steps with a coordinated Landmark landscape-lighting plan.',
    intro: 'A useful path-lighting plan follows the way people actually move. Landmark considers turns, edges, steps and nearby planting so the route feels comfortable without becoming a row of bright points.', ...garden,
    sections: [
      { title: 'Walk the route before laying out lights.', copy: 'Begin at the places people really enter: the driveway, sidewalk, gate or patio door. Look for changes in level, abrupt turns and areas where planting narrows the route. The important question is what someone needs to see next, rather than how many fixtures fit along a measured distance.', points: ['Entrances and turns need enough definition to show the next part of the route.', 'Steps and changes in level deserve specific attention in the plan.', 'Beds beside the path can receive gentle spill without making every plant a spotlight target.'] },
      { title: 'Comfortable spacing depends on the fixture and the path.', copy: 'There is no useful universal spacing rule for every walkway. Fixture output, beam pattern, path width and nearby porch light change the result. The proposal should describe how the route will be illuminated and where fixtures can sit clear of foot traffic and routine garden care.' },
      { title: 'Coordinate with stonework before access disappears.', copy: 'If a walkway is being built or widened, discuss lighting while routes across or beside it can still be planned. For an existing path, installation access and the amount of disturbance need a site-specific review. Drainage and irrigation should also be considered so new lighting does not conceal a problem that needs attention first.' },
      { title: 'Show the dark spots in your estimate request.', copy: 'Send a daytime photo of the complete route and a dusk photo from the usual starting point. Note which step, turn or gate is difficult to see and whether the path is staying as it is. Path lighting improves visibility; damaged surfaces and trip hazards still need their own repair.' },
    ], faqs: [
      { question: 'Do path lights need to run down both sides?', answer: 'Not always. The fixture distribution and layout of the path determine placement. A site review is more useful than assuming two continuous rows.' },
      { question: 'Can I add lights to an existing stone walkway?', answer: 'Existing paths can be evaluated for lighting. Access, cable routes and the condition of the surrounding beds affect the scope; do not assume hardscape removal is necessary or that installation will be disturbance-free.' },
      { question: 'Will brighter fixtures make the path safer?', answer: 'Brightness alone does not resolve glare, hidden edges or broken surfaces. The goal is comfortable visibility along the route, with appropriate placement and attention to physical hazards.' },
    ], related: ['architectural-uplighting', 'patio-backyard-lighting', 'cost'],
  },
  {
    slug: 'tree-garden-lighting', label: 'Tree & garden lighting', keyword: 'tree and garden lighting installation',
    title: 'Give the garden a life after sunset.',
    description: 'Tree uplighting and garden accent lighting for Prosper and nearby North Texas cities. Highlight selected trees and planting beds with Landmark Landscapes.',
    intro: 'A canopy, a sculptural trunk or a layered planting bed can become the quiet focal point of an evening garden. Landmark plans tree and planting accents around what deserves attention and what should stay in shadow.', ...garden,
    sections: [
      { title: 'Light the form, not every leaf.', copy: 'A broad canopy needs a different approach from a narrow ornamental tree. The view from the house matters as much as the view from the street: a tree that looks striking from the driveway can feel overpowering from a nearby window. Choose the intended viewpoint and the part of the tree you want the light to describe.', points: ['Trunks and branching patterns can create vertical structure.', 'Selected canopy forms can provide depth beyond the front wall.', 'Lower planting layers can connect a tree to the rest of the garden.'] },
      { title: 'A living landscape will change the light.', copy: 'Growth, seasonal foliage and pruning change how beams reach the canopy. Fixture placement needs room for plants to mature and for people to care for the beds. Discuss root areas, watering and access during planning; avoid treating a tree like a fixed architectural column.' },
      { title: 'Use planting accents to connect the evening view.', copy: 'Garden lighting works best when it gives the eye somewhere to travel between the house, a path and the backyard. One raised bed or feature plant can be enough to keep the space from disappearing. More fixtures can add visual clutter if the planting has no clear focal point.' },
      { title: 'Planning a new garden and lights together.', copy: 'If bed shapes or plant selections are changing, discuss mature size and fixture access before installation. For an established garden, identify plants that should remain and places you do not want disturbed. Send both a wide photo and a close view of the tree or bed for an initial conversation.' },
    ], faqs: [
      { question: 'Is this the same as wrapping trees in Christmas lights?', answer: 'No. Tree uplighting uses directed light to reveal the trunk, branching or canopy for everyday landscape use. Seasonal Christmas wrapping is a separate service with its own design and scope.' },
      { question: 'Can young trees be included?', answer: 'Yes, young trees can be considered in the plan, but future growth and a proportionate amount of light matter. The best placement today should leave room for the landscape to mature.' },
      { question: 'What if my existing lights are now hidden by plants?', answer: 'Send photos and describe the existing system. Ask Landmark to confirm whether re-aiming, relocation or work on that system is available; this page does not promise a standalone repair or maintenance visit.' },
    ], related: ['patio-backyard-lighting', 'architectural-uplighting', 'cost'],
  },
  {
    slug: 'patio-backyard-lighting', label: 'Patio & backyard accents', keyword: 'backyard landscape lighting installation',
    title: 'Keep the backyard in the conversation.',
    description: 'Plan landscape lighting around patios, backyard paths and garden beds in North Texas. Connect outdoor living areas with warm, restrained Landmark accents.',
    intro: 'When the patio is bright and everything beyond it disappears, the backyard can feel smaller than it is. Landmark evaluates the surrounding paths, trees and beds to connect your sitting area to the garden after dark.', ...garden,
    sections: [
      { title: 'Design from the chair, not just from the yard.', copy: 'A fixture that looks discreet when standing can shine directly into the eyes of someone seated. Start with the chairs, dining table and the view through the back windows. Then consider which planted areas and routes need definition, leaving room for comfortable shadow beyond the gathering space.' },
      { title: 'Three different jobs around one patio.', copy: 'Ambient garden accents, route lighting and activity lighting solve different problems. Landmark’s landscape service focuses on the planted surroundings and the connections between areas. Dedicated cooking lights, mounted electrical fixtures, fans, outlets, pool electrical work and overhead string-light structures require a separately confirmed scope.', points: ['Use garden accents to give the view depth from your seat.', 'Define the route between the back door, patio and gate.', 'Balance new landscape accents with the existing patio fixtures.'] },
      { title: 'Protect the quieter edges of the property.', copy: 'Consider neighboring windows and the view across a fence when deciding where to aim light. The goal is to enjoy your own garden without spilling unnecessary light beyond it. If there are HOA requirements or design restrictions, share them before fixtures and locations are finalized.' },
      { title: 'Prepare a useful backyard brief.', copy: 'Photograph the patio from the back door and again from a seat facing the garden. Note where people walk, what disappears after dusk and whether new planting or hardscape is planned. This helps separate a focused landscape-lighting improvement from work that needs another trade or a broader renovation.' },
    ], faqs: [
      { question: 'Can this focus on the existing patio surroundings?', answer: 'Yes. Existing beds, trees and paths can be evaluated without requiring a new patio or full backyard redesign. The property determines the feasible lighting scope.' },
      { question: 'Does this include string lights or pergola wiring?', answer: 'Describe string lights or pergola wiring in your inquiry and ask Landmark to confirm availability and any electrical requirements before assuming they are included in a landscape-lighting proposal.' },
      { question: 'Can the front and back yard be done in phases?', answer: 'Discuss the complete direction first, then identify a practical first phase. Power, cable routes, access and future planting need consideration before deciding what can be added later.' },
    ], related: ['tree-garden-lighting', 'pathway-lighting', 'cost'],
  },
  {
    slug: 'cost', label: 'Lighting cost & planning', keyword: 'landscape lighting installation cost',
    title: 'Know what belongs in a lighting estimate.',
    description: 'Compare landscape-lighting estimates by fixtures, layout, cable routes, controls and installation scope. Plan a North Texas lighting project with Landmark.',
    intro: 'The useful question is not just the price per light. A proposal should explain what the lighting will do, how it will be installed and which parts of the property the quoted scope covers.', ...house,
    sections: [
      { title: 'What changes the project price?', copy: 'A compact entry and a deep backyard can need very different installation work even with the same fixture count. Compare the areas covered and the access needed to reach them. Landmark provides project-specific pricing after reviewing the property; no standard package price is published here.', points: ['Fixture selection and distribution: output, beam pattern and the number of focal points.', 'Power and cable routes: distance, access across existing hardscape and transformer requirements.', 'Controls: the schedule and control approach actually included in the proposal.', 'Installation scope: planting coordination, access and any separately required electrical work.'] },
      { title: 'Compare the evening result, not only the fixture count.', copy: 'Ask each proposal to identify the walls, routes and planted areas being illuminated. A higher fixture count is not automatically a better composition. A lower quote may also omit an important route or assume easier access. Clarify what happens around existing stone, mature beds and irrigation before comparing totals.' },
      { title: 'Questions to settle in writing.', copy: 'Confirm the proposed fixtures, transformer and controls, installation limits, payment terms, scheduling assumptions and any warranty that applies to the quoted equipment and labor. Ask who will handle any new outlet or circuit if one is needed. No specific warranty, product brand, financing offer or completion time is assumed on this site.' },
      { title: 'A smaller first phase can still follow a complete plan.', copy: 'If budget is the main constraint, identify the entry, route or focal point that matters most. Discuss future power needs and access before narrowing the first phase. This can make later decisions clearer, though exact expansion capability depends on the equipment and design agreed for your property.' },
      { title: 'Send enough context to get a useful next step.', copy: 'Include your city, daytime and dusk photos, the areas you want lit, existing system details and any budget range you want Landmark to work within. Also identify planting or walkway changes planned for the same space. Request an estimate to confirm availability, scope and price directly.' },
    ], faqs: [
      { question: 'Can you quote from a photo alone?', answer: 'Photos can start a useful conversation, but access, power, cable routing and the actual site may need review before a final installation price can be confirmed.' },
      { question: 'Do you publish a starting price?', answer: 'Request a property-specific proposal from Landmark. Fixture choices, access, power and the areas covered need to be considered before a useful price can be confirmed.' },
      { question: 'Are maintenance and repairs included?', answer: 'Do not assume so. Ask what, if any, follow-up or maintenance is included in the written scope and whether work on an existing system is available. Confirm any ongoing service arrangements directly with Landmark.' },
    ], related: ['architectural-uplighting', 'pathway-lighting', 'tree-garden-lighting'],
  },
];

// Each city has its own project scenario and decision guidance, not substituted paragraphs.
const cities = [
  {
    slug: 'prosper-tx', city: 'Prosper', label: 'Prosper landscape lighting',
    title: 'Landscape lighting installation in Prosper, planned around the whole arrival.',
    metaTitle: 'Landscape Lighting Installation Prosper, TX',
    description: 'Landscape lighting design and installation in Prosper, TX. House uplighting, paths, trees and garden accents from a Prosper-based team. Request an estimate.',
    intro: 'Looking for a landscape lighting installer in Prosper? Landmark designs and installs year-round outdoor lighting for house uplighting, walkways, trees and garden beds. We are based in Prosper and plan the entry, front elevation and planting as one evening composition.', ...house,
    sections: [
      { title: 'An entry-first plan for a Prosper home.', copy: 'If the front of the house is the priority, begin with the route from the driveway to the door. Balance the entrance, the main architectural features and a small number of planting accents. This avoids spending the entire budget on walls while leaving the actual arrival difficult to read.', points: ['First priority: the door, the approach and any level changes.', 'Second priority: selected stone, brick or columns that give the elevation depth.', 'Third priority: a tree or garden focal point that connects the house to the yard.'] },
      { title: 'Planning while the landscape is still growing.', copy: 'If your Prosper yard has young trees or recently installed shrubs, light the present landscape without crowding its future shape. Tell us which planting is staying and whether beds will expand. Coordinate fixture access with irrigation, stone borders and the way the garden will be maintained.' },
      { title: 'A lighting-only project can stand on its own.', copy: 'You do not need a complete landscape redesign to discuss outdoor lighting. Send front-elevation and dusk photos, identify the spaces you want to enjoy after dark and note whether you have existing fixtures. Landmark can evaluate the lighting direction around the property you already have.' },
      { title: 'Before your Prosper estimate.', copy: 'Share your address, the view that matters most and any HOA requirements you already have. Ask for the proposed lighting areas, fixture and control choices, installation scope and schedule in writing. Photos shown here are from Landmark’s North Texas gallery and are not presented as a named Prosper case study.' },
    ],
    faqs: [
      { question: 'Do you design and install outdoor lighting in Prosper?', answer: 'Yes. Landmark designs and installs residential landscape lighting in Prosper, including architectural uplighting, walkway lighting and tree or planting accents. Share your priorities and property photos to request an installation estimate; fixtures, controls, pricing and timing are confirmed in the proposal.' },
      { question: 'Is Landmark based in Prosper?', answer: 'Yes. The site lists Landmark Landscape Services, LLC in Prosper, Texas 75078, serving Prosper and nearby North Texas cities. Call 469-492-8450 to discuss your property.' },
      { question: 'Can you add uplighting to my existing front beds?', answer: 'Yes, existing beds and architecture can be evaluated. Growth, access, power and the view from the house all influence fixture placement.' },
      { question: 'Are seasonal Christmas lights included?', answer: 'No. This estimate is for everyday landscape lighting. Landmark has a separate Christmas lighting service for seasonal displays; specify which project you need.' },
    ], related: ['architectural-uplighting', 'pathway-lighting', 'cost', 'mckinney-tx'],
  },
  {
    slug: 'celina-tx', city: 'Celina', label: 'Celina landscape lighting',
    title: 'Landscape lighting in Celina with room for the yard to grow.',
    description: 'Celina landscape-lighting installation for new and established yards. Plan architectural uplighting, paths and tree accents with Landmark Landscapes.',
    intro: 'A new landscape can look complete at noon and disappear by dinner. Landmark helps Celina homeowners consider the evening view while keeping future planting, pathways and backyard phases in mind.', ...garden,
    sections: [
      { title: 'For a new Celina yard, decide what comes first.', copy: 'If the builder landscape is still being improved, settle the main bed shapes and walking routes before adding fixtures. A small, deliberate lighting phase can emphasize the entrance now while the planting develops. Avoid locking every fixture position to shrubs that may be replaced next season.', points: ['Mark the routes and beds expected to stay.', 'Choose one or two architectural or planting focal points for the first phase.', 'Discuss the future backyard before finalizing access and power decisions.'] },
      { title: 'Young trees need a growth-aware plan.', copy: 'A narrow canopy does not call for the same treatment as a mature shade tree. Discuss the tree’s current form, expected planting changes and the view from inside the home. Leave room for care around the trunk and for fixture positions to be reconsidered as the garden changes.' },
      { title: 'An established Celina property needs a different starting point.', copy: 'If your yard already has full beds and mature trees, begin by identifying what should remain undisturbed. Photos of the existing fixtures, transformer and areas that have become dark can help clarify whether you need a new installation or an evaluation of existing equipment. Availability for repairs must be confirmed separately.' },
      { title: 'Prepare the Celina project brief.', copy: 'Send the property location, front and backyard photos, planned landscaping phases and any HOA lighting guidelines you have received. Ask how the proposed first phase connects to later work. Landmark serves Celina from its Prosper base; this page does not imply a separate Celina office.' },
    ], faqs: [
      { question: 'Can lighting be planned before new beds are installed?', answer: 'Yes. Coordinating bed lines, mature plant size, pathways and lighting can help clarify access and fixture positions before work begins.' },
      { question: 'Can I start with the front and add the backyard later?', answer: 'Discuss that goal during planning. Future cable routes, capacity and access depend on the agreed equipment and site, so later expansion should be considered before the first phase is finalized.' },
      { question: 'Do you handle permanent Christmas roofline systems in Celina?', answer: 'These pages cover everyday landscape lighting. Ask Landmark directly about any specific roofline product before assuming availability; seasonal Christmas installation is a separate service.' },
    ], related: ['tree-garden-lighting', 'architectural-uplighting', 'cost'],
  },
  {
    slug: 'frisco-tx', city: 'Frisco', label: 'Frisco landscape lighting',
    title: 'Landscape lighting in Frisco that works with what is already there.',
    description: 'Frisco outdoor and landscape-lighting installation. Balance house uplighting, existing porch lights, pathways and garden accents with Landmark Landscapes.',
    intro: 'Porch lights, planted beds and an established entrance all shape how new lighting will feel. Landmark plans Frisco landscape lighting around the existing home instead of treating every surface as a blank canvas.', ...house,
    sections: [
      { title: 'Begin with the lights you already use.', copy: 'Before adding uplights, look at the porch, garage and entry fixtures after dusk. Strong existing light can make adjacent accents disappear or create uncomfortable contrast. Photograph the home with the lights on as you normally use them, then identify what still feels missing.', points: ['If the door is hard to find, focus on the entrance composition.', 'If the facade looks flat, consider selected architectural emphasis.', 'If the path is lost against dark beds, prioritize the walking route.'] },
      { title: 'Renovating a mature Frisco landscape.', copy: 'If established shrubs have outgrown the original beds, coordinate pruning or planting changes before deciding on final fixture positions. Useful trees and stone can remain part of the plan. The goal is to improve the night view without automatically replacing the whole garden.' },
      { title: 'Consider the view from neighboring windows.', copy: 'On a property where houses face each other or beds sit close to the boundary, source visibility and aiming deserve attention. Describe bedrooms, shared edges and sitting areas where bright light would be unwelcome. Ask how placement and shielding can keep attention on your own architecture and planting.' },
      { title: 'Your Frisco estimate should define the scope.', copy: 'Include front-elevation and route photos, existing fixture details and the area you want to improve first. Share applicable HOA guidelines before fixture selection. Landmark serves Frisco from Prosper; all pricing, electrical needs and installation timing are confirmed for your property.' },
    ], faqs: [
      { question: 'Can new landscape lights work with existing porch lights?', answer: 'Yes. The existing light should be considered when choosing placement and emphasis so the entrance, paths and planting read as one composition.' },
      { question: 'Do I need to replace mature planting first?', answer: 'Not automatically. Identify what should stay, what may be pruned and what is changing. Those decisions help avoid fixtures being immediately hidden by foliage.' },
      { question: 'Can you guarantee HOA approval?', answer: 'No. Share the requirements that apply to your property and obtain any necessary approval before installation. This page does not claim a citywide rule or automatic HOA acceptance.' },
    ], related: ['architectural-uplighting', 'pathway-lighting', 'tree-garden-lighting'],
  },
  {
    slug: 'mckinney-tx', city: 'McKinney', label: 'McKinney landscape lighting',
    title: 'Landscape lighting installation in McKinney, shaped by trees and texture.',
    metaTitle: 'Landscape Lighting Installation McKinney, TX',
    description: 'Residential landscape lighting design and installation in McKinney, TX. Plan house uplighting, tree accents and pathways with Landmark. Request an estimate.',
    intro: 'Landmark designs and installs residential landscape lighting in McKinney, including house uplighting, tree and garden accents, and pathway lighting. An established tree and a textured facade can carry the evening view when the architecture, canopy and routes are planned together.', ...garden,
    sections: [
      { title: 'If mature trees are the feature, begin from the windows.', copy: 'Choose the view you want to enjoy from the house, then compare it with the view from the driveway. Canopy size, trunk shape and surrounding planting affect how much light reaches the feature. Avoid using the same layout for every tree simply because the trunks are evenly spaced.', points: ['Identify the tree or garden feature that should lead the evening view.', 'Keep the entrance visible so the focal tree does not overpower the home.', 'Review access around roots, beds and irrigation before deciding fixture positions.'] },
      { title: 'Let textured architecture keep its character.', copy: 'Brick and stone can gain depth from carefully directed light, but a bright hot spot can hide the very texture you want to show. Discuss the surface, viewing distance and nearby windows. Selective architectural emphasis can link the tree canopy to the front of the home.' },
      { title: 'A renovation should account for what stays.', copy: 'If a McKinney yard has established borders, paths or beds, map those features before planning cable access. Identify areas where you want minimal disturbance and any drainage or planting work already planned. Installation methods and restoration expectations belong in the project-specific scope.' },
      { title: 'Plan your McKinney lighting installation.', copy: 'Start with the house elevation, tree or walking route you want to improve. Share daytime and dusk photos, existing lighting details and any planned planting changes. The installation proposal should identify the areas covered, fixture placement, cable access, power and controls before pricing and scheduling are confirmed. You can request a lighting-only project without committing to a complete landscape renovation.' },
      { title: 'Different property, different starting point.', copy: 'For a newer McKinney yard, shift the conversation toward future tree growth and phased planting instead of assuming a mature-canopy design. Send the address, wide daytime photos and a dusk view of the main feature. Landmark serves McKinney from Prosper, with scope and availability confirmed directly.' },
    ], faqs: [
      { question: 'Do you install residential landscape lighting in McKinney?', answer: 'Yes. Landmark serves McKinney from its Prosper base with landscape-lighting design and installation. House uplighting, pathways and tree or garden accents can be considered together or as a focused lighting project. Confirm scope, pricing and availability directly with Landmark.' },
      { question: 'Can lighting highlight mature trees in McKinney?', answer: 'Yes. Landmark’s existing service includes tree and planting accents. The canopy, root area, intended view and installation access need review for the actual tree.' },
      { question: 'Can old landscape lighting be reused?', answer: 'Possibly, but compatibility and condition need evaluation. Share the equipment details and ask Landmark whether work on that existing system is available before assuming reuse or repair is included.' },
      { question: 'Is this only for older McKinney properties?', answer: 'No. The plan can also address newer yards. Young planting, future phases and different access conditions call for a different lighting direction.' },
    ], related: ['tree-garden-lighting', 'architectural-uplighting', 'cost'],
  },
  {
    slug: 'the-colony-tx', city: 'The Colony', label: 'The Colony landscape lighting',
    title: 'Landscape lighting in The Colony for the route outside and the view back home.',
    description: 'Outdoor landscape lighting in The Colony, TX. Connect backyard paths, patio surroundings and front entries with a Landmark lighting installation plan.',
    intro: 'The path to the gate, the planting beyond a patio and the return to the back door all deserve attention after dark. Landmark helps homeowners in The Colony connect those everyday routes with selected garden and architectural accents.', ...garden,
    sections: [
      { title: 'Map the backyard route before adding accents.', copy: 'If the backyard is where you spend the evening, start with movement: back door to seating, seating to gate and any steps between them. Then choose the garden feature that should anchor the view. This keeps a decorative tree from taking priority over the route people use.', points: ['At the back door, consider the change from indoor brightness to the yard.', 'Along the route, identify turns and changes in level.', 'From the chair, check whether any proposed light would shine toward seated eyes.'] },
      { title: 'Keep side-yard lighting directed where it is useful.', copy: 'A narrow route beside the home can need gentle definition rather than a broad floodlight. Consider neighboring windows and fences when choosing direction and placement. If the actual goal is motion detection, cameras or a dedicated security light, ask for that scope explicitly; landscape accents are not a security-system promise.' },
      { title: 'Let the planted edge make the patio feel connected.', copy: 'If everything beyond the patio is dark, a selected bed or tree can add depth without illuminating the entire boundary. Existing patio fixtures matter too: photograph them in normal use so the landscape layer can be considered alongside the light already present.' },
      { title: 'Prepare a focused request for The Colony.', copy: 'Send a photo from the back door, a seated view from the patio and a note about the gate or front entry you use most. Identify existing hardscape, planned planting changes and any HOA requirements. Landmark serves The Colony from its Prosper base; there is no separate local storefront implied here.' },
    ], faqs: [
      { question: 'Can this be a backyard-only lighting project?', answer: 'Yes. Existing beds, trees and routes around a patio can be evaluated without automatically redesigning the front yard or rebuilding the patio.' },
      { question: 'Can you light the side path without a floodlight?', answer: 'A controlled landscape-lighting approach may suit the route. The path width, neighboring views, power and installation access determine the actual recommendation.' },
      { question: 'Does patio lighting include electrical or pool work?', answer: 'This page describes landscape accents around the patio. Mounted electrical fixtures, new circuits and pool electrical work require separately confirmed scope and appropriate trade involvement.' },
    ], related: ['patio-backyard-lighting', 'pathway-lighting', 'tree-garden-lighting'],
  },
];
for (const city of cities) lightingPages.push({ ...city, keyword: `landscape lighting installation ${city.city} TX` });
export function lightingPath(page: LightingPageData) {
  return page.slug === 'prosper-tx' ? '/landscape-lighting-prosper-tx' : `/landscape-lighting${page.slug ? `/${page.slug}` : ''}`;
}
export function lightingMetadata(page: LightingPageData): Metadata {
  const title = `${page.metaTitle ?? (page.city ? `Landscape Lighting ${page.city}, TX` : page.label === 'Outdoor lighting' ? 'Outdoor Landscape Lighting North Texas' : page.label + ' | North Texas')} | Landmark Landscapes`;
  return { title: { absolute: title }, description: page.description, alternates: { canonical: lightingPath(page) },
    openGraph: { title, description: page.description, url: absoluteUrl(lightingPath(page)), type: 'website', images: [{ url: page.image, alt: page.alt }] },
    twitter: { card: 'summary_large_image', title, description: page.description, images: [page.image] } };
}
export function lightingContact(page: LightingPageData) {
  return `/contact?${new URLSearchParams({ service: 'Landscape lighting', notes: `I am interested in ${page.label.toLowerCase()}${page.city ? ` at my property in ${page.city}` : ''}. Page: ${lightingPath(page)}` })}`;
}
