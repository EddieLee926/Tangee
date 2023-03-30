import React, { useEffect, useState, useMemo } from 'react';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Grid } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { localPoint } from '@visx/event';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { useTheme } from '@material-ui/styles';
import getApi from '../../../Utils/Api/getApi';

// accessors
const getDate = (d) => d.date;
const getProfit = (d) => d.profit;
const defaultMargin = { top: 40, right: 40, bottom: 40, left: 45 };

const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: '#4e5271',
    color: 'white',
};
let tooltipTimeout;

const BarGraph = ({ width, height, margin = defaultMargin, data }) => {
    const theme = useTheme();
    const xMax = width - margin.right - margin.left;
    const yMax = height - margin.top - margin.bottom;
    const {
        tooltipOpen,
        tooltipTop,
        tooltipLeft,
        hideTooltip,
        showTooltip,
        tooltipData,
    } = useTooltip();
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        detectBounds: true,
        scroll: true,
    });

    const xScale = useMemo(() =>
        scaleBand({
            range: [xMax, 0],
            round: true,
            domain: data.map(getDate),
            padding: 0.4,
        })
    );
    const yScale = useMemo(() =>
        scaleLinear({
            range: [yMax, 0],
            round: true,
            domain: [Math.min(...data.map(getProfit)), Math.max(...data.map(getProfit))],
        })
    );

    if (!width || !height) {
        return null;
    }

    const colors = {
        white: '#FFFFFF',
        black: '#434343',
        primaryOrange: theme.palette.primaryOrange.main,
        lightOrange: theme.palette.lightOrange.main,
        primaryRed: theme.palette.primaryRed.main,
        gray: theme.palette.grayBackground.main,
    };

    return (
        <div
            ref={containerRef}
            style={{ position: 'relative', backgroundColor: colors.white }}
        >
            <svg width={width} height={height}>
                <Grid
                    numTicks={6}
                    top={margin.top}
                    left={margin.left * 1.5}
                    xScale={xScale}
                    yScale={yScale}
                    width={xMax}
                    height={yMax}
                    stroke='black'
                    strokeOpacity={0.1}
                    xOffset={xScale.bandwidth() / 2}
                />
                <Group top={margin.top} left={margin.left * 1.5}>
                    {data.map((d) => {
                        const date = getDate(d);
                        const [yMinDomain] = yScale.domain();
                        const barWidth = xScale.bandwidth();
                        const barHeight = Math.abs(
                            yScale(getProfit(d)) -
                                (getProfit(d) > 0
                                    ? yScale(Math.max(0, yMinDomain))
                                    : yScale(0))
                        );
                        const barX = xScale(date);
                        const barY = yScale(getProfit(d) > 0 ? getProfit(d) : 0);
                        return (
                            <Bar
                                key={`bar-${date}`}
                                x={barX}
                                y={barY}
                                width={barWidth}
                                height={barHeight}
                                fill={colors.primaryOrange}
                                onMouseLeave={() => {
                                    tooltipTimeout = window.setTimeout(() => {
                                        hideTooltip();
                                    }, 300);
                                }}
                                onMouseMove={(event) => {
                                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                                    const coords = localPoint(
                                        event.target.ownerSVGElement,
                                        event
                                    );
                                    showTooltip({
                                        tooltipLeft: coords.x,
                                        tooltipTop: coords.y,
                                        tooltipData: d,
                                    });
                                }}
                            />
                        );
                    })}
                </Group>
                <AxisBottom
                    hideTicks
                    top={yMax + margin.bottom}
                    left={margin.left * 1.5}
                    scale={xScale}
                    numTicks={5}
                    stroke={colors.white}
                    tickLabelProps={() => ({
                        fill: colors.black,
                        textAnchor: 'middle',
                        verticalAnchor: 'middle',
                    })}
                />
                <AxisLeft
                    hideTicks
                    numTicks={6}
                    top={margin.top}
                    left={margin.left * 1.8}
                    scale={yScale}
                    stroke={colors.white}
                    tickLabelProps={() => ({
                        fill: colors.black,
                        textAnchor: 'end',
                        verticalAnchor: 'middle',
                    })}
                    tickFormat={(value) => `$${value}`}
                />
            </svg>
            {tooltipOpen && tooltipData && (
                <TooltipInPortal
                    key={Math.random()}
                    top={tooltipTop}
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
            )}
        </div>
    );
};

const MonthlySubsRevenueDataBarChart = (props) => {
    const { userid } = useSelector(userSelector);
    //明星投資者ID
    const { id } = props;
    const [subsRevenue, setSubsRevenue] = useState();

    useEffect(() => {
        var data = {
            userid: userid,
            shareID: id,
        };
        const getSubsRevenueBar = async () => {
            const response = await getApi.post('/table_bar_MonthlySubsRevenueData', data);
            setSubsRevenue(response.data);
        };
        getSubsRevenueBar();
    }, []);
    if (!subsRevenue) return null;
    return (
        <ParentSize
            style={{
                width: '100%',
                height: '80%',
            }}
        >
            {({ width, height }) => (
                <BarGraph width={width} height={height} data={subsRevenue} />
            )}
        </ParentSize>
    );
};

export default MonthlySubsRevenueDataBarChart;
