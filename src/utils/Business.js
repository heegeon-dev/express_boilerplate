const axios = require('axios') // http 모듈
const xml2js = require('xml2js') // xml 파싱 모듈

// 국세청 사업자번호 조회 API [POST]
const postUrl = "https://teht.hometax.go.kr/wqAction.do?actionId=ATTABZAA001R08&screenId=UTEABAAA13&popupYn=false&realScreenId="

// API 에 raw 로 올라갈 xml 데이터
const xmlRaw = "<map id=\"ATTABZAA001R08\"><pubcUserNo/><mobYn>N</mobYn><inqrTrgtClCd>1</inqrTrgtClCd><txprDscmNo>{CRN}</txprDscmNo><dongCode>15</dongCode><psbSearch>Y</psbSearch><map id=\"userReqInfoVO\"/></map>"

module.exports = {
    postCRN : (crn) => {
        return new Promise((resolve, reject) => {
            axios.post(postUrl, xmlRaw.replace(/\{CRN\}/, crn), // xml 데이터에 사업자등록번호를 추가
                { headers: { 'Content-Type': 'text/xml' } })
                .catch(err => reject(err))
                .then(result => {
                    xml2js.parseString(result['data'],(err, result) =>{
                        if(err){
                            console.log(err);
                            reject(err);
                        }else{
                            if(result.equals("부가가치세 일반과세자 입니다.")){
                                resolve(true);
                            }else{
                                reject(result);
                            }
                        }
                    });
                })
        })
    },
}