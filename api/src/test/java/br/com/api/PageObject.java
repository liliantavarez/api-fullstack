package br.com.api;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

public class PageObject {

	protected WebDriver browser;

	public PageObject(WebDriver browser) {
		WebDriverManager.chromedriver().setup();
		if (browser == null) {
			this.browser = new ChromeDriver();
		} else {
			this.browser = browser;
		}
		this.browser.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		this.browser.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
	}

	public void fechar() {
		this.browser.quit();
	}
}
