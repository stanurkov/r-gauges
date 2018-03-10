import React, {Component} from 'react';
import { BaseGauge, LinearGauge, RadialGauge } from 'canvas-gauges';


export default class RGauge extends Component {

    componentWillUnmount() {
        if (this.gauge) {
            this.gauge.destroy();

            this.gauge = null;
            this.storedCanvas = null;
        }
    }

    componentWillReceiveProps(props) {
        const {
            id,
            className,
            children,
            style,
            ...options
        } = props;

        if (this.gauge && this.storedCanvas) {
            const lastOptions = this.lastOptions;
            if (lastOptions) {
                const newOptions = {};
                let changes = 0;
                let lastChange;
                let o;

                const objectsDiffer = (o1, o2) => {
                    let o, i;

                    for (i in o1) {
                        o = o1[i];
                        if (o !== o2[i] && typeof o === 'object' && objectsDiffer(o, o2[i])) {
                            return true;
                        }
                    }
                    return false;
                }

                for (let i in options) {
                    o = options[i];
                    if (o !== lastOptions[i] && (typeof o !== 'object' || objectsDiffer(o, lastOptions[i] ))) {
                        changes++;
                        newOptions[i] = o;
                        lastChange = i;
                    }
                }

                if (changes === 1 && lastChange === 'value') {
                    this.gauge.value = o;
                } else if (changes > 0) {
                    console.log("-- new options: ", newOptions);
                    this.gauge.update(newOptions);    
                }
            } else {
                this.gauge.update(options);
            }

            this.lastOptions = options;
        }
    }

    createGauge(canvas, options) {
        return new BaseGauge( { renderTo: canvas,  ...options} );
    }    

    handleCanvasMount = (canvas) => {
        const {
            id,
            className,
            children,
            style,
            ...options
        } = this.props;

        const gauge = this.gauge;

        console.log("--> options: ", options);
        
        if (gauge) {

            if (canvas === this.storedCanvas) {
                gauge.update( { ...options } );
                gauge.draw();
            } else {
                this.storedCanvas = canvas;

                if (gauge) {
                    gauge.update( { renderTo: canvas, ...options } );
                }
            }

        } else {
            this.storedCanvas = canvas;

            this.gauge = this.createGauge(canvas, options);
            this.gauge.draw();
        }

        this.lastOptions = options;

    }

    render() {
        const {
            id,
            className,
            children,
            style,
            
        } = this.props;

        return (
            <canvas 
                id={ id } 
                className={ className }  
                style={ style }
                ref={ this.handleCanvasMount } 
            />
        )
    }

}

export class RRadialGauge extends RGauge {

    createGauge(canvas, options) {
        return new RadialGauge( { renderTo: canvas,  ...options} );
    }    

}

export class RLinearGauge extends RGauge {

    createGauge(canvas, options) {
        return new RadialGauge( { renderTo: canvas,  ...options} );
    }    

}
