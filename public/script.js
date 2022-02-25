const textAreaArray = document.querySelectorAll('textarea');
console.log(textAreaArray);

//변수 네이밍 컨벤션, 도메인과 관련된 용어 정리
//source : 번역할 텍스트와 관련된 명칭
//target : 번역된 결과와 관련된 명칭 

const [sourceTextArea, targetTextArea] = textAreaArray;
// console.log(sourceTextArea);
// console.log(targetTextArea);

const [sourceSelect, targetSelect] = document.querySelectorAll('select');
// console.log(sourceSelect, targetSelect);

//번역할 언어의 타입(ko?, en? , ja?)
let targetLanguage = 'en';

// console.log(targetSelect);
// console.log(targetSelect.options);
// console.log(targetSelect.options[targetSelect.selectedIndex]);
// console.log(targetSelect.options[targetSelect.selectedIndex].value);

//어떤 언어로 번역할지 선택하는 target selectbox의 선택지 값이 바뀔 때마다 이벤트 발생.
targetSelect.addEventListener('change', () => {
    const selectedIndex = targetSelect.selectedIndex;
    targetLanguage = targetSelect.options[selectedIndex].value;
});

let debouncer;

sourceTextArea.addEventListener('input', (event) => {

    if(debouncer) { //값이 있으면 true, 없으면 false
        clearTimeout(debouncer)
    }

    debouncer = setTimeout(()=>{
        const text = event.target.value; //textArea에 입력한 값.
        
        if(text) {

            //이름이 XML이지, XML에 국한되지 않음.
            const xhr = new XMLHttpRequest();
        
            const url = '/detectLangs'; //node 서버의 특정 url 주소
        
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
        
                    // 서버의 응답 결과 확인(responseText : 응답에 포함된 텍스트)
                    // console.log(typeof xhr.responseText);
                    // console.log(xhr.responseText);
                    const responseData = xhr.responseText;
                    // console.log(`responseData:${responseData}, type :${typeof responseData}`);
                    const parseJsonToObject = JSON.parse(JSON.parse(responseData));
                    // 두번 파싱해야하는 이유
                    // https://stackoverflow.com/questions/30194562/json-parse-not-working/49460716
        
                    // console.log(typeof parseJsonToObject, parseJsonToObject);
        
                    const result = parseJsonToObject['message']['result'];
                    const options = sourceSelect.options;

                    for(let i = 0; i<options.length; i++) {
                        if(options[i].value === result['srcLangType']){
                            sourceSelect.selectedIndex = i
                        }
                    }
        
                    // 번역된 텍스트를 결과화면에 입력
                    targetTextArea.value = result['translatedText'];
        
                    // 응답의 헤더(header) 확인
                    // console.log(`응답 헤더 ${xhr.getAllResponseHeaders()}`);
                }
            };
        
            xhr.open("POST", url);
        
            // 서버에 보내는 요청 데이터의 형식이 json 형식임을 명시
            xhr.setRequestHeader("Content-type", "application/json");
        
            const requestData = { //typeof : object
                text,
                targetLanguage
            };
        
            //JSON의(Javascript Object Notation) 타입은 ? string
            jsonToString = JSON.stringify(requestData);
            // console.log(typeof jsonToString);
        
            // xhr : XMLHTTPRequst
            xhr.send(jsonToString);
        }else {
            alert('번역할 텍스트를 입력하세요.')
        }
    }, 1500);
});

