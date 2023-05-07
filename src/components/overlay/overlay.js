const OVERLAY_STYLES = {
    position: "fixed",
    left: "0px",
    top: "0px",
    right: "0px",
    bottom: "0px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1
  }
  
  export default function Overlay() {
    return (
      <div style={OVERLAY_STYLES}></div>
    )
  }
  