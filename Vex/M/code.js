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


let DoorEimon = document.getElementById("DoorEimon");
let DoorElusia = document.getElementById("DoorElusia");
let DoorGrimlowe = document.getElementById("DoorGrimlowe");
let DoorSostrum = document.getElementById("DoorSostrum");
let DoorVidulyn = document.getElementById("DoorVidulyn");
let DoorYumalon = document.getElementById("DoorYumalon");
let DoorIcolass = document.getElementById("DoorIcolass");
let DoorSanctum = document.getElementById("DoorSanctum");

async function Start()
{
    
    LeftTransition.style.left = 0 + "px"
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

function ScrollBoxBackgrounds()
{
    InfoBoxBackgroundScroll += 25 * DeltaTime;

    VexInfoBoxBack.style.backgroundPositionY = InfoBoxBackgroundScroll + "px";
    ButtonBoxBack.style.backgroundPositionY = InfoBoxBackgroundScroll + "px";
    
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
       TransitionX -= 5000 * DeltaTime;

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




//  --------------------------------- Vex Page
let VexPage = document.getElementById("VexPage");

let VexExitButton = document.getElementById("VexExitButton");
let VexBioButton = document.getElementById("VexBioButton");
let VexPersonalButton = document.getElementById("VexPersonalButton");
let VexInfoBox = document.getElementById("VexInfoBox");
let VexDevButton= document.getElementById("VexDevButton");
let VexBioInfoBox = document.getElementById("VexBioInfoBox");
let VexPersonalInfoBox = document.getElementById("VexPersonalInfoBox");
let VexDevInfoBox = document.getElementById("VexDevInfoBox");
let VexInfoBoxBack = document.getElementById("VexInfoBoxBack");
let VexButtonBoxBack = document.getElementById("VexButtonBoxBack");
let VexRefButton = document.getElementById("VexRefButton");


async function VexTurnOffBoxes()
{
    VexBioInfoBox.style.display = "none";
    VexPersonalInfoBox.style.display = "none";
    VexDevInfoBox.style.display = "none";
}

VexExitButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../index.html")
});

VexBioButton.addEventListener("click", function()
{
    VexTurnOffBoxes()
    VexBioInfoBox.style.display = "block";


});

VexPersonalButton.addEventListener("click", function()
{
    VexTurnOffBoxes()
    VexPersonalInfoBox.style.display = "block";
});

VexDevButton.addEventListener("click", function()
{
    VexTurnOffBoxes()
    VexDevInfoBox.style.display = "block";
});


VexRefButton.addEventListener("click", function()
{
    window.open("../../UniversalAssets/Vexpfp2.png", "_blank");
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