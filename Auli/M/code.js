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

    AuliInfoBoxBack.style.backgroundPositionY = InfoBoxBackgroundScroll + "px";
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




//------------------------------butts

let AuliPage = document.getElementById("AuliPage");

let AuliExitButton = document.getElementById("AuliExitButton");
let AuliBioButton = document.getElementById("AuliBioButton");
let AuliPersonalButton = document.getElementById("AuliPersonalButton");
let AuliInfoBox = document.getElementById("AuliInfoBox");
let AuliBioInfoBox = document.getElementById("AuliBioInfoBox");
let AuliPersonalInfoBox = document.getElementById("AuliPersonalInfoBox");
let AuliInfoBoxBack = document.getElementById("AuliInfoBoxBack");
let ButtonBoxBack = document.getElementById("ButtonBoxBack");
let AuliRefButton = document.getElementById("AuliRefButton");


async function AuliTurnOffBoxes()
{
    AuliBioInfoBox.style.display = "none";
    AuliPersonalInfoBox.style.display = "none";
}

AuliExitButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../../index.html")
});

AuliBioButton.addEventListener("click", function()
{
    AuliTurnOffBoxes()
    AuliBioInfoBox.style.display = "block";


});

AuliPersonalButton.addEventListener("click", function()
{
    AuliTurnOffBoxes()
    AuliPersonalInfoBox.style.display = "block";
});

AuliRefButton.addEventListener("click", function()
{
    window.open("../../UniversalAssets/Aulipfp2.png", "_blank");
});

//-------------------------------

Start()