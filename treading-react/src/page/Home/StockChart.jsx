import { Button } from '@/components/ui';
import { fetchMarketChart } from '@/State/Coin/Action';
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';

const timeSeries = [
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Time Series (Daily)",
        lable: "1 Day",
        value: 1,
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Weekly Time Series ",
        lable: "1 Week",
        value: 7,
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Monthly Time Series ",
        lable: "1 Month",
        value: 30,
    },
    {
        keyword: "DIGITAL_CURRENCY_YEARLY",
        key: "Yearly Time Series ",
        lable: "1 Year",
        value: 365,
    },
]

function StockChart({coinId}) {
    const dispatch=useDispatch()
    const coin = useSelector(store=>store.coin)
    const [activeLable, setActiveLable] = useState(timeSeries[0])

    const searies = [
        {
            data: coin.marketChart.data,
        }
    ];

    const options = {
        charts: {
            id: "area-datetime",
            type: "area",
            height: 450,
            zoom: {
                autoScaleYaxis: true
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            colors: ["#fff"],
            strokeColors: "#fff",
            style: "hollow",
            strokeWidth: 1
        },
        xaxis: {
            type: "datetime",
            // min:new Date("12-01-1996").getTime(),
            tickAmount: 6,
        },
        colors: ["#758AA2"],
        tooltip: {
            theme: "dark"
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [0, 100]
            }
        },
        grid: {
            borderColor: "#47535E",
            stockDashArray: 4,
            show: true
        }
    }

    const handleActiveLable = (value => {
        setActiveLable(value)
    })

    useEffect(()=>{
        if (coinId) {
            dispatch(fetchMarketChart({coinId, days:activeLable.value, jwt:localStorage.getItem("jwt")}))
        }
    },[dispatch,coinId,activeLable])

    return (
        <div>
            <div className='space-x-3'>
                {
                    timeSeries.map((item) =>
                        <Button
                            variant={activeLable.lable == item.lable ? "" : "outline"}
                            onClick={() => handleActiveLable(item)}
                            key={item.lable}
                        >
                            {item.lable}
                        </Button>
                    )
                }
            </div>

            <div id='chart-timelines'>
                <ReactApexChart
                    options={options}
                    series={searies}
                    height={500}
                    type='area'
                />

            </div>
        </div>

    )
}

export default StockChart