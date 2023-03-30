import React, { useState, useEffect } from 'react';
import { Group } from '@visx/group';
import { BarGroup, Bar } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { localPoint } from '@visx/event';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { LegendOrdinal, LegendLabel, LegendItem } from '@visx/legend';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { useSpring, animated } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice';
import getApi from '../../../Utils/Api/getApi';

const lightGray = '#d3d3d3';
const darkGray = '#282828';
const color1 = '#5C6BC0';
const color2 = '#EC407A';
const color3 = '#069697';
const color4 = '#ffb236';
const background = '#ededed';
const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: '#4e5271',
    color: 'white',
};
let tooltipTimeout;
const legendGlyphSize = 15;
const defaultMargin = { top: 40, right: 40, bottom: 40, left: 40 };

const generateChart = (articleData) => {
    const keys = Object.keys(articleData[0]).filter((d) => d !== '文章名稱');
    const getTitle = (d) => d['文章名稱'];
    const titleScale = scaleBand({
        domain: articleData.map(getTitle),
        padding: 0.4,
    });
    const categoryScale = scaleBand({
        domain: keys,
        padding: 0.3,
    });
    const numScale = scaleLinear({
        domain: [
            0,
            Math.max(
                ...articleData.map((d) => Math.max(...keys.map((key) => Number(d[key]))))
            ),
        ],
    });
    const colorScale = scaleOrdinal({
        domain: keys,
        range: [color1, color2, color3, color4],
    });
    return { keys, getTitle, titleScale, categoryScale, numScale, colorScale };
};

const BarGraph = ({ width, height, margin = defaultMargin }) => {
    const xMax = width - margin.right - margin.left;
    const yMax = height - margin.top - margin.bottom;
    const [articleData, setArticleData] = useState();
    const {
        tooltipOpen,
        tooltipTop,
        tooltipLeft,
        hideTooltip,
        showTooltip,
        tooltipData,
    } = useTooltip();
    const { containerRef, TooltipInPortal } = useTooltipInPortal();
    const { userid } = useSelector(userSelector);

    const { scale } = useSpring({
        from: { scale: 0 },
        to: { scale: 1 },
    });
    const AnimatedBar = animated(Bar);

    useEffect(() => {
        const getBarArticleData = async () => {
            const response = await getApi.post('/table_bar_articleData', {
                userid: userid,
            });
            if (response.data.length !== 0) {
                setArticleData(response.data);
            }
        };
        if (!articleData) {
            getBarArticleData();
        }
    }, [articleData]);

    if (!width || !height) {
        return null;
    }
    if (!articleData) {
        return <div>尚無文章</div>;
    }
    const { keys, getTitle, titleScale, categoryScale, numScale, colorScale } =
        generateChart(articleData);
    titleScale.rangeRound([0, xMax]);
    categoryScale.rangeRound([0, titleScale.bandwidth()]);
    numScale.range([yMax, 0]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                backgroundColor: background,
            }}
        >
            <svg width={width} height={height}>
                {/* grouped bars */}
                <Group top={margin.top} left={margin.left}>
                    <BarGroup
                        data={articleData}
                        keys={keys}
                        height={yMax}
                        x0={getTitle}
                        x0Scale={titleScale}
                        x1Scale={categoryScale}
                        yScale={numScale}
                        color={colorScale}
                    >
                        {(barGroups) =>
                            barGroups.map((barGroup) => (
                                <Group
                                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                                    left={barGroup.x0}
                                >
                                    {barGroup.bars.map((bar) => (
                                        <AnimatedBar
                                            key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                                            x={bar.x}
                                            y={scale.to((s) => yMax - s * bar.height)}
                                            width={bar.width}
                                            height={scale.to((s) => s * bar.height)}
                                            fill={bar.color}
                                            rx={0}
                                            onMouseLeave={() => {
                                                tooltipTimeout = window.setTimeout(() => {
                                                    hideTooltip();
                                                }, 300);
                                            }}
                                            onMouseMove={(event) => {
                                                if (tooltipTimeout)
                                                    clearTimeout(tooltipTimeout);
                                                const coords = localPoint(
                                                    event.target.ownerSVGElement,
                                                    event
                                                );
                                                showTooltip({
                                                    tooltipLeft: coords.x,
                                                    tooltipTop: coords.y,
                                                    tooltipData: bar,
                                                });
                                            }}
                                        />
                                    ))}
                                </Group>
                            ))
                        }
                    </BarGroup>
                </Group>
                <AxisBottom
                    top={yMax + margin.bottom}
                    left={margin.left}
                    scale={titleScale}
                    stroke={lightGray}
                    hideTicks
                    // tickFormat={formatDate}
                    tickLabelProps={() => ({
                        fill: darkGray,
                        fontSize: 11,
                        textAnchor: 'middle',
                    })}
                />
                <AxisLeft
                    top={margin.top}
                    left={margin.left}
                    scale={numScale}
                    stroke={lightGray}
                    hideZero
                    hideTicks
                    tickFormat={(num) => num}
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
                        <strong>{tooltipData.key}</strong>
                    </div>
                    <div className='tooltip-value'>
                        <strong>{tooltipData.value}</strong>
                    </div>
                </TooltipInPortal>
            )}
            <LegendOrdinal
                scale={colorScale}
                // labelFormat={(label) => `${label.toUpperCase()}`}
            >
                {(labels) => (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {labels.map((label, i) => (
                            <LegendItem key={`legend-quantile-${i}`} margin='0 5px'>
                                <svg width={legendGlyphSize} height={legendGlyphSize}>
                                    <rect
                                        fill={label.value}
                                        width={legendGlyphSize}
                                        height={legendGlyphSize}
                                    />
                                </svg>
                                <LegendLabel align='left' margin='0 0 0 4px'>
                                    {label.text}
                                </LegendLabel>
                            </LegendItem>
                        ))}
                    </div>
                )}
            </LegendOrdinal>
        </div>
    );
};

export default BarGraph;
