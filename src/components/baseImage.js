import React, { Component, PropTypes } from 'react';

export default class BaseImage extends Component {
    
        subscribeEvt(e) {
            this.handleMoveBinded = this.props.handleMove.bind(e)
            e.addEventListener("mousemove", this.handleMoveBinded);
        }
        
        unsubscribeEvt(e) {
            e.removeEventListener("mousemove", this.handleMoveBinded);
        }
        
        render() {
            const safePosX = () => {
                if (this.props.mousePos.x < this.props.safeArea.leftMin) {
                    return this.props.safeArea.leftMin
                } else if ( this.props.mousePos.x > this.props.safeArea.rightMin) {
                    return this.props.safeArea.rightMin
                } else {
                    return this.props.mousePos.x
                }
            }
            
            const safePosY = () => {
                if (this.props.mousePos.y < this.props.safeArea.topMin) {
                    return this.props.safeArea.topMin
                } else if ( this.props.mousePos.y > this.props.safeArea.bottomMin) {
                    return this.props.safeArea.bottomMin
                } else {
                    return this.props.mousePos.y
                }
            }

            return (
                <div className="baseImage" style={{position:"relative"}}>
                    <img
                        className="baseImage__image"
                        src={this.props.imgUrl}
                        onMouseEnter={(e)=>{this.subscribeEvt(e.target); this.props.onHovering(true)}}
                        onMouseLeave={(e)=>{this.unsubscribeEvt(e.target); this.props.onHovering(false)}}/>
                </div>
            )
        }
    }