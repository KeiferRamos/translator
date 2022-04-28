const countries = [
  { lang: "de-DE", country: "German" },
  { lang: "fr-FR", country: "French" },
  { lang: "id-ID", country: "Indonesian" },
  { lang: "it-IT", country: "Italian" },
  { lang: "ja-JP", country: "Japanese" },
  { lang: "ko-KR", country: "Korean" },
  { lang: "ru-RU", country: "Russian" },
  { lang: "tl-PH", country: "Tagalog" },
  { lang: "en-GB", country: "English" },
];

let ToLang = "";
let FromLang = "";

function viewSelection() {
  const selection = countries.map((cntry) => {
    const { lang, country } = cntry;
    return `<option class="selection" value=${lang}>${country}</option>`;
  });
  $("select").html(selection.join(""));

  ToLang = $("#to-lang").val();
  FromLang = $("#from-lang").val();

  $("select").on("change", ({ target }) => {
    const { id } = target;
    if (id == "to-lang") {
      ToLang = $("#to-lang").val();
    } else {
      FromLang = $("#from-lang").val();
    }
  });
}

$("#translate").on("click", async () => {
  const textTotranslate = $("#textTotranslate").val();
  const { data } = await axios.get(
    `https://api.mymemory.translated.net/get?q=${textTotranslate}&langpair=${FromLang}|${ToLang}`
  );
  const { translatedText } = data.responseData;
  $("#translatedText").val(translatedText);
});

$(".speaker").on("click", ({ currentTarget }) => {
  const { id } = currentTarget;
  const toTranslate = $("#textTotranslate").val();
  const translated = $("#translatedText").val();
  let text = id == "speak-from" ? toTranslate : translated;
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = id == "speak-from" ? FromLang : ToLang;
  window.speechSynthesis.speak(msg);
});

$("#switch").on("click", () => {
  $("#from-lang").val(ToLang);
  $("#to-lang").val(FromLang);
  let temp = ToLang;
  ToLang = FromLang;
  FromLang = temp;
});

$(document).ready(() => {
  viewSelection();
});
