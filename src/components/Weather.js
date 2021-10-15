import React, { useEffect, useState } from 'react';

const Weather = () => {

    let [wData, setWData] = useState({});
    let [cWeather, setCWeather] = useState({});
    let wList = [];


    async function loadData () {
        try {
            const apiURI = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/2002629?apikey=dErZnvl3NdBNYGkyNzWN7HGLadweJVxz&language=ko-kr&details=false&metric=true";
            const res = await fetch(apiURI);
            const data = await res.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }
    

    // useEffect(() => {
    //     async function hehe(){
    //         const res = await loadData();
    //         return res;
    //     }

    //     hehe().then((data)=> setWData(data)).then(console.log);
        
    // }, []);


    useEffect(() => {
        loadData().then((data) => {
            setWData(data);
            setCWeather({
                'time' : data[0].DateTime,
                'weather': data[0].IconPhrase,
                'temp': data[0].Temperature.Value
            });
        });
    }, []);

    // console.log(cWeather);
    console.log(wData);


        // useEffect(() => {
    //     setCWeather({
    //         'time': wData[0].DateTime,
    //         'weather': wData[0].IconPhrase,
    //         'temp': wData[0].Temperature.Value
    //     });
    // }, []);
    // useEffect(() => {
    //     console.log(wData[0].DateTime);
    // });


    



    for (var i in wData) {
        wList.push(
            <tr>
                <td>{wData[i].DateTime}</td>
                <td>{wData[i].Temperature.Value} &#8451;</td>
                <td>{wData[i].IconPhrase}</td>
            </tr>
        )
    };

    return (
        <>
            <div>
                <p className="section_title">Weather</p>
                <div className="section_contents">
                    <div className='currentWeather'>
                        <div className='weatherIcon'></div>
                        <div>
                            <p>기온 : {cWeather.temp} &#8451;</p>
                            <p>기상 :  {cWeather.weather}</p>
                        </div>
                    </div>
                    <table className="weatherTable">
                        <caption>기상 예보</caption>
                        <thead>

                            <tr>
                                <th className="wTime">시간</th>
                                <th className="wTemp">기온</th>
                                <th className="wWeather">기상</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wList}
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Weather;
