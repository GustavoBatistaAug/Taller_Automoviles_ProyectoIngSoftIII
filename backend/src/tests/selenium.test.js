import { Builder, By, until } from "selenium-webdriver";

let driver;

async function login() {
    await driver.get("http://localhost:5173/login");

    await driver.findElement(By.id("email"))
        .sendKeys("gustavo.batista3@utp.ac.pa");
    await driver.findElement(By.id("password"))
        .sendKeys("gustavoalberto");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/dashboard"), 5000);
}

async function editarVehiculo() {
    await driver.get("http://localhost:5173/vehicles");
    await driver.wait(
        until.elementLocated(By.xpath("//button[contains(text(),'Editar')]")),
        5000
    );

    const editarBtn = await driver.findElement(
        By.xpath("(//button[contains(text(),'Editar')])[1]")
    );

    await editarBtn.click();
    await driver.wait(until.elementLocated(By.name("brand")), 5000);

    const marca = await driver.findElement(By.name("brand"));
    await marca.clear();
    await marca.sendKeys("Toyota");

    const modelo = await driver.findElement(By.name("model"));
    await modelo.clear();
    await modelo.sendKeys("Corolla");

    const year = await driver.findElement(By.name("year"));
    await year.clear();
    await year.sendKeys("2022");

    const guardar = await driver.findElement(By.css("button[type='submit']"));
    await guardar.click();

    await driver.wait(until.stalenessOf(guardar), 5000);
}

async function editarPerfil() {
    await driver.get("http://localhost:5173/profile");

    const editar = await driver.wait(
        until.elementLocated(
            By.xpath("//button[contains(text(),'Editar')]")
        ),
        5000
    );

    await editar.click();

    const telefono = await driver.wait(
        until.elementLocated(By.name("phone")),
        5000
    );

    await telefono.clear();
    await telefono.sendKeys("6000-3476");

    const guardar = await driver.findElement(
        By.css("button[type='submit']")
    );

    await guardar.click();

    await driver.wait(
        until.stalenessOf(guardar),
        5000
    );
}

async function run() {
    driver = await new Builder().forBrowser("chrome").build();
    try {
        await login();
        await editarVehiculo();
        await editarPerfil();
    } finally {
        await driver.quit();
    }
}

run();