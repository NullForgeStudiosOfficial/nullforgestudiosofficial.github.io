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
let WikiInfoPanelFrameBackground = document.getElementById("WikiInfoPanelFrameBackground")



async function ScrollBackground()
{
    TopBarScroll += 100 * DeltaTime;

    TopBarGraphics.style.backgroundPositionY = TopBarScroll + "px";
    WikiNavigationPanelBackground.style.backgroundPositionY = TopBarScroll + "px";
    WikiInfoPanelFrameBackground.style.backgroundPositionY = (TopBarScroll/2) + "px";
}


function UpdateBarTransition()
{
    if (TopBarTransition)
    {
        if(Desktop)
        {
            let Target = TopBarOpen ? 0 : -10;

            TopBarPosition += (Target - TopBarPosition) * Math.min(1, 10 * DeltaTime);

            TopBar.style.top = TopBarPosition + "%";

            if (Math.abs(Target - TopBarPosition) < 0.01)
            {
                TopBarPosition = Target;
                TopBarTransition = false;
            }
        }
        else
        {

        }
            

    }

    if (NavigationBarTransition)
    {
        if (Desktop)
        {
            let Target = NavigationOpen ? 0 : -15.5;

            NavigationBarPosition += (Target - NavigationBarPosition) * Math.min(1, 10 * DeltaTime);

            WikiNavigationPanelFrame.style.left = NavigationBarPosition + "%";

            if (Math.abs(Target - NavigationBarPosition) < 0.01)
            {
                NavigationBarPosition = Target;
                WikiNavigationPanelFrame.style.left = Target + "%";
                NavigationBarTransition = false;
            }
        }
        else
        {

        }
    }
}

let ArdronUniverse = document.getElementById("ArdronUniverse")
let AoAButton = document.getElementById("AoAButton")
let VTButton = document.getElementById("VTButton")
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

/*
let NavigationTabButton = document.getElementById("NavigationTabButton")
let TopBarTabButton = document.getElementById("TopBarTabButton")

let NavigationTab = document.getElementById("NavigationTab")
let TopBarTab = document.getElementById("TopBarTab")

let TopBar = document.getElementById("TopBar")
let WikiNavigationPanelFrame = document.getElementById("WikiNavigationPanelFrame")

let NavigationOpen = true;
let TopBarOpen = true;
let NavigationBarTransition = false;
let TopBarTransition = false;
let TopBarPosition = 0;
let NavigationBarPosition = 0;

NavigationTabButton.addEventListener("click", function()
{
    if (NavigationBarTransition)
    {
        return;
    }

    if (NavigationOpen)
    {
        NavigationOpen = false;
        NavigationTab.style.backgroundImage = 'url("../../UniversalAssets/TabRight.png")';
    }
    else
    {
        NavigationOpen = true;
        NavigationTab.style.backgroundImage = 'url("../../UniversalAssets/TabLeft.png")';
    }

    NavigationBarTransition = true;
});

TopBarTabButton.addEventListener("click", function()
{
    if (TopBarTransition)
    {
        return;
    }

    if (TopBarOpen)
    {
        TopBarOpen = false;
        TopBarTab.style.backgroundImage = 'url("../../UniversalAssets/TabDown.png")';
    }
    else
    {
        TopBarOpen = true;
        TopBarTab.style.backgroundImage = 'url("../../UniversalAssets/TabUp.png")';
    }

    TopBarTransition = true;

});

*/

//-----------------------------------------



let LoreButton = document.getElementById("LoreButton")
let RealmsButton = document.getElementById("RealmsButton")
let GodsButton = document.getElementById("GodsButton")
let CharactersButton = document.getElementById("CharactersButton")
let FactionsButton = document.getElementById("FactionsButton")
let LocationsButton = document.getElementById("LocationsButton")
let ManaButton = document.getElementById("ManaButton")



LoreButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/ArdronUniverse/Lore/index.html")
});

RealmsButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/ArdronUniverse/Realms/index.html")
});

GodsButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/ArdronUniverse/Gods/index.html")
});

CharactersButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/ArdronUniverse/Characters/index.html")
});

FactionsButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/ArdronUniverse/Factions/index.html")
});

LocationsButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/ArdronUniverse/Locations/index.html")
});


ManaButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../../Wiki/ArdronUniverse/Mana/index.html")
});




//-----------------------------------------

async function PreLoadEverything()
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

window.addEventListener("load", PreLoadEverything);