import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const categoriesDir = path.join(root, 'data', 'categories');
const updatedAt = '2026-09-09T10:00:00+05:30';
const editorialSource = {
  publisher: 'News Editors',
  label: 'How we write and review',
  url: '/editorial-standards',
  accessed: 'September 9, 2026',
};

const guides = {
  'inside-the-sensor-shortage-that-delayed-camera-launches': {
    title: 'Why one camera sensor component can delay an entire launch',
    subtitle: 'A camera is a tightly tuned system, so replacing a scarce sensor is rarely a simple parts swap',
    excerpt: 'A practical explanation of why specialized image-sensor supply can hold up a camera launch, and what buyers should do when a model slips.',
    type: 'Evergreen guide',
    intro: 'A delayed camera is often described as a factory problem, but the harder constraint can sit much earlier in the chain. Modern image sensors are specialized components made in a small number of facilities, then matched to a camera\'s processor, cooling system and firmware. When the planned part is late, the rest of the product cannot always move ahead without it.',
    sections: [
      ['Why substitution is difficult', ['Two sensors with the same resolution can behave differently. Readout speed affects rolling shutter and autofocus; heat affects recording limits; color response and noise require their own tuning. A replacement may force new circuit-board work, firmware changes and months of validation.', 'Supply is also concentrated. Stacked and high-speed sensors need advanced fabrication and packaging, while camera volumes are small beside phone volumes. A camera maker has less leverage when a supplier allocates scarce capacity.']],
      ['What a delay does and does not tell you', ['A postponed ship date is not proof that a product is defective. It can mean the maker is protecting image quality or production consistency instead of shipping a rushed substitution. Repeated vague delays, however, make early availability and support harder to predict.']],
      ['A buyer\'s response', ['Treat an announced date as provisional until retailers have stock. Compare the delayed model with cameras already available, and decide whether its unique lens mount, video mode or autofocus feature is worth waiting for.'], ['Avoid paying an unprotected deposit.', 'Check whether the lenses and batteries you need are actually available.', 'Rent or buy a proven model if the camera is required for paid work.', 'Revisit launch reviews after production units reach ordinary buyers.']],
    ],
    takeaways: ['Specialized sensors cannot be swapped without retuning the camera around them.', 'Concentrated supply gives small camera brands little room when capacity tightens.', 'Buyers should compare the cost of waiting with a proven model that is available now.'],
    why: 'Understanding the constraint helps buyers separate a routine schedule slip from a launch whose availability may remain uncertain.',
    keywords: ['camera sensor supply', 'camera launch delay', 'image sensor shortage', 'camera buying advice'],
  },
  'the-megapixel-race-quietly-ended': {
    title: 'The megapixel race quietly ended. Here is what replaced it',
    subtitle: 'Resolution still matters, but speed, dynamic range, lenses and processing now shape more of the result',
    excerpt: 'Why megapixels stopped being the simplest measure of camera quality, with a checklist for matching resolution to real work.',
    type: 'Evergreen guide',
    intro: 'Megapixels are easy to print on a box and easy to compare, which made resolution the camera industry\'s favorite headline number. Once mainstream cameras crossed the threshold needed for common print sizes and screens, though, adding pixels produced smaller gains and larger files. The more useful question became how well the whole imaging system uses the pixels it has.',
    sections: [
      ['What matters after resolution', ['Sensor area, lens quality and exposure still determine how much useful detail reaches the file. Readout speed affects electronic-shutter distortion and video. Dynamic range determines how much highlight and shadow information survives editing. Autofocus and stabilization determine whether the detail is sharp in the first place.', 'Processing matters too. Noise reduction can erase texture, aggressive sharpening can create halos and computational stacking can recover scenes that a single exposure cannot. A lower-resolution camera with a better lens and faster readout can therefore make the more usable picture.']],
      ['How much is enough', ['For uncropped viewing and ordinary prints, moderate resolution is usually ample. More pixels become valuable for large prints, commercial retouching, wildlife cropping and archival reproduction. They also demand more storage, faster cards and a computer that can handle larger raw files.']],
      ['Choose for the output', ['Work backward from the final image instead of buying the largest number.'], ['Prioritize lenses and autofocus for moving subjects.', 'Prioritize readout speed and heat management for video.', 'Budget for storage and editing hardware when choosing very high resolution.', 'Compare full-resolution samples, not only specification sheets.']],
    ],
    takeaways: ['Resolution is only one link in the imaging chain.', 'More pixels help most when the final output needs cropping or very large reproduction.', 'Lens quality, readout speed and reliable focus often produce a bigger practical gain.'],
    why: 'A needs-based comparison prevents buyers from paying for files their lenses, workflow or final output cannot exploit.',
    keywords: ['camera megapixels', 'camera resolution guide', 'sensor quality', 'camera buying guide'],
  },
  'why-film-cameras-are-back-on-store-shelves': {
    title: 'Why film cameras found a new audience',
    subtitle: 'The appeal is less about technical superiority than a slower, more deliberate way of making pictures',
    excerpt: 'Film photography can be rewarding, but the real cost includes film, processing, scans and the condition of an aging camera.',
    type: 'Evergreen guide',
    intro: 'Film cameras returned to view because they offer something digital cameras deliberately remove: scarcity. A roll limits the number of frames, the result is delayed and each exposure costs money. Those constraints can make photography feel more intentional, but they do not make an old camera automatically better or cheaper.',
    sections: [
      ['The experience people are buying', ['Mechanical controls, optical finders and a finite roll make the act of taking a picture feel different. Color-negative, black-and-white and slide films also have recognizable contrast and grain. Much of the finished look, however, comes from exposure, processing and scanning rather than the camera body alone.', 'A used camera is also a physical object with seals, lubricants, meters and shutters that age. Popularity can raise prices without improving condition.']],
      ['The ongoing cost', ['The body is only the entry price. Film must be bought, developed and usually scanned; mistakes cannot be reviewed on the spot. Local lab availability and turnaround time can matter more than a small saving on the camera.']],
      ['Buy the process, not the nostalgia', ['Start with a common system whose batteries, lenses and repair knowledge are easy to find.'], ['Inspect shutter speeds, meter operation, foam seals and lens fungus.', 'Price several rolls plus development before choosing a body.', 'Ask for sample negatives or a recent service record when possible.', 'Use a lab whose scan resolution and color choices suit the intended output.']],
    ],
    takeaways: ['Film\'s constraints are part of its creative appeal.', 'Processing and scanning usually cost more over time than the camera body.', 'Condition, serviceability and a dependable lab matter more than collector fashion.'],
    why: 'A realistic view of the workflow lets a newcomer enjoy film without mistaking nostalgia for low cost or guaranteed quality.',
    keywords: ['film camera guide', 'buying a used film camera', 'film photography cost', '35mm camera'],
  },
  'how-action-cameras-learned-to-shoot-in-near-total-darkness': {
    title: 'What makes low-light action-camera footage usable',
    subtitle: 'Bigger sensors help, but exposure, stabilization and processing decide whether dark footage holds together',
    excerpt: 'A plain-language guide to the compromises behind brighter action-camera video at night.',
    type: 'Evergreen guide',
    intro: 'Action cameras face a difficult low-light problem. Their sensors and lenses are small, the subject is often moving and stabilization needs extra image area. Brightening the picture is easy; preserving detail without blur, wobble or plastic-looking noise reduction is not.',
    sections: [
      ['The exposure trade-off', ['A wider aperture and larger sensor collect more light. A slower shutter also brightens each frame, but moving subjects smear. Higher sensitivity preserves shutter speed at the cost of more noise. The camera is constantly balancing those three choices while trying to protect highlights such as street lamps.', 'Electronic stabilization complicates the job because it crops the frame and compares successive images. In very dark scenes there may not be enough clean detail for that motion estimate, so the result can pulse or warp.']],
      ['Processing can help and hurt', ['Multi-frame noise reduction and local tone mapping can reveal shadows, but they need time-consistent frames. Fast motion, water and foliage can produce ghosts or waxy texture. A convincing low-light mode should keep motion believable, not merely make a still frame look bright.']],
      ['Test for the scene you shoot', ['Look for full clips rather than isolated promotional frames.'], ['Check motion blur while walking, cycling or driving.', 'Compare stabilization on and off in the same light.', 'Watch faces and fine texture for aggressive smoothing.', 'Use a mount or small light when image quality matters more than invisibility.']],
    ],
    takeaways: ['Low-light video is a balance among brightness, motion blur and noise.', 'Stabilization becomes less reliable when the frame lacks clean detail.', 'Full moving clips reveal more than a bright promotional still.'],
    why: 'Knowing the trade-offs helps buyers judge whether a night mode fits their activity instead of rewarding the brightest-looking sample.',
    keywords: ['action camera low light', 'night video guide', 'action camera stabilization', 'camera noise reduction'],
  },
  'the-compact-camera-comeback-nobody-predicted': {
    title: 'Why compact cameras are finding an audience again',
    subtitle: 'Phones won convenience, but a dedicated camera can still offer better controls, zoom and shooting discipline',
    excerpt: 'Compact cameras make sense again for some photographers, provided their advantages match a real need.',
    type: 'Evergreen guide',
    intro: 'The phone replaced the ordinary pocket camera by being good enough and always present. A dedicated compact now has to offer a clearer reason to exist: a larger sensor, a useful optical zoom, tactile controls or a shooting experience that keeps notifications out of the frame.',
    sections: [
      ['Where a compact still wins', ['Optical zoom can reach beyond a phone\'s fixed camera modules without the abrupt quality changes between lenses. A larger sensor can preserve more natural detail, and a real aperture or exposure dial makes deliberate control faster. Some models add viewfinders, flashes and raw files in a genuinely pocketable body.', 'Phones remain stronger at instant sharing, automated multi-frame processing and integration with the apps people already use. A compact should therefore solve a specific photographic limitation, not duplicate the phone.']],
      ['The new scarcity problem', ['The compact market is smaller, so fashionable models can be expensive or hard to find. That attention also lifts used prices. A premium resale price is not evidence of better image quality, and an older model may lack parts, batteries or app support.']],
      ['Define the reason to carry it', ['Choose one advantage that matters enough to justify a second device.'], ['Compare equivalent focal lengths, not digital-zoom claims.', 'Check startup time, autofocus and pocketability with the lens extended.', 'Confirm replacement batteries and service options.', 'Download sample raw files and edit them in your normal workflow.']],
    ],
    takeaways: ['A compact earns its place through zoom, controls, sensor size or a focused shooting experience.', 'Phones still dominate convenience and computational processing.', 'Fashion-driven used prices should not replace a needs-based comparison.'],
    why: 'A compact camera is worthwhile only when its specific photographic advantage outweighs the friction of carrying and maintaining another device.',
    keywords: ['compact camera comeback', 'compact camera vs phone', 'pocket camera guide', 'camera buying advice'],
  },
  'the-best-action-camera-you-can-buy': {
    title: 'What made a good action camera in 2016, and what matters now',
    subtitle: 'An archive perspective on a fast-moving category, with a current checklist for buying new or used',
    excerpt: 'Old action-camera verdicts age quickly. Here is how to read a 2016 recommendation and evaluate the hardware that remains.',
    type: 'Archive perspective',
    intro: 'A product called the best action camera in 2016 belonged to a different market. Resolution, stabilization and mobile apps have moved on, while batteries, waterproof seals and software services on surviving units have aged. The useful part of an old verdict is the decision framework, not the ranking.',
    sections: [
      ['Read the recommendation in its time', ['In 2016, reliable 4K capture, simple mounts and acceptable battery life were meaningful differentiators. Electronic stabilization was more limited and phone pairing was often fragile. A favorable review reflected the alternatives and expectations available then.', 'That context cannot guarantee a good purchase today. A discontinued companion app, unsupported codec or swollen battery can erase the original advantage.']],
      ['What ages on an action camera', ['Rechargeable cells lose capacity, adhesive seals and door gaskets harden, and small exposed lenses collect scratches. Mount ecosystems can remain useful for years, but proprietary remotes and cloud features may not. Used waterproof equipment should never be trusted at depth without a careful seal check.']],
      ['A current buying checklist', ['Judge the unit in front of you rather than the old award.'], ['Confirm the app still installs and completes activation.', 'Inspect lens cover, doors, gaskets and battery condition.', 'Record a long clip to check heat and file reliability.', 'Price replacement batteries, cases and modern alternatives together.']],
    ],
    takeaways: ['A 2016 ranking describes its original market, not today\'s best purchase.', 'Battery health, seals and app support are the main risks in a used unit.', 'A long recording test is more useful than relying on an archived award.'],
    why: 'Archive reviews remain useful when they explain the original trade-offs and clearly separate them from a present-day buying recommendation.',
    keywords: ['2016 action camera', 'used action camera guide', 'archive camera review', 'action camera checklist'],
  },
  'why-laptop-batteries-are-lasting-longer-without-getting-bigger': {
    title: 'Why laptop batteries last longer without getting bigger',
    subtitle: 'Efficiency gains in chips, displays and software can matter more than adding battery capacity',
    excerpt: 'Longer battery life is a system result, not simply a bigger watt-hour number.',
    type: 'Evergreen guide',
    intro: 'A laptop can run longer while carrying a battery of similar size because every major component has become better at doing light work with less power. The gain is real, but the headline runtime still depends on the display setting, network activity, background software and the job the machine is doing.',
    sections: [
      ['Where the savings come from', ['Modern processors move between low-power and high-performance states more quickly. Dedicated media engines decode common video formats without waking the most power-hungry cores. Displays can lower refresh rate, memory uses less energy and operating systems are more aggressive about pausing idle work.', 'These small savings compound during browsing and video playback. They matter less during sustained rendering, gaming or software builds, when the processor and graphics hardware remain active.']],
      ['Why battery tests disagree', ['Screen brightness, browser choice, wireless signal, video codec and background updates can change a result substantially. A manufacturer\'s video-loop figure is useful for comparison only when the method is the same. Independent tests should describe the workload and settings.']],
      ['Compare the whole system', ['Start with the work you expect to do away from a charger.'], ['Compare watt-hours as well as advertised runtime.', 'Look for tests that match your applications.', 'Check charger size and fast-charge behavior.', 'Expect battery capacity to decline with age and heat.']],
    ],
    takeaways: ['Chip, display and software efficiency can extend runtime without a larger cell.', 'Light-work gains do not always carry over to gaming or rendering.', 'Battery claims are comparable only when the workload and settings are clear.'],
    why: 'Understanding how runtime is produced makes it easier to choose a laptop that lasts during your work, not only in a controlled demo.',
    keywords: ['laptop battery life', 'laptop efficiency', 'battery benchmark', 'laptop buying guide'],
  },
  'the-lightweight-laptop-trend-has-a-repairability-problem': {
    title: 'The repairability cost of a lightweight laptop',
    subtitle: 'Thin construction can reduce upgrade options and make a small failure more expensive to fix',
    excerpt: 'A practical guide to the repair and ownership trade-offs hidden inside thin laptops.',
    type: 'Evergreen guide',
    intro: 'A lighter laptop is easier to carry every day, but thin construction leaves less room for sockets, replaceable modules and robust fasteners. The trade-off is not absolute: some compact machines remain serviceable. Buyers simply need to look past weight and ask which parts can be replaced after the warranty ends.',
    sections: [
      ['What thin designs tend to change', ['Memory may be soldered to the main board, storage can be proprietary and batteries may be held by strong adhesive. Ports are sometimes mounted directly to an expensive board rather than a small replaceable daughterboard. A keyboard fault can require replacing the entire upper case.', 'Soldering can improve signal integrity and save space, so it is not automatically careless engineering. It does mean the original memory choice may be permanent and a local repair shop may have fewer options.']],
      ['Repairability is part of performance', ['A machine that cannot add memory may feel slow sooner. A difficult battery replacement can shorten its useful life even when the processor is adequate. Service manuals, parts availability and standard screws therefore affect long-term value.']],
      ['Check before buying', ['Look for a teardown or service manual for the exact model, not just the product family.'], ['Confirm whether memory and storage are replaceable.', 'Check the battery replacement procedure and parts price.', 'Ask how accidental-damage and out-of-warranty service work.', 'Buy enough memory for the likely lifetime if it is soldered.']],
    ],
    takeaways: ['Low weight often reduces sockets and replaceable subassemblies.', 'Soldered memory and difficult battery service can shorten useful life.', 'A model-specific service manual reveals more than a broad repairability promise.'],
    why: 'Repair and upgrade constraints turn an attractive purchase price into a very different total cost over several years.',
    keywords: ['laptop repairability', 'thin laptop tradeoffs', 'soldered memory', 'laptop serviceability'],
  },
  'pay-for-the-power-not-for-the-design': {
    title: 'Pay for the laptop performance you can actually use',
    subtitle: 'Sustained speed, cooling and portability matter more than a premium specification sheet',
    excerpt: 'A framework for matching laptop performance and design to real work instead of paying for unused headroom.',
    type: 'Evergreen guide',
    intro: 'A premium laptop can charge separately for appearance, thinness and peak performance. None of those is a bad reason to buy, but they solve different problems. The sensible comparison starts with the work that must finish, the places the laptop will travel and the compromises you are willing to feel every day.',
    sections: [
      ['Peak speed is not sustained speed', ['A fast processor can post a strong short benchmark and then slow when a thin cooling system reaches its thermal limit. Larger machines may hold performance longer and make less fan noise. For compiling code, rendering or exporting video, sustained results matter more than a brief burst.', 'For writing, meetings and browsing, memory, battery life, keyboard comfort and wake reliability may shape productivity more than an expensive graphics processor.']],
      ['Design has value when it serves the work', ['A bright accurate display is valuable to a photographer; a sturdy light chassis is valuable to a frequent traveler. Decorative materials and extremely thin edges are harder to justify when they remove ports, cooling or repair access the owner needs.']],
      ['Build a workload-first shortlist', ['Describe the heaviest recurring task and the minimum acceptable battery life.'], ['Compare sustained application tests, not only synthetic peaks.', 'Include docks, adapters and a larger charger in cost and weight.', 'Choose memory and storage for the expected ownership period.', 'Try the keyboard, screen coating and port layout when possible.']],
    ],
    takeaways: ['Sustained application performance matters more than a short benchmark peak.', 'Design premiums are worthwhile when they improve a task you actually perform.', 'Adapters, fixed memory and charger size belong in the purchase comparison.'],
    why: 'A workload-first decision directs the budget toward speed, endurance and ergonomics the owner will notice rather than a prestige feature.',
    keywords: ['laptop performance guide', 'premium laptop value', 'sustained performance', 'laptop buying advice'],
  },
  'macbook-pro-review-the-air-apparent': {
    title: 'The 2016 MacBook Pro in context: ambition, ports and an aging battery',
    subtitle: 'An archive perspective on a controversial redesign, plus the checks that matter for a surviving used machine',
    excerpt: 'The 2016 MacBook Pro was a major design reset. Today its condition and software future matter more than its launch-era appeal.',
    type: 'Archive perspective',
    intro: 'The 2016 MacBook Pro pursued a thinner design, moved to USB-C and introduced the Touch Bar on selected models. Those choices made sense as an attempt to redefine a professional notebook, but they also created adapter friction and a keyboard reputation that became central to the generation. Any surviving unit should now be judged as an aging used computer.',
    sections: [
      ['Why the redesign mattered', ['USB-C consolidated charging, displays and peripherals into one connector type, but owners of existing equipment needed adapters. The Touch Bar replaced physical function keys without becoming an industry standard. The shallow keyboard helped reduce thickness while making typing feel and service history unusually important.', 'The display, trackpad and compact construction were genuine strengths in the launch context. They do not cancel the cost of an awkward port transition or the risk attached to a complex top-case repair.']],
      ['Age changes the verdict', ['Battery health, keyboard behavior, display coating, storage capacity and current operating-system support now dominate the decision. An original review cannot predict the wear of a particular unit. Security updates and application requirements should be checked before using an old computer for sensitive work.']],
      ['Used-buyer checks', ['Inspect the exact serial-number configuration and service record.'], ['Test every key repeatedly and check the trackpad and ports.', 'Review battery cycle count and condition in system information.', 'Confirm the newest supported operating system and required apps.', 'Compare the total with a newer refurbished model and warranty.']],
    ],
    takeaways: ['The 2016 redesign traded familiar ports and keys for thinness and USB-C.', 'Condition, software support and service history now outweigh launch-era specifications.', 'A newer refurbished model may offer better value after repair risk is included.'],
    why: 'Archive context helps readers understand the design, while a present-day warning prevents an old review from becoming accidental buying advice.',
    keywords: ['2016 MacBook Pro', 'used MacBook Pro guide', 'Touch Bar archive', 'MacBook battery health'],
  },
  'refurbished-tablets-are-having-a-moment': {
    title: 'How to buy a refurbished tablet without guessing',
    subtitle: 'Warranty, battery condition and software support matter more than the discount alone',
    excerpt: 'A refurbished tablet can be good value when the seller defines its process and stands behind the result.',
    type: 'Evergreen guide',
    intro: 'Refurbished can mean anything from a manufacturer-inspected return with a new battery to a used tablet that has merely been wiped clean. The label is useful only when the seller explains testing, cosmetic grading, included accessories and the remedy if the device fails.',
    sections: [
      ['Start with the refurbisher', ['Manufacturer programs usually offer the clearest parts and warranty path, while specialist retailers vary. A marketplace listing may shift responsibility to a third-party seller. Read who actually provides the warranty, who pays return shipping and whether the replacement can be another used unit.', 'Cosmetic grades describe appearance, not necessarily battery health. A clean screen can sit above a heavily worn cell, so ask for a capacity standard or a return right that lets you evaluate runtime.']],
      ['Support sets the useful life', ['An inexpensive tablet loses value quickly if it no longer receives security updates or cannot run required apps. Check the exact model year, not just the family name. Storage is also difficult or impossible to expand on many tablets.']],
      ['A purchase checklist', ['Calculate value against a new device with its full warranty.'], ['Confirm model number, storage and cellular compatibility.', 'Find the promised battery-health threshold.', 'Check update policy and app compatibility.', 'Verify return window, warranty provider and included charger.']],
    ],
    takeaways: ['Refurbished is a process, not a consistent condition grade.', 'Battery health and remaining software support determine useful life.', 'The seller\'s warranty and return terms are part of the product.'],
    why: 'A defined refurbishment standard turns a tempting discount into a purchase whose risk and lifetime can be compared honestly.',
    keywords: ['refurbished tablet guide', 'used tablet battery', 'tablet software support', 'refurbished warranty'],
  },
  'the-kids-tablet-market-is-more-competitive-than-it-looks': {
    title: 'How to choose a tablet for a child',
    subtitle: 'Parental controls, content costs, privacy and repairability matter more than a colorful case',
    excerpt: 'A child-friendly tablet is a family system of controls, content and support, not simply rugged hardware.',
    type: 'Evergreen guide',
    intro: 'Tablets marketed to children often bundle a case, simplified interface and content subscription. Those features can be useful, but the long-term experience depends on how adults approve apps, set schedules, protect personal data and recover the device when something goes wrong.',
    sections: [
      ['Look beyond the case', ['A thick bumper reduces impact damage but does not guarantee a replaceable screen or charging port. Check the warranty language for accidental damage and the price of a replacement. A common connector and readily available case can keep the device usable longer.', 'The interface should let a parent create age-appropriate profiles, block purchases, set bedtime and review activity without becoming a daily administration task. Controls should work even when the tablet is offline.']],
      ['Content and privacy are recurring costs', ['A low device price may depend on a subscription that becomes expensive over several years. Find out what remains when it ends. Review whether child profiles show advertising, how voice or usage data is handled and whether location features can be disabled.']],
      ['Questions to answer first', ['Choose around household rules and the apps the child actually needs.'], ['Price the subscription over the expected ownership period.', 'Test parent controls and purchase approval during the return window.', 'Check offline downloads for travel.', 'Confirm update policy, repair terms and replacement accessories.']],
    ],
    takeaways: ['Parental controls and account design matter as much as rugged hardware.', 'Subscriptions can turn a cheap tablet into a costly service.', 'Offline use, privacy settings and repair terms deserve a test during the return window.'],
    why: 'The right tablet should support family rules and remain manageable after the initial bundle or subscription offer ends.',
    keywords: ['kids tablet guide', 'parental controls', 'child tablet privacy', 'tablet subscription cost'],
  },
  'why-artists-still-prefer-cheap-tablets': {
    title: 'Why a simple drawing tablet can beat a costly screen model',
    subtitle: 'Ergonomics, dependable drivers and a comfortable workflow often matter more than drawing directly on glass',
    excerpt: 'A screenless pen tablet remains a strong tool when it fits the artist\'s desk, software and habits.',
    type: 'Evergreen guide',
    intro: 'A low-cost screenless drawing tablet asks the hand to work on the desk while the eyes look at a monitor. That disconnect feels strange at first, yet many artists adapt quickly and gain a lighter, cooler and more adjustable workspace than a display tablet provides.',
    sections: [
      ['Why simpler hardware can work', ['The main monitor can be larger, better calibrated and positioned at eye level. The drawing surface can stay flat or slightly angled, reducing the need to lean over a warm glass panel. Fewer display components also mean fewer cables and fewer things that can fail.', 'Price does not determine line quality by itself. Stable drivers, predictable pressure response, low initial activation force and a pen shape that remains comfortable over hours are more important than a very large advertised pressure-level number.']],
      ['Where a display tablet helps', ['Direct pen-to-image alignment can make tracing, annotation and precise placement more intuitive. It also reduces the initial learning curve. The trade-offs are desk space, posture, heat, parallax and cost. Neither format is universally more professional.']],
      ['Try the workflow', ['Match the active area to arm movement and available desk space.'], ['Check drivers for the current operating system and creative apps.', 'Test shortcut mapping and multi-monitor behavior.', 'Price replacement nibs and pens.', 'Use the return window to judge posture, not only drawing accuracy.']],
    ],
    takeaways: ['A screenless tablet can improve posture and use a better main display.', 'Driver quality and pen behavior matter more than headline pressure levels.', 'The best format depends on workflow, desk space and adaptation, not prestige.'],
    why: 'Artists can spend on the parts of the workflow that improve comfort and control instead of assuming an integrated screen is always superior.',
    keywords: ['drawing tablet guide', 'screenless pen tablet', 'display tablet comparison', 'artist tablet ergonomics'],
  },
  'stylus-latency-finally-got-good-enough': {
    title: 'What stylus latency really means',
    subtitle: 'The delay you feel comes from the pen, display, operating system and drawing app together',
    excerpt: 'A stylus can quote a fast response while still feeling uneven because end-to-end latency is a system property.',
    type: 'Evergreen guide',
    intro: 'Stylus latency is the time between moving the pen and seeing the corresponding mark. It is not controlled by one component. Pen sampling, touch processing, application rendering, display refresh and pixel response all add delay, while prediction can make the line appear closer to the tip without removing every source of lag.',
    sections: [
      ['The whole path matters', ['A faster display refreshes the visible line more often, but the application must deliver frames in time. A high pen-sampling rate helps only if the operating system and app process those samples consistently. Background load can create uneven frame pacing that feels worse than a slightly slower but stable response.', 'Prediction estimates where the pen will move next. It works well on smooth strokes and can correct itself later, but sharp corners may briefly overshoot. That is why a single millisecond specification cannot describe the drawing experience.']],
      ['Other pen qualities can dominate', ['Initial activation force affects light strokes. Parallax affects where the line appears under the glass. Palm rejection, hover behavior, tilt support, nib friction and shortcut design all shape control. An artist may prefer a slower system that behaves predictably.']],
      ['Test in the real app', ['Use the brush engine, canvas size and layers typical of your work.'], ['Draw slow diagonals and quick curves for wobble and catch-up.', 'Check light strokes and line starts.', 'Try the device under a realistic workload.', 'Confirm replacement pen and nib availability.']],
    ],
    takeaways: ['Perceived latency is the sum of the pen, software and display pipeline.', 'Prediction can hide delay but may behave differently on abrupt strokes.', 'Consistency, activation force and parallax can matter more than the quoted number.'],
    why: 'A system-level test prevents one impressive specification from obscuring the qualities that determine whether a pen feels trustworthy.',
    keywords: ['stylus latency', 'digital pen guide', 'drawing tablet response', 'pen sampling rate'],
  },
  'the-budget-tablet-that-punches-above-its-price': {
    title: 'How to tell whether a budget tablet is genuinely good value',
    subtitle: 'The cheapest screen can become expensive when storage, accessories and support are added',
    excerpt: 'A budget tablet should be judged by the complete job, expected lifetime and hidden costs.',
    type: 'Evergreen guide',
    intro: 'A budget tablet can handle reading, streaming, calls and light browsing extremely well. The problem is not low price; it is buying for a job the hardware or software cannot sustain. Storage limits, weak update policies and missing accessories often appear after the attractive headline price.',
    sections: [
      ['Good enough is task-specific', ['Video viewing benefits from a bright display, reliable speakers and supported streaming codecs. Study work may need a keyboard, pen and dependable file handling. Games can demand much more processor and memory performance than basic apps. A tablet that excels at one of these is not automatically good at the others.', 'Low memory can force apps to reload, while nearly full storage slows updates and leaves little room for downloads. Expandable storage helps media libraries but may not hold every app.']],
      ['Count the complete purchase', ['A charger, case, keyboard or stylus can erase the gap to a better-equipped model. Advertising-supported lock screens and bundled subscriptions also have a value cost. The update policy determines how long banking, school and work apps remain sensible to use.']],
      ['Set a minimum standard', ['Write down the required apps and accessories before comparing prices.'], ['Choose storage with room for updates and offline media.', 'Check display brightness and streaming certification.', 'Confirm security-update duration.', 'Compare the full bundle with a refurbished midrange device.']],
    ],
    takeaways: ['Budget value depends on a specific workload, not the price alone.', 'Storage, accessories and subscriptions belong in the total cost.', 'Software support can be the limit even when the hardware still works.'],
    why: 'A complete-cost comparison reveals whether the cheaper tablet will remain useful or simply need replacement sooner.',
    keywords: ['budget tablet guide', 'cheap tablet value', 'tablet storage', 'tablet software updates'],
  },
  'is-the-tablet-finally-replacing-the-laptop-for-students': {
    title: 'Can a tablet replace a student laptop?',
    subtitle: 'The answer depends on course software, file workflows and the quality of the keyboard setup',
    excerpt: 'A tablet can be an excellent study device, but institutional software and assignment workflows decide whether it can stand alone.',
    type: 'Evergreen guide',
    intro: 'A tablet is easy to carry, excellent for reading and annotation, and capable of long battery life. It can replace a laptop for some courses. The deciding question is not whether it can type an essay; it is whether every required application, file format, assessment system and peripheral works without a last-minute workaround.',
    sections: [
      ['Audit the course, not the marketing', ['Browser-based learning systems and common office documents usually work well. Specialist statistics, engineering, coding, proctoring and design software may require a desktop operating system or behave differently on a mobile app. External drives, printers and institutional VPNs also deserve a check.', 'Ask the department for the exact software list and minimum requirements. A remote desktop can bridge occasional gaps, but it relies on a stable connection and access to another computer.']],
      ['The keyboard changes the equation', ['A good keyboard case adds weight, cost and desk depth. Small trackpads and limited window management can slow research that involves many sources. On the other hand, pen annotation and a detachable form can make lectures and reading more comfortable than a conventional laptop.']],
      ['Run a full assignment test', ['Rehearse the workflow before the return period ends.'], ['Open, edit, export and submit the required file types.', 'Join a video call while taking notes and viewing a document.', 'Connect required storage, display and printer hardware.', 'Compare tablet plus keyboard and pen against a laptop at the same total price.']],
    ],
    takeaways: ['Required course software decides whether a tablet can stand alone.', 'Keyboard, pen and adapters can erase the portability and price advantage.', 'A complete assignment rehearsal is the best compatibility test.'],
    why: 'Students avoid an expensive mid-semester surprise by validating the full academic workflow before choosing a tablet-only setup.',
    keywords: ['tablet vs laptop student', 'student tablet guide', 'college device compatibility', 'tablet keyboard cost'],
  },
  'why-phone-cameras-stopped-chasing-megapixels': {
    title: 'Why phone cameras stopped competing on megapixels alone',
    subtitle: 'Sensor size, lenses and computational photography decide how much useful detail survives',
    excerpt: 'A phone camera is an imaging system, and its largest resolution number rarely predicts the most reliable photographs.',
    type: 'Evergreen guide',
    intro: 'Phone makers still advertise large megapixel counts, but the competition has moved toward the complete image pipeline. A tiny sensor must capture a scene through a tiny lens while the phone corrects noise, motion and limited dynamic range. Resolution can help, yet it is only the starting material for that process.',
    sections: [
      ['Pixels are often combined', ['Many high-resolution phone sensors group neighboring pixels for ordinary photos. This produces a lower-resolution file with more light information in each output pixel. Full-resolution modes can reveal extra detail in strong light, but they may be slower, noisier and less effective with moving subjects.', 'The lens must also resolve the promised detail. Edge softness, focus errors and aggressive noise reduction can erase the advantage of a larger file.']],
      ['Consistency matters more than a hero shot', ['A useful camera handles faces, motion, backlight and mixed indoor lighting predictably. Processing should keep skin and texture believable across the main, ultrawide and telephoto cameras. Video stabilization, microphone quality and lens switching can matter more than still-photo resolution.']],
      ['Compare complete results', ['Use samples from ordinary conditions, not only sunny scenes.'], ['Check moving people and pets indoors.', 'Compare color and exposure across every rear camera.', 'Inspect full files for texture and sharpening artifacts.', 'Judge shutter delay, focus reliability and video as well as resolution.']],
    ],
    takeaways: ['High-resolution phone sensors often produce lower-resolution final images.', 'Lens quality and processing determine whether extra pixels become useful detail.', 'Reliable color, focus and motion handling matter more than one ideal sample.'],
    why: 'A system-level comparison rewards the phone that consistently captures usable moments instead of the one with the largest number on the box.',
    keywords: ['phone camera megapixels', 'computational photography', 'phone sensor guide', 'camera phone comparison'],
  },
  'the-moto-z-play-has-the-best-battery-life': {
    title: 'Moto Z Play in context: an endurance-first phone from 2016',
    subtitle: 'Its original battery advantage was meaningful, but age, software support and modular accessories now define the risk',
    excerpt: 'An archive perspective on the Moto Z Play and what to check before considering a surviving unit.',
    type: 'Archive perspective',
    intro: 'The Moto Z Play stood out in 2016 by pairing a large battery with a modest processor and efficient display. It favored endurance over flagship speed and supported magnetic Moto Mods. That formula remains instructive, but an original battery and an unsupported operating system make the phone a poor default choice for sensitive everyday use now.',
    sections: [
      ['Why the battery story worked', ['Battery life comes from capacity and consumption together. The Moto Z Play avoided the fastest, most power-hungry hardware and targeted a lower display resolution than some flagships. The result showed that a balanced platform can outlast a more expensive device without a dramatically larger body.', 'Moto Mods added distinctive accessories, but they also tied value to a proprietary ecosystem whose availability could not be guaranteed indefinitely.']],
      ['What time changes', ['Lithium-ion batteries lose capacity with age even when a phone is stored. Charging ports, display adhesive and accessory contacts also wear. More importantly, an old security patch level can make banking, authentication and work accounts inappropriate regardless of physical condition.']],
      ['If you are evaluating one', ['Treat it as a collection or limited-purpose device, not an automatic daily-driver bargain.'], ['Check battery swelling, runtime and charging stability.', 'Confirm the last available security update and app requirements.', 'Test any Moto Mod rather than assuming compatibility.', 'Compare battery-replacement cost with a supported budget phone.']],
    ],
    takeaways: ['The Moto Z Play proved that efficient components can matter as much as battery size.', 'A decade-old battery and security status now dominate the purchase decision.', 'Moto Mods add interest but also depend on an obsolete proprietary ecosystem.'],
    why: 'The archive lesson remains useful, while a present-day security and battery warning keeps nostalgia from becoming unsafe buying advice.',
    keywords: ['Moto Z Play archive', 'Moto Z Play battery', 'used Android phone safety', 'Moto Mods'],
  },
  'lg-v20-review-lots-of-features-less-refinement': {
    title: 'LG V20 in context: enthusiast features with lasting trade-offs',
    subtitle: 'A removable battery, headphone hardware and manual controls made it distinctive, but age has changed the verdict',
    excerpt: 'An archive perspective on the LG V20 and the risks of using an unsupported phone today.',
    type: 'Archive perspective',
    intro: 'The LG V20 arrived in 2016 with features that later became rare: a removable battery, expandable storage, a headphone-focused audio system and extensive manual video controls. It appealed to enthusiasts precisely because it resisted simplification. The same phone today must be evaluated around battery quality, carrier compatibility and discontinued software support.',
    sections: [
      ['What the V20 tried to preserve', ['Its removable rear cover made battery replacement straightforward, while microSD storage and a 3.5 mm output supported large local media libraries. Manual audio and video options offered more control than many contemporaries. These were practical choices, not merely specification decoration.', 'The trade-off was a busier interface and a device whose many features did not always feel integrated. Camera consistency, performance under heat and regional model differences were important parts of the original comparison.']],
      ['Removable does not mean new', ['Replacement batteries sold years later can be old stock or poorly made. A cell should come from a reputable source and be checked for swelling and unstable charging. Old Android security patches remain a separate risk that a fresh battery cannot solve.']],
      ['A safe archive evaluation', ['Use the exact model number because radio bands and bootloader options vary.'], ['Check security-patch date before adding personal accounts.', 'Test cameras, microphones, headphone output and charging.', 'Inspect batteries and avoid unknown cells.', 'Choose a supported device for banking, work and primary communications.']],
    ],
    takeaways: ['The V20 combined removable power, expandable storage and unusual media controls.', 'Replacement-battery quality and model variants require careful checking.', 'Unsupported software makes it unsuitable for sensitive primary use.'],
    why: 'The phone remains an interesting design reference, but its present-day security limits must be clearer than its launch-era feature list.',
    keywords: ['LG V20 archive', 'removable battery phone', 'used Android security', 'LG V20 audio'],
  },
  'galaxy-s7-lineup-with-new-jet-black-color': {
    title: 'Galaxy S7 Jet Black in context: when color carried a product cycle',
    subtitle: 'A cosmetic refresh can renew attention without changing the hardware underneath',
    excerpt: 'An archive perspective on the Galaxy S7 color update and the checks that matter for old phones now.',
    type: 'Archive perspective',
    intro: 'Adding a new finish late in a phone\'s retail life is a familiar way to make established hardware feel current. The Jet Black Galaxy S7 did not change the processor, camera or software foundation; it changed the shelf story. That makes it a useful example of how color can extend a product cycle without extending its technical life.',
    sections: [
      ['Why a finish can matter', ['Color is visible in every advertisement and can reach buyers who ignored the launch palette. It is cheaper and faster than redesigning hardware, and it helps retailers create a fresh promotion. A glossy dark surface may also show fingerprints and fine scratches more readily, so appearance has its own ownership trade-off.', 'Collectors can value a less common finish, but rarity does not improve performance, battery health or support.']],
      ['The hardware is now the issue', ['A Galaxy S7 is far beyond its normal security-support period. Sealed batteries age, water resistance cannot be assumed after years of wear or repair, and older network configurations may lose carrier compatibility. A pristine exterior does not resolve those limits.']],
      ['How to read the archive', ['Separate the marketing event from a current product recommendation.'], ['Do not rely on original water-resistance claims for a used unit.', 'Check battery condition and screen burn-in.', 'Verify carrier and application compatibility.', 'Keep unsupported phones away from sensitive accounts.']],
    ],
    takeaways: ['The Jet Black release changed presentation, not the Galaxy S7 platform.', 'Cosmetic rarity says nothing about battery, security or network support.', 'Old water-resistance ratings should not be trusted after years of use.'],
    why: 'Recognizing a cosmetic product-cycle tactic helps readers evaluate what actually changed and avoid treating archive attention as current endorsement.',
    keywords: ['Galaxy S7 Jet Black', 'phone color refresh', 'Galaxy S7 archive', 'used phone security'],
  },
  'sync-by-50-wireless-headphones-review': {
    title: 'Sync by 50 in context: reading an old wireless-headphone review',
    subtitle: 'Fit, battery condition and modern Bluetooth behavior now matter more than a launch-era feature list',
    excerpt: 'An archive guide to understanding an early wireless headphone and evaluating any surviving pair safely.',
    type: 'Archive perspective',
    intro: 'The Sync by 50 headphones came from an era when wireless audio still asked buyers to accept more compromise in weight, controls and connection behavior. An original review could compare sound and comfort against 2016 rivals. Today, the sealed battery and aging electronics make the condition of a particular pair more important than the old ranking.',
    sections: [
      ['Read sound claims carefully', ['Headphone sound depends on fit, ear shape, seal and listening level. Descriptions such as powerful bass or clear treble are useful only when tied to specific tracks and comparisons. A model\'s tuning does not improve with rarity, and deteriorated pads can alter both comfort and frequency balance.', 'Modern devices may still support older Bluetooth audio, but multipoint behavior, microphone quality and latency can lag current expectations. A wired fallback is valuable only if the cable and passive mode work.']],
      ['The battery is the limiting part', ['A rechargeable cell loses capacity over time and may be difficult to replace. Long storage can leave it unable to charge. Hinges, headbands and synthetic ear pads also age even on lightly used examples.']],
      ['Before using a surviving pair', ['Inspect physical and electrical condition before a long charge.'], ['Stop if the enclosure is swollen, hot or distorted.', 'Test wired and wireless modes with your own devices.', 'Check both channels, microphone and controls.', 'Include new pads and battery risk when comparing price.']],
    ],
    takeaways: ['An old wireless review reflects the alternatives and expectations of its time.', 'Pad condition changes sound, while battery age can end the product\'s useful life.', 'A working cable does not guarantee that wireless controls or microphones meet current needs.'],
    why: 'Archive framing preserves the design history without implying that an aging sealed-battery product is a sensible current purchase.',
    keywords: ['Sync by 50 archive', 'used wireless headphones', 'headphone battery safety', 'Bluetooth headphone history'],
  },
  'battle-of-the-portable-planar-magnetic-headphones': {
    title: 'How to choose portable planar-magnetic headphones',
    subtitle: 'Driver technology is only useful when power, weight, isolation and fit work outside the home',
    excerpt: 'Planar headphones can sound controlled and spacious, but portable use exposes trade-offs that a driver label cannot settle.',
    type: 'Evergreen guide',
    intro: 'Planar-magnetic headphones use a thin diaphragm driven across a broad area. The approach can deliver low distortion and controlled bass, but it does not guarantee better sound, and portable models still have to solve weight, efficiency, leakage and durability.',
    sections: [
      ['Portable means more than foldable', ['A headphone that fits in a case may still be heavy during a commute. Open or lightly sealed designs can leak music and admit outside noise, forcing unsafe listening levels. Clamp, pad depth and heat become more important over a full journey than they seem in a short demonstration.', 'Efficiency also varies. A phone may reach adequate volume but offer little headroom on quiet recordings. An amplifier adds cost, cables and another battery, weakening the promise of portability.']],
      ['The driver label is not a verdict', ['Tuning, cup construction and seal shape the response as much as the driver principle. Dynamic-driver headphones can outperform a poorly tuned planar model. Compare at matched loudness, because the slightly louder option often appears more detailed.']],
      ['Run a commute test', ['Use the source device and music service you normally carry.'], ['Check volume headroom without an external amplifier.', 'Listen for leakage at the level you would use in public.', 'Wear the headphones long enough to judge weight and pad heat.', 'Price replacement pads, cables and a protective case.']],
    ],
    takeaways: ['Planar technology does not automatically produce better tuning.', 'Weight, leakage and power demand can undermine portable use.', 'A matched-volume test with the actual phone is more useful than a driver label.'],
    why: 'The right portable headphone must succeed as a complete travel system, not only as an interesting transducer on a specification sheet.',
    keywords: ['portable planar headphones', 'planar magnetic guide', 'headphone power requirements', 'headphone leakage'],
  },
  'bragi-headphone-review-finally-wireless-earbuds-worth-buying': {
    title: 'Bragi Headphone in context: the promise and risk of early wireless earbuds',
    subtitle: 'A pioneering form factor also depended on tiny batteries, firmware and a young connection standard',
    excerpt: 'An archive perspective on early true-wireless earbuds and why their app and battery dependencies matter today.',
    type: 'Archive perspective',
    intro: 'Early true-wireless earbuds had to prove that two tiny radios could stay synchronized, fit securely and last through a commute. The Bragi Headphone belongs to that formative period. Its historical interest is clear, but a sealed miniature battery and discontinued software ecosystem make any present-day unit a risky practical purchase.',
    sections: [
      ['What early wireless had to solve', ['Manufacturers balanced antenna placement, connection stability, controls and battery life in very little space. Firmware updates could materially change behavior, which made the companion software part of the product. Fit affected both bass response and whether an earbud stayed in place.', 'Current earbuds benefit from years of chipset and protocol improvement. An old review should therefore be read against the alternatives then available, not against today\'s expectations.']],
      ['Tiny batteries age quickly', ['Earbud cells start small and are exposed to repeated charge cycles and heat inside a case. Even a lightly used pair may have little runtime after years in storage. If the app, account service or firmware package is gone, reset and pairing problems may be impossible to solve.']],
      ['A collection, not a default recommendation', ['Avoid paying a practical-use premium without a full demonstration.'], ['Test both earbuds separately and together.', 'Measure a complete discharge cycle at moderate volume.', 'Confirm reset instructions work without a discontinued service.', 'Inspect the case battery and charging contacts for heat or damage.']],
    ],
    takeaways: ['Early true-wireless products depended heavily on firmware and radio stability.', 'Very small sealed batteries make age a decisive limitation.', 'Discontinued apps or services can turn a minor pairing fault into a permanent one.'],
    why: 'The product\'s place in wireless-audio history can be appreciated without presenting obsolete battery hardware as a current-value choice.',
    keywords: ['Bragi Headphone archive', 'early true wireless earbuds', 'earbud battery age', 'wireless earbud history'],
  },
  'akg-n60nc-headphones-review-converting-the-non-believers': {
    title: 'AKG N60NC in context: compact noise cancelling before it became standard',
    subtitle: 'An archive perspective on travel headphones, with present-day checks for battery, pads and connections',
    excerpt: 'The N60NC helped make compact noise cancelling credible, but a used pair must be judged by its condition and exact version.',
    type: 'Archive perspective',
    intro: 'The AKG N60NC offered active noise cancellation in a compact on-ear design at a time when travel models were often bulky. It demonstrated that portability and useful low-frequency noise reduction could coexist. It also carried the usual on-ear trade-offs in pressure, seal and long-session comfort.',
    sections: [
      ['What the original design solved', ['Active noise cancellation is most effective against steady low-frequency sound such as engines and ventilation. The passive seal still handles much of the higher-frequency chatter. An on-ear cup packs smaller but can lose seal around glasses and press directly on the ear.', 'Different wired and wireless versions of a product can behave differently, so an archive name is not enough. Connector type, microphone path and passive playback should be confirmed for the exact unit.']],
      ['Condition changes the sound', ['Flattened pads reduce comfort and change the acoustic seal. A tired battery may shorten cancellation time or make wireless behavior unstable. Replacement pads can restore fit, but third-party materials may alter tuning.']],
      ['Used-pair checks', ['Wear the pair for at least the length of a normal commute.'], ['Test cancellation with a steady fan or transit noise.', 'Check hinges, cable sockets and pad condition.', 'Confirm whether audio continues when the battery is empty.', 'Compare the full cost with a supported modern model.']],
    ],
    takeaways: ['Noise cancellation works best on steady low-frequency sound.', 'On-ear portability trades against seal and long-session comfort.', 'Pad and battery condition can change the experience more than an old review suggests.'],
    why: 'An archive review becomes useful current guidance when it explains both the original achievement and the failure points created by age.',
    keywords: ['AKG N60NC archive', 'used noise cancelling headphones', 'headphone pad condition', 'travel headphones'],
  },
  'long-term-review-six-months-with-a-folding-phone': {
    title: 'What six months can reveal about a folding phone',
    subtitle: 'A useful long-term review should track hinge behavior, display wear, battery patterns and changed habits',
    excerpt: 'A framework for judging folding phones after the novelty period without pretending every unit will age the same way.',
    type: 'Evergreen guide',
    intro: 'A folding phone can feel convincing in a store and reveal different trade-offs months later. The hinge collects debris, the inner display develops visible wear and the owner either builds the larger screen into daily work or stops unfolding it. A credible long-term review should document those changes and the conditions that produced them.',
    sections: [
      ['What to track over time', ['Hinge resistance, alignment and sound should be noted at the beginning and revisited after ordinary exposure to pockets and bags. The inner screen needs checks for protector lifting, scratches, dead pixels and changes along the crease. None of these observations from one unit proves a population-wide failure rate.', 'Battery data should separate folded and unfolded use, brightness and demanding tasks. The larger display can encourage more multitasking, so a change in runtime may reflect changed behavior rather than cell degradation alone.']],
      ['Software can decide the value', ['Apps that use the outer and inner screens well turn the mechanism into a capability. Awkward aspect ratios, lost state during transitions and poor split-screen support turn it into friction. A long-term review should identify which habits actually changed.']],
      ['Questions after the novelty fades', ['Look for documented condition and repeatable observations.'], ['Did hinge behavior or screen condition change?', 'Which apps benefited from the larger display?', 'How did repair terms and insurance affect ownership cost?', 'Would the reviewer still accept the weight and price premium?']],
    ],
    takeaways: ['Long-term evidence should document change without generalizing from one unit.', 'Battery results must account for different folded and unfolded usage.', 'App behavior and changed habits decide whether the mechanism earns its cost.'],
    why: 'A disciplined six-month review exposes ownership trade-offs that a launch-day impression cannot, while keeping anecdote in its proper place.',
    keywords: ['folding phone long term review', 'foldable durability', 'foldable screen wear', 'hinge reliability'],
  },
  'review-the-noise-cancelling-earbuds-that-finally-got-comfortable': {
    title: 'How to judge noise-cancelling earbuds for comfort',
    subtitle: 'Fit, pressure behavior and control sounds can matter more than maximum attenuation',
    excerpt: 'A practical review framework for earbuds that need to remain comfortable through a flight or working day.',
    type: 'Evergreen guide',
    intro: 'Comfort is not a single measurement. Ear shape, tip size, shell pressure, weight distribution and the behavior of active noise cancellation all interact. An earbud that blocks the most sound in a short test can still be the wrong choice for a long journey.',
    sections: [
      ['Separate fit from cancellation', ['The silicone or foam tip creates a passive seal, which affects bass and blocks higher-frequency sound. Active cancellation mainly targets steady lower-frequency noise. A poor seal can make both performance and sound inconsistent, while an oversized shell can press painfully even when the tip fits.', 'Some listeners also notice a pressure-like sensation or become tired by hiss and aggressive adaptation. These reactions are personal and deserve a long test rather than a universal claim.']],
      ['Controls affect physical comfort', ['Repeatedly pushing a button can drive the earbud deeper into the canal. Loud confirmation tones and sensitive touch panels create a different kind of fatigue. Transparency mode, sidetone and single-ear use matter for people who need to speak or remain aware.']],
      ['Use the return window well', ['Try every included tip before deciding the sound is wrong.'], ['Wear the earbuds continuously for at least an hour.', 'Test walking, eating and speaking for movement in the seal.', 'Compare cancellation, transparency and off modes.', 'Check whether controls work without force or accidental taps.']],
    ],
    takeaways: ['Tip seal, shell shape and cancellation behavior contribute separately to comfort.', 'The strongest cancellation is not automatically the easiest to wear.', 'A long fit test and tip comparison are more useful than a universal comfort claim.'],
    why: 'Comfort determines whether noise cancellation can be used for the full journey, so it belongs beside sound and battery life in any verdict.',
    keywords: ['comfortable noise cancelling earbuds', 'earbud fit guide', 'ANC pressure', 'earbud tips'],
  },
  'review-a-mechanical-keyboard-built-for-people-who-hate-loud-keyboards': {
    title: 'How to choose a quiet mechanical keyboard',
    subtitle: 'Switches help, but the case, keycaps, stabilizers and typing technique complete the sound',
    excerpt: 'A practical guide to lowering mechanical-keyboard noise without losing the feel you want.',
    type: 'Evergreen guide',
    intro: 'A quiet mechanical keyboard is a system, not a switch color. The switch creates one part of the sound, while the keycap hitting the plate, the stabilizer under large keys and the case cavity create others. A product can use silent switches and still sound sharp or hollow on a desk.',
    sections: [
      ['Where the noise comes from', ['A key makes sound on the downward stroke and again when it returns. Silent switches add internal dampers to reduce both impacts. Thick keycaps can lower pitch, lubricated stabilizers reduce rattle and case foam can control resonance. A desk mat changes the reflection and vibration reaching the work surface.', 'Clicky switches deliberately add sound and are unsuitable when quiet operation is the priority. Linear and tactile silent switches feel different, so noise reduction should not override comfort.']],
      ['Measurement needs context', ['A decibel figure depends on microphone distance, room noise and typing force. Short recordings should be level-matched and made with the same setup. Tone matters too: a low thud may be less distracting than a quieter high-pitched tick.']],
      ['Build a quiet shortlist', ['Listen with headphones off and at normal desk distance.'], ['Test spacebar, Enter and Backspace for stabilizer noise.', 'Compare return-stroke sound as well as bottom-out sound.', 'Check whether switches are replaceable.', 'Include desk surface and typing pressure in the evaluation.']],
    ],
    takeaways: ['Switches are only one source of keyboard noise.', 'Stabilizers, keycaps, case resonance and desk surface shape the result.', 'Sound comparisons require matched distance, level and typing force.'],
    why: 'A system view helps people choose a genuinely quiet keyboard rather than paying for a silent-switch label that ignores the rest of the board.',
    keywords: ['quiet mechanical keyboard', 'silent keyboard switches', 'keyboard sound guide', 'office mechanical keyboard'],
  },
  'apple-retina-imac-pictures': {
    title: 'Retina iMac design archive: what the pictures still explain',
    subtitle: 'A visual record of Apple\'s all-in-one transition to a high-density desktop display',
    excerpt: 'These archive images are most useful as design context, not as a current buying recommendation.',
    type: 'Archive perspective',
    intro: 'Product photographs can preserve details that a specification table misses: proportions, port placement, reflections, bezels and the amount of desk space a machine occupies. Images of the Retina iMac document the moment a very high-density display entered Apple\'s familiar all-in-one form.',
    sections: [
      ['What to look for in the images', ['Front views show how the display and black border dominate the design. Angled views reveal the contrast between a thin edge and the deeper central enclosure needed for components and cooling. Rear views explain the reach required for ports and the tidy appearance created by hiding them.', 'A photo cannot establish color accuracy, fan noise or internal condition. Lighting and editing can also make a glossy display look less reflective than it is in a real room.']],
      ['Why this is archive material', ['Original configurations now vary widely in storage type, memory and operating-system support. An all-in-one also ties the value of the display to aging computer hardware. A beautiful exterior does not reveal drive health, image retention, dust, thermal history or prior repairs.']],
      ['If the pictures prompt a used purchase', ['Move from visual interest to a model-specific inspection.'], ['Confirm year, processor, memory, storage and supported operating system.', 'Check the display on solid light and dark backgrounds.', 'Test every port, speaker, camera and wireless connection.', 'Compare with a separate monitor and supported compact computer.']],
    ],
    takeaways: ['Archive photos reveal physical design and port choices better than specifications.', 'They cannot establish display accuracy, internal condition or support life.', 'An all-in-one purchase joins the risks of an aging screen and computer.'],
    why: 'Clear archive labeling lets the visual record remain useful without allowing attractive product photography to imply present-day value.',
    keywords: ['Retina iMac pictures', 'iMac design archive', 'used iMac guide', 'Apple all in one'],
  },
  'wireless-charging-pads-finally-stopped-overheating': {
    title: 'Why wireless charging pads run hot, and how to choose a cooler one',
    subtitle: 'Alignment, power negotiation, cases and room temperature determine more than the wattage on the box',
    excerpt: 'Warmth is normal during wireless charging, but persistent high heat can slow charging and accelerate battery wear.',
    type: 'Evergreen guide',
    intro: 'Wireless charging transfers energy across a small air gap, so some energy becomes heat instead of reaching the battery. The phone also warms as it charges. Good alignment, compatible power negotiation and sensible thermal control keep that heat manageable; poor alignment and trapped airflow make it worse.',
    sections: [
      ['Where the heat comes from', ['The transmitting coil in the pad and receiving coil in the phone work best when centered. If they are offset, the system may draw more power for less useful output. Thick cases, metal objects and magnetic accessories can interfere, while a warm room leaves less thermal headroom.', 'Phones protect themselves by reducing charging speed when temperature rises. A high advertised wattage therefore does not guarantee a faster full charge, especially when the device spends much of the session throttled.']],
      ['What improved pads do', ['Better products communicate reliably with supported phones, guide alignment and spread or remove heat with materials, vents or a fan. Foreign-object detection can stop power when keys or other metal sit on the pad. Certification and a reputable power adapter matter more than decorative cooling claims.']],
      ['A cooler setup', ['Use the phone and adapter combinations named by the manufacturer.'], ['Center the phone and remove interfering accessories.', 'Keep the pad on a hard, open surface.', 'Avoid charging in direct sun or under bedding.', 'Stop using equipment that smells, deforms or becomes unusually hot.']],
    ],
    takeaways: ['Wireless charging always loses some energy as heat.', 'Misalignment, incompatible accessories and trapped airflow increase temperature.', 'Sustained charging speed matters more than the largest advertised wattage.'],
    why: 'Managing heat improves charging consistency and can reduce avoidable stress on the phone\'s battery.',
    keywords: ['wireless charging heat', 'cool wireless charger', 'charging pad alignment', 'battery temperature'],
  },
  'budget-earbuds-that-quietly-beat-the-flagship-pair': {
    title: 'When budget earbuds are the smarter buy',
    subtitle: 'Fit, tuning and dependable basics can matter more than premium features you rarely use',
    excerpt: 'A lower price can be better value when the earbuds fit well, sound balanced and avoid unnecessary ecosystem lock-in.',
    type: 'Evergreen guide',
    intro: 'Premium earbuds often bundle advanced cancellation, spatial effects, automatic device switching and an elaborate app. Budget models can win when a listener values secure fit, balanced sound, simple controls and a replaceable purchase more than those extras. The comparison should be specific, not a claim that cheap always beats expensive.',
    sections: [
      ['Start with the fundamentals', ['A reliable seal controls bass response and isolation. Sensible tuning reduces the need for corrective equalization. Connection stability, usable microphones and controls that work in rain or gloves can matter more than a feature demonstrated once.', 'Premium models may still justify their price with stronger cancellation, better transparency, hearing features or seamless integration across several devices. Those advantages are valuable only if the owner uses them.']],
      ['Budget has its own risks', ['Cheaper earbuds may have shorter update support, rougher microphones, limited replacement tips and less consistent quality control. Apps can request unnecessary permissions or disappear. Return terms are important because fit and unit variation cannot be settled from a specification sheet.']],
      ['Compare value honestly', ['Choose two or three situations that matter most.'], ['Test fit and seal before judging sound.', 'Record calls in quiet and noisy places.', 'Check single-ear use, controls and connection recovery.', 'Price replacement tips and the likely cost of loss.']],
    ],
    takeaways: ['Good fit, tuning and reliable controls can outweigh a long premium feature list.', 'Expensive features have value only when they match real habits.', 'Budget models still require scrutiny of microphones, support and quality control.'],
    why: 'A task-based comparison can save money without pretending that price alone predicts either quality or long-term value.',
    keywords: ['budget earbuds value', 'cheap vs premium earbuds', 'earbud buying guide', 'wireless earbud fit'],
  },
};

const currentNotes = {
  'measles-cases-near-1000-in-first-two-months-of-2026': {
    type: 'Current-affairs note',
    takeaways: ['The national total had passed 2,700 reported cases across 32 states and New York City at publication.', 'A large South Carolina outbreak was driving much of the increase.', 'Sustained transmission can put the United States\' measles-elimination status under review.'],
    why: 'Measles spreads efficiently in undervaccinated communities, so local clusters can become a wider public-health test even when national vaccination coverage looks high.',
  },
  'indiana-severe-storms-disaster-declaration': {
    type: 'Current-affairs note',
    takeaways: ['Severe storms and flooding caused deaths, displacement and widespread infrastructure damage.', 'Power outages peaked above 363,000 customers as some areas received six to nine inches of rain.', 'A disaster declaration would determine which federal recovery programs become available.'],
    why: 'The declaration process shapes the speed and type of help available to households, local governments and damaged public infrastructure.',
  },
  'hawaii-tropical-storm-lala-emergency-declaration': {
    type: 'Current-affairs note',
    takeaways: ['Lala threatened the Big Island with prolonged heavy rain rather than wind alone.', 'The National Hurricane Center warned of life-threatening flash flooding and landslides.', 'An emergency declaration positioned state and federal agencies to support response and recovery.'],
    why: 'Rainfall totals in steep island terrain can create dangerous local flooding even when a storm\'s wind category receives most of the attention.',
  },
  'student-loan-forgiveness-credit-reversal-confusion': {
    type: 'Current-affairs note',
    takeaways: ['Some borrowers saw qualifying-payment counts fall after account adjustments.', 'The Education Department described at least some reversals as intentional corrections to prior coding.', 'Public Service Loan Forgiveness normally requires 120 qualifying payments and complete employment records.'],
    why: 'A changed payment count can alter a borrower\'s forgiveness timeline, making documentation and a clear appeal path consequential rather than merely administrative.',
  },
  'h1b-fee-court-ruling-immigration-policy': {
    type: 'Current-affairs note',
    takeaways: ['An appeals court left a lower-court H-1B fee ruling in place while the dispute continued.', 'The policy at issue would impose a $100,000 fee in covered cases.', 'Employers and applicants still faced uncertainty because further appeal or agency guidance could change implementation.'],
    why: 'A fee of that size can change hiring plans, especially for smaller employers, while the unresolved litigation makes timing and eligibility difficult to plan.',
  },
  'target-pulls-halloween-costume-backlash': {
    type: 'Current-affairs note',
    takeaways: ['Target removed a children\'s Halloween costume after criticism of its imagery.', 'The company apologized, but the withdrawal did not end the debate over the design and approval process.', 'The episode illustrates how product review, marketplace speed and cultural context intersect.'],
    why: 'A retailer\'s response after a complaint matters, but the more useful question is how its review process allowed a foreseeable concern to reach shelves.',
  },
  'nepal-tibet-border-glacial-flood-disaster': {
    type: 'Current-affairs note',
    title: 'Nepal-Tibet border flood: what is known and what remains uncertain',
    subtitle: 'Later official figures sharply raised the toll after the Bhote Koshi disaster, while access and communications complicated the count',
    excerpt: 'A source-based update on the Bhote Koshi flood, the changing casualty estimates and the recovery questions facing remote Himalayan communities.',
    takeaways: ['A destructive surge traveled through the Bhote Koshi corridor after a high-mountain slope failure and river blockage.', 'By September 7, Nepal\'s disaster agency reported more than 1,300 deaths and roughly 5,000 people missing, according to the Associated Press.', 'Early totals changed rapidly because roads, communications and access to remote communities were disrupted.'],
    why: 'The scale of the loss and the difficulty of establishing a reliable count show why fast-moving disaster figures must be dated, sourced and treated as provisional.',
    content: [
      { type: 'paragraph', text: 'A destructive flood moved through the Bhote Koshi border corridor on August 26 after a high-mountain slope failure and temporary river blockage. The surge damaged transport links, settlements and energy infrastructure in difficult terrain. Early official counts were incomplete because roads and communications were cut.' },
      { type: 'heading', id: 'how-the-event-unfolded', text: 'How the event unfolded' },
      { type: 'paragraph', text: 'Reports from the first days described a mass of ice and rock entering a tributary above the border corridor, temporarily holding back water before a surge traveled downstream. Precise attribution in a remote high-altitude catchment takes time: satellite analysis, field access and hydrological records all contribute, and early explanations should not be treated as a final scientific assessment.' },
      { type: 'heading', id: 'why-the-numbers-changed', text: 'Why the numbers changed' },
      { type: 'paragraph', text: 'On August 27, authorities were reporting at least 390 deaths and about 1,400 people missing across affected areas. By September 7, Nepal\'s disaster management agency said more than 1,300 people had died and roughly 5,000 were missing, according to the Associated Press. The later figures supersede the headline counts in the first version of this post.' },
      { type: 'paragraph', text: 'A missing-person total is not the same as a confirmed death toll. Displaced residents, damaged phone networks and incomplete local registers can all enlarge the number of people who are temporarily unaccounted for. The figures should therefore be read with their dates and sources attached.' },
      { type: 'heading', id: 'the-longer-recovery', text: 'The longer recovery' },
      { type: 'paragraph', text: 'Immediate work centered on rescue, shelter, medical care and restoring access. Recovery also raises longer questions about bridge design, warning systems and development in narrow valleys exposed to landslides and glacial hazards. Nepal\'s government issued an international relief appeal, while health authorities published response updates for affected districts.' },
      { type: 'paragraph', text: 'This post was updated on September 9 to replace early casualty estimates with later figures and to make the uncertainty around missing-person counts explicit. The linked official notices and subsequent assessments should be consulted for further changes.' },
    ],
    sources: [
      { publisher: 'Nepal Ministry of Home Affairs', label: 'International disaster-relief appeal', url: 'https://moha.gov.np/en/post/ha-ra-tha-ka-apa-l-11', accessed: 'September 9, 2026' },
      { publisher: 'Nepal Health Emergency Operation Center', label: 'Bhote Koshi response update', url: 'https://heoc.mohp.gov.np/events/2026-rasuwa-flash-floods?doc=91067', accessed: 'September 9, 2026' },
      { publisher: 'Associated Press', label: 'September 7 update citing Nepal\'s disaster agency', url: 'https://apnews.com/article/f5477d09ca1c56541450828302818d73', accessed: 'September 9, 2026' },
    ],
  },
  'iran-oman-hormuz-shipping-corridor-proposal': {
    type: 'Current-affairs note',
    takeaways: ['Iran and Oman proposed a temporary navigational corridor through the Strait of Hormuz.', 'The proposal paired the corridor with coordinated mine-clearing work.', 'Any practical effect would depend on implementation, maritime security and the response of shipping operators and other governments.'],
    why: 'The Strait is a major oil-transit route, so even a temporary change in navigational risk can affect shipping decisions, insurance and energy markets.',
    sources: [
      { publisher: 'Foreign Ministry of Oman', label: 'Oman-Iran joint statement', url: 'https://www.fm.gov.om/en/53722/', accessed: 'September 9, 2026' },
      { publisher: 'U.S. Energy Information Administration', label: 'World oil transit chokepoints', url: 'https://www.eia.gov/international/analysis/special-topics/world-oil-transit-chokepoints', accessed: 'September 9, 2026' },
    ],
  },
  'uk-breaks-up-science-innovation-technology-department': {
    type: 'Current-affairs note',
    takeaways: ['The new UK government redistributed functions previously held by the science and technology department.', 'Research, digital policy and technology responsibilities continued under new departmental arrangements rather than disappearing.', 'The policy impact depends on budgets, ministerial authority and how cross-government programs are managed after the change.'],
    why: 'Machinery-of-government changes can alter priorities and accountability even when the underlying programs continue.',
    sources: [
      { publisher: 'Government of the United Kingdom', label: 'Machinery of government changes fact sheet', url: 'https://www.gov.uk/government/news/machinery-of-government-changes-fact-sheet', accessed: 'September 9, 2026' },
    ],
  },
  'typhoon-dolphin-china-strongest-storm-of-year': {
    type: 'Current-affairs note',
    takeaways: ['Typhoon Dolphin brought destructive wind, rain and coastal hazards to China.', 'The storm arrived during an already active regional season, increasing pressure on response systems.', 'Local rainfall, surge and landslide exposure can matter more than a single maximum-wind ranking.'],
    why: 'Storm labels summarize intensity, but community risk depends on the path, terrain, building exposure and the timing of warnings and evacuations.',
  },
  'nvidia-q2-earnings-data-center-revenue-surge': {
    type: 'Business analysis',
    takeaways: ['Nvidia reported quarterly revenue of $96.2 billion, led by $89 billion from data center sales.', 'The reported gross margin was about 75%, keeping profitability as important as top-line growth.', 'The results showed continued concentration of spending around AI infrastructure.'],
    why: 'Nvidia\'s scale makes its results a signal for data-center investment, but customers, supply constraints and the durability of extraordinary margins still shape the outlook.',
  },
  'boeing-sells-wisk-insitu-skygrid-to-archer-aviation': {
    type: 'Business analysis',
    takeaways: ['Boeing agreed to transfer Wisk, Insitu and SkyGrid interests to Archer Aviation.', 'The structure combined acquired technology with investment and warrants rather than a simple cash sale.', 'Closing and strategic value remained dependent on regulatory approvals and integration.'],
    why: 'The deal could consolidate autonomous-flight capabilities inside a major eVTOL company while changing Boeing\'s exposure to the sector.',
  },
  'westjet-flight-attendants-strike-cancellations': {
    type: 'Business analysis',
    takeaways: ['A flight-attendant work stoppage caused cancellations and passenger disruption.', 'WestJet and CUPE later announced a tentative agreement intended to end further disruption.', 'Operational recovery could still take time after an agreement because aircraft and crews must be repositioned.'],
    why: 'For travelers, a labor settlement does not instantly restore a schedule; rebooking rights and airline communications remain important during the recovery.',
  },
  'dicks-sporting-goods-foot-locker-earnings-miss': {
    type: 'Business analysis',
    takeaways: ['Dick\'s reported quarterly results below some market expectations.', 'Foot Locker\'s performance and integration weighed on the combined picture.', 'Management\'s margin and outlook commentary mattered more than the first share-price reaction alone.'],
    why: 'An acquisition can add revenue while reducing near-term earnings quality, so investors need to separate the core business from integration costs and assumptions.',
  },
  'gold-prices-three-month-high-treasury-buyback': {
    type: 'Money note',
    takeaways: ['Gold reached a three-month high as bond-market policy and rate expectations shifted.', 'Treasury buybacks can support market liquidity but do not mechanically dictate the gold price.', 'Real yields, the dollar and demand for defensive assets remain major competing drivers.'],
    why: 'Connecting one policy announcement to one market move is tempting; a more useful explanation separates correlation from the several forces that price gold.',
  },
  'fed-holds-rates-steady-july-meeting-dissent': {
    type: 'Money note',
    takeaways: ['The Federal Reserve held its policy rate at 3.5% to 3.75% in a 9-3 vote.', 'Three regional bank presidents dissented in favor of an increase.', 'The split highlighted disagreement over the balance between inflation risk and economic slowing.'],
    why: 'The decision affects borrowing and saving conditions, while the dissents provide information about how the committee may react to incoming data.',
  },
  'mortgage-rates-treasury-yields-late-august-2026': {
    type: 'Money note',
    takeaways: ['Average mortgage rates remained in the mid-6% range at the time of publication.', 'Daily borrower quotes varied with Treasury yields, credit profile, fees and loan structure.', 'A small headline-rate change can be outweighed by points, closing costs or the length of ownership.'],
    why: 'Homebuyers need a same-day, like-for-like loan estimate rather than treating a national weekly average as the rate they will receive.',
  },
  'credit-card-debt-1-26-trillion-delinquency-report': {
    type: 'Money note',
    takeaways: ['U.S. credit-card balances approached $1.26 trillion in the cited household-debt report.', 'The level should be read alongside population, income, inflation and available credit.', 'Delinquency transitions show financial stress more directly than the balance total by itself.'],
    why: 'A record nominal balance can sound alarming without context; payment difficulty and the distribution of debt are more useful indicators for household risk.',
  },
  'dow-sp500-record-close-earnings-season': {
    type: 'Money note',
    takeaways: ['The Dow closed above 54,000 for the first time at publication.', 'A record index level reflected both company earnings and the prices assigned to those earnings.', 'Breadth, sector concentration, yields and oil prices provided context the headline number could not.'],
    why: 'Index milestones are memorable but do not describe every stock or predict the next return; valuation and market breadth make the record more interpretable.',
  },
  'nasdaq-tech-rally-ahead-nvidia-earnings': {
    type: 'Money note',
    takeaways: ['The Nasdaq rose as chip stocks advanced before Nvidia\'s earnings report.', 'Positioning ahead of a major result can amplify moves that later reverse.', 'Bond yields and concentration in a few large technology companies remained important context.'],
    why: 'A pre-earnings rally measures expectations, not the eventual business result, so readers should separate market positioning from operating evidence.',
  },
};

const notes = {
  'Current-affairs note': 'This source-based blog post summarizes dated material available at publication; it is not live reporting. Figures and official assessments may change, so follow the linked records for later updates.',
  'Business analysis': 'This source-based blog post combines dated company or regulatory material with editorial context. Company claims are identified as such, and subsequent filings may change the picture.',
  'Money note': 'This source-based blog post explains a dated market or household-finance development. It is general information, not individualized financial advice; rates, prices and reported totals change.',
};

function makeContent(spec) {
  const content = [{ type: 'paragraph', text: spec.intro }];
  for (const [heading, paragraphs, items] of spec.sections) {
    const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    content.push({ type: 'heading', id, text: heading });
    for (const text of paragraphs) content.push({ type: 'paragraph', text });
    if (items) content.push({ type: 'list', items });
  }
  return content;
}

function countWords(post) {
  return post.content.reduce((count, block) => {
    const value = block.text || (block.items || []).join(' ');
    return count + value.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

function readingTime(post) {
  return `${Math.max(2, Math.ceil(countWords(post) / 210))} minutes read`;
}

function guideNote(type) {
  return type === 'Archive perspective'
    ? 'This archive perspective explains the product in its original context and is not a current recommendation. Prices, batteries, software support and availability change; verify the exact unit before buying.'
    : 'This is an editorial guide, not a claim of new laboratory testing. Specifications, prices, support and availability change; verify current details for the exact product before buying.';
}

let rewritten = 0;
let refined = 0;
for (const filename of fs.readdirSync(categoriesDir).filter((name) => name.endsWith('.json'))) {
  const file = path.join(categoriesDir, filename);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.articles = data.articles.map((post) => {
    const spec = guides[post.slug];
    if (spec) {
      const content = makeContent(spec);
      const next = {
        ...post,
        title: spec.title,
        subtitle: spec.subtitle,
        excerpt: spec.excerpt,
        articleType: spec.type,
        content,
        toc: content.filter((block) => block.type === 'heading').map(({ id, text }) => ({ id, text })),
        keyTakeaways: spec.takeaways,
        whyItMatters: spec.why,
        reportingNote: guideNote(spec.type),
        sources: [editorialSource],
        updatedAt,
        seo: {
          ...post.seo,
          metaTitle: spec.title,
          metaDescription: spec.excerpt,
          ogTitle: spec.title,
          ogDescription: spec.excerpt,
          twitterTitle: spec.title,
          twitterDescription: spec.excerpt,
          keywords: spec.keywords,
        },
      };
      next.readingTime = readingTime(next);
      rewritten += 1;
      return next;
    }

    const note = currentNotes[post.slug];
    if (!note) return post;
    const content = note.content || post.content;
    const next = {
      ...post,
      title: note.title || post.title,
      subtitle: note.subtitle || post.subtitle,
      excerpt: note.excerpt || post.excerpt,
      articleType: note.type,
      content,
      toc: content.filter((block) => block.type === 'heading').map(({ id, text }) => ({ id, text })),
      keyTakeaways: note.takeaways,
      whyItMatters: note.why,
      reportingNote: notes[note.type],
      sources: note.sources || post.sources,
      updatedAt,
      seo: {
        ...post.seo,
        metaTitle: note.title || post.seo.metaTitle,
        metaDescription: note.excerpt || post.seo.metaDescription,
        ogTitle: note.title || post.seo.ogTitle,
        ogDescription: note.excerpt || post.seo.ogDescription,
        twitterTitle: note.title || post.seo.twitterTitle,
        twitterDescription: note.excerpt || post.seo.twitterDescription,
      },
    };
    next.readingTime = readingTime(next);
    refined += 1;
    return next;
  });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

console.log(`Rewrote ${rewritten} evergreen and archive posts and refined ${refined} source-based posts.`);
