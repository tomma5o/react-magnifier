import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseImage from './components/baseImage';
import Magnifier from './components/magnifier';

export default class ImageMagnifier extends Component {

    state = {
        onHover: false,
        mousePos: {
            x: 0,
            y: 0
        }
    }
    
    handleMove = (e) => {
        const element = e.target;
        const elBoundingClient = element.getBoundingClientRect();
        const mouseCoord = { 
            x: e.x,
            y: e.y
        };

        const mousePos = {
            x: mouseCoord.x - elBoundingClient.left,
            y: mouseCoord.y - elBoundingClient.top,
        }

        this.setState({mousePos})
    }

    onHovering = (bool) => {
        this.setState({onHover: bool})
    }

    getProportion = (imgHqW, imgLqW) => ( imgHqW / imgLqW )

    getSmallNavSize = (imgLqSize, imgHqSize, navSize) => {
        return {
            w: imgLqSize.w / (imgHqSize.w / navSize.w),
            h: imgLqSize.h / (imgHqSize.h / navSize.h)
        }
    }

    calcSafeArea = (smallNavSize, imgLqSize) => {
        return {
            leftMin: smallNavSize.w / 2,
            rightMin: imgLqSize.w - smallNavSize.w / 2,
            topMin: smallNavSize.h / 2,
            bottomMin: imgLqSize.h - smallNavSize.h / 2,
        }
    }
    

    render() {

        const _imgHqSize = {w:this.props.imgSizes.hq.w, h:this.props.imgSizes.hq.h};
        const _imgLqSize = {w:this.props.imgSizes.lq.w, h:this.props.imgSizes.lq.h};
        const _navSize = {w:this.props.navSize.w, h:this.props.navSize.h};

        const smallNavSize = this.getSmallNavSize(_imgLqSize, _imgHqSize, _navSize);
        const safeArea = this.calcSafeArea(smallNavSize, _imgLqSize);

        return(
            <div className={`imageMagnifier ${this.props.className || ""}`}>
                <BaseImage
                    imgUrl={this.props.urlLQ}
                    mousePos={{...this.state.mousePos}}
                    navSize={{...smallNavSize}}
                    safeArea={{...safeArea}}
                    handleMove={this.handleMove}
                    onHovering={this.onHovering}
                />

                <Magnifier
                    imgUrl={this.props.urlHQ}
                    mousePos={{...this.state.mousePos}}
                    navSize={{...this.props.navSize}}
                    onHover={this.state.onHover}
                    safeArea={{...safeArea}}
                    proportion={this.getProportion(_imgHqSize.w, _imgLqSize.w)}
                />
            </div>
        )  
    }
}

ImageMagnifier.propTypes = {
    urlLQ: PropTypes.string.isRequired,
    urlHQ: PropTypes.string.isRequired,
    navSize: PropTypes.object.isRequired,
};