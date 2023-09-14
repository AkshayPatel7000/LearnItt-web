
export const HHMMSSToHM = (time) => {
    var a = time?.split(':');
    var minutes = (+a[0]) * 60 + (+a[1]);
    var Hours = Math.floor(minutes / 60)
    var Min = minutes % 60
    return `${Hours > 0 ? `${Hours} hr` : ""} ${Min > 0 ? `${Min} Min` : ""}`
}

