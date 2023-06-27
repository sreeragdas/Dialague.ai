import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'

const HkProgressBar = ({ now, max, min, label, striped, variant, size, key, animated, rounded, className, bsPrefix }) => {
    const [currentValue, setcurrentValue] = useState(0);

    useEffect(() => {
        setTimeout(() => setcurrentValue(now), 500);
    }, [now])

    return (
        <>
            <ProgressBar variant={variant} now={currentValue} max={max} min={min} key={key} animated={animated} label={label} striped={striped} className={classNames(className, { "progress-bar-rounded": rounded }, (size ? `progress-bar-${size}` : ""))} bsPrefix={bsPrefix} />
        </>
    )
}

const Label = ({ children, className }) => <label className={classNames("progress-label", className)}>{children}</label>
HkProgressBar.Label = Label;

const Wrapper = ({ children, className }) => <div className={classNames("progress-lb-wrap", className)}>{children}</div>
HkProgressBar.Wrapper = Wrapper;

export default HkProgressBar
