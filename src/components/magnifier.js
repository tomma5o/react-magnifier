import React, { Component, PropTypes } from 'react';

export default class Magnifier extends Component {
    
        render() {
            
            const safePosX = () => {
                if (this.props.mousePos.x < this.props.safeArea.leftMin) {
                    return 0
                }  else if ( this.props.mousePos.x > this.props.safeArea.rightMin) {
                    return (this.props.safeArea.rightMin  - this.props.safeArea.leftMin) * this.props.proportion
                } else {
                    return (this.props.mousePos.x - this.props.safeArea.leftMin) * this.props.proportion
                }
            }
            
            const safePosY = () => {
                if (this.props.mousePos.y < this.props.safeArea.topMin) {
                    return 0
                } else if (this.props.mousePos.y > this.props.safeArea.bottomMin) {
                    return (this.props.safeArea.bottomMin - this.props.safeArea.topMin) * this.props.proportion
                } else {
                    return (this.props.mousePos.y - this.props.safeArea.topMin) * this.props.proportion
                }
            }
    
            const styleMagnifier = {
                width:`${this.props.navSize.w}px`,
                height:`${this.props.navSize.h}px`,
                display: this.props.onHover ? "block" : "none",
                overflow: "hidden",
            }
            
            const styleZoomedImage = {
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translate(-${safePosX()}px, -${safePosY()}px)`,
            }
    
            return (
                <div
                    className="magnifier"
                    style={styleMagnifier}>
                    <img
                        className="magnifier__zoomedImage"
                        style={styleZoomedImage}
                        src={this.props.imgUrl}/>
                </div>
            )
        }
    }