// ----------- whateverthefuck
let DoorRealm = document.getElementById("DoorRealm")
let DoorRealmRotation = 0
let VoidEyesImages = [
    'url("../UniversalAssets/VoidEyeFull.png")',
    'url("../UniversalAssets/VoidEyes66.png")',
    'url("../UniversalAssets/VoidEyes33.png")',
    'url("../UniversalAssets/VoidEyes0.png")',
]


let DoorEimon = document.getElementById("DoorEimon");
let DoorElusia = document.getElementById("DoorElusia");
let DoorGrimlowe = document.getElementById("DoorGrimlowe");
let DoorSostrum = document.getElementById("DoorSostrum");
let DoorVidulyn = document.getElementById("DoorVidulyn");
let DoorYumalon = document.getElementById("DoorYumalon");
let DoorIcolass = document.getElementById("DoorIcolass");
let DoorSanctum = document.getElementById("DoorSanctum");




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

async function Start()
{
    
    LeftTransition.style.left = 0 + "px"
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
    ButtonBackgrounds.push(...document.querySelectorAll(".WideButtonBackground"));

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
       TransitionX -= 3333 * DeltaTime;

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


        usingthisthingy.style.top = TransitionX + "px";

        

        if (!ChangedSite && !ChangedPage && TransitionX + usingthisthingy.offsetHeight / 2 <= window.innerHeight / 2)
        {
            ChangedPage = true;
            PreviousPage.style.display = "none";
            NextPage.style.display = "flex";
            
        }

        if(!ChangedSite && ChangedPage && TransitionX + usingthisthingy.offsetHeight <= 0)
        {
            TransitionRunning = false;
            ChangedPage = false
            TransitionX = window.innerHeight;
            usingthisthingy.style.top = TransitionX + "px";
        }

        
}

function UpdateSiteTransition()
{
    let usingthisthingy = null;

    usingthisthingy = RightTransition
    StopX = window.innerHeight - usingthisthingy.offsetHeight + 200;

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

function RotateDoorRealm()
{
    DoorRealmRotation -= 250 * DeltaTime;
    DoorRealm.style.backgroundPositionY = DoorRealmRotation + "px";
}





//------------------------------butts

let EnterDoor = document.getElementById("EnterDoor")
let WhichRealmSelected = ""
let EimonTitle = document.getElementById("EimonTitle")
let ElusiaTitle = document.getElementById("ElusiaTitle");
let GrimloweTitle = document.getElementById("GrimloweTitle");
let SostrumTitle = document.getElementById("SostrumTitle");
let VidulynTitle = document.getElementById("VidulynTitle");
let YumalonTitle = document.getElementById("YumalonTitle");
let IcolassTitle = document.getElementById("IcolassTitle");
let VoidTitle = document.getElementById("VoidTitle");
let SanctumTitle = document.getElementById("SanctumTitle");

let DoorFrame = document.getElementById("DoorFrame"); 
let DoorClosedOpen = document.getElementById("DoorClosedOpen"); 


let NESPlusButton = document.getElementById("NESPlusButton");
let RealmQuizButton = document.getElementById("RealmQuizButton");
let StatQuizButton = document.getElementById("StatQuizButton");

let ExtrasNESPlusInfoBox = document.getElementById("ExtrasNESPlusInfoBox");
let ExtrasRealmQuizInfoBox = document.getElementById("ExtrasRealmQuizInfoBox");
let ExtrasStatQuizInfoBox = document.getElementById("ExtrasStatQuizInfoBox");

let ExtrasConfirmButton = document.getElementById("ExtrasConfirmButton");
let ExtrasCurrentSelection = "None";

EnterDoor.addEventListener("click", function()
{
    switch (WhichRealmSelected)
    {
        case "Sanctum":
            ChangePage(DoorPage, ExtrasPage);
            break;

        case "Yumalon":
            window.open("https://ko-fi.com/nullforgestudiosofficial", "_blank");
            break;

        case "Icolass":
            window.open("https://discord.gg/qHRgfVNZpR", "_blank");
            break;

        case "Vidulyn":
            window.open("https://github.com/NullForgeStudiosOfficial/WorkLogs", "_blank");
            break;

        case "Void":
            window.open("https://www.twitch.tv/nullforgestudiosofficial", "_blank");
            break;

        case "Eimon":

            break;

        case "Elusia":

            break;

        case "Grimlowe":
            window.open("https://store.steampowered.com/app/3300520/The_Ardron_Universe/", "_blank");
            break;

        case "Sostrum":
            window.open("https://nullforgestudiosofficial.github.io/Wiki/");
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
    MimicClosed.style.backgroundImage = 'url("../UniversalAssets/MimicClosed.png")';
    DoorClosedOpen.style.backgroundImage = 'url("../UniversalAssets/MainMenuDoorOpen.png")';
}

DoorSanctum.addEventListener("click", function()
{
    DoorTurnOff();
    WhichRealmSelected = "Sanctum";
    SanctumTitle.style.display = "block";
    DoorFrame.style.backgroundImage = 'url("../UniversalAssets/MainDoorFrameSanctum.png")';
    DoorRealm.style.backgroundImage = 'url("../UniversalAssets/SanctumBack.png")';
    MimicClosed.style.backgroundImage = 'url("../UniversalAssets/MimicOpen.png")';
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


//----------------------------------------------------------------------------------


let BDMInfoBox = document.getElementById("BDMInfoBox");
let BDMButton = document.getElementById("BDMButton");

let AuliButton = document.getElementById("AuliButton");
let PupButton = document.getElementById("PupButton");
let VexButton = document.getElementById("VexButton");
let FoxButton = document.getElementById("FoxButton");


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

//-------------------------------



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