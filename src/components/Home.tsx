import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeArray } from '../store/actions';
import { initStateType } from '../types';
import { Chart } from 'react-google-charts';
import { Label, Button, ChartsContainer, InputContainer } from '../styled-components/CustomComponents'

interface Props {

}

const Home: React.FC<Props> = (props) => {

    const dispatch = useDispatch();

    const storeArray = useSelector((state: initStateType) => state.arr);

    const [fileName, setFileName] = useState('Choose JSON file');
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [resourcesArray, setResourcesArray] = useState<Object[]>([]);
    const [pieData, setPieData] = useState<Array<Array<string | number>>>([['type', 'count']]);
    const [barData, setBarData] = useState<Array<Array<string | number>>>([['vendor', 'count']]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            let file_to_read = event.target.files[0];
            let fileread = new FileReader();
            fileread.onload = function (e) {
                var content = e.target?.result;
                var jsArr = JSON.parse(content as string);
                setResourcesArray(jsArr);
            };
            fileread.readAsText(file_to_read);
            setFileName(event.target.files[0].name);
        }
    };

    const handleSubmission = () => {
        dispatch(changeArray(resourcesArray));
        setIsFilePicked(true);
    };

    useEffect(() => {
        if (storeArray && pieData.length === 1 && barData.length === 1) {
            const pieResult = storeArray.reduce((acc: Array<Array<string | number>>, currentVal: any) => {
                const found = acc.find((a: any) => a[0] === currentVal.type);
                if (!found) {
                    acc.push(Array(currentVal.type, 1));
                }
                else {
                    const foundIndex = acc.findIndex((a: any) => a[0] === currentVal.type);
                    const newCount = acc[foundIndex][1] as number + 1;
                    acc[foundIndex][1] = newCount;
                }
                return acc;
            }, []);
            setPieData([...pieData, ...pieResult]);

            const barResult = storeArray.reduce((acc: Array<Array<string | number>>, currentVal: any) => {
                const prefix = currentVal.type.substring(0, currentVal.type.indexOf("_"));
                const found = acc.find((a: any) => a[0] === prefix);
                if (!found) {
                    acc.push(Array(prefix, 1));
                }
                else {
                    const foundIndex = acc.findIndex((a: any) => a[0] === prefix);
                    const newCount = acc[foundIndex][1] as number + 1;
                    acc[foundIndex][1] = newCount;
                }
                return acc;
            }, []);
            setBarData([...barData, ...barResult]);
        }
    }, [storeArray]);

    return (
        <div>
            <InputContainer>
                <Label>{fileName}<input style={{ display: 'none' }} type="file" name="file" accept="application/json" onChange={handleFileChange} /></Label>
                <Button onClick={handleSubmission}>upload</Button>
            </InputContainer>
            {isFilePicked &&
                <ChartsContainer>
                    <Chart
                        chartType="PieChart"
                        width="70%"
                        height="500px"
                        data={pieData}
                        options={{
                            title: "Resource Types",
                            pieHole: 0.6,
                            pieSliceText: 'none',
                            colors: ['#5c74bc', '#96cb86', '#f2d09a', '#e46c6c', '#84bed9'],
                            legend: { position: 'bottom' }
                        }}
                    />
                    <Chart
                        width='70%'
                        height='500px'
                        chartType="Bar"
                        data={barData}
                        options={{
                            chart: {
                                title: 'Vendors',
                            },
                        }}
                    />
                </ChartsContainer>
            }
        </div>
    );
}

export default Home;
