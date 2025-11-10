// Vocabulary Data
const vocabularyData = {
    words: [
        { term: "lodge", meaning: "A small house on the land of a large house, usually lived in by a gatekeeper or caretaker." },
        { term: "hostel", meaning: "A place that provides cheap food and accommodation for travellers, students, or young people." },
        { term: "barrenness", meaning: "The condition of land that cannot produce crops or support much life." },
        { term: "solitude", meaning: "When you are alone, especially when this is peaceful and pleasant." },
        { term: "rendition", meaning: "Someone's performance or interpretation of a piece of music, play, or poem." },
        { term: "cliff-hanger", meaning: "A story or situation that is very exciting because the outcome is uncertain until the end." },
        { term: "rousing", meaning: "Making people feel very excited and enthusiastic." },
        { term: "blockbuster", meaning: "A film, book, or show that is very successful and popular." },
        { term: "box office hit", meaning: "A film that earns a lot of money because many people go to see it." },
        { term: "pilgrimage", meaning: "A journey to a place that is important in your religion." },
        { term: "curator", meaning: "Someone who is in charge of a museum, art gallery, or similar collection." },
        { term: "dean", meaning: "Someone at a college or university who is responsible for a particular area of study." },
        { term: "prefect", meaning: "In some schools, an older student who is given special duties and helps control younger students." },
        { term: "trek", meaning: "A long and difficult journey, especially one made on foot through areas without good roads." },
        { term: "pier", meaning: "A structure built out into the sea, a lake, or a river where boats can stop and people can walk." },
        { term: "liner", meaning: "A large passenger ship that travels on regular journeys." },
        { term: "umpire", meaning: "Someone who makes sure that players obey the rules in sports such as tennis or baseball." },
        { term: "darkroom", meaning: "A room kept dark so that photographs can be developed there." },
        { term: "stirrup", meaning: "One of the metal loops that hang from a saddle and support a rider's foot." },
        { term: "bit (in a horse context)", meaning: "The metal bar that is put in a horse's mouth and used to control it." },
        { term: "bridle", meaning: "The set of straps put around a horse's head to control it." },
        { term: "soap opera", meaning: "A television or radio series about the daily lives and personal problems of the same group of characters." },
        { term: "grater", meaning: "A kitchen tool with a rough surface used for cutting cheese or vegetables into small pieces." },
        { term: "sauce pan", meaning: "A deep metal pan with a handle that you use for cooking things in liquid." },
        { term: "colander", meaning: "A bowl with a lot of small holes used for washing or draining food." },
        { term: "raucous", meaning: "Sounding loud, rough, and rather unpleasant." },
        { term: "mild", meaning: "Not strong or extreme; gentle in effect or flavour." },
        { term: "wintry", meaning: "Typical of winter; cold, dark, or snowy." },
        { term: "disconcerting", meaning: "Making you feel slightly confused, embarrassed, or worried." },
        { term: "distressing", meaning: "Making you feel extremely upset or worried." },
        { term: "harrowing", meaning: "Very frightening or shocking and making you feel upset." },
        { term: "daunting", meaning: "Frightening in a way that makes you not want to do something." },
        { term: "gruelling", meaning: "Very difficult and tiring, needing great effort for a long time." }
    ],
    
    adverbAdjectives: [
        { term: "absolutely fantastic", meaning: "Completely wonderful or extremely good." },
        { term: "absolutely unparalleled", meaning: "Completely without equal or comparison." },
        { term: "absolutely brilliant", meaning: "Completely excellent or extremely clever." },
        { term: "absolutely / really exhilarating", meaning: "Completely or very exciting in a way that makes you feel very happy and full of energy." },
        { term: "really commercialised", meaning: "Very much influenced by the aim of making money." },
        { term: "really / very intense", meaning: "Very strong or extreme in force or degree." },
        { term: "really / very soothing", meaning: "Very calming and making you feel relaxed." },
        { term: "really / very intelligent", meaning: "Very clever and able to learn or understand things easily." },
        { term: "really / totally disappointing", meaning: "Very or completely making you feel unhappy because something was not as good as expected." },
        { term: "totally absurd", meaning: "Completely stupid or unreasonable." }
    ],
    
    adjectiveNouns: [
        { term: "pristine/littered coastline", meaning: "Pristine coastline: a stretch of coast that is in its original clean condition. Littered coastline: a stretch of coast covered with rubbish that has been left there." },
        { term: "temperate/extreme climate", meaning: "Temperate climate: weather that is never extremely hot or cold. Extreme climate: weather with very severe conditions." },
        { term: "delicate/fragrant blossoms", meaning: "Delicate blossoms: flowers that are easy to damage. Fragrant blossoms: flowers that have a sweet pleasant smell." },
        { term: "gnarled/blackened branches", meaning: "Gnarled branches: tree branches that are twisted and rough. Blackened branches: branches that have become dark from fire or smoke." },
        { term: "sparkling/winding stream", meaning: "Sparkling stream: a small river that shines brightly. Winding stream: a small river that curves and twists a lot." },
        { term: "heavy/slow-moving traffic", meaning: "Heavy traffic: a large number of vehicles on the road. Slow-moving traffic: traffic that is moving at a very low speed." },
        { term: "fanciful/literal interpretation", meaning: "Fanciful interpretation: an explanation based on imagination rather than facts. Literal interpretation: an explanation based on the exact meaning of the words." },
        { term: "unjustified/strict regulations", meaning: "Unjustified regulations: rules that are not supported by good reasons. Strict regulations: rules that must be obeyed exactly." }
    ],
    
    idioms: [
        { term: "bring the house down", meaning: "To make the people watching a performance laugh or clap very loudly." },
        { term: "read sb. like a book", meaning: "To understand what someone is thinking or feeling very easily." },
        { term: "face the music", meaning: "To accept criticism or punishment for something you have done." },
        { term: "let one's hair down", meaning: "To relax and enjoy yourself without worrying what other people think." },
        { term: "off the beaten track", meaning: "Far away from the places that many people visit." },
        { term: "on the house", meaning: "Given free by a bar, restaurant, or hotel." },
        { term: "on a shoestring budget", meaning: "With very little money to spend." },
        { term: "on the edge of one's seat", meaning: "Very excited and waiting to see what happens next." },
        { term: "paint the town red", meaning: "To go out to bars, clubs, etc. to celebrate and enjoy yourself." },
        { term: "read between the lines", meaning: "To guess something that is not said directly." }
    ],
    
    phrases: [
        { term: "at large", meaning: "If a criminal is at large, they have not been caught; also, used to mean 'in general'." },
        { term: "at a loss", meaning: "Not knowing what to do or say." },
        { term: "at odds with", meaning: "In disagreement or quarrelling with someone." },
        { term: "at a standstill", meaning: "Completely stopped and not moving or developing." },
        { term: "at a glance", meaning: "After a quick look." },
        { term: "at a loose end", meaning: "With nothing particular that you need to do." }
    ],
    
    verbPhrases: [
        { term: "have/take time to relax", meaning: "To allow yourself time to rest or do something that helps you unwind." },
        { term: "take it easy", meaning: "To relax and not do very much or not work too hard." },
        { term: "do an on-line crossword", meaning: "To solve a crossword puzzle on the internet." },
        { term: "have/take a soothing bath", meaning: "To bathe in warm water in order to relax." },
        { term: "have tickets for a match", meaning: "To possess tickets so that you can go to a sports event." },
        { term: "have an extravagant dinner", meaning: "To eat a very expensive or elaborate meal." },
        { term: "have a party", meaning: "To arrange a social event with guests for enjoyment." },
        { term: "have close friends over", meaning: "To invite good friends to your home as guests." },
        { term: "book a table for two", meaning: "To reserve a restaurant table for two people." },
        { term: "book/take a weekend break", meaning: "To arrange or go on a short holiday over a weekend." }
    ],
    
    phrasalVerbs: [
        { term: "put up", meaning: "To build something such as a wall or tent." },
        { term: "put off", meaning: "To delay doing something until later." },
        { term: "put sth. through", meaning: "To make someone experience something difficult or unpleasant." },
        { term: "put sb. down", meaning: "To criticize someone in a way that makes them feel silly or stupid." },
        { term: "put up with", meaning: "To accept an unpleasant situation or person without complaining." },
        { term: "put aside", meaning: "To save money or keep something to use later." },
        { term: "set sb. back", meaning: "To cost someone a particular amount of money." },
        { term: "set in", meaning: "To begin and seem likely to continue, especially about weather or periods." },
        { term: "put smth. back", meaning: "To return something to the place where it was before." },
        { term: "set off", meaning: "To start a journey." }
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



