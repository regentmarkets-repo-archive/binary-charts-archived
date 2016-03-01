export const createGrid = ({width: width = 700,height: height = 400} = {}) => ({
    left: "5%",
    right: "10%",
    top: "10%",
    bottom: 60,
    width: width * 0.9,
    height: height * 0.9 - 60,
    show: true,
    containLabel: true,
});
