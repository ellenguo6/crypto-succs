import React, { Component } from "react";

const MODAL_STYLES = {
    position: 'fixed',
    top:'50%',
    bottom:'50%',
    width: 'auto',
    height: '500px',
    background: '#B2D3C2',
    padding: '50px',
    zIndex: 1000,
    borderRadius: '30px'
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right:0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex:1000
}

export default function PlantPopUp({open, children, onClose}) {
    if(!open) return null

    return (
      <>
        <div style={OVERLAY_STYLE}/>
        <div style = {MODAL_STYLES}>
            <button className="close-b" onClick={onClose}>X</button>
            {children}
            
        </div>
      </>
    )
}