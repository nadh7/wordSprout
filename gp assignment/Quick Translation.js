// Quick Translate Method
const languages = {
  "en-GB": "English",
  "ms-MY": "Malay",
  "zh-CN": "Chinese",
};

const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchangeIcon = document.querySelector(".exchange"),
  selectTag = document.querySelectorAll("select"),
  icons = document.querySelectorAll(".row ion-icon"),
  translateBtn = document.querySelector("button");

// Populate language dropdowns
selectTag.forEach((tag, id) => {
  for (let lang_code in languages) {
      let selected =
          id == 0
              ? lang_code == "en-GB"
                  ? "selected"
                  : ""
              : lang_code == "fa-IR"
                  ? "selected"
                  : "";
      let option = `<option ${selected} value="${lang_code}">${languages[lang_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option);
  }
});

// Clear translation when input is empty
fromText.addEventListener("keyup", () => {
  if (!fromText.value) {
      toText.value = "";
      toText.setAttribute("placeholder", "Translation");
  }
});

// Translation functionality
translateBtn.addEventListener("click", () => {
  let text = fromText.value.trim(),
      translateFrom = selectTag[0].value,
      translateTo = selectTag[1].value;
  if (!text) return;
  toText.setAttribute("placeholder", "Translating...");
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
          toText.value = data.responseData.translatedText;
          toText.setAttribute("placeholder", "Translation");
      })
      .catch(() => {
          toText.setAttribute("placeholder", "Translation");
      });
});

// Exchange languages
exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value,
      tempLang = selectTag[0].value;
  fromText.value = toText.value;
  toText.value = tempText;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

// Copy and Speech functionality
icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
      if (!fromText.value && !toText.value) return;
      if (target.getAttribute("name") == "copy-outline") {
          navigator.clipboard.writeText(target.id == "from" ? fromText.value : toText.value);
      } else {
          let utterance = new SpeechSynthesisUtterance(
              target.id == "from" ? fromText.value : toText.value
          );
          utterance.lang = target.id == "from" ? selectTag[0].value : selectTag[1].value;
          speechSynthesis.speak(utterance);
      }
  });
});

// Default to Home section on load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('home').style.display = 'block';
});
