chrome.runtime.sendMessage({ todo: 'showPageAction' });

// Вывод в консоль заголовка и количества матчей

const logMatches = () => {
  const sportBlocks = Array.from(
    document.querySelectorAll(
      '#content > div:first-child > div:last-child > div',
    ),
  );

  const sportTitles = sportBlocks
    .filter(element => element.classList[0].includes('live__head'))
    .map(element => element.querySelector('span').innerHTML);

  const sportMatches = sportBlocks
    .filter(element => element.classList[0].includes('events'))
    .map(element => element.childNodes.length);

  const sportInfo = sportTitles.reduce((acc, element, index) => {
    return [...acc, { title: element, count: sportMatches[index] }];
  }, []);

  console.log(sportInfo);
};

// Поиск значения ставки

const checkValue = () => {
  return Array.from(
    document.querySelectorAll(
      '.sidebar-right__betslip > div:last-child > div > div',
    ),
  ).filter(element => {
    if (element.classList[0].includes('scrollbar')) {
      return element;
    }
  })[0].childNodes[0].firstChild.childNodes[1].firstChild.childNodes[1]
    .innerHTML;
};

// Поиск значения новой ставки

const checkNewValue = () => {
  return Array.from(
    document.querySelectorAll(
      '.sidebar-right__betslip > div:last-child > div > div',
    ),
  ).filter(element => {
    if (element.classList[0].includes('scrollbar')) {
      return element;
    }
  })[0].childNodes[0].firstChild.childNodes[1].firstChild.childNodes[1]
    .childNodes[1].textContent;
};

// Находим случайное предложение

const findRandomOffer = () => {
  const offerElements = Array.from(
    document.querySelectorAll('#content div[itemprop="offers"]'),
  ).filter(element => {
    return element.querySelector('span').innerHTML !== '-';
  });

  return (randomOffer =
    offerElements[Math.floor(Math.random() * offerElements.length)]);
};

// Ввод новой стваки - 500

const setBet = bet => {
  const betValue = document.querySelector(
    '.sidebar-right__betslip input[type="text"]',
  );

  betValue.value = bet;
};

// Вывод новой и старой ставки

const alertBets = (oldBet, newBet) => {
  alert(`Старое значение - ${oldBet}, Новое значение - ${newBet}`);
};

// Вешаем обработчик клика по истечении 15 секунд

const handlerOfferClick = offer => {
  setTimeout(() => {
    offer.click();
    offer.scrollIntoView();

    const oldValue = checkValue();

    // Проверяем изменение ставки

    let checkInterval = setInterval(() => {
      let newValue = checkValue();

      // Обновляем input, тк на сайте он сам обновялется через ws

      setBet(500);

      if (oldValue !== newValue) {
        clearInterval(checkInterval);

        alertBets(oldValue, checkNewValue());
      }
    }, 500);
  }, 15000);
};

logMatches();
handlerOfferClick(findRandomOffer());
