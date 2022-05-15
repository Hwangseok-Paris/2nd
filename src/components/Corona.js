import React, { useEffect, useState } from "react";

const Corona = () => {

  let [covid, setCovid] = useState({});


  // 오늘 날짜 yyyyMMdd 형식으로 출력
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let date = today.getDate();
  date = date < 10 ? "0" + date : date;
  let cDate = "" + year + month + date;

  // console.log(cDate);

  // api 호출시 검색 기준 날짜 구하기
  let yesterday = new Date(year, month, date - 2);
  let sMonth = yesterday.getMonth();
  sMonth = sMonth < 10 ? "0" + sMonth : sMonth;
  let sDate = yesterday.getDate();
  sDate = sDate < 10 ? "0" + sDate : sDate;
  let pDate = "" + year + sMonth + sDate;

  // console.log(pDate);

  var xhr = new XMLHttpRequest();
  const serviceKey = 'cQX2tuEo3RdqGIBL9I%2BIjco1RG1lJLBAJx42KXlBFEAz%2B42TuIldCI2WjIZwXhYavIJpTgnu2ZWayuXCHaQwRw%3D%3D';
  var url = '/openapi/service/rest/Covid19/getCovid19InfStateJson'; /*URL*/
  var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /*Service Key*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
  queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(pDate); /**/
  queryParams += "&" + encodeURIComponent("endCreateDt") + "=" + encodeURIComponent(cDate); /**/

  // xhr.open('GET', url + queryParams);
  // xhr.onreadystatechange = function () {
  //   let parseXML = new DOMParser();

  //   let text = xhr.responseText;
  //   let xmlDOC = parseXML.parseFromString(text, "text/xml");

  //   let arr = [];
  //   let darr = [];
  //   let infected = xmlDOC.getElementsByTagName("decideCnt");
  //   let dead = xmlDOC.getElementsByTagName("deathCnt");

  //   for (let i of infected) {
  //     arr.push(i.textContent);
  //   }
  //   for (let i of dead) {
  //     darr.push(i.textContent);
  //   }
  //   console.log(arr);

  //   var b = arr.map(Number);
  //   var d = darr.map(Number);
  //   var newConfirmed = b[0] - b[1];
  //   var newDeath = d[0] - d[1];
  
  //   // var cnt1 = cnt[0].getElementsByTagName("item")[0].childNodes[0].nodeValue;

  //   if (this.readyState == 4) {
  //     console.log(newConfirmed);
  //     console.log(newDeath);


  //   }

  // };

  useEffect(() => {
    xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
    let parseXML = new DOMParser();

    let text = xhr.responseText;
    let xmlDOC = parseXML.parseFromString(text, "text/xml");

    let arr = [];
    let darr = [];
    let infected = xmlDOC.getElementsByTagName("decideCnt");
    let dead = xmlDOC.getElementsByTagName("deathCnt");

    for (let i of infected) {
      arr.push(i.textContent);
    }
    for (let i of dead) {
      darr.push(i.textContent);
    }
    console.log(arr);

    var b = arr.map(Number);
    var d = darr.map(Number);
    var newConfirmed = (String)(b[0] - b[1]);
    var newDeath = (String)(d[0] - d[1]);
    var oldConfirmed = (String)((b[0] - b[1])-(b[1] - b[2]));
    var oldDeath = (String)((d[0] - d[1]) - (d[1] - d[2]));
    
    setCovid({
      confirmed: newConfirmed,
      death: newDeath,
      yConfirmed: oldConfirmed,
      yDeath: oldDeath
    })
  }
  xhr.send('');

  },[])


  return (
    <>
      <div>
        <p className="section_title">Corona</p>
        <div className="section_contents">
          <div className="corona_current">
            <table className="coronaTable">
              <thead>
                <tr>
                  <th className="empty"></th>
                  <th className="newConfirmed">신규 확진자</th>
                  <th className="newDeath">신규 사망자</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>오늘</td>
                  <td>{covid.confirmed} 명</td>
                  <td>{covid.death} 명</td>
                </tr>
                <tr>
                  <td>전일대비</td>
                  <td>{covid.yConfirmed} 명</td>
                  <td>{covid.yDeath} 명</td>
                </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </>
  )
} 
export default Corona;
