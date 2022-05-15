import React, { useEffect, useState } from "react";

const Weather = () => {
  let [wData, setWData] = useState({});
  let [cWeather, setCWeather] = useState({});
  let wList = [];

  async function loadData() {
    try {
      const apiURI =
        "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/2002629?apikey=D8cOadH6qpGsG7SV1OgXsLXSLKNUkXeH&language=ko-kr&details=false&metric=true";
      const res = await fetch(apiURI);
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadData().then((data) => {
      setWData(data);
      setCWeather({
        time: data[0].DateTime,
        weather: data[0].IconPhrase,
        temp: data[0].Temperature.Value,
        Icon:
            "https://developer.accuweather.com/sites/default/files/" +
          (data[0].WeatherIcon<10?"0"+data[0].WeatherIcon:data[0].WeatherIcon) +
          "-s.png",
      });
    });
  }, []);

  // console.log(wData);

  for (var i in wData) {
    const dateTime = wData[i].DateTime;
    const date = dateTime.slice(11, 16);
    wList.push(
      <tr key={date}>
        <td>{date}</td>
        <td>{wData[i].Temperature.Value} &#8451;</td>
        <td>{wData[i].IconPhrase}</td>
        <td>{wData[i].PrecipitationProbability}%</td>
      </tr>
    );
  }

  return (
    <>
      <div>
        <p className="section_title">Weather</p>
        <div className="section_contents">
          <div className="currentWeather">
            <div className="weatherIcon">
              <img
                className="weatherIcon"
                src={cWeather.Icon}
                alt="WeatherIcon"
              />
            </div>
            <div>
              <span>{cWeather.temp} &#8451;</span> &nbsp;/&nbsp;&nbsp;
              <span>{cWeather.weather}</span>
            </div>
          </div>
          <table className="weatherTable">
            <caption>기상 예보 (12시간)</caption>
            <thead className="wTablehead">
              <tr>
                <th className="wTime">시간</th>
                <th className="wTemp">기온</th>
                <th className="wWeather">기상</th>
                <th className="rainProbability">강수확률</th>
              </tr>
            </thead>
            <tbody>
              {wList}
            </tbody>
            <tfoot><tr></tr></tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default Weather;
