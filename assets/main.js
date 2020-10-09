const formData = document.getElementById("formData");
const originalUrl = document.getElementById("original-Url");
const result = document.getElementById("results");

const formSubmit = (e) => {
  e.preventDefault();
  fetch("/shorturl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      originalUrl: originalUrl.value,
    }),
  })
    .then((data) => data.json())
    .then((res) => {
      console.log("res");
      console.log(res.shortUrl);
      console.log(res.ok);
      result.innerHTML = `<a target="_blank" href=${res.shortUrl} rel="noopener noreferer" > ${res.shortUrl} </a>`;
    })
    .catch((err) => {
      console.log("oops", err);
      result.innerText = "Network error, retry";
    });
};

formData.addEventListener("submit", formSubmit);
