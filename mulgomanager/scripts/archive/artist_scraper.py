# This is a Scraper to retrieve all the artist name from SongFacts

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
import xlsxwriter


PATH = "/Users/kian/Downloads/chromedriver"
url = "https://www.songfacts.com/browse/artists/page"
timeout = 60  # Number of seconds before browser closed. Adjusted accordingly based on how long to complete CAPTCHA

chrome_options = webdriver.ChromeOptions()
# Remove the automation header bar appearing at the browser window
chrome_options.add_experimental_option("excludeSwitches", ['enable-automation'])
driver = webdriver.Chrome(PATH, options=chrome_options)
driver.get(url)

result = []
try:
    # Find the maximum page based on the page navigation
    element_present = EC.presence_of_element_located((By.CLASS_NAME, "pagin-blue"))
    WebDriverWait(driver, timeout).until(element_present)
    parent = driver.find_element_by_xpath("//div[@class='pagin-blue space-bot']")
    element = parent.find_elements_by_css_selector('a')
    maximum_page = int(element[1].text)

    # Loop from first page to last (maximum) page
    for i in range(maximum_page):
        element_present = EC.presence_of_element_located((By.CLASS_NAME, "browse-list-blue"))
        WebDriverWait(driver, timeout).until(element_present)
        soup = BeautifulSoup(driver.page_source, "html.parser")
        print(f"Page {i + 1} loaded")
        for resultbox in soup.find_all('ul', {"class": "browse-list-blue space-bot"}):
            for artist in resultbox.find_all('li'):
                result.append([artist.text])
        if i != maximum_page - 1:
            next_page = driver.find_element_by_link_text("Next ›")
            next_page.click()

    with xlsxwriter.Workbook('AllArtist.xlsx') as workbook:
        worksheet = workbook.add_worksheet()
        for row_num, data in enumerate(result):
            worksheet.write_row(row_num, 0, data)
except AttributeError:
    print("Unable to retrieve maximum page.")
except NoSuchElementException:
    print("No more next page")
except TimeoutException:
    print("Timed out waiting for page to load. Element cannot be located.")
finally:
    print("List of Artist updated.")
    driver.quit()
