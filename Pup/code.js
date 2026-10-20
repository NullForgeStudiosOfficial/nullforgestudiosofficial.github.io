
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

    if (DeltaTime > 0.025)
    {
        console.log("SLOW FRAME:", (DeltaTime * 1000).toFixed(2), "ms");
    }

    if (PupEDHHDInfoBox.style.display == "block")
    {
       ScrollLines()

       if (OnChannel3)
       {
            MoveObjects(PupClouds, GrassSpeed / 3);
       }

       if (GameStarted)
       {
            UpdatePupTimeAndScore()
            GrassScroll()
            CheckPupCollisions();
            MoveObjects(PupRocks, RockSpeed);
            MoveObjects(PupCoins, RockSpeed);

            UpdatePupJump();
       }
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

    PupInfoBoxBack.style.backgroundPositionY = InfoBoxBackgroundScroll + "px";
    PupButtonBoxBack.style.backgroundPositionY = InfoBoxBackgroundScroll + "px";
    
}



//  --------------------------------- Pup Page
let PupPage = document.getElementById("PupPage");
let PupExitButton = document.getElementById("PupExitButton");
let PupBioButton = document.getElementById("PupBioButton");
let PupPersonalButton = document.getElementById("PupPersonalButton");
let PupInfoBox = document.getElementById("PupInfoBox");
let PupBioInfoBox = document.getElementById("PupBioInfoBox");
let PupPersonalInfoBox = document.getElementById("PupPersonalInfoBox");
let PupEDHHDInfoBox = document.getElementById("PupEDHHDInfoBox");
let PupEDHHDButton = document.getElementById("PupEDHHDButton");
let PupRefButton = document.getElementById("PupRefButton");

let PupInfoBoxBack = document.getElementById("PupInfoBoxBack");
let PupButtonBoxBack = document.getElementById("PupButtonBoxBack");


let PupSky = document.getElementById("Sky")
let PupStatic = document.getElementById("Static")
let PupGrass = document.getElementById("PupGrass")
let Rocks = document.querySelectorAll(".Rock");
let Coins = document.querySelectorAll(".Coin");
let Clouds = document.querySelectorAll(".Cloud");
let PupCurrentChannel = 1
let PupScore = 0
let PupCoinAmount = 0
let PupGameTime = 0
let PupLives = 3
let PupSpeed = 1
let PupAnimationSpeed = 100
let GrassScrollNumber = 0


let StaticBool = false
let StaticPlayBool = false


let ScanLines =document.getElementById("ScanLines");

let ScanLinePOS = 0 

let PupStartGameButton = document.getElementById("StartButton")
let PupMenuHead = document.getElementById("PupHead")
let PupMenuBody = document.getElementById("PupBody")
let PupWinking = [
    "../../UniversalAssets/DogWink1.png",
    "../../UniversalAssets/DogWink2.png",
    "../../UniversalAssets/DogWink3.png",
    "../../UniversalAssets/DogWink2.png",
    "../../UniversalAssets/DogWink1.png",
    "../../UniversalAssets/DogHead.png",
]
let PupHeadPosition = 0
let PupDown = false

let PupStartScreen = document.getElementById("StartScreen")
let PupHeadScreen = document.getElementById("PupLivesHead")
let PupLivesScreen = document.getElementById("PupLives")
 
let GameTitle = document.getElementById("GameTitle")

let GameInfoBar = document.getElementById("GameInfoBar")

let InfoBarScore = document.getElementById("PupScore")
let InfoBarCoins = document.getElementById("PupCoins")
let InfoBarTime = document.getElementById("PupTime")

let PupSprite = document.getElementById("PupSprite")
let PupRunning = [
    "../../UniversalAssets/PupRun1.png",
    "../../UniversalAssets/PupRun2.png",
    "../../UniversalAssets/PupRun3.png",
]

let PupRockImages = [
    "../../UniversalAssets/Rock1.png",
    "../../UniversalAssets/Rock2.png",
    "../../UniversalAssets/Rock3.png",
    "../../UniversalAssets/Rock4.png",
    "../../UniversalAssets/Rock5.png",
    "../../UniversalAssets/Rock6.png",
    "../../UniversalAssets/Rock7.png",
]

let PupCloudImages = [
    "../../UniversalAssets/Cloud1.png",
    "../../UniversalAssets/Cloud2.png",
    "../../UniversalAssets/Cloud3.png",
    "../../UniversalAssets/Cloud4.png",
    "../../UniversalAssets/Cloud5.png",
]

let ScreenGracePeriod = false
let GrassSpeed = 500
let RockSpeed = 500

let PupHitBox = document.getElementById("PupHitBox");

let PupRocks = [];
let PupCoins = [];
let PupClouds = [];

let BaseRockSpawnMin = 500
let BaseRockSpawnMax = 1500
let RockMax = 4

let BaseCoinSpawnMin = 500
let BaseCoinSpawnMax = 1500
let CoinMax = 2
let CoinMaxHeight = 45
let CoinMinHeight = 20
let CoinRockMinDistance = 100
let RockMinDistance = 350;

let BaseCloudSpawnMin = 2000
let BaseCloudSpawnMax = 4000
let CloudMax = 6
let CloudMinHeight = 65
let CloudMaxHeight = 85


let Jump = document.getElementById("Jump");
let JumpScreen = document.getElementById("JumpScreen")
let PupJumped = false
let PupJumping = false;
let PupYVelocity = 0;
let PupY = 0;
let PupLastHighScore = 0
let PupLastHighScoreText = document.getElementById("LastHighScore")
let PupWin = document.getElementById("PupWin")


let TVOn = true

let OnChannel3 = false;
let GameStarted = false;


async function PupTurnOffBoxes()
{
    PupInfoBoxBack.style.display = "none";
    PupBioInfoBox.style.display = "none";
    PupPersonalInfoBox.style.display = "none";
    PupEDHHDInfoBox.style.display = "none"
    OnChannel3 = false;
}

PupExitButton.addEventListener("click", function()
{
    WhichTransitionWeUsing = 1
    ChangeSite()
    LoadSite("../index.html")
});

PupBioButton.addEventListener("click", function()
{
    PupTurnOffBoxes()
    PupBioInfoBox.style.display = "block";
    PupInfoBoxBack.style.display = "block";
    CleanUpGame();


});

PupPersonalButton.addEventListener("click", function()
{
    PupTurnOffBoxes()
    PupPersonalInfoBox.style.display = "block";
    PupInfoBoxBack.style.display = "block";
    CleanUpGame();
});

PupEDHHDButton.addEventListener("click", function()
{
    PupTurnOffBoxes()
    OnChannel3 = true;
    PupEDHHDInfoBox.style.display = "block";
    CleanUpGame();
    CloudSpawner()
    PupHeadBob()


});


PupRefButton.addEventListener("click", function()
{
    window.open("../../UniversalAssets/Puppfp2.png", "_blank");
});


function CleanUpLevel()
{
    for (let Rock of PupRocks)
    {
        Rock.remove();
    }

    for (let Coin of PupCoins)
    {
        Coin.remove();
    }

    PupRocks = [];
    PupCoins = [];
    PupJumped = false;
    PupJumping = false;
    PupYVelocity = 0;
    PupY = 0;
    PupSprite.style.transform = `translateY(${-PupY}px)`;
}

function CleanUpGame()
{
    CleanUpLevel()

    GameStarted = false
    GameTitle.style.display = "block"
    PupStartScreen.style.display = "none"
    GameInfoBar.style.display = "none"
    PupSprite.style.display = "none"
    PupScore = 0;
    PupLives = 3;
    PupCoinAmount = 0
    PupGameTime = 0
    PupJumped = false;
    PupJumping = false;
    PupYVelocity = 0;
    PupY = 0;

    if (window.innerHeight < 650)
    {

        PupSky.style.bottom = "+" + 12.25 + "%";

        
    }
    else
    {
        PupSky.style.bottom = "-" + 2 + "%";
    }



    PupGrass.style.filter = "brightness(100%) sepia(0%) saturate(100%)";
    InfoBarScore.innerText = Math.floor(PupScore);
    InfoBarTime.innerText = Math.floor(PupGameTime);
    InfoBarCoins.innerText = PupCoinAmount
    JumpScreen.style.display = "none";
    PupLivesScreen.innerText = "x" + PupLives;
    

    for (let Cloud of PupClouds)
    {
        Cloud.remove();
    }

    PupClouds = [];
}


PupStartGameButton.addEventListener("click", function()
{
    PupWink();
});



async function PupWink()
{
    

    while(PupMenuHead.style.backgroundPositionY != 0 + "px")
    {
        
        await Sleep(10)
    }

    PupWinking.forEach(ImagePath =>
    {
        const Img = new Image();
        Img.src = ImagePath;
    });

    

    
    for (let i = 0; i < PupWinking.length; i++)
    {
        PupMenuHead.style.backgroundImage = `url("${PupWinking[i]}")`

        await Sleep(75)
    }




    GameTitle.style.display = "none"

    PupStartScreen.style.display = "block"
    ScreenGracePeriod = true

    GameStarted = true

    await Sleep(2000)

    GameInfoBar.style.display = "block"

    PupSprite.style.display = "block"

    PupStartScreen.style.display = "none"

    JumpScreen.style.display = "block"

    PupSpriteAnimation()

    RockSpawner()
    CoinSpawner()

    

    await Sleep(500)

    ScreenGracePeriod = false

    
}

async function PupHeadBob()
{
    PupDown = true
    while(OnChannel3 && !GameStarted)
    {
        if (PupDown)
        {
            PupHeadPosition +=1
            await Sleep(50)
            if (PupHeadPosition >= 10)
            { 
                PupDown = false
            }
        }
        else
        {
            PupHeadPosition -=1
            await Sleep(50)
            if (PupHeadPosition <= 0)
            {
                PupDown = true
            }
        }

        PupMenuHead.style.backgroundPositionY = PupHeadPosition + "px"


    }
}

async function PupSpriteAnimation()
{
    let pupframe = 0

    PupRunning.forEach(ImagePath =>
    {
        const Img = new Image();
        Img.src = ImagePath;
    });


    while(GameStarted)
    {
        if (pupframe == 3)
        {
            pupframe = 0
        }

        PupSprite.style.backgroundImage = `url("${PupRunning[pupframe]}")`
        pupframe++

        await Sleep(PupAnimationSpeed)
    }
}

function GrassScroll()
{
    const GrassWidth = PupGrass.clientWidth;

    GrassScrollNumber -= GrassSpeed * DeltaTime;
    GrassScrollNumber %= GrassWidth;

    PupGrassScroll.style.transform =
        `translate3d(${GrassScrollNumber}px, 0, 0)`;
}

let ScoreTimer = 0;
function UpdatePupTimeAndScore()
{
    if (ScreenGracePeriod)
    {       
        return;
    }

    ScoreTimer += DeltaTime;

    if (ScoreTimer < 1)
    {
        return;
    }

    let ElapsedSeconds = Math.floor(ScoreTimer);
    ScoreTimer -= ElapsedSeconds;

    PupGameTime += ElapsedSeconds;

    let CoinMultiplier = 1 + (PupCoinAmount * 0.1);

    PupScore += 100 * CoinMultiplier * ElapsedSeconds;

    InfoBarScore.textContent = Math.floor(PupScore);
    InfoBarTime.textContent = Math.floor(PupGameTime);
    InfoBarCoins.textContent = PupCoinAmount;


}



function IsColliding(Object1, Object2)
{
    if (!Object1 || !Object2)
    {
        return false;
    }

    let Box1 = Object1.getBoundingClientRect();
    let Box2 = Object2.getBoundingClientRect();

    return (
        Box1.left < Box2.right &&
        Box1.right > Box2.left &&
        Box1.top < Box2.bottom &&
        Box1.bottom > Box2.top
    );
}


async function CheckPupCollisions()
{
    let Rocks = document.querySelectorAll(".Rock");

    for (let Rock of Rocks)
    {
        let RockHitBox = Rock.querySelector(".RockHitBox");

        if (IsColliding(PupHitBox, RockHitBox))
        {
            CleanUpLevel()
            PupStartScreen.style.display = "block"
            ScreenGracePeriod = true

            PupLives -=1

            if (PupLives == -1)
            {
                PupHeadScreen.style.display = "none"
                PupLivesScreen.innerText = "GAME OVER"
                if (PupScore > PupLastHighScore)
                {
                    PupLastHighScore = Math.floor(PupScore);


                    PupLastHighScoreText.innerText = `Last High Score: ${PupLastHighScore}`;
                }
                await Sleep(1500)
                CleanUpGame()
                await Sleep (500)
                PupHeadBob()
                ScreenGracePeriod = false
                PupHeadScreen.style.display = "block"

                
            }
            else
            {
                PupLivesScreen.innerText = "x" + PupLives;
                await Sleep (1500)
                PupStartScreen.style.display = "none"
                await Sleep (500)
                ScreenGracePeriod = false

            }
        }
    }

    for (let i = PupCoins.length - 1; i >= 0; i--)
    {
        let Coin = PupCoins[i];

        if (IsColliding(PupHitBox, Coin))
        {
            PupCoinAmount+= 1

            if (PupCoinAmount == 30)
            {
                if (window.innerHeight < 650)
                {
                    PupSky.style.bottom = "-" + 61 + "%";
                }
                else
                {
                    PupSky.style.bottom = "-" + 120 + "%";
                }

                
                PupGrass.style.filter = "brightness(70%) sepia(100%) saturate(150%)";
            }

            if (PupCoinAmount == 60)
            {
                if (window.innerHeight < 650)
                {
                    PupSky.style.bottom = "-" + 140 + "%";
                }
                else
                {
                    PupSky.style.bottom = "-" + 275 + "%";
                }


                
                PupGrass.style.filter = "brightness(50%) sepia(0%) saturate(10%)";
            }

            if (PupCoinAmount >= 100)
            {
                PupWin.style.display = "block";
                PupMenuHead.style.display = "none";
                PupMenuBody.style.display = "none";
            }

            Coin.remove();
            PupCoins.splice(i, 1);
        }
    }
}

async function RockSpawner()
{


    while(GameStarted)
    {
        if (ScreenGracePeriod)
        {
            await Sleep(50)
            continue
        }


        if (PupRocks.length < RockMax)
        {
            SpawnRock()

        }
        
        let ThisAmount = Randomizer(BaseRockSpawnMin, BaseRockSpawnMax)

        await Sleep(ThisAmount)
        
    }
}

async function CoinSpawner()
{
    while(GameStarted)
    {
        if (ScreenGracePeriod)
        {
            await Sleep(50)
            continue
        }

        if (PupCoins.length < CoinMax)
        {
            SpawnCoin()

        }
        
        let ThisAmount = Randomizer(BaseCoinSpawnMin, BaseCoinSpawnMax)

        await Sleep(ThisAmount)
        
    }
}

async function CloudSpawner()
{
    while(OnChannel3)
    {
        if (PupClouds.length < CloudMax)
        {
            SpawnCloud()
        }
        
        let ThisAmount = Randomizer(BaseCloudSpawnMin, BaseCloudSpawnMax)

        await Sleep(ThisAmount)
        
    }
}

function SpawnRock()
{
    let Rock = document.createElement("div");

    Rock.GameX = 0;

    RandomRockImage = Randomizer(0, PupRockImages.length-1)

    Rock.style.backgroundImage = `url("${PupRockImages[RandomRockImage]}")`

    Rock.className = "Rock";
    Rock.style.display = "block";
    Rock.style.left = "100%";

    if (PupCoinAmount >= 30 && PupCoinAmount <= 60)
    {
        Rock.style.filter = "brightness(70%) sepia(100%) saturate(150%)";
    }
    else if (PupCoinAmount >= 60)
    {
        Rock.style.filter = "brightness(50%) sepia(0%) saturate(0%)";
    }
    else if (PupCoinAmount <= 30)
    {
        Rock.style.filter = "brightness(100%) sepia(0%) saturate(100%)";
    }

    let RockHitBox = document.createElement("div");
    RockHitBox.className = "RockHitBox";

    Rock.appendChild(RockHitBox);
    PupEDHHDInfoBox.appendChild(Rock);

    let NewRockBox = Rock.getBoundingClientRect();

    for (let ExistingRock of PupRocks)
    {
        let ExistingRockBox = ExistingRock.getBoundingClientRect();

        let Gap = Math.max(
            ExistingRockBox.left - NewRockBox.right,
            NewRockBox.left - ExistingRockBox.right
        );

        if (Gap < RockMinDistance)
        {
            Rock.remove();
            return;
        }
    }

    PupRocks.push(Rock);
}

function SpawnCoin()
{
    let Coin = document.createElement("div");

    Coin.GameX = 0;

    Coin.className = "Coin";
    Coin.style.display = "block";
    Coin.style.left = "100%";

    let CoinSpawnHeight = Randomizer(CoinMinHeight, CoinMaxHeight);
    Coin.style.bottom = `${CoinSpawnHeight}%`;

    let CoinRockHitBox = document.createElement("div");
    CoinRockHitBox.className = "CoinRockHitBox";

    Coin.appendChild(CoinRockHitBox); 
    PupEDHHDInfoBox.appendChild(Coin);

    PupCoins.push(Coin);
}

function SpawnCloud()
{
    let Cloud = document.createElement("div");

    Cloud.GameX = 0;
    
    RandomCloudImage = Randomizer(0, PupCloudImages.length-1)

    Cloud.style.backgroundImage = `url("${PupCloudImages[RandomCloudImage]}")`

    if (PupCoinAmount >= 30 && PupCoinAmount <= 60)
    {
        Cloud.style.filter = "brightness(70%) sepia(100%) saturate(150%)";
    }
    else if (PupCoinAmount >= 60)
    {
        Cloud.style.filter = "brightness(50%) sepia(0%) saturate(0%)";
    }
    else if (PupCoinAmount <= 30)
    {
        Cloud.style.filter = "brightness(100%) sepia(0%) saturate(100%)";
    }

    Cloud.className = "Cloud";
    Cloud.style.display = "block";
    Cloud.style.left = "100%";

    let CloudSpawnHeight = Randomizer(CloudMinHeight, CloudMaxHeight);

    Cloud.style.bottom = `${CloudSpawnHeight}%`;

    PupEDHHDInfoBox.appendChild(Cloud);
    PupClouds.push(Cloud);
}

function MoveObjects(Objects, Speed)
{
    for (let i = Objects.length - 1; i >= 0; i--)
    {
        let Object = Objects[i];

        Object.GameX -= Speed * DeltaTime;

        Object.style.transform = `translateX(${Object.GameX}px)`;

        if (Object.getBoundingClientRect().right < 0)
        {
            Object.remove();
            Objects.splice(i, 1);
        }
    }
}

function PupJump()
{
    if (PupJumping)
    {
        return;
    }

    PupJumping = true;

    let SpeedMultiplier = GrassSpeed / 150;

    let HeightScale = window.innerHeight / 1080;

    if (window.innerHeight < 1080)
    {
        HeightScale *= 0.95;
    }

    if (window.innerHeight < 650)
    {
        HeightScale *= 0.80;
    }

    PupYVelocity = 425 * SpeedMultiplier * HeightScale;
}

function UpdatePupJump()
{
    if (!PupJumping)
    {
        return;
    }

    let HeightScale = window.innerHeight / 1080;

    let SpeedMultiplier = GrassSpeed / 150;

    let Gravity = 350 * SpeedMultiplier * SpeedMultiplier * HeightScale;

    PupYVelocity -= Gravity * DeltaTime;
    PupY += PupYVelocity * DeltaTime;

    if (PupY <= 0)
    {
        PupY = 0;
        PupYVelocity = 0;
        PupJumping = false;
    }

    PupSprite.style.transform = `translateY(${-PupY}px)`;
}

Jump.addEventListener("click", function()
{
    PupJump();

});

document.addEventListener("keydown", function(event)
{
    if (event.code === "Space")
    {
        if (GameStarted)
        {
            event.preventDefault();
            PupJump();
        }
    }
});

function ScrollLines()
{
    ScanLinePOS += 5 * DeltaTime;

    ScanLines.style.backgroundPosition = `0px ${ScanLinePOS}px`;
    
    
}

async function LoadEverything()
{
    const ImageURLs = new Set();

    const PupAssets = [
    ...PupRunning,
    ...PupRockImages,
    ...PupCloudImages
    ];

    for (const Asset of PupAssets)
    {
        ImageURLs.add(new URL(Asset, document.baseURI).href);
    }

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

    Start();
}

window.addEventListener("load", LoadEverything);