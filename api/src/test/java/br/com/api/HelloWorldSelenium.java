package br.com.api;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

class HelloWorldSelenium {

	@Test
	void hello() {
		WebDriverManager.chromedriver().setup();

		WebDriver browser = new ChromeDriver();
		browser.navigate().to("http://localhost:8080/listar");
		browser.quit();
	}
}
