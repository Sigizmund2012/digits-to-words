/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  function copyArray(array) {
    return array.slice(0);
  }

  function getRandomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function mostUniqueWordGenerator(genericWords, identifier) { // Эта функция заполняет массив genericWords сначала словами из массива, соответствующего числу начиная с конца, затем рандомными словами из этого массива

    let copyWordsArray = copyArray(data[identifier]);

    let copyGenericWords = copyArray(genericWords);

    let filteredWordsArray = copyWordsArray.filter(function (word) {
      return copyGenericWords.indexOf(word) === -1;
    });

    if (filteredWordsArray.length) {
      copyGenericWords.push(filteredWordsArray.pop());
      return copyGenericWords;
    } else {
      copyGenericWords.push(getRandomValueFromArray(copyWordsArray));
      return copyGenericWords;
    }

  }

  const data = {
    0: ["мяч", "колесо", "кольцо", "солнце", "шляпа"],
    1: ["телеграфный столб", "карандаш", "фаллический символ", "бейсбольная бита", "стрела"],
    2: ["лебедь", "змея"],
    3: ["наручники", "сиськи"],
    4: ["корабль", "флаг", "гладильная доска"],
    5: ["крючок от занавески", "газонокосилка"],
    6: ["слоновый хобот", "миноискатель"],
    7: ["бумеранг", "трамплин для ныряния", "кромка обрыва", "бордюр"],
    8: ["песочные часы", "бесконечность"],
    9: ["воздушный шарик", "монокль"]
  };
  const form = document.querySelector(".words-generator__form");

  form.onsubmit = function (event) {

    event.preventDefault();

    const numberValues = Array.prototype.slice.call(document.querySelector(".words-generator__number").value);
    const numberValuesLength = numberValues.length;
    const result = document.querySelector(".words-generator__result");
    let genericWords = []; // массив с генерируемой последовательностью слов

    for (let i = 0; numberValuesLength > i; i++) {

      genericWords = mostUniqueWordGenerator(genericWords, numberValues[i]);

    }
    result.textContent = genericWords.join(", ");
  }

})();
