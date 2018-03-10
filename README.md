# observed-object


[![MIT][mit-image]][mit-url]

> React Wrapper Components for Canvas Gauges Library 


[mit-image]: https://github.com/stanurkov/observed-object/blob/master/mit.svg
[mit-url]: https://github.com/stanurkov/r-gauges/blob/master/LICENSE
[cg-url]: https://canvas-gauges.com/

## Introduction

Canvas Gauges library currently implements two types of HTML canvas-based gauges for presentation of numeric values like temperature, speed, pressure, etc - RadialGauge and LinearGauge.

R-Gauges library provides React Components that basically wrap functionality of Canvas Gauges so it is possible to seamlessly integrate them into your React frontend.

[Documentation on Canvas Gauges is available here][cg-url]
 

## Usage Example

It would be a good idea to create a component that sets most of all visual properties by itself (or from some configuration storage) and receives only important properties from its parent. So, we create a BlueCompass component that receives only the "azimuth" property and change that property from its parent component, MyDirGauge:

class BlueCompass extends Component {

    render() {

        return (
            <RadialGauge 
                width={400}
                height={400}
                minValue="0"
                maxValue="360"
                majorTicks={["N","NE","E","SE","S","SW","W","NW","N"]}
                minorTicks={22}
                ticksAngle={360}
                startAngle={180}
                strokeTicks={false}
                highlights={false}
                colorPlate="#33a"
                colorMajorTicks="#f5f5f5"
                colorMinorTicks="#ddd"
                colorNumbers="#ccc"
                colorNeedle="rgba(240, 128, 128, 1)"
                colorNeedleEnd="rgba(255, 160, 122, .9)"
                valueBox="false"
                valueTextShadow="false"
                colorCircleInner="#fff"
                colorNeedleCircleOuter="#ccc"
                needleCircleSize="15"
                needleCircleOuter="false"
                animationRule="linear"
                needleType="line"
                needleStart="75"
                needleEnd="99"
                needleWidth="3"
                borders="true"
                borderInnerWidth="0"
                borderMiddleWidth="0"
                borderOuterWidth="10"
                colorBorderOuter="#ccc"
                colorBorderOuterEnd="#ccc"
                colorNeedleShadowDown="#222"
                borderShadowWidth="0"
                animationTarget="plate"
                units="ᵍ"
                title="DIRECTION"
                fontTitleSize="19"
                colorTitle="#f5f5f5"
                animationDuration="1500"
                value={ this.props.azimuth }
            />
        );
    }
}

class MyDirGauge extends Component {

    constructor(props, ...params) {
        super(props, ...params)

        this.state = {
            value: props.startValue,
        }
    }

    componentDidMount() {
        const self = this;

        this.timer = setInterval(() => {
            self.setState({ value: 360 * Math.random() })
        }, 1000 + 5000 * Math.random() );
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }


    render() {
        return (
            <BlueCompass  
                azimuth={this.state.value}
            />                    
        );
    }
}



