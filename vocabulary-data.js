// Vocabulary Data
const vocabularyData = {
    words: [
        { term: "lodge", meaning: "A small house or cabin, especially one used for temporary accommodation or as a base for outdoor activities." },
        { term: "hostel", meaning: "A budget-friendly accommodation, typically offering shared rooms and facilities, popular with travelers and students." },
        { term: "barrenness", meaning: "The state of being unproductive, empty, or unable to support life; lack of fertility or vegetation." },
        { term: "solitude", meaning: "The state of being alone or isolated; a peaceful, quiet time spent by oneself." },
        { term: "rendition", meaning: "A performance or interpretation of a piece of music, drama, or other work of art." },
        { term: "cliff-hanger", meaning: "A dramatic ending to an episode or story that leaves the audience in suspense, eager to know what happens next." },
        { term: "rousing", meaning: "Exciting, stimulating, or inspiring; causing enthusiasm or strong emotion." },
        { term: "blockbuster", meaning: "A highly successful and popular film, book, or other entertainment product that achieves great commercial success." },
        { term: "box office hit", meaning: "A film that is very successful in terms of ticket sales and revenue at movie theaters." },
        { term: "pilgrimage", meaning: "A journey to a sacred place or shrine, often undertaken for religious or spiritual reasons." },
        { term: "curator", meaning: "A person who manages and organizes a collection, especially in a museum, gallery, or library." },
        { term: "dean", meaning: "A senior official in a college or university, typically in charge of a faculty or division." },
        { term: "prefect", meaning: "A senior student with disciplinary responsibilities in some schools, or a senior official in certain organizations." },
        { term: "trek", meaning: "A long, difficult journey, especially on foot through challenging terrain." },
        { term: "pier", meaning: "A structure built out over water, used as a landing place for boats or as a walkway." },
        { term: "liner", meaning: "A large passenger ship that travels on a regular schedule between ports." },
        { term: "umpire", meaning: "An official who enforces the rules in sports, especially in baseball, tennis, or cricket." },
        { term: "darkroom", meaning: "A room used for developing photographic film, kept dark or lit only with special safe lights." },
        { term: "stirrup", meaning: "A metal loop attached to a saddle for a rider's foot to rest in while riding a horse." },
        { term: "bit (in a horse context)", meaning: "A metal mouthpiece attached to the bridle that goes in a horse's mouth, used to control the horse." },
        { term: "bridle", meaning: "The headgear used to control a horse, consisting of straps, a bit, and reins." },
        { term: "soap opera", meaning: "A television or radio drama series dealing with the daily lives of a group of characters, typically broadcast regularly." },
        { term: "grater", meaning: "A kitchen utensil with a rough surface used for shredding or grating food, such as cheese or vegetables." },
        { term: "sauce pan", meaning: "A deep cooking pan with a handle and often a lid, used for cooking sauces and other liquids." },
        { term: "colander", meaning: "A bowl-shaped kitchen utensil with holes, used for draining water from food, such as pasta or vegetables." },
        { term: "raucous", meaning: "Loud, harsh, and disorderly; making a disturbingly loud and harsh noise." },
        { term: "mild", meaning: "Gentle, moderate, or not severe; having a soft or pleasant quality." },
        { term: "wintry", meaning: "Characteristic of winter; cold, bleak, or snowy." },
        { term: "disconcerting", meaning: "Causing one to feel unsettled, confused, or disturbed; making someone feel uneasy." },
        { term: "distressing", meaning: "Causing anxiety, sorrow, or pain; deeply upsetting or troubling." },
        { term: "harrowing", meaning: "Extremely distressing or painful; causing great mental or emotional suffering." },
        { term: "daunting", meaning: "Intimidating or discouraging due to being difficult, challenging, or overwhelming." },
        { term: "gruelling", meaning: "Extremely tiring, demanding, or exhausting; requiring great effort and endurance." }
    ],
    
    adverbAdjectives: [
        { term: "absolutely fantastic", meaning: "Extremely good, wonderful, or impressive; used to express great enthusiasm." },
        { term: "absolutely unparalleled", meaning: "Having no equal or match; completely unique and superior." },
        { term: "absolutely brilliant", meaning: "Exceptionally clever, talented, or excellent; outstanding." },
        { term: "absolutely / really exhilarating", meaning: "Extremely exciting, thrilling, or invigorating; making one feel very alive and energized." },
        { term: "really commercialised", meaning: "Heavily focused on making money or profit; overly influenced by commercial interests." },
        { term: "really / very intense", meaning: "Extremely strong, concentrated, or powerful; having a very high degree of something." },
        { term: "really / very soothing", meaning: "Very calming, relaxing, or comforting; having a gentle, peaceful effect." },
        { term: "really / very intelligent", meaning: "Extremely smart, clever, or wise; having great mental capacity." },
        { term: "really / totally disappointing", meaning: "Completely failing to meet expectations; very let down or unsatisfied." },
        { term: "totally absurd", meaning: "Completely ridiculous, unreasonable, or illogical; making no sense at all." }
    ],
    
    adjectiveNouns: [
        { term: "pristine/littered coastline", meaning: "Pristine: clean, untouched, and in perfect condition. Littered: covered with trash or debris." },
        { term: "temperate/extreme climate", meaning: "Temperate: moderate, mild weather conditions. Extreme: very harsh, severe weather conditions." },
        { term: "delicate/fragrant blossoms", meaning: "Delicate: fragile, easily damaged. Fragrant: having a pleasant, sweet smell." },
        { term: "gnarled/blackened branches", meaning: "Gnarled: twisted, knotted, and rough. Blackened: darkened or charred, often by fire." },
        { term: "sparkling/winding stream", meaning: "Sparkling: shining, glittering, reflecting light. Winding: curving, twisting, not straight." },
        { term: "heavy/slow-moving traffic", meaning: "Heavy: dense, congested. Slow-moving: moving at a very low speed." },
        { term: "fanciful/literal interpretation", meaning: "Fanciful: imaginative, creative, not based on reality. Literal: exact, word-for-word, not figurative." },
        { term: "unjustified/strict regulations", meaning: "Unjustified: not supported by good reasons. Strict: very firm, severe, not lenient." }
    ],
    
    idioms: [
        { term: "bring the house down", meaning: "To receive enthusiastic applause or approval from an audience; to be extremely successful in a performance." },
        { term: "read sb. like a book", meaning: "To understand someone's thoughts, feelings, or intentions very easily and clearly." },
        { term: "face the music", meaning: "To accept the unpleasant consequences of one's actions; to confront a difficult situation." },
        { term: "let one's hair down", meaning: "To relax, behave freely, and enjoy oneself without worrying about social conventions." },
        { term: "off the beaten track", meaning: "Away from the usual or popular routes; in a remote or less-traveled place." },
        { term: "on the house", meaning: "Free of charge; paid for by the establishment (usually a bar or restaurant)." },
        { term: "on a shoestring budget", meaning: "With very little money; using minimal financial resources." },
        { term: "on the edge of one's seat", meaning: "Very excited, nervous, or eager, waiting anxiously for something to happen." },
        { term: "paint the town red", meaning: "To go out and celebrate wildly, having a great time in public places." },
        { term: "read between the lines", meaning: "To understand the hidden or implied meaning in something that is said or written." }
    ],
    
    phrases: [
        { term: "at large", meaning: "Free, not captured or confined; generally, as a whole." },
        { term: "at a loss", meaning: "Uncertain about what to do; confused or puzzled." },
        { term: "at odds with", meaning: "In conflict or disagreement with someone or something." },
        { term: "at a standstill", meaning: "Completely stopped; not moving or making progress." },
        { term: "at a glance", meaning: "Immediately, with just a quick look; very quickly." },
        { term: "at a loose end", meaning: "Having nothing to do; bored or without plans." }
    ],
    
    verbPhrases: [
        { term: "have/take time to relax", meaning: "To spend time resting, unwinding, or doing something enjoyable to reduce stress." },
        { term: "take it easy", meaning: "To relax, not work too hard, or proceed in a calm, unhurried manner." },
        { term: "do an on-line crossword", meaning: "To complete a crossword puzzle using the internet or a digital device." },
        { term: "have/take a soothing bath", meaning: "To bathe in warm water for relaxation and comfort." },
        { term: "have tickets for a match", meaning: "To possess tickets to attend a sports game or competition." },
        { term: "have an extravagant dinner", meaning: "To enjoy a very luxurious, expensive, or elaborate meal." },
        { term: "have a party", meaning: "To organize or attend a social gathering with guests for celebration or entertainment." },
        { term: "have close friends over", meaning: "To invite good friends to visit one's home." },
        { term: "book a table for two", meaning: "To make a reservation at a restaurant for two people." },
        { term: "book/take a weekend break", meaning: "To reserve or go on a short vacation or trip during the weekend." }
    ],
    
    phrasalVerbs: [
        { term: "put up", meaning: "To erect, build, or pitch something (e.g., a tent, a building)." },
        { term: "put off", meaning: "To postpone or delay something; to reschedule for a later time." },
        { term: "put sth. through", meaning: "To cause someone to experience pain, difficulty, or hardship." },
        { term: "put sb. down", meaning: "To criticize, belittle, or make someone feel inferior." },
        { term: "put up with", meaning: "To tolerate or bear something unpleasant without complaining." },
        { term: "put aside", meaning: "To save money or set something aside for future use." },
        { term: "set sb. back", meaning: "To cost someone a certain amount of money; to cause an expense." },
        { term: "set in", meaning: "To begin and continue; to become established (often referring to weather or conditions)." },
        { term: "put smth. back", meaning: "To replace something in its original position; to return something to where it was." },
        { term: "set off", meaning: "To begin a journey; to start traveling or embark on a trip." }
    ]
};

// Helper function to get all vocabulary items in a flat array
function getAllVocabularyItems() {
    const items = [];
    Object.keys(vocabularyData).forEach(category => {
        vocabularyData[category].forEach(item => {
            items.push({
                ...item,
                category: category
            });
        });
    });
    return items;
}



