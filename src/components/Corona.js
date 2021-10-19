import React, {useState, useEffect} from "react";

const Corona = () => {

  let [report, setReport] = useState({});
  let dataobj = [];
  let cList = [];



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
  let yesterday = new Date(year, month, date - 7);
  let sMonth = yesterday.getMonth();
  sMonth = sMonth < 10 ? "0" + sMonth : sMonth;
  let sDate = yesterday.getDate();
  sDate = sDate < 10 ? "0" + sDate : sDate;
  let pDate = "" + year + sMonth + sDate;

  // console.log(pDate);

  var resText;
  var xhr = new XMLHttpRequest();
  const serviceKey = 'cQX2tuEo3RdqGIBL9I%2BIjco1RG1lJLBAJx42KXlBFEAz%2B42TuIldCI2WjIZwXhYavIJpTgnu2ZWayuXCHaQwRw%3D%3D';
  var url = '/openapi/service/rest/Covid19/getCovid19InfStateJson'; /*URL*/
  var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey; /*Service Key*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
  queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(pDate); /**/
  queryParams += "&" + encodeURIComponent("endCreateDt") + "=" + encodeURIComponent(cDate); /**/
  xhr.open('GET', url + queryParams);
  

  xhr.onreadystatechange = function () {
    if (this.readyState == xhr.DONE) {
      if (xhr.status === 200) {
        myFunction(this);
      } else {
      }
    }
  };
  
  

  function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    let decideCnt, report, stateDt;

    report = xmlDoc.getElementsByTagName("item");
    decideCnt = xmlDoc.getElementsByTagName("decideCnt"); // 확진자수
    stateDt = xmlDoc.getElementsByTagName("stateDt"); // 날짜

    for (var i = 0; i < report.length; i++) {
      dataobj.push({
        "stateDt": stateDt[i].textContent,
        "decideCnt": decideCnt[i].textContent
      })
    }
    // setReport(dataobj);
    // console.log(dataobj);

  };

  useEffect(() => {
    xhr.send();
    setReport(dataobj);
  }, [])
  
  console.log(report);


  for (var i = 0; i < 8; i++) {
    cList.push(
      <tr>
        <td>123</td>
        <td>123</td>
      </tr>
    );
  }




  return (
    <>
      <div>
        <p className="section_title">Corona</p>
        <div className="section_contents">
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>확진자수</th>
              </tr>
            </thead>
            <tbody>{cList}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Corona;
