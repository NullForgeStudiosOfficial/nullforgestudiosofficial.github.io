// ----------- whateverthefuck

let LastTime = 0;
let DeltaTime = 0;
let MainBackground = document.getElementById("MainBackground")
let MainBackgroundScroll = 0
let ButtonBackgrounds = []
let ButtonBackgroundScroll = 0;
let InfoBoxBackgroundScroll = 0;
let LeftRightTransition = document.getElementById("FullLeftRightTransition")
let LeftTransition = document.getElementById("LeftTransition")
let RightTransition = document.getElementById("RightTransition")
let WhichTransitionWeUsing = 0;
let TransitionX = 0;
let TransitionRunning = false;
let SiteTransitionX = 0;
let SiteTransitionRunning = false;
let ChangedPage = false;
let ChangedSite = false;
let StartSiteT = true;
let StartTransitionX = 0;
let PreviousPage = null
let NextPage = null
let DoorRealm = document.getElementById("DoorRealm")
let DoorRealmRotation = 0
let VoidEyesImages = [
    'url("../../UniversalAssets/VoidEyeFull.png")',
    'url("../../UniversalAssets/VoidEyes66.png")',
    'url("../../UniversalAssets/VoidEyes33.png")',
    'url("../../UniversalAssets/VoidEyes0.png")',
]


async function Start()
{
    
    LeftTransition.style.left = 0 + "px"
    ButtonBackgrounds.push(...document.querySelectorAll(".BackButtonBackground"));
    ButtonBackgrounds.push(...document.querySelectorAll(".ButtonBackground"));
    ButtonBackgrounds.push(TB1ButtonGraphics);
    ButtonBackgrounds.push(TB2ButtonGraphics);
    ButtonBackgrounds.push(TB3ButtonGraphics);
    ButtonBackgrounds.push(TB4ButtonGraphics);
    ButtonBackgrounds.push(TB5ButtonGraphics);
    ButtonBackgrounds.push(TB6ButtonGraphics);
    ButtonBackgrounds.push(...document.querySelectorAll(".QuizButtonBackground"));
    ButtonBackgrounds.push(QuestionBoxBack);

    BlinkEyes()

    ShuffleArray(QuizQuestions)

    ShuffleArray(ArbiterLines)

    QuizNextQuestion(-1)

    await Sleep(250);
    LastTime = performance.now();
    requestAnimationFrame(Update);

    await Sleep(100);
    document.getElementById("StartupBlack").remove();

}


function Update(CurrentTime)
{
    DeltaTime = (CurrentTime - LastTime) / 1000;
    LastTime = CurrentTime;

    VoidSpin()
    ScrollButtonBackgrounds();

    if (TransitionRunning)
    {
        UpdateTransition()
    }

    if (SiteTransitionRunning)
    {
        UpdateSiteTransition()
    }
    
    if (StartSiteT)
    {
        StartSite()
    }

    requestAnimationFrame(Update);
}

function ScrollButtonBackgrounds()
{
    ButtonBackgroundScroll -= 25 * DeltaTime;

    for (let Button of ButtonBackgrounds)
    {
        Button.style.backgroundPositionY = ButtonBackgroundScroll + "px";
    }
}



function Sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function BlinkEyes()
{

    while (true)
    {
        for (let Eye of VoidEyesThings)
        {
            
        Eye.style.backgroundImage = VoidEyesImages[0];

        await Sleep(Math.random() * 3000 + 3000);

        Eye.style.backgroundImage = VoidEyesImages[1];
        await Sleep(75);

        Eye.style.backgroundImage = VoidEyesImages[2];
        await Sleep(75);

        Eye.style.backgroundImage = VoidEyesImages[3];
        await Sleep(75);

        Eye.style.backgroundImage = VoidEyesImages[2];
        await Sleep(75);

        Eye.style.backgroundImage = VoidEyesImages[1];
        await Sleep(75);

        Eye.style.backgroundImage = VoidEyesImages[0];
        await Sleep(75);
        }
    }
}

async function ChangePage(PageID1,PageID2)
{
    PreviousPage = PageID1
    NextPage = PageID2

    QuizTransition = false
    TransitionX = window.innerHeight;
    ChangedPage = false;
    TransitionRunning = true
    LeftRightTransition.style.display = "block";
}

async function ChangeSite()
{
    ChangedSite = true
    SiteTransitionX = window.innerHeight;
    SiteTransitionRunning = true
    RightTransition.style.display = "block";
}

async function StartSite()
{
    LeftTransition.style.display = "block";
    StopX = window.innerHeight - LeftTransition.offsetHeight - 2000;

    StartTransitionX -= 5000 * DeltaTime;
    LeftTransition.style.top = StartTransitionX + "px";
    LeftTransition.style.bottom = "auto";

    if (StartSiteT && StartTransitionX <= StopX)
    {
            StartSiteT = false;
            StartSiteT = false;
            LeftTransition.style.display = "none";
            return
    }
}

async function LoadSite(SiteString)
{
    while (ChangedSite)
    {
        await Sleep(100)
        continue
    }

    window.location.href = SiteString
}


function UpdateTransition()
{
    
    if (!QuizTransition)
    {
        LeftRightTransition.style.display = "block";
        TransitionX -= 15000 * DeltaTime;
        LeftRightTransition.style.top = TransitionX + "px";

        if (!ChangedPage && TransitionX + LeftRightTransition.offsetHeight / 2 <= window.innerHeight / 2)
        {
            ChangedPage = true;
            PreviousPage.style.display = "none";
            NextPage.style.display = "flex";
            
        }

        if(ChangedPage && TransitionX + LeftRightTransition.offsetHeight <= 0)
        {
            TransitionRunning = false;
            ChangedPage = false
            TransitionX = window.innerHeight;
            LeftRightTransition.style.top = TransitionX + "px";
            LeftRightTransition.style.display = "none";
        }
    }
    else
    {

        if (!QuizTransitionPause1)
        {
            LeftRightTransition.style.display = "block";
            TransitionX -= 13500 * DeltaTime;
            LeftRightTransition.style.top = TransitionX + "px";
        }

        if (!QuizTransitionPause1 && TransitionX + LeftRightTransition.offsetHeight / 2 <= window.innerHeight / 2)
        {
            QuizTransitionPause1 = true;

            ArbiterSequence()
            
        }

        if (QuizTransitionPause2)
        {

            TransitionX -= 5000 * DeltaTime;
            LeftRightTransition.style.top = TransitionX + "px";
        }

        if(QuizTransitionPause2 && TransitionX + LeftRightTransition.offsetHeight <= 0)
        {
            TransitionRunning = false;
            QuizTransitionPause2 = false
            QuizTransitionPause1 = false
            TransitionX = window.innerHeight;
            LeftRightTransition.style.top = TransitionX + "px";
            LeftRightTransition.style.display = "none";
            
        }
    }

    

}


function UpdateSiteTransition()
{
    let usingthisthingy = null;

    usingthisthingy = RightTransition
    StopX = window.innerHeight - usingthisthingy.offsetHeight + 100;

    if (ChangedSite && SiteTransitionX <= StopX)
    {
            ChangedSite = false;
            SiteTransitionRunning = false;
            WhichTransitionWeUsing = 0;
            return
    }

    SiteTransitionX -= 3000 * DeltaTime;
    usingthisthingy.style.top = SiteTransitionX + "px";
    usingthisthingy.style.bottom = "auto";

}

function VoidSpin()
{
    MainBackgroundScroll += 100 * DeltaTime;

    MainBackground.style.transform = `rotate(${MainBackgroundScroll}deg)`;

}

//------------------------------butts


let ArbiterLines = [
"Not what I would've chose...",
    "Interesting choice...",
    "Really? That one?",

    "Are you sure about that?",
    "If that's your thing...",
    "I'm appalled.",

    "You didn't even hesitate.",
    "Bold. Reckless, maybe.",
    "...fascinating, in a concerning way.",

    "You didn't read the question, did you?",
    "That felt personal.",
    "You're making this harder for yourself.",

    "I'll remember that choice...",
    "I wouldn't have guessed that.",
    "Brave. Or stupid. Hard to tell.",

    "Someone else picked that before...",
    "Repeating history already?",
    "It's almost like you've done this before.",

    "You've set something in motion... that can't be undone.",
    "The balance just shifted a little.",
    "Jotting that down real quick...",

    "You're not fooling anyone.",
    "That choice says more than you think.",
    "Keep pretending it's just a quiz.",

    "You chose faster this time.",
    "That answer didn't belong to you.",
    "I felt that one.",

    "Think you got the gods' attention with that choice.",
    "Even I didn't expect that.",
    "Stop before it notices.",

    "Curiouser and curiouser...",
    "You thought that was pretty clever, didn't you?",
    "Wrong answ—oh wait, there are no wrong answers."
]

let ResultStrings = [
"Eimon: The Realm of Chaos\n\n\nEimon is the realm of unpredictability, passion, and freedom, but don’t be fooled.\nWhat’s normal for the spider is chaos for the fly.\n\nEimon was created by Iwata, the Red Goddess and mother of the Elder Dragons, born of her whimsical heart.\nShe poured red mana into lizards, making them colossal, mirroring the size of her love for life itself.\n\nBecause of Iwata’s nature, Eimon never stands still.\nIts skies change color with emotion, its lands reshape with laughter or grief.\nIt is the pulse of existence, the raw rhythm of feeling made real.\n\nThose aligned with Eimon are the cherished wild cards of Ardron, the creators, the fools, the flames that never stay in one shape.\nThey act first and think later, chasing freedom not as rebellion, but as truth.\nThey burn bright, love fiercely, and when their chaos settles, they leave behind a calm that hums with meaning.\nThe quiet after their storm is where you finally understand them.\n\nCore Traits: Passionate, Impulsive, Creative, Rule-benders, Emotionally profound, Reckless optimists.\nStrengths: Boundless energy, quick to adapt, impossible to control, deeply empathetic, thrive under pressure.\nWeaknesses: Inconsistent, volatile, burn too hot, struggle with stillness, feel everything all at once.\n\nIn Short... Eimon’s children leap before looking, and somehow still land on their feet, heart first.\nThey are the spark in the dark room, the laughter in the rain, and the silence afterward that reminds you something beautiful just happened.",

"Elusia: The Realm of Nature\n\nElusia breathes.\nForests that stretch like continents, oceans vast as galaxies, mountains older than memory.\nCreated by Sythys, the Green Goddess, it’s the cradle and the crucible, where everything grows, dies, and grows again.\n\nSythys made Elusia to protect what she loved, but nature protects through balance, not mercy.\nLife here is sacred, but so is the cycle that ends it.\nEvery blossom feeds on what came before.\nEvery predator guards the future by thinning the past.\n\nThose aligned with Elusia are gentle until forced to be otherwise.\nThey are caretakers, empaths, and healers who value harmony, but when something they love is threatened, their kindness turns to fury.\nThey are not warriors by choice, but when the forest marches, even gods remember to fear the wild.\n\nCore Traits: Compassionate, Patient, Grounded, Empathetic, Resilient, Fiercely Protective.\nStrengths: Deep emotional insight, nurturing presence, natural adaptability, inspire trust, immense inner strength.\nWeaknesses: Overly forgiving, self-sacrificing, slow to act until provoked, reluctant to let go.\n\nIn Short... Elusia’s children are the calm before the storm, tender hands that heal, and roots that break stone when the world forgets their worth.",

"Grimlowe: The Realm of Darkness\n\nGrimlowe is the realm of ambition, decay, and revelation, where truth is paid for in blood and power is the only currency that never loses value.\nBorn of Entar’s Black Mana, it was once a swamp of life and rot before the Blight scorched it into a cathedral of molten stone and bone.\nWhat others call corruption, Grimlowe calls evolution.\n\nEntar taught that the pursuit of strength is neither good nor evil, it’s inevitable.\nTo deny darkness is to deny half of existence.\nEvery scar in Grimlowe is scripture, every scream a hymn to progress.\nThose who survive here do so not despite the corruption, but because of it.\n\nThose aligned with Grimlowe are the defiant, the driven, and the damned who refuse to break.\nThey see the world for what it is, cruel, beautiful, and full of potential, and they intend to master it.\nMercy is optional.\nVictory is not.\n\nCore Traits: Ambitious, Relentless, Insightful, Fearless, Cunning, Charismatic.\nStrengths: Tactical precision, indomitable will, magnetic presence, thrive in chaos and conflict.\nWeaknesses: Manipulative, seductive, scheming, prone to playing too many sides at once and being caught in their own web.\n\nIn Short... Grimlowe’s children don’t hide from the dark, they become it.\nThey are the storm behind the throne, the whisper that turns resolve into revolution, and the proof that corruption is just transformation with teeth.",

"Sostrum: The Realm of Magic\n\nSostrum is the realm of discovery, invention, and boundless curiosity.\nForged by Zykius, the Blue God of Mana, it floats among shifting skies and rivers of living light, where ideas themselves take shape and drift like clouds.\n\nHere, magic isn’t a mystery to fear, but a question to chase.\nEvery flash of energy, every whisper of arcana, begs to be studied, poked, prodded, and, let’s be honest, occasionally exploded.\nSostrum hums with the joy of not knowing yet, and the thrill of finding out.\n\nThose aligned with Sostrum are the thinkers, tinkerers, and wide-eyed scholars of Ardron.\nThey take things apart just to see why they work, and sometimes forget to sleep because they’re too busy inventing something the world’s never seen before.\nTo them, magic is less a tool and more a conversation with the universe.\n\nCore Traits: Analytical, Inventive, Inquisitive, Playful, Rational, Imaginative.\nStrengths: Quick learners, endlessly curious, resourceful, logical under stress, always improving.\nWeaknesses: Prone to tunnel vision, forget basic needs, emotionally reserved, occasionally blow things up just to see what happens.\n\nIn Short... Sostrum’s children are the dreamers with ink-stained hands and lightning in their eyes.\nThey’re the ones who see the impossible and say, 'Interesting… let’s test that.'\n\n ",

"Vidulyn: The Realm of Technology...\n\nVidulyn hums with innovation, curiosity, and quiet obsession.\nForged by Astus, the Gray God of Ether and Machine, it is a realm of spiraling cities and chrome expansions, the only one built open to the Void.\nAstus left it that way on purpose, just in case something beyond Ardron ever answered back.\n\nWhere Sostrum studies Mana, Vidulyn studies /everything else./\nEvery vibration, every flicker of light, every silence between signals.\nHere, creation is not a spell, it’s an equation whispered to the universe.\nIts people don’t just build; they /listen./\n\n\nThose aligned with Vidulyn are the architects of understanding.\nThey chase truth through circuitry, through starlight, through madness if they have to.\nTo them, knowledge is sacred, and discovery is worth any cost.\nThey are fascinated by the patterns beneath existence, and terrified of what might stare back.\n\n\nCore Traits: Inquisitive, Logical, Visionary, Focused, Stoic, Wonder-struck.\nStrengths: Deep thinkers, patient builders, endlessly curious, disciplined, see order in chaos.\nWeaknesses: Detached from emotion, consumed by pursuit, risk obsession or collapse when faced with the unknown.\n\n\nIn Short... Vidulyn’s children stare into the dark and take notes.\nThey are the minds that bridge godhood and circuitry, forever reaching toward the next unanswered question, even when they know it might destroy them.\n\n\n01010111 01100101 01101100 01100011 01101111 01101101 01100101 00101100 00100000 01100001 01101100 01101100 01111001\n\n",

"Yumalon: The Realm of Light...\n\nYumalon is the realm of faith, honor, and Devotion.\nForged by Tynos, the White God, it gleams with radiant cities and golden skies, a world built to protect, to preserve, to /do good./\nBut the path to hell is paved with good intentions, and Tynos walked it willingly.\n\nHe sought to defend creation from the chaos of Entar’s fall, to build walls of light strong enough to hold back the dark.\nBut in his pursuit of righteousness, his pride took root.\nHis light grew so bright it scorched the ones it meant to save.\n\n\nThose aligned with Yumalon are guardians, caretakers, and loyal souls who live to protect others.\nThey stand against cruelty, defend the weak, and would give their life without hesitation if it meant someone else could stand another day.\nTheir flaw is not selfishness, it’s /Devotion./\nThey give too much, too often, and sometimes to the wrong cause.\n\n\nCore Traits: Loyal, Protective, Honorable, Courageous, Selfless, Principled.\nStrengths: Unyielding moral drive, steadfast under pressure, inspire others through action, resilient hearts, live by a personal code.\nWeaknesses: Naive faith, blind loyalty, martyr complex, struggle to forgive themselves or let go.\n\n\nIn Short... Yumalon’s children fight for what they believe is right, even when it breaks them.\nThey are the light that shields others from the dark, burning bright, and sometimes, burning away in the process.\n\n\n "
];



let QuizQuestions = [
{
        "Q": "Among the three, which animal do you align with?",
        "A1": { "ButtonText": "Octopus", "Score": 3 },
        "A2": { "ButtonText": "Parrot", "Score": 0 },
        "A3": { "ButtonText": "Hedgehog", "Score": 5 }
    },
    {
        "Q": "You find yourself standing at a crossroads. Which path do you take?",
        "A1": { "ButtonText": "The left path: a path not on the map...curious.", "Score": 3 },
        "A2": { "ButtonText": "The north path: a cobblestone road leading toward the safety of a distant town.", "Score": 5 },
        "A3": { "ButtonText": "The right path: because of course it’s the *right* one.", "Score": 0 }
    },
    {
        "Q": "What is your favorite time of day?",
        "A1": { "ButtonText": "Mornings", "Score": 5 },
        "A2": { "ButtonText": "Midday", "Score": 4 },
        "A3": { "ButtonText": "Night", "Score": 2 }
    },
    {
        "Q": "A heavy gate bars your path. Two guards stand watch, one speaks only truth, the other only lies. How do you get through?",
        "A1": { "ButtonText": "I study them carefully... \ntheir words, their tone, their patterns. The truth always slips through somewhere.", "Score": 3 },
        "A2": { "ButtonText": "If it’s guarded, there’s a reason. I’ll respect that and find another way.", "Score": 5 },
        "A3": { "ButtonText": "I climb the gate. If they wanted to stop me, they should’ve built it higher.", "Score": 2 }
    },
    {
        "Q": "A person you don't know runs up to you and asks you to hold onto an object. What is your response?",
        "A1": { "ButtonText": "I hold it close. If someone trusted me with this, I’ll protect it until they return.", "Score": 5 },
        "A2": { "ButtonText": "I unwrap it immediately. Curiosity’s a habit I’ve stopped trying to break.", "Score": 4 },
        "A3": { "ButtonText": "I take it, promise to guard it with my life… and immediately start wondering what’s inside,\n peeking nonchalantly, but never opening or heavily inspecting.", "Score": 0 }
    },
    {
        "Q": "You’re given a full day with no duties, no rules, no limits. How do you spend it?",
        "A1": { "ButtonText": "I tinker, experiment, and probably blow something up for science.", "Score": 3 },
        "A2": { "ButtonText": "I spend it with the people I care about most.", "Score": 1 },
        "A3": { "ButtonText": "I work toward something big, rest is for when it’s done.", "Score": 2 }
    },
    {
        "Q": "When everything feels uncertain and the path ahead is unclear, what guides you forward?",
        "A1": { "ButtonText": "I reach out to those I trust, no one faces the storm alone.", "Score": 1 },
        "A2": { "ButtonText": "I follow my gut. Somewhere between logic, and emotion lies the answer.", "Score": 2 },
        "A3": { "ButtonText": "I stop, think, and find the logic in the mess. There’s always a solution.", "Score": 3 }
    },
    {
        "Q": "How do you feel about working alone vs. with a group?",
        "A1": { "ButtonText": "I thrive when I'm working independently and making my own decisions.", "Score": 2 },
        "A2": { "ButtonText": "I like working in a team when everyone has a clear role and the system runs smoothly.", "Score": 4 },
        "A3": { "ButtonText": "I'm more comfortable when I have clear guidance or direction from others.", "Score": 5 }
    },
    {
        "Q": "Someone openly challenges you in front of others. What do you do?",
        "A1": { "ButtonText": "I stand my ground, respect’s earned, not handed over.", "Score": 5 },
        "A2": { "ButtonText": "I pick apart their logic until they realize the challenge was a bad idea.", "Score": 3 },
        "A3": { "ButtonText": "I smile, if they want a storm, I’ll give them thunder. Let’s make this interesting.", "Score": 0 }
    },
    {
        "Q": "A cryptic message appears in your mind, telling you the universe is a simulation. How do you respond?",
        "A1": { "ButtonText": "I start testing reality’s seams. If there are rules, I want to know how far they bend.", "Score": 3 },
        "A2": { "ButtonText": "I shrug. If life feels real, that’s good enough for me.", "Score": 1 },
        "A3": { "ButtonText": "Then I’ll learn how it works, and rewrite the world myself.", "Score": 2 }
    },
    {
        "Q": "If you were given a chance to rewrite a single rule of the world, which would you choose?",
        "A1": { "ButtonText": "No truth should ever be hidden, no one can no longer tell lies.", "Score": 3 },
        "A2": { "ButtonText": "Freedom isn’t given or earned, it’s *taken back.* No one gets to decide what I can’t do.", "Score": 0 },
        "A3": { "ButtonText": "Break the balance and the world will answer, nature punishes those who disrupt the peace.", "Score": 1 }
    },
    {
        "Q": "If you could choose one of these as your constant companion, which would you pick?",
        "A1": { "ButtonText": "A map that always changes based on your needs", "Score": 1 },
        "A2": { "ButtonText": "A key that opens any door-even if barricaded.", "Score": 3 },
        "A3": { "ButtonText": "A watch that can slow down or speed up time. The wearer is unaffected by this.", "Score": 0 }
    },
    {
        "Q": "If you could have one of these powers, which would you choose?",
        "A1": { "ButtonText": "The ability to speak any language, but you can never write again.", "Score": 3 },
        "A2": { "ButtonText": "The power to heal any wound, but each time you do, you take the pain into yourself.", "Score": 1 },
        "A3": { "ButtonText": "The power to influence others' dreams, but you can never dream yourself.", "Score": 2 }
    },
    {
        "Q": "Imagine you find an ancient artifact that grants you a single power, but with a twist: the power is yours forever, but the artifact can never be destroyed. What do you do with it?",
        "A1": { "ButtonText": "Keep it close and see what happens, if it changes the world, maybe it was meant to.", "Score": 0 },
        "A2": { "ButtonText": "Contain it and study it until I understand exactly how it works.", "Score": 4 },
        "A3": { "ButtonText": "Destroy it, knowing its influence is too dangerous to be trusted.", "Score": 5 }
    },
    {
        "Q": "Think about a time when you felt truly at peace with yourself. What were you doing, and what made that moment feel so fulfilling?",
        "A1": { "ButtonText": "You took a huge life changing risk, but everything turned out for the better.", "Score": 0 },
        "A2": { "ButtonText": "You were surrounded by people you love, just existing together without needing words.", "Score": 1 },
        "A3": { "ButtonText": "You were doing something repetitive, but it felt meditative-like you were in perfect sync with your surroundings.", "Score": 4 }
    },
    {
        "Q": "Think about a moment when you felt completely out of control. What do you do when you find yourself in that place?",
        "A1": { "ButtonText": "You try to find a way to regain control, even if it means pushing through discomfort.", "Score": 5 },
        "A2": { "ButtonText": "You embrace the chaos, letting things unfold without trying to steer them.", "Score": 0 },
        "A3": { "ButtonText": "You take a step back, observing from a distance, and wait for the right time to act.", "Score": 2 }
    },
    {
        "Q": "Think about the times when you feel most challenged. How do you respond when things start to push you to your limits?",
        "A1": { "ButtonText": "You push harder, seeing the struggle itself as proof of your will.", "Score": 2 },
        "A2": { "ButtonText": "You pause, analyze the problem from every angle, and adjust until the pattern makes sense.", "Score": 4 },
        "A3": { "ButtonText": "You reach out and reconnect, drawing strength from those who steady the storm with you.", "Score": 5 }
    },
    {
        "Q": "Imagine you're in a situation where everything you've worked for is suddenly at risk. How do you react?",
        "A1": { "ButtonText": "You put everything on the line, determined to protect what you've built.", "Score": 2 },
        "A2": { "ButtonText": "You obsess and focus on the cause of the problem, figuring out every and all possible solutions.", "Score": 3 },
        "A3": { "ButtonText": "You search for an ally, knowing that two heads are better than one when everything's at stake.", "Score": 1 }
    },
    {
        "Q": "Imagine you're at a crossroads where your past and future collide. What do you focus on in that moment?",
        "A1": { "ButtonText": "You reflect on everything that brought you here, trying to make sense of it all.", "Score": 4 },
        "A2": { "ButtonText": "You look ahead, eager to move forward and leave the past behind.", "Score": 2 },
        "A3": { "ButtonText": "You try to blend both, seeking balance between who you were and who you're becoming.", "Score": 1 }
    },
    {
        "Q": "Think about a time you had to step out of your comfort zone. How did you approach it?",
        "A1": { "ButtonText": "You jumped in with full force, knowing growth would come through the challenge.", "Score": 0 },
        "A2": { "ButtonText": "You approached it like an experiment, testing new ways to adapt until something clicked.", "Score": 3 },
        "A3": { "ButtonText": "You tried to find a middle ground, balancing the new with what felt familiar.", "Score": 1 }
    },
    {
        "Q": "What would you do if you won the lottery?",
        "A1": { "ButtonText": "I'd share it around and blow the rest on joy, life’s short, might as well make it loud.", "Score": 0 },
        "A2": { "ButtonText": "I'd take time to see the world, learning from different places and cultures.", "Score": 4 },
        "A3": { "ButtonText": "I'd help those in need, mostly my friends and loved ones.", "Score": 1 }
    },
    {
        "Q": "What movie do you know Tim Curry from?",
        "A1": { "ButtonText": "Home Alone 2", "Score": 5 },
        "A2": { "ButtonText": "Clue.", "Score": 0 },
        "A3": { "ButtonText": "Rocky Horror Picture Show", "Score": 1 }
    },
    {
        "Q": "Do you put the cart back when you're done shopping?",
        "A1": { "ButtonText": "Of course. I always return it to the designated spot.", "Score": 1 },
        "A2": { "ButtonText": "I leave it in a place where it won’t block or harm anything.", "Score": 4 },
        "A3": { "ButtonText": "I ride it like a scooter all the way back!", "Score": 0 }
    },
    {
        "Q": "How do you prefer to spend your free time?",
        "A1": { "ButtonText": "I like to get out and explore new places, always seeking something different.", "Score": 0 },
        "A2": { "ButtonText": "I prefer staying home, getting lost in a book or creative project.", "Score": 4 },
        "A3": { "ButtonText": "I enjoy spending time with others, connecting and building relationships.", "Score": 1 }
    },
    {
        "Q": "How do you handle stress?",
        "A1": { "ButtonText": "I dive into the problem headfirst, determined to power through it.", "Score": 2 },
        "A2": { "ButtonText": "I look for support from others, it's okay to ask for help.", "Score": 1 },
        "A3": { "ButtonText": "I reflect on the situation and try to find a creative solution or distraction.", "Score": 3 }
    },
    {
        "Q": "Mana flows through all things, but you can only wield one type. Which do you choose?",
        "A1": { "ButtonText": "Red Mana, raw emotion, freedom, and fire. Chaos given form.", "Score": 0 },
        "A2": { "ButtonText": "Blue Mana, knowledge, adaptability, and insight. The mind’s endless tide.", "Score": 3 },
        "A3": { "ButtonText": "Green Mana, life, balance, and growth. The heartbeat of the wild.", "Score": 1 }
    },
    {
        "Q": "You meet a being from the Void. They offer you forbidden knowledge, but at a cost. What do you do?",
        "A1": { "ButtonText": "Accept it: power is worth any price.", "Score": 2 },
        "A2": { "ButtonText": "Refuse: it's not worth the risk.", "Score": 5 },
        "A3": { "ButtonText": "Reason: what exactly is the cost, and is it worth it?", "Score": 3 }
    },
    {
        "Q": "A long-dead civilization left behind ancient texts. What do you do?",
        "A1": { "ButtonText": "Decode them immediately - history is meant to be uncovered.", "Score": 4 },
        "A2": { "ButtonText": "Keep them hidden - some knowledge is best left buried.", "Score": 5 },
        "A3": { "ButtonText": "Use their wisdom to guide the future, no matter the risk.", "Score": 1 }
    },
    {
        "Q": "You are granted the ability to bring one thing into existence. What do you create?",
        "A1": { "ButtonText": "The lost records of the 10k War of Ardron.", "Score": 4 },
        "A2": { "ButtonText": "A forbidden text detailing how to use the soul as energy.", "Score": 2 },
        "A3": { "ButtonText": "An item that shows you the future.", "Score": 5 }
    },
    {
        "Q": "You stumble upon a hidden passage in ancient ruins. What do you hope to find inside?",
        "A1": { "ButtonText": "I don’t care what it is, I'm going on an adventure!", "Score": 0 },
        "A2": { "ButtonText": "A magical oasis that heals all ailments.", "Score": 1 },
        "A3": { "ButtonText": "A scroll that answers any question you ask - but always cryptically.", "Score": 4 }
    },
    {
        "Q": "A great battle is coming, and you must take your place. What role calls to you?",
        "A1": { "ButtonText": "The Strategist: guiding others from the shadows, every move, part of a greater design.", "Score": 4 },
        "A2": { "ButtonText": "The Wildcard: charging into the fray, unpredictability your greatest weapon.", "Score": 0 },
        "A3": { "ButtonText": "The Protector: standing on the front lines to shield others.", "Score": 5 }
    },
    {
        "Q": "Corruption grants power by burning your soul. Resting over time recovers your lifespan. Would you use it?",
        "A1": { "ButtonText": "No - I'm strong enough, if not? me and my friends combined efforts will be.", "Score": 5 },
        "A2": { "ButtonText": "Yes - consequences, schmonsequences. I'll do whatever it takes to understand this power.", "Score": 2 },
        "A3": { "ButtonText": "Yes - just for experimentation. Only a little at a time so I can recover.", "Score": 3 }
    },
    {
        "Q": "An Ascension has gone rogue, trying to attain the power of the gods. What do you do?",
        "A1": { "ButtonText": "Look for a weakness to usurp their power.", "Score": 2 },
        "A2": { "ButtonText": "I observe from a distance and document everything. The data might save us later.", "Score": 4 },
        "A3": { "ButtonText": "Try to stop them, whatever it takes.", "Score": 5 }
    }
]
let QuizScores = [
0,0,0,0,0,0
]
let Rcodes = [
    "URIV-ANKE-DISA-YRSU",
    "FAEY-NTRE-GREN-HRTH",
    "WARF-AMIN-PSTL-DETH",
    "ZYKS-SLME-MISM-WZRD",
    "A100-B100-C100-D100",
    "TYNS-ANGL-PRTC-HOLY"
]
let VoidEyesThings = 
[
    VoidEyes1 = document.getElementById("VoidEyes1"),
    QuizEyes = document.getElementById("QuizEyes"),
    
]


let ArbiterTransitionEyes = document.getElementById("ArbiterTransitionEyes")
let QuizQuestionNumber = 33

let QuestionBox = document.getElementById("QuestionBox")
let QuestionBoxText = document.getElementById("QuestionBoxText")

let AnswerButton1 = document.getElementById("AnswerButton1")
let AnswerButton2 = document.getElementById("AnswerButton2")
let AnswerButton3 = document.getElementById("AnswerButton3")

let AnswerButton1Text = document.getElementById("AnswerButton1Text")
let AnswerButton2Text = document.getElementById("AnswerButton2Text")
let AnswerButton3Text = document.getElementById("AnswerButton3Text")

let highestresultindex = 0

let TB1Button = document.getElementById("TB1Button")
let TB2Button = document.getElementById("TB2Button")
let TB3Button = document.getElementById("TB3Button")
let TB4Button = document.getElementById("TB4Button")
let TB5Button = document.getElementById("TB5Button")
let TB6Button = document.getElementById("TB6Button")
let TB1ButtonGraphics = document.getElementById("TB1ButtonGraphics")
let TB2ButtonGraphics = document.getElementById("TB2ButtonGraphics")
let TB3ButtonGraphics = document.getElementById("TB3ButtonGraphics")
let TB4ButtonGraphics = document.getElementById("TB4ButtonGraphics")
let TB5ButtonGraphics = document.getElementById("TB5ButtonGraphics")
let TB6ButtonGraphics = document.getElementById("TB6ButtonGraphics")
let QuestionBoxBack = document.getElementById("QuestionBoxBack")


let TieBreakerButtons = [
    TB1Button,TB2Button,TB3Button,TB4Button,TB5Button,TB6Button
]


let QuizBackButton = document.getElementById("QuizBackButton")
let StartQuizButton = document.getElementById("StartQuizButton")
let BackQuizStart = document.getElementById("BackQuizStart")
let BackQuizEnd = document.getElementById("BackQuizEnd")
let BackDuringQuiz = document.getElementById("BackDuringQuiz")

let StartingPage = document.getElementById("StartingPage")
let QuizPage = document.getElementById("QuizPage")
let TieBreakerPage = document.getElementById("TieBreakerPage")
let ResultsPage = document.getElementById("ResultsPage")

let LeftBanner = document.getElementById("LeftBanner")
let RightBanner = document.getElementById("RightBanner") 

let CopyCodeButton = document.getElementById("CopyCodeButton")
let RealmResultBackground = document.getElementById("RealmResultBackground")
let RealmResultText = document.getElementById("RealmResultText")

let QuizScoresMatches = [false,false,false,false,false,false]
let RemainingText = document.getElementById("RemainingText")
let QuizTransition = false;
let QuizTransitionPause1 = false;
let QuizTransitionPause2 = false;
let ArbiterTransitionText = document.getElementById("ArbiterTransitionText")



AnswerButton1.addEventListener("click", function()
{
    ArbiterTransitionEyes.src = "../../UniversalAssets/VoidEyesBlack.png";
    ArbiterTransitionText.textContent = "";
    TransitionRunning = true
    TransitionX = window.innerHeight;
    QuizTransition = true
    QuizButtonNumberPressed = 0
    

});

AnswerButton2.addEventListener("click", function()
{
    ArbiterTransitionEyes.src = "../../UniversalAssets/VoidEyesBlack.png";
    ArbiterTransitionText.textContent = "";
    TransitionRunning = true
    TransitionX = window.innerHeight;
    QuizTransition = true
    QuizButtonNumberPressed = 1
});

AnswerButton3.addEventListener("click", function()
{
    ArbiterTransitionEyes.src = "../../UniversalAssets/VoidEyesBlack.png";
    ArbiterTransitionText.textContent = "";
    TransitionRunning = true
    TransitionX = window.innerHeight;
    QuizTransition = true
    QuizButtonNumberPressed = 2
});

for (let i = 0; i < TieBreakerButtons.length; i++)
{
    TieBreakerButtons[i].addEventListener("click", function()
    {
        QuizScores[i]++;
        ChangePage(TieBreakerPage, ResultsPage);
    });
}

CopyCodeButton.addEventListener("click", async function()
{
    Code = Rcodes[highestresultindex]
    await navigator.clipboard.writeText(Code);
});

StartQuizButton.addEventListener("click", function()
{
    ChangePage(StartingPage,QuizPage)
    //ChangePage(StartingPage,TieBreakerPage)
    //ChangePage(StartingPage,ResultsPage)
});


BackQuizStart.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../index.html")
});

BackDuringQuiz.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../index.html")
});

BackQuizEnd.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../index.html")
});

function ShuffleArray(Array)
{
    for (let i = Array.length - 1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i + 1));

        [Array[i], Array[j]] = [Array[j], Array[i]];
    }
}

function Randomizer(min,max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min
}

async function ArbiterSequence()
{
    QuizNextQuestion()
    ArbiterTransitionEyes.style.backgroundImage = VoidEyesImages[3];
    await Sleep(25);

    ArbiterTransitionEyes.style.backgroundImage = VoidEyesImages[2];
    await Sleep(25);

    ArbiterTransitionEyes.style.backgroundImage = VoidEyesImages[1];
    await Sleep(25);

    ArbiterTransitionEyes.style.backgroundImage = VoidEyesImages[0];
    await Sleep(50);

    ArbiterTransitionText.textContent = ArbiterLines[0];
    ArbiterLines.shift();

    await Sleep(1000);

    ArbiterTransitionEyes.style.backgroundImage = VoidEyesImages[0];
    await Sleep(50);

    ArbiterTransitionEyes.style.backgroundImage = VoidEyesImages[1];
    await Sleep(50);

    ArbiterTransitionEyes.style.backgroundImage = VoidEyesImages[2];
    await Sleep(50);

    ArbiterTransitionEyes.style.backgroundImage = VoidEyesImages[3];
    await Sleep(50);

    ArbiterTransitionEyes.style.backgroundImage = 'url("../UniversalAssets/VoidEyesBlack.png")',
    await Sleep(50);
    ArbiterTransitionText.textContent = "";
    await Sleep(150);
    

    QuizTransitionPause2 = true;
}


function QuizNextQuestion(buttonnumber)
{

    switch(buttonnumber)
    {
        case 0:
            QuizScores[QuizAnswer1Score] ++ 
            break;

        case 1:
            QuizScores[QuizAnswer2Score] ++ 
        break;

        case 2:
            QuizScores[QuizAnswer3Score] ++ 
        break;
    }

    if (!QuizQuestions.length)
    {
        let highestresult = 0

        for (let i = 0; i < QuizScores.length; i++)
        {
            if (QuizScores[i] > highestresult)
            {
                highestresult = QuizScores[i]

            }
        }


        for (let i = 0; i < QuizScores.length; i++)
        {
            if (QuizScores[i] != highestresult)
            {
                continue
            }

            for (let j = i + 1; j < QuizScores.length; j++)
            {
                if (QuizScores[j] === highestresult)
                {
                    QuizScoresMatches[i] = true
                    QuizScoresMatches[j] = true
                }
            }
        }

        let matches = false
        
        for (let i = 0; i < QuizScoresMatches.length; i++)
        {
            if (QuizScoresMatches[i] == true)
            {
                matches = true
                TieBreakerButtons[i].style.display = "flex"
            }
        }
        if (matches == true)
        {
            ChangePage(QuizPage, TieBreakerPage)
        }
        else
        {
            ChangePage(QuizPage, ResultsPage)
        }

        return
    }
    
    AnswerButton1Text.textContent = QuizQuestions[0].A1.ButtonText;
    QuizAnswer1Score = QuizQuestions[0].A1.Score;

    AnswerButton2Text.textContent = QuizQuestions[0].A2.ButtonText;
    QuizAnswer2Score = QuizQuestions[0].A2.Score;

    AnswerButton3Text.textContent = QuizQuestions[0].A3.ButtonText;
    QuizAnswer3Score = QuizQuestions[0].A3.Score;

    QuestionBoxText.textContent = QuizQuestions[0].Q;
    if (QuizQuestions.length)
    {
        RemainingText.textContent = QuizQuestions.length + " Remaining..."
    }
    else
    {
        RemainingText.textContent = "Last One..."
    }
    

    QuizQuestions.shift()
}

Start()