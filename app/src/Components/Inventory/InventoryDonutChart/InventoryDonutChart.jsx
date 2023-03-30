import React, { useEffect, useState } from 'react';
import Pie from '@visx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { animated, useTransition, to } from '@react-spring/web';
import getApi from '../../../Utils/Api/getApi';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

const Inventory_DonutChart = ({
    width,
    height,
    margin = defaultMargin,
    animate = true,
    id,
}) => {
    const [selectedBrowser, setSelectedBrowser] = useState(null);
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const centerY = innerHeight / 2;
    const centerX = innerWidth / 2;
    const donutThickness = 50;
    const [colorRange, setColorRange] = useState(['#54D8FE', '#FE8373']);
    const [donut, setDonut] = useState(null);

    useEffect(() => {
        const user_data = {
            userid: id,
        };
        const getDonutChart = async () => {
            const response = await getApi.post(
                '/inventory-UnrealizePerformer',
                user_data
            );
            const { data } = response;
            // test for minus profit
            //const data = { label: '-54000', percent: -30 };
            const copy_data = Object.assign({}, data);
            copy_data.percent = Math.abs(data.percent);
            const chart_data = [
                copy_data,
                { label: '', percent: 100 - Number(Math.abs(data.percent)) },
            ];
            setDonut(chart_data);

            if (data.percent < 0) {
                setColorRange(['#54D8FE', '#069697']);
            }
        };
        getDonutChart();
        const getCost = async () => {
            const response = await getApi.post('/invest-cost', { userid: id });
        };
        getCost();

        return () => {
            setDonut(null);
            setColorRange(['#54D8FE', '#FE8373']);
        };
    }, [id]);

    if (!donut || width < 10) return <div style={{ width: 500, height: 300 }}></div>;

    const browserNames = Object.keys(donut[0]).filter((k) => k !== 'percent');

    // accessor functions
    const percent = (d) => d.percent;

    // color scales
    const getBrowserColor = scaleOrdinal({
        domain: browserNames,
        range: colorRange,
    });
    return (
        <svg width={width} height={height}>
            <rect
                rx={14}
                width={width}
                height={height}
                fill="url('#visx-pie-gradient')"
            />
            <Group top={centerY + margin.top} left={centerX + margin.left}>
                <Pie
                    data={
                        selectedBrowser
                            ? donut.filter(({ label }) => label === selectedBrowser)
                            : donut
                    }
                    pieValue={percent}
                    outerRadius={radius}
                    innerRadius={radius - donutThickness}
                    cornerRadius={3}
                    padAngle={0.005}
                >
                    {(pie) => (
                        <AnimatedPie
                            {...pie}
                            animate={animate}
                            getKey={(arc) => arc.data.label}
                            getPercent={(arc) => arc.data.percent}
                            onClickDatum={({ data: { label } }) =>
                                animate &&
                                setSelectedBrowser(
                                    selectedBrowser && selectedBrowser === label
                                        ? null
                                        : label
                                )
                            }
                            getColor={(arc) => getBrowserColor(arc.data.label)}
                            colorRange={colorRange}
                        />
                    )}
                </Pie>
            </Group>
        </svg>
    );
};

const fromLeaveTransition = ({ endAngle }) => ({
    // enter from 360° if end angle is > 180°
    startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
    endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
    opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }) => ({
    startAngle,
    endAngle,
    opacity: 1,
});

const AnimatedPie = ({
    animate,
    arcs,
    path,
    getKey,
    getPercent,
    getColor,
    colorRange,
    // onClickDatum,
}) => {
    const transitions = useTransition(arcs, {
        from: animate ? fromLeaveTransition : enterUpdateTransition,
        enter: enterUpdateTransition,
        update: enterUpdateTransition,
        leave: animate ? fromLeaveTransition : enterUpdateTransition,
        keys: getKey,
    });
    return transitions((props, arc, { key }) => {
        // const [centroidX, centroidY] = path.centroid(arc);
        const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
        console.log(arc.data.label.length);
        return (
            <g key={key}>
                <animated.path
                    // compute interpolated path d attribute from intermediate angle values
                    d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
                        path({
                            ...arc,
                            startAngle,
                            endAngle,
                        })
                    )}
                    fill={getColor(arc)}
                    // onClick={() => onClickDatum(arc)}
                    // onTouchStart={() => onClickDatum(arc)}
                />
                {hasSpaceForLabel && (
                    <animated.g style={{ opacity: props.opacity }}>
                        <text
                            fill='black'
                            x='0'
                            y='0'
                            dy='.33em'
                            fontSize={16}
                            textAnchor='middle'
                            pointerEvents='none'
                        >
                            {arc.data.label
                                ? colorRange.includes('#069697')
                                    ? `股票報酬:-${getPercent(arc)}%`
                                    : `股票報酬:${getPercent(arc)}%`
                                : ''}
                        </text>
                    </animated.g>
                )}
            </g>
        );
    });
};

export default Inventory_DonutChart;
