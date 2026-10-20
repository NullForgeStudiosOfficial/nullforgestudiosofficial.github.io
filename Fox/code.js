
let LastTime = 0;
let DeltaTime = 0;

let MainBackground = document.getElementById("MainBackground")
let MainBackgroundScroll = 0

let ButtonBackgrounds = []
let ButtonBackgroundScroll = 0;
let InfoBoxBackgroundScroll = 0;


let VoidEyesImages = [
    'url("../../UniversalAssets/VoidEyeFull.png")',
    'url("../../UniversalAssets/VoidEyes66.png")',
    'url("../../UniversalAssets/VoidEyes33.png")',
    'url("../../UniversalAssets/VoidEyes0.png")',
]



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


document.addEventListener("keydown", function(event)
{
    if (event.key === "F12")
    {
        event.preventDefault();
    }
});

document.addEventListener("keydown", function(event)
{
    if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && event.key === "I") ||
        (event.ctrlKey && event.shiftKey && event.key === "J") ||
        (event.ctrlKey && event.key === "U")
    )
    {
        event.preventDefault();
    }
});


function Randomizer(min,max)
{
    //because why the hell is JS so complicated for RNG?
    // The actual fuck is this doing?
    // Math.random() gives: 0.0 -> 0.99
    // Multiply by the size of our range.
    // (max-min+1) counts BOTH endpoints.
    // Example:
    // 30-100
    // 100-30+1 = 71 possible numbers.
    // Math.floor() removes the decimal.
    // Now we have: 0 -> 70
    // Finally shift the range upward.
    // +30 turns: 0 -> 30
    // 70 ->100
    // Yeah. JS is so dumb i actually wrote comments. congrats. 
    // stupid ass language can do  [] + [] but not number ranges without a custom function xD

    
    return Math.floor(Math.random() * (max - min + 1)) + min
    
}

document.addEventListener("keydown", function(event)
{
    if (event.key === "F12")
    {
        event.preventDefault();
    }
});

document.addEventListener("keydown", function(event)
{
    if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && event.key === "I") ||
        (event.ctrlKey && event.shiftKey && event.key === "J") ||
        (event.ctrlKey && event.key === "U")
    )
    {
        event.preventDefault();
    }
});




async function Start()
{
    
    ButtonBackgrounds.push(...document.querySelectorAll(".EimonButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".ElusiaButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".GrimloweButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".SostrumButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".VidulynButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".YumalonButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".IcolassButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".SanctumButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".BackButtonBackground"));
    ButtonBackgrounds.push(...document.querySelectorAll(".NormalButtonBackground"));

    BlinkEyes()

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

    ScrollBackground();
    ScrollButtonBackgrounds();
    ScrollBoxBackgrounds();

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

async function ScrollBackground()
{
    MainBackgroundScroll += 100 * DeltaTime;

    MainBackground.style.backgroundPositionX = MainBackgroundScroll + "px";
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
    const Eye = document.getElementById("VoidEyes");

    while (true)
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

async function ChangePage(PageID1,PageID2)
{
    PreviousPage = PageID1
    NextPage = PageID2

    QuizTransition = false
    TransitionX = window.innerWidth;
    ChangedPage = false;
    TransitionRunning = true
    LeftRightTransition.style.display = "block";
}

async function ChangeSite()
{
    ChangedSite = true
    SiteTransitionX = window.innerWidth;
    SiteTransitionRunning = true
    RightTransition.style.display = "block";
}

async function StartSite()
{
    LeftTransition.style.display = "block";
    StopX = window.innerWidth - LeftTransition.offsetWidth - 2000;

    StartTransitionX -= 10000 * DeltaTime;
    LeftTransition.style.left = StartTransitionX + "px";
    LeftTransition.style.right = "auto";

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
       TransitionX -= 11000 * DeltaTime;

        let usingthisthingy = null;

        switch(WhichTransitionWeUsing)
        {
            case 0:
                usingthisthingy = LeftRightTransition
                
                break;

                case 1:
                    usingthisthingy = RightTransition
                    break;

                    case 2:
                        usingthisthingy = LeftTransition
                        break;
        }


        usingthisthingy.style.left = TransitionX + "px";

        

        if (!ChangedSite && !ChangedPage && TransitionX + usingthisthingy.offsetWidth / 2 <= window.innerWidth / 2)
        {
            ChangedPage = true;
            PreviousPage.style.display = "none";
            NextPage.style.display = "flex";
            
        }

        if(!ChangedSite && ChangedPage && TransitionX + usingthisthingy.offsetWidth <= 0)
        {
            TransitionRunning = false;
            ChangedPage = false
            TransitionX = window.innerWidth;
            usingthisthingy.style.left = TransitionX + "px";
        }

        
}

function UpdateSiteTransition()
{
    let usingthisthingy = null;

    usingthisthingy = RightTransition
    StopX = window.innerWidth - usingthisthingy.offsetWidth + 200;

    if (ChangedSite && SiteTransitionX <= StopX)
    {
            ChangedSite = false;
            SiteTransitionRunning = false;
            WhichTransitionWeUsing = 0;
            return
    }

    SiteTransitionX -= 11000 * DeltaTime;
    usingthisthingy.style.left = SiteTransitionX + "px";
    usingthisthingy.style.right = "auto";

}


function ScrollBoxBackgrounds()
{
    InfoBoxBackgroundScroll += 25 * DeltaTime;

    FoxInfoBoxBack.style.backgroundPositionY = InfoBoxBackgroundScroll + "px";
    FoxButtonBoxBack.style.backgroundPositionY = InfoBoxBackgroundScroll + "px";
    
}

//  --------------------------------- Fox Page
let FoxPage = document.getElementById("FoxPage");

let FoxExitButton = document.getElementById("FoxExitButton");
let FoxBioButton = document.getElementById("FoxBioButton");
let FoxPersonalButton = document.getElementById("FoxPersonalButton");
let FoxInfoBox = document.getElementById("FoxInfoBox");
let FoxBioInfoBox = document.getElementById("FoxBioInfoBox");
let FoxPersonalInfoBox = document.getElementById("FoxPersonalInfoBox");
let FoxInfoBoxBack = document.getElementById("FoxInfoBoxBack");
let FoxButtonBoxBack = document.getElementById("FoxButtonBoxBack");
let FoxRefButton = document.getElementById("FoxRefButton");


async function FoxTurnOffBoxes()
{
    FoxBioInfoBox.style.display = "none";
    FoxPersonalInfoBox.style.display = "none";
}

FoxExitButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../index.html")
});

FoxBioButton.addEventListener("click", function()
{
    FoxTurnOffBoxes()
    FoxBioInfoBox.style.display = "block";


});

FoxPersonalButton.addEventListener("click", function()
{
    FoxTurnOffBoxes()
    FoxPersonalInfoBox.style.display = "block";
});



FoxRefButton.addEventListener("click", function()
{
    window.open("../../UniversalAssets/Foxpfp2.png", "_blank");
});


async function LoadEverything()
{
    const ImageURLs = new Set();
    for (const Element of document.querySelectorAll("*"))
    {
        const Background = getComputedStyle(Element).backgroundImage;

        for (const Match of Background.matchAll(/url\(\s*["']?(.*?)["']?\s*\)/g))
        {
            ImageURLs.add(Match[1]);
        }
    }

    for (const Image of document.images)
    {
        if (Image.currentSrc || Image.src)
        {
            ImageURLs.add(Image.currentSrc || Image.src);
        }
    }

    for (const EyeImage of VoidEyesImages)
    {
        const Match = EyeImage.match(/url\(\s*["']?(.*?)["']?\s*\)/);

        if (Match)
        {
            ImageURLs.add(new URL(Match[1], document.baseURI).href);
        }
    }

    function ScanRules(Rules, BaseURL)
    {
        for (const Rule of Rules)
        {
            for (const Match of Rule.cssText.matchAll(/url\(\s*["']?(.*?)["']?\s*\)/g))
            {
                const URLString = Match[1];

                try
                {
                    ImageURLs.add(new URL(URLString, BaseURL).href);
                }
                catch (Error)
                {
                    console.warn("Invalid image URL:", URLString);
                }
            }

            if (Rule.cssRules)
            {
                ScanRules(Rule.cssRules, BaseURL);
            }
        }
    }

    for (const Sheet of document.styleSheets)
    {
        try
        {
            ScanRules(Sheet.cssRules, Sheet.href || document.baseURI);
        }
        catch (Error)
        {
            console.warn("Couldn't scan stylesheet:", Sheet.href);
        }
    }

    await Promise.all([...ImageURLs].map(async URL =>
    {
        const PreloadedImage = new Image();

        if (!/\.(png|jpg|jpeg|gif|webp|avif|svg|bmp)(\?.*)?$/i.test(URL))
        {
            return;
        }

        PreloadedImage.src = URL;

        try
        {
            await PreloadedImage.decode();
        }
        catch (Error)
        {
            console.warn("Failed to load image:", URL, Error);
        }
    }));

    console.log("Image preload finished:", ImageURLs.size, "URLs");

    Start();
}

window.addEventListener("load", LoadEverything);