
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
let VoidEyesImages = [
    'url("../../UniversalAssets/VoidEyeFull.png")',
    'url("../../UniversalAssets/VoidEyes66.png")',
    'url("../../UniversalAssets/VoidEyes33.png")',
    'url("../../UniversalAssets/VoidEyes0.png")',
]

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
    return Math.floor(Math.random() * (max - min + 1)) + min   
}




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

    if (PupEDHHDInfoBox.style.display == "block")
    {
       ScrollLines()

       if (OnChannel3)
       {
            UpdateClouds();
       }

       if (GameStarted)
       {
            UpdatePupTimeAndScore()
            GrassScroll()
            CheckPupCollisions();
            UpdateRocks();
            
            UpdateCoins();
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

function ScrollBoxBackgrounds()
{
    InfoBoxBackgroundScroll += 25 * DeltaTime;

    PupInfoBoxBack.style.backgroundPositionY = InfoBoxBackgroundScroll + "px";
    PupButtonBoxBack.style.backgroundPositionY = InfoBoxBackgroundScroll + "px";
    
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




//  --------------------------------- Pup Page
let PupPage = document.getElementById("PupPage");

let PupExitButton = document.getElementById("PupExitButton");
let PupBioButton = document.getElementById("PupBioButton");
let PupPersonalButton = document.getElementById("PupPersonalButton");
let PupInfoBox = document.getElementById("PupInfoBox");
let PupBioInfoBox = document.getElementById("PupBioInfoBox");
let PupPersonalInfoBox = document.getElementById("PupPersonalInfoBox");
let PupInfoBoxBack = document.getElementById("PupInfoBoxBack");
let PupButtonBoxBack = document.getElementById("PupButtonBoxBack");
let PupRefButton = document.getElementById("PupRefButton");
let PupEDHHDInfoBox = document.getElementById("PupEDHHDInfoBox");
let PupEDHHDButton = document.getElementById("PupEDHHDButton");


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
let RockSpeed = 460

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
let CoinMaxHeight = 30
let CoinMinHeight = 15
let CoinRockMinDistance = 50
let RockMinDistance = 250;

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
    LoadSite("../../index.html")
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


    PupSky.style.bottom = "-" + 200 + "%";
    



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
    GrassScrollNumber -= GrassSpeed  * DeltaTime;

    PupGrass.style.backgroundPositionX = GrassScrollNumber + "px";
}

function UpdatePupTimeAndScore()
{
    if (ScreenGracePeriod)
    {       
        return;
    }

    PupGameTime += DeltaTime;

    let CoinMultiplier = 1 + (PupCoinAmount * 0.1);

    PupScore += 100 * CoinMultiplier * DeltaTime;

    InfoBarScore.innerText = Math.floor(PupScore);
    InfoBarTime.innerText = Math.floor(PupGameTime);
    InfoBarCoins.innerText = PupCoinAmount


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
                PupSky.style.bottom = "-" + 100 + "%";

                
                PupGrass.style.filter = "brightness(70%) sepia(100%) saturate(150%)";
            }

            if (PupCoinAmount == 60)
            {
                
                PupSky.style.bottom = "-" + 0 + "%";

                
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

function UpdateRocks()
{
    for (let i = PupRocks.length - 1; i >= 0; i--)
    {
        let Rock = PupRocks[i];

        let CurrentLeft = Rock.offsetLeft;

        Rock.style.left = `${CurrentLeft - (RockSpeed * DeltaTime)}px`;

        if (Rock.offsetLeft + Rock.offsetWidth < 0)
        {
            Rock.remove();
            PupRocks.splice(i, 1);
        }
    }
}

function UpdateCoins()
{
    for (let i = PupCoins.length - 1; i >= 0; i--)
    {
        let Coin = PupCoins[i];
        let CoinRockHitBox = Coin.querySelector(".CoinRockHitBox");

        let CurrentLeft = Coin.offsetLeft;

        Coin.style.left = `${CurrentLeft - (GrassSpeed * DeltaTime)}px`;

        if (Coin.offsetLeft + Coin.offsetWidth < 0)
        {
            Coin.remove();
            PupCoins.splice(i, 1);
            continue;
        }

        for (let Rock of PupRocks)
        {
            let RockHitBox = Rock.querySelector(".RockHitBox");

            if (IsColliding(CoinRockHitBox, RockHitBox))
            {

                Coin.remove();
                PupCoins.splice(i, 1);
                break;
            }
        }
    }
}

function UpdateClouds()
{
    for (let i = PupClouds.length - 1; i >= 0; i--)
    {
        let Cloud = PupClouds[i];

        let CurrentLeft = Cloud.offsetLeft;

        Cloud.style.left = `${CurrentLeft - ((GrassSpeed/3) * DeltaTime)}px`;

        if (Cloud.offsetLeft + Cloud.offsetWidth < 0)
        {
            Cloud.remove();
            PupClouds.splice(i, 1);
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

    let WidthScale = window.innerWidth / 956;

    if (window.innerWidth <= 956)
    {
        WidthScale *= 0.95;
    }

    if (window.innerWidth <= 667)
    {
        WidthScale *= 0.80;
    }

    PupYVelocity = 700 * SpeedMultiplier * WidthScale;
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