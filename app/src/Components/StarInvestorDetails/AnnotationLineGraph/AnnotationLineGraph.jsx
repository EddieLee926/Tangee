import React, { useMemo, useState, useEffect } from "react";
import { Label, Connector, CircleSubject, LineSubject } from "@visx/annotation";
import { LinePath } from "@visx/shape";
import { extent } from "d3-array";
import { scaleLinear, scaleTime } from "@visx/scale";
import appleStock from "@visx/mock-data/lib/mocks/appleStock";
import { EditableAnnotation } from "@visx/annotation";
import { makeStyles } from '@material-ui/core/styles';
import styles from './AnnotationLineGraphStyle';
import findNearestDatum from './findNearestDatum'

const useStyles = makeStyles(styles);
const orange = "#ff7e67";
const greens = ["#ecf4f3", "#68b0ab", "#006a71"];
const data = appleStock.slice(-100);
const getDate = (d) => new Date(d.date).valueOf();
const getStockValue = (d) => d.close;
const annotateDatum = data[Math.floor(data.length / 2) + 4];
const approxTooltipHeight = 70;

const AnnotationLineGraph = ({ width, height, compact = false }) =>{
    const xScale = useMemo(
        () =>
            scaleTime({
                domain: extent(data, (d) => getDate(d)),
                range: [0, width]
            }),
        [width]
    );
    const yScale = useMemo(
        () =>
            scaleLinear({
                domain: extent(data, (d) => getStockValue(d)),
                range: [height - 100, 100]
            }),
        [height]
    );

    const [editLabelPosition] = useState(false);
    const [editSubjectPosition] = useState(true);
    const [title,setTitle] = useState("Title");
    const [subtitle,setSubtitle] = useState("Subtitle");
    const [connectorType] = useState("elbow");
    const [subjectType] = useState("circle");
    const [showAnchorLine] = useState(true);
    const [verticalAnchor] = useState("middle");
    const [horizontalAnchor] = useState("middle");
    const [labelWidth] = useState(210);
    const [annotationPosition, setAnnotationPosition] = useState({
        x: xScale(getDate(annotateDatum)) ?? 0,
        y: yScale(getStockValue(annotateDatum)) ?? 0,
        dx: compact ? -50 : 100,
        dy: compact ? -30 : 50
    });
    const classes = useStyles();

    // update annotation position when scale's change
    useEffect(() => {
        setAnnotationPosition(currPosition => ({
            ...currPosition,
            x: xScale(getDate(annotateDatum)) ?? 0,
            y: yScale(getStockValue(annotateDatum)) ?? 0,
        }));
    }, [xScale, yScale]);

    return (
        <svg width={width} height={height}>
            <rect width={width} height={height} fill={greens[0]} />
            <LinePath
                stroke={greens[2]}
                strokeWidth={2}
                data={data}
                x={(d) => xScale(getDate(d)) ?? 0}
                y={(d) => yScale(getStockValue(d)) ?? 0}
            />
            <EditableAnnotation
                width={width}
                height={height}
                x={annotationPosition.x}
                y={annotationPosition.y}
                dx={annotationPosition.dx}
                dy={annotationPosition.dy}
                canEditLabel={editLabelPosition}
                canEditSubject={editSubjectPosition}
                onDragEnd={({ event, ...nextPosition }) => {
                    // snap Annotation to the nearest data point
                    const nearestDatum = findNearestDatum({
                        accessor: subjectType === 'horizontal-line' ? getStockValue : getDate,
                        data,
                        scale: subjectType === 'horizontal-line' ? yScale : xScale,
                        value: subjectType === 'horizontal-line' ? nextPosition.y : nextPosition.x,
                    });
                    const x = xScale(getDate(nearestDatum)) ?? 0;
                    const y = yScale(getStockValue(nearestDatum)) ?? 0;
      
                    // flip label to keep in view
                    const shouldFlipDx =
                        (nextPosition.dx > 0 && x + nextPosition.dx + labelWidth > width) ||
                        (nextPosition.dx < 0 && x + nextPosition.dx - labelWidth <= 0);
                    const shouldFlipDy = // 100 is est. tooltip height
                        (nextPosition.dy > 0 && height - (y + nextPosition.dy) < approxTooltipHeight) ||
                        (nextPosition.dy < 0 && y + nextPosition.dy - approxTooltipHeight <= 0);
                    setAnnotationPosition({
                        x,
                        y,
                        dx: (shouldFlipDx ? -1 : 1) * nextPosition.dx,
                        dy: (shouldFlipDy ? -1 : 1) * nextPosition.dy,
                    });
                }}
                onDragMove={({event, ...nextPosition}) => {
                    const nearestDatum = findNearestDatum({
                        accessor: subjectType === 'horizontal-line' ? getStockValue : getDate,
                        data,
                        scale: subjectType === 'horizontal-line' ? yScale : xScale,
                        value: subjectType === 'horizontal-line' ? nextPosition.y : nextPosition.x,
                    });
                    setTitle(nearestDatum.date)
                    setSubtitle(nearestDatum.close)
                }}
            >
                <Connector stroke={orange} type={connectorType} />
                <Label
                    backgroundFill="white"
                    showAnchorLine={showAnchorLine}
                    anchorLineStroke={greens[2]}
                    backgroundProps={{ stroke: greens[1] }}
                    fontColor={greens[2]}
                    horizontalAnchor={horizontalAnchor}
                    subtitle={subtitle}
                    title={title}
                    verticalAnchor={verticalAnchor}
                    width={labelWidth}
                    className={classes.label}
                />
                {subjectType === "circle" && <CircleSubject stroke={orange} />}
                {subjectType !== "circle" && (
                    <LineSubject
                        orientation={
                        subjectType === "vertical-line" ? "vertical" : "horizontal"
                        }
                        stroke={orange}
                        min={0}
                        max={subjectType === "vertical-line" ? height : width}
                    />
                )}
            </EditableAnnotation>
        </svg>
    );
}

export default AnnotationLineGraph;
