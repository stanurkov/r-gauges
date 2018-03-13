import React, {Component} from 'react';
import { BaseGauge, LinearGauge, RadialGauge } from 'canvas-gauges';

function objectWithout( object, exclude ) {
    let i, j;
    for (i in exclude) {
        if (typeof object[i] !== 'undefined') {
            const newObject = {};
            for (j in object) {
                if (!(exclude[j])) {
                    newObject[j] = object[j];
                }
            }
            return newObject;
        }
    }
    return object;
}



export default class RGauge extends Component {
    constructor(props, ...other) {
		super(props, ...other);
		this.handleCanvasMount = this.handleCanvasMount.bind(this);
	}

    componentWillUnmount() {
        this.handleUnmount();
    }

    handleUnmount() {
        if (this.gauge) {
            this.gauge.destroy();

            this.gauge = null;
            this.storedCanvas = null;
        }
    }


    componentWillReceiveProps(props) {
        const options = objectWithout(props, {
            id: true,
            className: true,
            children: true,
            style: true,
        });
        const id = props.id;
        const className = props.className;
        const children = props.children;
        const style = props.style;


        if (this.gauge && this.storedCanvas) {
            const lastOptions = this.lastOptions;
            if (lastOptions) {
                const newOptions = {};
                let changes = 0;
                let lastChange;
                let o;

                const objectsDiffer = function(o1, o2) {
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
                    this.gauge.update(newOptions);    
                }
            } else {
                this.gauge.update(options);
            }

            this.lastOptions = options;
        }
    }

    createGauge(canvas, options) {
        options.renderTo = canvas;
        return new BaseGauge( options );
    }    

    handleCanvasMount(canvas) {
        if (!canvas) {
            this.handleUnmount();
            return;            
        }

        const props = this.props;
        
        const options = objectWithout(props, {
            id: true,
            className: true,
            children: true,
            style: true,
        });
        
        const id = props.id;
        const className = props.className;
        const children = props.children;
        const style = props.style;
        const gauge = this.gauge;

        if (gauge) {

            if (canvas === this.storedCanvas) {
                gauge.update( options );
                gauge.draw();
            } else {
                this.storedCanvas = canvas;

                if (gauge) {
                    options.renderTo = canvas;
                    gauge.update( options );
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
        const props = this.props;
        const id = props.id;
        const className = props.className;
        const children = props.children;
        const style = props.style;

        return (
            React.createElement('canvas', {
                id: id,
                className: className,
                style: style,
                children: children,
                ref: this.handleCanvasMount
            })
        );
    }

}

export class RRadialGauge extends RGauge {

    createGauge(canvas, options) {
        options.renderTo = canvas;
        return new RadialGauge( options );
    }    

}

export class RLinearGauge extends RGauge {

    createGauge(canvas, options) {
        options.renderTo = canvas;
        return new RadialGauge( options );
    }    

}
