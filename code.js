// ----------- whateverthefuck
const DesktopQuery = window.matchMedia("(min-aspect-ratio: 6/5)");

let Desktop = DesktopQuery.matches;

DesktopQuery.addEventListener("change", () => {
    Desktop = DesktopQuery.matches;
});

let LastTime = 0;
let DeltaTime = 0;
let MainBackground = document.getElementById("MainBackground")
let MainBackgroundScroll = 0
let ButtonBackgrounds = []
let ButtonBackgroundScroll = 0;
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

//--------- Add These

function Sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}



function Randomizer(min,max)
{
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
    
    if (Desktop)
    {
        LeftTransition.style.left -200 + "px"
    }
    else
    {
        LeftTransition.style.top -300 + "px"
    }
    
    ButtonBackgrounds.push(...document.querySelectorAll(".BackButtonBackground"));
    ButtonBackgrounds.push(...document.querySelectorAll(".NormalButtonBackground"));
    ButtonBackgrounds.push(...document.querySelectorAll(".EimonButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".ElusiaButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".GrimloweButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".SostrumButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".VidulynButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".YumalonButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".IcolassButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".SanctumButton"));

    BlinkEyes()

    LastTime = performance.now();
    requestAnimationFrame(Update);

    document.getElementById("StartupBlack").remove();

}


function Update(CurrentTime)
{
    DeltaTime = (CurrentTime - LastTime) / 1000;
    LastTime = CurrentTime;

    VoidSpin()
    ScrollButtonBackgrounds();
    RotateDoorRealm();
    

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




async function ChangePage(PageID1,PageID2)
{
    PreviousPage = PageID1
    NextPage = PageID2

    if (Desktop)
    {
        TransitionX = window.innerWidth;
    }
    else
    {
        TransitionX = window.innerHeight;
    }
    
    ChangedPage = false;
    TransitionRunning = true
    LeftRightTransition.style.display = "block";
}

async function ChangeSite()
{
    ChangedSite = true
    if (Desktop)
    {
        SiteTransitionX = window.innerWidth;
    }
    else
    {
        SiteTransitionX = window.innerHeight;
    }
    SiteTransitionRunning = true
    RightTransition.style.display = "block";
}

async function StartSite()
{
    LeftTransition.style.display = "block";
   

    if (Desktop)
    {
        StopX = window.innerWidth - LeftTransition.offsetWidth - 2000;
        StartTransitionX -= 10000 * DeltaTime;
        LeftTransition.style.left = StartTransitionX + "px";
        LeftTransition.style.right = "auto";
    }
    else
    {
        StopX = window.innerHeight - LeftTransition.offsetHeight - 2000;
        StartTransitionX -= 5000 * DeltaTime;
        LeftTransition.style.top = StartTransitionX + "px";
        LeftTransition.style.bottom = "auto";
    }
    

    if (StartSiteT && StartTransitionX <= StopX)
    {
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
        if (Desktop)
        {
            TransitionX -= 10000 * DeltaTime;
        }
        else
        {
            TransitionX -= 5000 * DeltaTime;
        }
       

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

        if (Desktop)
        {
            usingthisthingy.style.left = TransitionX + "px";
        }
        else
        {
            usingthisthingy.style.top = TransitionX + "px";
        }

        
        
        if (Desktop)
        {
            if (!ChangedSite && !ChangedPage && TransitionX + usingthisthingy.offsetWidth / 2 <= window.innerWidth / 2)
            {
                ChangedPage = true;
                PreviousPage.style.display = "none";
                NextPage.style.display = "flex";    
            }
        }
        else
        {
            if (!ChangedSite && !ChangedPage && TransitionX + usingthisthingy.offsetHeight / 2 <= window.innerHeight / 2)
            {
                ChangedPage = true;
                PreviousPage.style.display = "none";
                NextPage.style.display = "flex";
                LeftRightTransition.style.display = "none"
            }
        }

        if (Desktop)
        {
            if(!ChangedSite && ChangedPage && TransitionX + usingthisthingy.offsetWidth <= 0)
            {
                TransitionRunning = false;
                ChangedPage = false
                TransitionX = window.innerWidth;
                usingthisthingy.style.left = TransitionX + "px";
            }
        }
        else
        {
            if(!ChangedSite && ChangedPage && TransitionX + usingthisthingy.offsetHeight <= 0)
            {
                TransitionRunning = false;
                ChangedPage = false
                TransitionX = window.innerHeight;
                usingthisthingy.style.top = TransitionX + "px";
            }
        }

        

        
}

function UpdateSiteTransition()
{
    let usingthisthingy = null;

    usingthisthingy = RightTransition
    if (Desktop)
    {
        StopX = window.innerWidth - usingthisthingy.offsetWidth + 200;
    }
    else
    {
        StopX = window.innerHeight - usingthisthingy.offsetHeight + 200;
    }
    

    if (ChangedSite && SiteTransitionX <= StopX)
    {
            ChangedSite = false;
            SiteTransitionRunning = false;
            WhichTransitionWeUsing = 0;
            return
    }

    if(Desktop)
    {
        SiteTransitionX -= 11000 * DeltaTime;
        usingthisthingy.style.left = SiteTransitionX + "px";
        usingthisthingy.style.right = "auto";
    }
    else
    {
        SiteTransitionX -= 5000 * DeltaTime;
        usingthisthingy.style.top = SiteTransitionX + "px";
        usingthisthingy.style.bottom = "auto";
    }
}







//--------------------------------------------------------




let DoorRealm = document.getElementById("DoorRealm")
let DoorRealmRotation = 0

let DoorEimon = document.getElementById("DoorEimon");
let DoorElusia = document.getElementById("DoorElusia");
let DoorGrimlowe = document.getElementById("DoorGrimlowe");
let DoorSostrum = document.getElementById("DoorSostrum");
let DoorVidulyn = document.getElementById("DoorVidulyn");
let DoorYumalon = document.getElementById("DoorYumalon");
let DoorIcolass = document.getElementById("DoorIcolass");
let DoorSanctum = document.getElementById("DoorSanctum");
let EimonTitle = document.getElementById("EimonTitle")
let ElusiaTitle = document.getElementById("ElusiaTitle");
let GrimloweTitle = document.getElementById("GrimloweTitle");
let SostrumTitle = document.getElementById("SostrumTitle");
let VidulynTitle = document.getElementById("VidulynTitle");
let YumalonTitle = document.getElementById("YumalonTitle");
let IcolassTitle = document.getElementById("IcolassTitle");
let VoidTitle = document.getElementById("VoidTitle");
let SanctumTitle = document.getElementById("SanctumTitle");
let WhichRealmSelected = "None"
let ExtrasPage = document.getElementById("ExtrasPage");
let ExtrasExitButton = document.getElementById("ExtrasExitButton");
let GateEntry = document.getElementById("GateEntry");

let VoidEyesImages = [
    'url("../UniversalAssets/VoidEyeFull.png")',
    'url("../UniversalAssets/VoidEyes66.png")',
    'url("../UniversalAssets/VoidEyes33.png")',
    'url("../UniversalAssets/VoidEyes0.png")',
]

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


function VoidSpin()
{
    MainBackgroundScroll += 100 * DeltaTime;

    MainBackground.style.transform = `rotate(${MainBackgroundScroll}deg)`;

}


let DoorPage = document.getElementById("DoorPage");


GateEntry.addEventListener("click", function()
{
    switch (WhichRealmSelected)
    {
        case "Sanctum":
            ChangePage(DoorPage, ExtrasPage);
            break;

        case "Yumalon":
                ChangePage(DoorPage,QuizPage)
            break;

        case "Icolass":
            window.open("https://discord.gg/qHRgfVNZpR", "_blank");
            break;

        case "Vidulyn":
            window.open("https://github.com/NullForgeStudiosOfficial/WorkLogs", "_blank");
            break;

        case "Eimon":
            window.open("https://www.twitch.tv/nullforgestudiosofficial", "_blank");
            break;

        case "Elusia":
                window.open("https://store.steampowered.com/app/3300520/The_Ardron_Universe/", "_blank");
            break;

        case "Grimlowe":
            window.open("https://ko-fi.com/nullforgestudiosofficial", "_blank");
            break;

        case "Sostrum":
            window.open("https://nullforgestudiosofficial.github.io/Wiki/");
            break;




        case "Void":
            
            break;
    }
});


function DoorTurnOff()
{
    EimonTitle.style.display = "none";
    ElusiaTitle.style.display = "none";
    GrimloweTitle.style.display = "none";
    SostrumTitle.style.display = "none";
    VidulynTitle.style.display = "none";
    YumalonTitle.style.display = "none";
    IcolassTitle.style.display = "none";
    VoidTitle.style.display = "none";
    SanctumTitle.style.display = "none";
    //MimicClosed.style.backgroundImage = 'url("../UniversalAssets/MimicClosed.png")';
    DoorClosedOpen.style.backgroundImage = 'url("../UniversalAssets/MainMenuDoorOpen.png")';
    GateEntry.style.display = "block";
}

DoorSanctum.addEventListener("click", function()
{
    DoorTurnOff();
    WhichRealmSelected = "Sanctum";
    SanctumTitle.style.display = "block";
    DoorFrame.style.backgroundImage = 'url("../UniversalAssets/MainDoorFrameSanctum.png")';
    DoorRealm.style.backgroundImage = 'url("../UniversalAssets/SanctumBack.png")';
    //MimicClosed.style.backgroundImage = 'url("../UniversalAssets/MimicOpen.png")';
});

DoorYumalon.addEventListener("click", function()
{
    DoorTurnOff();
    WhichRealmSelected = "Yumalon";
    YumalonTitle.style.display = "block";
    DoorFrame.style.backgroundImage = 'url("../UniversalAssets/MainDoorFrameYumalon.png")';
    DoorRealm.style.backgroundImage = 'url("../UniversalAssets/YumalonBack.png")';
});

DoorIcolass.addEventListener("click", function()
{
    DoorTurnOff();
    WhichRealmSelected = "Icolass";
    IcolassTitle.style.display = "block";
    DoorFrame.style.backgroundImage = 'url("../UniversalAssets/MainDoorFrameIcolass.png")';
    DoorRealm.style.backgroundImage = 'url("../UniversalAssets/IcolassBack.png")';
});

DoorVidulyn.addEventListener("click", function()
{
    DoorTurnOff();
    WhichRealmSelected = "Vidulyn";
    VidulynTitle.style.display = "block";
    DoorFrame.style.backgroundImage = 'url("../UniversalAssets/MainDoorFrameVidulyn.png")';
    DoorRealm.style.backgroundImage = 'url("../UniversalAssets/VidulynBack.png")';
});

DoorVoid.addEventListener("click", function()
{
    DoorTurnOff();
    WhichRealmSelected = "Void";
    VoidTitle.style.display = "block";
    DoorFrame.style.backgroundImage = 'url("../UniversalAssets/MainDoorFrameVoid.png")';
    DoorRealm.style.backgroundImage = 'url("../UniversalAssets/VoidBack.png")';
});

DoorEimon.addEventListener("click", function()
{
    DoorTurnOff();
    WhichRealmSelected = "Eimon";
    EimonTitle.style.display = "block";
    DoorFrame.style.backgroundImage = 'url("../UniversalAssets/MainDoorFrameEimon.png")';
    DoorRealm.style.backgroundImage = 'url("../UniversalAssets/EimonBack.png")';
});

DoorElusia.addEventListener("click", function()
{
    DoorTurnOff();
    WhichRealmSelected = "Elusia";
    ElusiaTitle.style.display = "block";
    DoorFrame.style.backgroundImage = 'url("../UniversalAssets/MainDoorFrameElusia.png")';
    DoorRealm.style.backgroundImage = 'url("../UniversalAssets/ElusiaBack.png")';
});

DoorGrimlowe.addEventListener("click", function()
{
    DoorTurnOff();
    WhichRealmSelected = "Grimlowe";
    GrimloweTitle.style.display = "block";
    DoorFrame.style.backgroundImage = 'url("../UniversalAssets/MainDoorFrameGrimlowe.png")';
    DoorRealm.style.backgroundImage = 'url("../UniversalAssets/GrimloweBack.png")';
});

DoorSostrum.addEventListener("click", function()
{
    DoorTurnOff();
    WhichRealmSelected = "Sostrum";
    SostrumTitle.style.display = "block";
    DoorFrame.style.backgroundImage = 'url("../UniversalAssets/MainDoorFrameSostrum.png")';
    DoorRealm.style.backgroundImage = 'url("../UniversalAssets/SostrumBack.png")';
});





function RotateDoorRealm()
{
    if (Desktop)
    {
        DoorRealmRotation -= 500 * DeltaTime;
    }
    else
    {
        DoorRealmRotation -= 250 * DeltaTime;
    }
    
    DoorRealm.style.backgroundPositionY = DoorRealmRotation + "px";
}



let BDMInfoBox = document.getElementById("BDMInfoBox");
let BDMButton = document.getElementById("BDMButton");

let AuliButton = document.getElementById("AuliButton");
let PupButton = document.getElementById("PupButton");
let VexButton = document.getElementById("VexButton");
let FoxButton = document.getElementById("FoxButton");

let ExitQuizes = document.getElementById("ExitQuizes");

let QuizPage = document.getElementById("QuizPage");

let NESPlusButton = document.getElementById("NESPlusButton");
let RealmQuizButton = document.getElementById("RealmQuizButton");
let StatQuizButton = document.getElementById("StatQuizButton");


async function ExtrasTurnOffBoxes()
{
    BDMInfoBox.style.display = "none";
}


NESPlusButton.addEventListener("click", function()
{
    LoadSite("NESPlus/index.html")
});


BDMButton.addEventListener("click", function()
{
    ExtrasTurnOffBoxes()
    BDMInfoBox.style.display = "block";
});

AuliButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("Auli/index.html")

});

PupButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("Pup/index.html")

});

VexButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("Vex/index.html")

});

FoxButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("Fox/index.html")

});


ExtrasExitButton.addEventListener("click", function()
{
    ChangePage(ExtrasPage,DoorPage)
});

ExitQuizes.addEventListener("click", function()
{
    ChangePage(QuizPage,DoorPage)
});

RealmQuizButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("RealmQuiz/index.html")
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