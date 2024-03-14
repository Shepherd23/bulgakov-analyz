function waitForElementToExist(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }
  
      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });
  
      observer.observe(document.body, {
        subtree: true,
        childList: true,
      });
    });
}

function check() {
    (async () => {
      const src = chrome.runtime.getURL("scripts/check-similarity.js");
      similarity = await import(src);
    })();

    document.querySelectorAll(".lesson-task-layout__statistics").forEach(el=>el.click())

    waitForElementToExist('.lesson-answer-header').then(element => {
        document.querySelectorAll(".lesson-answer-header").forEach(el=>el.click())

        var documents = []
        waitForElementToExist('.attachments-item').then(element => {
            document.querySelectorAll(".attachments-item a").forEach(el=>{
                if (el.href.endsWith(".docx")) {                    
                    documents.push(fetch(el.href).then(r => r.blob()))
                }                
            })
            document.querySelectorAll(".attachments-item a").forEach(el=>{
                if (el.href.endsWith(".docx")) {                    
                    checkeddoc = fetch(el.href).then(r => r.blob())

                    mammoth.extractRawText({arrayBuffer: checkeddoc.arrayBuffer()})
                      .then(function(result){
                          console.log(result.value); 
                          //var messages = result.messages;
                      })
                      

                    documents.forEach(doc=>{
                      //console.log(similarity.checkSimilarity("aaa", "aaa"))
                    })
                }                
            })
        });
        
        console.log(documents);
    });
}

waitForElementToExist('.lesson-article__header').then(element => {addButton()});

function addButton() {
  lesson_name = document.querySelector(".lesson-article__header");
  if (lesson_name) {
    const button = document.createElement("a");
    button.textContent = "Проверить уникальность ответов";
    button.addEventListener("click", check);
    lesson_name.insertAdjacentElement("afterend", button);
  }
}