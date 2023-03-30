import React, { useState, useEffect, useMemo } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice';
import getApi from '../../../Utils/Api/getApi';

const count = (d) => d.count;

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

const PieChart = ({ width, height, margin = defaultMargin, data }) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const centerY = innerHeight / 2;
    const centerX = innerWidth / 2;
    const top = centerY + margin.top;
    const left = centerX + margin.left;
    const pieSortValues = (a, b) => b - a;

    const getTagCountColor = useMemo(() =>
        scaleOrdinal({
            domain: data.map((l) => l.tagname),
            range: ['#54D8FE', '#FE8373', '#A3A0FB', '#FFD982'],
        })
    );

    return (
        <svg width={width} height={height}>
            <Group top={top} left={left}>
                <Pie
                    data={data}
                    pieValue={count}
                    pieSortValues={pieSortValues}
                    outerRadius={radius}
                >
                    {(pie) => {
                        return pie.arcs.map((arc, index) => {
                            const { tagname } = arc.data;
                            const [centroidX, centroidY] = pie.path.centroid(arc);
                            const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                            const arcPath = pie.path(arc);
                            const arcFill = getTagCountColor(tagname);
                            return (
                                <g key={`arc-${tagname}-${index}`}>
                                    <path d={arcPath} fill={arcFill} />
                                    {hasSpaceForLabel && (
                                        <text
                                            x={centroidX}
                                            y={centroidY}
                                            dy='.33em'
                                            fill='#ffffff'
                                            fontSize={22}
                                            textAnchor='middle'
                                            pointerEvents='none'
                                        >
                                            {arc.data.tagname}
                                        </text>
                                    )}
                                </g>
                            );
                        });
                    }}
                </Pie>
            </Group>
        </svg>
    );
};

const TagPieChart = (props) => {
    const { userid } = useSelector(userSelector);
    //明星投資者ID
    const { id } = props;
    const [tag, setTag] = useState();
    useEffect(() => {
        var data = {
            userid: userid,
            shareID: id,
        };
        const getTagPieChart = async () => {
            const response = await getApi.post('/table_tagData', data);
            setTag(response.data);
            // console.log(response.data, 'tag圓餅圖~~');
        };
        getTagPieChart();
    }, []);

    if (!tag) return null;

    return (
        <ParentSize>
            {({ width, height }) => <PieChart width={width} height={height} data={tag} />}
        </ParentSize>
    );
};

export default TagPieChart;
