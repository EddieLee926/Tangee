import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { MarkerCircle } from '@visx/marker';
import { scaleLinear, scaleBand } from '@visx/scale';
import { LinePath, AreaClosed } from '@visx/shape';
import { Bar, Line } from '@visx/shape';
import { ParentSize } from '@visx/responsive';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { useTheme } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import getApi from '../../../Utils/Api/getApi';
import style from './ProfitlineChartStyle';

const getDate = (d) => d.date;
const getProfit = (d) => d.profit;
const defaultMargin = { top: 40, right: 40, bottom: 40, left: 60 };
const useStyles = makeStyles(style);

const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: '#4e5271',
    color: 'white',
};

const LineChart = ({ width, height, margin = defaultMargin, data }) => {
    const theme = useTheme();
    const classes = useStyles();
    const xMax = width - margin.right - margin.left;
    const yMax = height - margin.top * 1.5;

    const xScale = useMemo(() =>
        scaleBand({
            range: [xMax, 40],
            round: true,
            domain: data.map(getDate),
            paddingOuter: 0,
            paddingInner: 1,
        })
    );
    const yScale = useMemo(() =>
        scaleLinear({
            range: [yMax, 40],
            round: true,
            domain: [Math.min(...data.map(getProfit)), Math.max(...data.map(getProfit))],
        })
    );

    const colors = {
        white: '#FFFFFF',
        black: '#434343',
        primaryOrange: theme.palette.primaryOrange.main,
        lightOrange: theme.palette.lightOrange.main,
        primaryRed: theme.palette.primaryRed.main,
    };

    const { tooltipTop, tooltipLeft, hideTooltip, showTooltip, tooltipData } =
        useTooltip();
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        detectBounds: true,
        scroll: true,
    });

    const handleTooltip = useCallback(
        (event) => {
            const { x } = localPoint(event) || { x: 0 };
            const section = ((xMax - margin.right) / 5).toFixed(2);
            const index = data.length - parseInt(x / section);
            let d = data[data.length - 1];
            if (true) {
                d = data[index];
            }
            showTooltip({
                tooltipData: d,
                tooltipLeft: x,
                tooltipTop: yScale(getProfit(d)),
            });
        },
        [showTooltip, yScale, xScale]
    );

    return (
        <div
            ref={containerRef}
            style={{ position: 'relative', backgroundColor: 'white' }}
        >
            <svg height={height} width={width} className={classes.root}>
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    style={{
                        fill: colors.white,
                    }}
                />
                <AxisBottom
                    hideTicks
                    scale={xScale}
                    numTicks={5}
                    top={yMax + margin.top / 2}
                    left={margin.left}
                    stroke={colors.white}
                    tickLabelProps={() => ({
                        fill: colors.black,
                        textAnchor: 'middle',
                        verticalAnchor: 'middle',
                    })}
                />

                <AxisLeft
                    hideTicks
                    scale={yScale}
                    numTicks={3}
                    left={margin.left * 1.2}
                    stroke={colors.white}
                    tickLabelProps={() => ({
                        fill: colors.black,
                        textAnchor: 'end',
                        verticalAnchor: 'middle',
                    })}
                    tickFormat={(value) => `$${value}`}
                />

                <LinearGradient
                    id='background-gradient'
                    from={colors.lightOrange}
                    to={colors.white}
                />

                <AreaClosed
                    data={data}
                    x={(d) => xScale(getDate(d)) + margin.left}
                    y={(d) => yScale(getProfit(d))}
                    yScale={yScale}
                    stroke='url(#background-gradient)'
                    fill='url(#background-gradient)'
                    curve={curveMonotoneX}
                />

                <LinearGradient
                    id='line-gradient'
                    from={colors.primaryRed}
                    to={colors.primaryRed}
                />
                <MarkerCircle
                    id='marker-circle'
                    fill={colors.primaryOrange}
                    size={1.5}
                    refX={2}
                />

                <LinePath
                    data={data}
                    x={(d) => xScale(getDate(d)) + margin.left}
                    y={(d) => yScale(getProfit(d))}
                    stroke="url('#line-gradient')"
                    strokeWidth={3}
                    curve={curveMonotoneX}
                    markerEnd='url(#marker-circle)'
                    markerMid='url(#marker-circle)'
                    markerStart='url(#marker-circle)'
                />
                <Bar
                    x={margin.left + margin.right}
                    y={margin.top}
                    width={xMax - margin.right}
                    height={yMax - margin.top}
                    fill='transparent'
                    onTouchStart={handleTooltip}
                    onTouchMove={handleTooltip}
                    onMouseMove={handleTooltip}
                    onMouseLeave={() => hideTooltip()}
                />
                {tooltipData && (
                    <g>
                        <Line
                            from={{ x: tooltipLeft, y: margin.top }}
                            to={{ x: tooltipLeft, y: yMax + margin.top / 2 }}
                            stroke='#1e7bac'
                            strokeWidth={2}
                            pointerEvents='none'
                            strokeDasharray='5,2'
                        />
                        <circle
                            cx={tooltipLeft}
                            cy={tooltipTop + 1}
                            r={4}
                            fill='black'
                            fillOpacity={0.1}
                            stroke='black'
                            strokeOpacity={0.1}
                            strokeWidth={2}
                            pointerEvents='none'
                        />
                        <circle
                            cx={tooltipLeft}
                            cy={tooltipTop}
                            r={4}
                            fill='black'
                            stroke='white'
                            strokeWidth={2}
                            pointerEvents='none'
                        />
                    </g>
                )}
            </svg>
            {tooltipData && (
                <div>
                    <TooltipInPortal
                        key={Math.random()}
                        top={tooltipTop + 12}
                        left={tooltipLeft}
                        style={tooltipStyles}
                    >
                        <div className='tooltip-title'>
                            <strong>{tooltipData.date}</strong>
                        </div>
                        <div className='tooltip-value'>
                            <strong>{tooltipData.profit}</strong>
                        </div>
                    </TooltipInPortal>
                </div>
            )}
        </div>
    );
};

const ProfitlineChart = (props) => {
    const { userid } = useSelector(userSelector); // redux
    const classes = useStyles();
    //明星投資者ID
    const { id } = props; //
    const [profit, setProfit] = useState();
    // console.log('haha', userid, id);
    useEffect(() => {
        var data = {
            userid: userid,
            shareID: id,
        };
        const getProfitLine = async () => {
            const response = await getApi.post('/table_line_MonthlyRevenue', data);
            setProfit(response.data);
        };
        getProfitLine();
    }, []);

    if (!profit) return null;
    return (
        <ParentSize
            style={{
                width: '100%',
                height: '80%',
            }}
        >
            {({ width, height }) => (
                <LineChart width={width} height={height} data={profit} />
            )}
        </ParentSize>
    );
};

export default ProfitlineChart;
