// ----------- whateverthefuck
let DesktopQuery = window.matchMedia("(min-aspect-ratio: 6/5)");

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
        LeftTransition.style.left = -200 + "px"
        
    }
    else
    {
        LeftTransition.style.top = -300 + "px"

    }

    Speakers = [
    { ID: "None",  Background: 'url("../../../UniversalAssets/NoneButtonBackground.png")' },
    { ID: "Iwata",  Background: 'url("../../../UniversalAssets/EimonButtonBackground.png")' },
    { ID: "Sythys", Background: 'url("../../../UniversalAssets/ElusiaButtonBackground.png")' },
    { ID: "Entar",  Background: 'url("../../../UniversalAssets/GrimloweButtonBackground.png")' },
    { ID: "Zykius", Background: 'url("../../../UniversalAssets/SostrumButtonBackground.png")' },
    { ID: "Astus",  Background: 'url("../../../UniversalAssets/VidulynButtonBackground.png")' },
    { ID: "Tynos",  Background: 'url("../../../UniversalAssets/YumalonButtonBackground.png")' },
    { ID: "Void", Background: 'url("../../../UniversalAssets/VoidButtonBackground.png")' }];


    ButtonBackgrounds.push(...document.querySelectorAll(".NormalButtonBackground"));
    ButtonBackgrounds.push(...document.querySelectorAll(".AUButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".EimonButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".ElusiaButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".GrimloweButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".SostrumButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".VidulynButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".YumalonButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".VoidButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".IcolassButton"));
    ButtonBackgrounds.push(...document.querySelectorAll(".SanctumButton"));


    LastTime = performance.now();
    requestAnimationFrame(Update);

    document.getElementById("StartupBlack").remove();
    InformationButton.querySelector(".NormalButtonBackground").style.filter = "brightness(150%)";

}


function Update(CurrentTime)
{
    DeltaTime = (CurrentTime - LastTime) / 1000;
    LastTime = CurrentTime;

    ScrollButtonBackgrounds();
    ScrollBackground();

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

    //if (TopBarTransition || NavigationBarTransition)
    //{
    //    UpdateBarTransition();
    //}

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




let TopBarGraphics = document.getElementById("TopBarGraphics")
let TopBarScroll = 0
let WikiNavigationPanelBackground = document.getElementById("WikiNavigationPanelBackground")

async function ScrollBackground()
{
    TopBarScroll += 100 * DeltaTime;

    TopBarGraphics.style.backgroundPositionY = TopBarScroll + "px";
    WikiNavigationPanelBackground.style.backgroundPositionY = TopBarScroll + "px";
    WikiInfoPanelFrameBackground.style.backgroundPositionY = (TopBarScroll/2) + "px";
}


let ArdronUniverse = document.getElementById("ArdronUniverse")
let AoAButton = document.getElementById("AoAButton")
let VTButton = document.getElementById("VTButton")
let ATButton = document.getElementById("ATButton")
let ACButton = document.getElementById("ACButton")
let EoAButton = document.getElementById("EoAButton")
let RRButton = document.getElementById("RRButton")
let GLButton = document.getElementById("GLButton")
let DPButton = document.getElementById("DPButton")
let SFButton = document.getElementById("SFButton")


ArdronUniverse.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/ArdronUniverse/index.html")
});

AoAButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/AshesOfArcanum/index.html")
});

VTButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/VerdantThesis/index.html")
});

ACButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/Ashbound/index.html")
});

EoAButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/EchosOfAria/index.html")
});

RRButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/RimaltsRecollection/index.html")
});

GLButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite(".../../../Wiki/GracesLament/index.html")
});

DPButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/DaemonProtocol/index.html")
});

SFButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/Falatur/index.html")
});

ATButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/ArcaneTitans/index.html")
});

//-----------------------------------------
let ArmorButton = document.getElementById("ArmorButton")
let BestiaryButton = document.getElementById("BestiaryButton")
let CombatButton = document.getElementById("CombatButton")
let DLLButton = document.getElementById("DLLButton")
let GuideButton = document.getElementById("GuideButton")
let ItemButton = document.getElementById("ItemButton")
let QuestButton = document.getElementById("QuestButton")
let StatsButton = document.getElementById("StatsButton")
let WeaponsButton = document.getElementById("WeaponsButton")

ArmorButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/DaemonProtocol/Armor/index.html")
});

BestiaryButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/DaemonProtocol/Bestiary/index.html")
});

CombatButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/DaemonProtocol/Combat/index.html")
});

DLLButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/DaemonProtocol/DLLs/index.html")
});

GuideButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/DaemonProtocol/Guide/index.html")
});

ItemButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/DaemonProtocol/Items/index.html")
});

QuestButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/DaemonProtocol/Quests/index.html")
});

StatsButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/DaemonProtocol/Stats/index.html")
});

WeaponsButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/DaemonProtocol/Weapons/index.html")
});

let InformationButton = document.getElementById("InformationButton")
let ArmorListButton = document.getElementById("ArmorListButton")
let ModifiersButton = document.getElementById("ModifiersButton")

let InformationPanel = document.getElementById("InformationPanel")
let ArmorListPanel = document.getElementById("ArmorListPanel")
let ModifierPanel = document.getElementById("ModifierPanel")

function ResetPages()
{
    
    InformationPanel.style.display = "none";
    ArmorListPanel.style.display = "none";
    ModifierPanel.style.display = "none";

    InformationButton.querySelector(".NormalButtonBackground").style.filter = "brightness(50%)";
    ArmorListButton.querySelector(".NormalButtonBackground").style.filter = "brightness(50%)";
    ModifiersButton.querySelector(".NormalButtonBackground").style.filter = "brightness(50%)";
}


InformationButton.addEventListener("click", function()
{
    ResetPages();
    InformationPanel.style.display = "block";
    InformationButton.querySelector(".NormalButtonBackground").style.filter = "brightness(150%)";
});

ArmorListButton.addEventListener("click", function()
{
    ResetPages();
    ArmorListPanel.style.display = "block";
    ArmorListButton.querySelector(".NormalButtonBackground").style.filter = "brightness(150%)";
});

ModifiersButton.addEventListener("click", function()
{
    ResetPages();
    ModifierPanel.style.display = "block";
    ModifiersButton.querySelector(".NormalButtonBackground").style.filter = "brightness(150%)";
});

//-----------------------------------------

async function PreLoadEverything()
{
    let ImageURLs = new Set();
    for (let Element of document.querySelectorAll("*"))
    {
        let Background = getComputedStyle(Element).backgroundImage;

        for (let Match of Background.matchAll(/url\(\s*["']?(.*?)["']?\s*\)/g))
        {
            ImageURLs.add(Match[1]);
        }
    }

    for (let Image of document.images)
    {
        if (Image.currentSrc || Image.src)
        {
            ImageURLs.add(Image.currentSrc || Image.src);
        }
    }

    function ScanRules(Rules, BaseURL)
    {
        for (let Rule of Rules)
        {
            for (let Match of Rule.cssText.matchAll(/url\(\s*["']?(.*?)["']?\s*\)/g))
            {
                let URLString = Match[1];

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

    for (let Sheet of document.styleSheets)
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
        let PreloadedImage = new Image();

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

    FitButtonText()
}

function FitButtonText()
{
    let Canvas = document.createElement("canvas");
    let Context = Canvas.getContext("2d");

    document.querySelectorAll(".SmolNavigationButtonText").forEach(Text =>
    {
        Text.style.fontSize = "";
        Text.style.whiteSpace = "nowrap";

        let Style = getComputedStyle(Text);
        let Size = parseFloat(Style.fontSize);

        let MaxWidth = Text.clientWidth - (Desktop ? 10 : 8);
        let MinimumSize = Desktop ? 8 : 4;

        while (Size > MinimumSize)
        {
            Context.font = `${Style.fontWeight} ${Size}px ${Style.fontFamily}`;

            let TextWidth = Context.measureText(Text.textContent.trim()).width;

            if (TextWidth <= MaxWidth)
                break;

            Size -= 0.5;
        }

        Text.style.fontSize = Size + "px";
    });

    Start();
}

window.addEventListener("load", PreLoadEverything);