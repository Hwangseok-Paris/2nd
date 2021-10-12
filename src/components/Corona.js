import { data } from "jquery";
import React from "react";

const Corona = () => {
  // 오늘 날짜 yyyyMMdd 형식으로 출력
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let date = today.getDate();
  date = date < 10 ? "0" + date : date;
  let cDate = "" + year + month + date;

  console.log(cDate);

  // api 호출시 검색 기준 날짜 구하기
  let yesterday = new Date(year, month, date - 2);
  let sMonth = yesterday.getMonth();
  sMonth = sMonth < 10 ? "0" + sMonth : sMonth;
  let sDate = yesterday.getDate();
  sDate = sDate < 10 ? "0" + sDate : sDate;
  let pDate = "" + year + sMonth + sDate;

  console.log(pDate);

  // async function callApi() {
  //   try {
  //     const apiURI = '/openapi/service/rest/Covid19/getCovid19InfStateJson?';
  //     const serviceKey = 'serviceKey='+'cQX2tuEo3RdqGIBL9I+Ijco1RG1lJLBAJx42KXlBFEAz+42TuIldCI2WjIZwXhYavIJpTgnu2ZWayuXCHaQwRw==';
  //     let dateRange = '&startCreateDt=' + pDate + "&endCreateDt=" + cDate;
  //     let requestURI = apiURI + serviceKey + dateRange;
  //     const res = await fetch(requestURI);
  //     const data = await res.json();
  //     console.log(res);
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // callApi();

    var resText;
    var xhr = new XMLHttpRequest();
    const serviceKey = 'cQX2tuEo3RdqGIBL9I%2BIjco1RG1lJLBAJx42KXlBFEAz%2B42TuIldCI2WjIZwXhYavIJpTgnu2ZWayuXCHaQwRw%3D%3D';
  var url = '/openapi/service/rest/Covid19/getCovid19InfStateJson'; /*URL*/
  var queryParams = '?' + encodeURIComponent('serviceKey') + '='+serviceKey; /*Service Key*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
  queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(pDate); /**/
  queryParams += "&" + encodeURIComponent("endCreateDt") + "=" + encodeURIComponent(cDate); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
  if (this.readyState == xhr.DONE) {
    if (xhr.status === 200 || xhr.status === 201) {
      // console.log('Status: ' + this.status + 'nHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) + 'nBody: ' + this.responseText);
      console.log('succed' + xhr.responseText);
    } else {
      console.log('error occured' + xhr.responseText);
    }
  }
};

  
  xhr.send();

  return (
    <>
      <div>
        <p className="section_title">Corona</p>
        <div className="section_contents">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
          magnam veniam debitis voluptatum incidunt officia maiores voluptas
          laborum excepturi! Quae, aperiam. Magnam ex tempore doloremque!
          Reiciendis laborum reprehenderit dignissimos ratione!
        </div>
      </div>
    </>
  );
};

export default Corona;
